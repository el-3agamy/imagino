'use client';
import { motion } from 'framer-motion';
import {
  Cpu,
  Download,
  Expand,
  ImageIcon,
  Loader2,
  Layers,
  Wand2,
  Sparkles,
  Trash2,
  Image as ImageIco,
  Scan,
} from 'lucide-react';

import React, { useRef, useState } from 'react';
// shadcn components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  changeImageStyle,
  extractTextFromImage,
  genSuitableBackgroundById,
  getImageWithoutBackground,
  recognizeItemsInImage,
  // mapApiToExtractTextHistoryItem,
} from '@/services/images.service';
import { SuitableBackgroundHistoryItem } from '@/types/suitableBgHistory';
import { ChangeStyleHistoryItem } from '@/types/changeStyleAnimeHistory';
import { ExtractTextHistoryItem } from '@/types/extractTextFromBgHistory';
// import { Badge } from '@/components/ui/badge';
// import { fetchApi, resShape } from '@/utils/fetchApi';
import { genImageWithNewDimension, inhanceImageQuality } from '@/services/images.service';
import Image from 'next/image';

export default function AllFeatures() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showRotate, setShowRotate] = useState(false);
  const [angle, setAngle] = useState<string>('');
  const [historySuitableBg, setHistorySuitableBg] = useState<SuitableBackgroundHistoryItem[]>([]);
  const [historyChangeStyle, setHistoryChangeStyle] = useState<ChangeStyleHistoryItem[]>([]);
  const [historyExtractText, setHistoryExtractText] = useState<ExtractTextHistoryItem[]>([]);
  const [recognizeItemsHistory, setRecognizeItemsHistory] = useState<any[]>([]);
  const [ImageId, setImageId] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [recognizedItems, setRecognizedItems] = useState<any>(null);
  const [provider, setProvider] = useState<'cloudinary' | 'replicate' | 'fal' | 'local'>(
    'cloudinary'
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  function clear() {
    setFile(null);
    setPreview(null);
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
    a.download = 'product-shot.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function autoEnhance() {
    if (!file) return;
    setProcessing(true);

    try {
      const res = await inhanceImageQuality(file);
      const enhancedUrl = res?.result?.enhanced?.url;

      if (enhancedUrl) {
        setPreview(enhancedUrl);
        setHistory((h) => [enhancedUrl, ...h].slice(0, 20));
      }
    } catch (err) {
      console.error(err);
      alert('Error enhancing image — please try again.');
    } finally {
      setProcessing(false);
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function rotateImage() {
    if (!file) {
      alert('Please upload an image first.');
      return;
    }

    if (angle === '') {
      alert('Angle is required.');
      return;
    }

    const parsedAngle = Number(angle);
    if (!Number.isFinite(parsedAngle) || parsedAngle < 0 || parsedAngle > 360) {
      alert('Angle must be between 0 and 360.');
      return;
    }

    setProcessing(true);
    try {
      const res = await genImageWithNewDimension(file, parsedAngle);
      const rotatedUrl = res?.result?.enhanced?.url;
      console.log(res, '👉', rotatedUrl);
      if (rotatedUrl) {
        setPreview(rotatedUrl);
        setHistory((h) => [rotatedUrl, ...h].slice(0, 20));
      }
    } catch (err) {
      console.error(err);
      alert('Error rotating image — please try again.');
    } finally {
      setProcessing(false);
    }
  }

  async function callRemoveBg() {
    if (!file) return;
    setProcessing(true);

    try {
      const fd = new FormData();
      fd.append('imageFile', file);

      const result = await getImageWithoutBackground(fd);

      console.log('Remove-bg API result:', result);

      const imageUrl = result.imageSrc || result.enhancedImageSrc || result.originalImageSrc;
      console.log(imageUrl);

      if (!imageUrl) {
        console.error('No image returned from remove-bg. Full result:', result);
        alert('No image returned from remove-bg. Check console for details.');
        return;
      }

      setPreview(imageUrl);
      setHistory((h) => [imageUrl, ...h].slice(0, 20));
      setImageId(result.id);
    } catch (err) {
      console.error(err);
      alert('Error removing background — check console.');
    } finally {
      setProcessing(false);
    }
  }

  async function generateSuitableBg() {
    if (!ImageId) return alert('No image available to generate background');
    setProcessing(true);
    try {
      const result = await genSuitableBackgroundById(ImageId);
      if (!result.imageSrc) throw new Error('No image returned from suitable-background');
      setPreview(result.imageSrc);
      setHistorySuitableBg((h) => [result, ...h].slice(0, 20));
    } catch (err) {
      console.error(err);
      alert('Error generating suitable background — check console.');
    } finally {
      setProcessing(false);
    }
  }

  async function callChangeStyle(file: File, style: string) {
    setProcessing(true);
    try {
      const result = await changeImageStyle(file, style);
      setPreview(result.enhancedImageSrc || '');
      setHistoryChangeStyle((h) => [result, ...h].slice(0, 20));
      setImageId(result.id);
    } catch (err) {
      console.error(err);
      alert('Error changing style — check console.');
    } finally {
      setProcessing(false);
    }
  }

  async function callExtractText(file: File) {
    setProcessing(true);

    try {
      const fd = new FormData();
      fd.append('image', file);

      // استدعاء الـ API
      const result = await extractTextFromImage(fd);

      // تحديث الـ state بناءً على النتيجة مباشرة
      setExtractedText(result.text);
      setHistoryExtractText((h) => [result, ...h].slice(0, 20));
    } catch (err) {
      console.error(err);
      alert('Error extracting text — check console.');
    } finally {
      setProcessing(false);
    }
  }

  async function callRecognizeItems() {
    if (!file) return;
    setProcessing(true);

    try {
      const fd = new FormData();
      fd.append('image', file);

      const result = await recognizeItemsInImage(fd);
      console.log('Recognize-items result:', result);

      setRecognizedItems(result);
      setRecognizeItemsHistory((h) => [result, ...h].slice(0, 20));
    } catch (err) {
      console.error(err);
      alert('Error recognizing items — check console.');
    } finally {
      setProcessing(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient from-white to-slate-50 text-slate-900 p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow">
              <ImageIco className="w-7 h-7 text-slate-700" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Pebblely — All Features</h1>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    disabled={!file || processing}
                    className="rounded-2xl"
                  >
                    <Layers className="w-4 h-4 mr-2" /> Remove BG
                  </Button>

                  <Button
                    onClick={generateSuitableBg}
                    disabled={!preview || processing}
                    className="rounded-2xl"
                  >
                    <Wand2 className="w-4 h-4 mr-2" /> Apply Suitable BG
                  </Button>

                  <Button
                    onClick={() => applyTemplate('shadow-soft')}
                    disabled={!preview || processing}
                    className="rounded-2xl"
                  >
                    <Expand className="w-4 h-4 mr-2" /> Add Shadow
                  </Button>

                  <Button
                    onClick={() => callChangeStyle(file!, selectedStyle!)}
                    disabled={!preview || processing || !selectedStyle}
                    className="rounded-2xl flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Change Style
                  </Button>

                  <Button
                    onClick={autoEnhance}
                    disabled={!preview || processing}
                    className="rounded-2xl"
                  >
                    <Sparkles className="w-4 h-4 mr-2" /> Auto Enhance
                  </Button>

                  <Button
                    onClick={() => callExtractText(file!)}
                    disabled={!file || processing}
                    className="rounded-2xl"
                  >
                    <Cpu className="w-4 h-4 mr-2" />
                    Extract Text
                  </Button>

                  <Button
                    onClick={callRecognizeItems}
                    disabled={!file || processing}
                    className="rounded-2xl"
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    Recognize Items
                  </Button>
                </div>
                {/* Head */}

                <div className="mt-2 space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowRotate((prev) => !prev)}
                    className="w-full rounded-2xl"
                  >
                    Rotate (angle)
                  </Button>

                  {showRotate && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 flex flex-col gap-2">
                      <input
                        type="number"
                        min={0}
                        max={360}
                        value={angle}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '') {
                            setAngle('');
                            return;
                          }
                          const clamped = Math.min(360, Math.max(0, Number(val)));
                          setAngle(String(clamped));
                        }}
                        placeholder="Engter angle"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
                      />
                      <Button
                        onClick={rotateImage}
                        disabled={processing || angle === ''}
                        className="rounded-2xl"
                      >
                        <Loader2 className="w-4 h-4 mr-2" /> Rotate
                      </Button>
                    </div>
                  )}
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

          {/* Style Selection Card */}
          <Card className="mt-4 rounded-2xl">
            <CardHeader>
              <CardTitle>Select Style</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {['anime', 'cartoon', 'pixar', 'watercolor', 'oil', 'pencil'].map((style) => (
                  <Button
                    key={style}
                    variant={selectedStyle === style ? 'default' : 'outline'}
                    className="rounded-2xl"
                    onClick={() => setSelectedStyle(style)}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.aside>

        {/* Middle column: Preview 1 */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-1 lg:col-span-2"
        >
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Editor Preview</CardTitle>
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
              </div>
            </CardContent>
          </Card>
          {(extractedText || (recognizedItems && recognizedItems.items.length > 0)) && (
            <Card className="rounded-2xl mt-4 p-4 shadow bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Image Analysis</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Preview Image */}
                  <div className="border rounded-xl p-4 flex items-center justify-center">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="preview"
                        className="max-h-[350px] object-contain rounded-xl"
                      />
                    ) : (
                      <p className="text-slate-400 text-sm">No image available</p>
                    )}
                  </div>

                  {/* Extracted Text & Recognized Items */}
                  <div className="border rounded-xl p-4 bg-slate-50 max-h-[350px] overflow-auto whitespace-pre-wrap">
                    {/* Extracted Text */}
                    {extractedText && (
                      <div className="mb-4">
                        <p className="font-semibold mb-1">Extracted Text:</p>
                        <p>{extractedText}</p>
                      </div>
                    )}

                    {/* Recognized Items */}
                    {recognizedItems && recognizedItems.items.length > 0 && (
                      <div>
                        <p className="font-semibold mb-2">
                          Recognized Items ({recognizedItems.totalItemsDetected}):
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          {recognizedItems.items.map((item: any, idx: number) => (
                            <li key={idx}>
                              <span className="font-medium">{item.item_name}</span> -{' '}
                              {item.category} (Count: {item.count})
                              <p className="text-xs text-slate-500">{item.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.section>
      </section>
    </main>
  );
}
