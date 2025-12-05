"use client"
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    ImageIcon,
    Layers,
    Wand2,
    Expand,
    Download,
    Sparkles,
    Sliders,
    Trash2,
    Cloud,
    Cpu,
    Image,
} from "lucide-react";



// shadcn components (assumes you have them in your project)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
    const [provider, setProvider] = useState<"cloudinary" | "replicate" | "fal" | "local">("cloudinary");

    const inputRef = useRef<HTMLInputElement | null>(null);

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setPreview(URL.createObjectURL(f));
    }

    function clear() {
        setFile(null);
        setPreview(null);
    }

    async function callRemoveBg() {
        if (!file) return;
        setProcessing(true);

        try {
            // send form-data to our Next.js API route which will proxy to chosen provider
            const fd = new FormData();
            fd.append("image", file);
            fd.append("provider", provider);

            const res = await fetch("/api/remove-bg", {
                method: "POST",
                body: fd,
            });

            if (!res.ok) throw new Error("remove-bg failed");
            const json = await res.json();
            // Expect { result_url }
            if (json?.result_url) {
                setPreview(json.result_url);
                setHistory((h) => [json.result_url, ...h].slice(0, 20));
            }
        } catch (err) {
            console.error(err);
            alert("Error removing background — check console.");
        } finally {
            setProcessing(false);
        }
    }

    async function applyTemplate(templateId: string) {
        if (!preview) return;
        setProcessing(true);
        try {
            const res = await fetch("/api/apply-template", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: preview, templateId, provider }),
            });
            if (!res.ok) throw new Error("template failed");
            const json = await res.json();
            if (json?.result_url) {
                setPreview(json.result_url);
                setHistory((h) => [json.result_url, ...h].slice(0, 20));
            }
        } catch (err) {
            console.error(err);
            alert("Error applying template — check console.");
        } finally {
            setProcessing(false);
        }
    }

    async function downloadImage() {
        if (!preview) return;
        const a = document.createElement("a");
        a.href = preview;
        a.download = "product-shot.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

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
                                <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                                <div className="border-dashed border-2 border-slate-200 rounded-2xl p-4 text-center bg-white">
                                    <p className="text-sm text-slate-500">Upload product image (PNG/JPG)</p>
                                    <div className="mt-4 flex justify-center">
                                        <Button onClick={() => inputRef.current?.click()} className="rounded-2xl">
                                            Upload image
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button onClick={callRemoveBg} disabled={!file || processing} className="rounded-2xl">
                                        <Layers className="w-4 h-4 mr-2" /> Remove BG
                                    </Button>

                                    <Button onClick={() => applyTemplate("studio-light")} disabled={!preview || processing} className="rounded-2xl">
                                        <Wand2 className="w-4 h-4 mr-2" /> Apply Template
                                    </Button>

                                    <Button onClick={() => applyTemplate("shadow-soft")} disabled={!preview || processing} className="rounded-2xl">
                                        <Expand className="w-4 h-4 mr-2" /> Add Shadow
                                    </Button>

                                    <Button onClick={() => alert("Auto-enhance (stub)")} disabled={!preview || processing} className="rounded-2xl">
                                        <Sparkles className="w-4 h-4 mr-2" /> Auto Enhance
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
                                {["studio-light", "studio-dark", "outdoor"].map((t) => (
                                    <motion.button
                                        key={t}
                                        onClick={() => setSelectedTemplate(t)}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`rounded-2xl p-3 border ${selectedTemplate === t ? "border-sky-500" : "border-slate-100"} bg-white shadow`}
                                    >
                                        <div className="h-20 w-full rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-end p-2">
                                            <span className="text-xs">{t}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="mt-3 flex gap-2">
                                <Button onClick={() => selectedTemplate && applyTemplate(selectedTemplate)} disabled={!selectedTemplate || !preview} className="rounded-2xl">
                                    Apply selected
                                </Button>
                                <Button variant="ghost" onClick={() => setSelectedTemplate(null)} className="rounded-2xl">
                                    Clear
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.aside>

                {/* Middle column: Preview */}
                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-1 lg:col-span-2">
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
                                    ) : (
                                        <div className="text-center text-slate-400">
                                            <p className="text-sm">No preview yet — upload an image and start editing.</p>
                                            <div className="mt-3 inline-flex gap-2">
                                                <Button onClick={() => inputRef.current?.click()} className="rounded-2xl">
                                                    Upload
                                                </Button>
                                                <Button onClick={() => alert("Try sample image")}>Sample</Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <Badge className="px-3 py-1">Preview</Badge>
                                        <div className="text-sm text-slate-500">{file ? file.name : "—"}</div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="text-xs text-slate-400">Processing: {processing ? "Yes" : "No"}</div>
                                        <Button onClick={() => alert("Open advanced editor (stub)")}>Advanced</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <motion.div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">Enhancer & Upscale</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-3 flex-wrap">
                                    <Button onClick={() => alert("Upscale x2 (stub)")} className="rounded-2xl">
                                        <Cpu className="w-4 h-4 mr-2" /> Upscale x2
                                    </Button>
                                    <Button onClick={() => alert("Enhance colors (stub)")} className="rounded-2xl">
                                        <Sliders className="w-4 h-4 mr-2" /> Enhance
                                    </Button>
                                    <Button onClick={() => alert("Remove noise (stub)")} className="rounded-2xl">
                                        <Sparkles className="w-4 h-4 mr-2" /> Denoise
                                    </Button>
                                </div>

                                <p className="mt-3 text-sm text-slate-500">These actions call the provider to run image transforms. Implement server routes that translate these actions to Cloudinary / Replicate / Fal.ai calls.</p>
                            </CardContent>
                        </Card>

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
                                                <motion.div whileHover={{ scale: 1.03 }} key={h} className="w-28 h-20 rounded-2xl overflow-hidden bg-white shadow">
                                                    <img src={h} className="w-full h-full object-cover" alt={`history-${i}`} />
                                                </motion.div>
                                            ))
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button onClick={() => alert("Export zip (stub)")}>Export all</Button>
                                        <Button variant="outline" onClick={() => setHistory([])}>Clear history</Button>
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

