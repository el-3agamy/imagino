'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ImageIcon, Layers, Wand2, Expand, Download, Sparkles, Trash2, Image } from 'lucide-react';

// shadcn components (assumes you have them in your project)
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { removeBackground, RemoveBackgroundError } from '@/lib/removeBackground';

type AiEdit = { operation?: string | null };

const hasRemoveBackgroundEdit = (edits?: AiEdit[] | null): boolean =>
  Array.isArray(edits) && edits.some((edit) => edit?.operation === 'remove-background');

/**
 * AllFeatures - One-page features UI for Product Photo Editor
 * - Light design
 * - Tailwind + shadcn UI
 * - Framer Motion for micro-interactions
 * - Lucide icons
 * - rounded-2xl cards
 *
 * Notes:
 * - This is a presentational + small functional scaffold.
 * - API calls are stubbed to `/api/*` endpoints; implement server routes for Cloudinary / Replicate / Fal.ai.
 */

export default function AllFeatures() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const provider: 'cloudinary' | 'replicate' | 'fal' | 'local' = 'cloudinary';
  const [imageName, setImageName] = useState('');
  const [assetLoading, setAssetLoading] = useState(false);
  const [assetError, setAssetError] = useState<string | null>(null);
  const [currentAssetId, setCurrentAssetId] = useState<string | null>(null);
  const [hasRemovedBackground, setHasRemovedBackground] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const assetIdFromQuery = searchParams.get('assetId');

  useEffect(() => {
    if (!assetIdFromQuery) {
      setCurrentAssetId(null);
      setHasRemovedBackground(false);
      return;
    }

    let cancelled = false;

    const fetchAsset = async () => {
      setAssetLoading(true);
      setAssetError(null);
      try {
        const res = await fetch(`/api/assets?assetId=${assetIdFromQuery}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || 'Failed to load asset');
        }

        const asset = data?.result?.image;
        if (!asset?.url) {
          throw new Error('Asset missing preview url');
        }

        if (cancelled) return;

        const derivedAssetId = asset?._id ? String(asset._id) : assetIdFromQuery;
        const alreadyRemoved = hasRemoveBackgroundEdit(asset?.aiEdits as AiEdit[] | null);

        setFile(null);
        setPreview(asset.url);
        setImageName(asset.filename || '');
        setHistory((h) => (h[0] === asset.url ? h : [asset.url, ...h].slice(0, 20)));
        setCurrentAssetId(derivedAssetId ?? null);
        setHasRemovedBackground(alreadyRemoved);
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Unexpected error loading asset';
          setAssetError(message);
          setHasRemovedBackground(false);
          console.error(message);
        }
      } finally {
        if (!cancelled) {
          setAssetLoading(false);
        }
      }
    };

    fetchAsset();
    return () => {
      cancelled = true;
    };
  }, [assetIdFromQuery]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setImageName(f.name || '');
    setAssetError(null);
    setCurrentAssetId(null);
    setHasRemovedBackground(false);
  }

  function clear() {
    setFile(null);
    setPreview(null);
    setImageName('');
    setAssetError(null);
    setCurrentAssetId(null);
    setHasRemovedBackground(false);
  }

  async function callRemoveBg() {
    if (!file && !currentAssetId) {
      const message = 'Upload or select an image before removing the background.';
      setAssetError(message);
      return;
    }

    setProcessing(true);
    setAssetError(null);

    try {
      const result = await removeBackground({
        imageFile: file ?? undefined,
        imageId: file ? undefined : currentAssetId,
      });

      setPreview(result.url);
      setHistory((h) => (h[0] === result.url ? h : [result.url, ...h].slice(0, 20)));
      setImageName(result.filename || imageName || '');
      if (result.id) {
        setCurrentAssetId(result.id);
      }
      setHasRemovedBackground(hasRemoveBackgroundEdit(result.aiEdits));
      setFile(null);
    } catch (err) {
      const message =
        err instanceof RemoveBackgroundError
          ? err.message
          : err instanceof Error
          ? err.message
          : 'Error removing background';
      setAssetError(message);
      alert(message);
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }

  async function applyTemplate(templateId: string) {
    if (!preview) return;
    setProcessing(true);
    try {
      const res = await fetch('/api/apply-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: preview, templateId, provider }),
      });
      if (!res.ok) throw new Error('template failed');
      const json = await res.json();
      if (json?.result_url) {
        setPreview(json.result_url);
        setHistory((h) => [json.result_url, ...h].slice(0, 20));
      }
    } catch (err) {
      console.error(err);
      alert('Error applying template — check console.');
    } finally {
      setProcessing(false);
    }
  }

  async function downloadImage() {
    if (!preview) return;
    const a = document.createElement('a');
    a.href = preview;
    a.target = '_blank';
    a.download = 'product-shot.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  const canRemoveBackground = Boolean(file || currentAssetId);
  const removeBgDisabled = !canRemoveBackground || processing || hasRemovedBackground;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow">
              <Image className="w-7 h-7 text-slate-700" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Pebblely — All Features</h1>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Upload + tools */}
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1"
        >
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" /> Upload & Quick Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
                <div className="border-dashed border-2 border-slate-200 rounded-2xl p-4 text-center bg-white">
                  <p className="text-sm text-slate-500">Upload product image (PNG/JPG)</p>
                  <div className="mt-4 flex justify-center">
                    <Button onClick={() => inputRef.current?.click()} className="rounded-2xl">
                      Upload image
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={callRemoveBg}
                    disabled={removeBgDisabled}
                    className="rounded-2xl"
                  >
                    <Layers className="w-4 h-4 mr-2" /> Remove BG
                  </Button>

                  <Button
                    onClick={() => applyTemplate('shadow-soft')}
                    disabled={!preview || processing}
                    className="rounded-2xl"
                  >
                    <Expand className="w-4 h-4 mr-2" /> Add Shadow
                  </Button>

                  <Button
                    onClick={() => alert('Auto-enhance (stub)')}
                    disabled={!preview || processing}
                    className="rounded-2xl"
                  >
                    <Sparkles className="w-4 h-4 mr-2" /> Auto Enhance
                  </Button>

                  <Button
                    onClick={() => applyTemplate('studio-light')}
                    disabled={!preview || processing}
                    className="rounded-2xl"
                  >
                    <Wand2 className="w-4 h-4 mr-2" /> Generate
                  </Button>
                </div>

                <div className="flex gap-2 justify-between">
                  <Button variant="outline" onClick={clear} className="rounded-2xl">
                    <Trash2 className="w-4 h-4 mr-2" /> Clear
                  </Button>

                  <Button onClick={downloadImage} disabled={!preview} className="rounded-2xl">
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
                </div>

                <div className="text-xs text-slate-400">
                  Provider: <span className="font-medium text-slate-700">{provider}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {['studio-light', 'studio-dark', 'outdoor'].map((t) => (
                  <motion.button
                    key={t}
                    onClick={() => setSelectedTemplate(t)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl p-3 border ${
                      selectedTemplate === t ? 'border-sky-500' : 'border-slate-100'
                    } bg-white shadow`}
                  >
                    <div className="h-20 w-full rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-end p-2">
                      <span className="text-xs">{t}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  onClick={() => selectedTemplate && applyTemplate(selectedTemplate)}
                  disabled={!selectedTemplate || !preview}
                  className="rounded-2xl"
                >
                  Apply selected
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTemplate(null)}
                  className="rounded-2xl"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.aside>

        {/* Middle column: Preview */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-1 lg:col-span-2"
        >
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Editor Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-2xl p-6 shadow flex flex-col gap-4">
                <div className="w-full h-[520px] rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <motion.img
                      key={preview}
                      src={preview}
                      alt="preview"
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.35 }}
                      className="max-h-full max-w-full object-contain p-4"
                    />
                  ) : assetLoading ? (
                    <div className="text-center text-slate-500">
                      <p>Loading your asset…</p>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400">
                      <p className="text-sm">No preview yet — upload an image and start editing.</p>
                      <div className="mt-3 inline-flex gap-2">
                        <Button onClick={() => inputRef.current?.click()} className="rounded-2xl">
                          Upload
                        </Button>
                        <Button onClick={() => alert('Try sample image')}>Sample</Button>
                      </div>
                    </div>
                  )}
                </div>
                {imageName ? (
                  <p className="text-sm text-slate-600 text-center">{imageName}</p>
                ) : null}
                {assetError ? (
                  <p className="text-sm text-red-500 text-center">{assetError}</p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <motion.div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">Enhancer & Upscale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 flex-wrap">
                  <Button onClick={() => alert('Upscale x2 (stub)')} className="rounded-2xl">
                    <Cpu className="w-4 h-4 mr-2" /> Upscale x2
                  </Button>
                  <Button onClick={() => alert('Enhance colors (stub)')} className="rounded-2xl">
                    <Sliders className="w-4 h-4 mr-2" /> Enhance
                  </Button>
                  <Button onClick={() => alert('Remove noise (stub)')} className="rounded-2xl">
                    <Sparkles className="w-4 h-4 mr-2" /> Denoise
                  </Button>
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  These actions call the provider to run image transforms. Implement server routes
                  that translate these actions to Cloudinary / Replicate / Fal.ai calls.
                </p>
              </CardContent>
            </Card> */}

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">Export & History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 overflow-x-auto">
                    {history.length === 0 ? (
                      <div className="text-sm text-slate-400">No history yet</div>
                    ) : (
                      history.map((h, i) => (
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          key={h}
                          className="w-28 h-20 rounded-2xl overflow-hidden bg-white shadow"
                        >
                          <img
                            src={h}
                            className="w-full h-full object-cover"
                            alt={`history-${i}`}
                          />
                        </motion.div>
                      ))
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => alert('Export zip (stub)')}>Export all</Button>
                    <Button variant="outline" onClick={() => setHistory([])}>
                      Clear history
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </section>

      <footer className="max-w-6xl mx-auto mt-10 text-center text-xs text-slate-400">
        Built with Tailwind + shadcn + Framer Motion · Light design · rounded-2xl
      </footer>
    </main>
  );
}
