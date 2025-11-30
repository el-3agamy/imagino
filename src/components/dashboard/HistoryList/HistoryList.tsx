'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, CheckCircle, XCircle, Loader2 } from 'lucide-react';

type JobType = 'remove-bg' | 'generate-bg' | 'generate-3d';
type JobStatus = 'done' | 'processing' | 'failed';

type HistoryItem = {
  id: string;
  type: JobType;
  status: JobStatus;
  createdAt: string;
  imageSrc?: string;
  inputNotes?: string;
  resultNotes?: string;
  variationCount?: number;
};

const mockData: HistoryItem[] = [
  {
    id: 'job_01',
    type: 'remove-bg',
    status: 'done',
    createdAt: new Date().toISOString(),
    imageSrc: '/assets/home/product1.jpg',
    inputNotes: 'Remove background, keep shadows',
    resultNotes: 'Background removed, 1024x1024',
  },
  {
    id: 'job_02',
    type: 'generate-bg',
    status: 'processing',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    imageSrc: '/assets/home/product2.jpg',
    inputNotes: 'Generate white studio background',
    resultNotes: '',
  },
  {
    id: 'job_03',
    type: 'generate-3d',
    status: 'done',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    imageSrc: '/assets/home/product3.jpg',
    inputNotes: 'Create 3 positions (front/side/45deg). Keep texture.',
    variationCount: 3,
    resultNotes: '3D-generated renders available',
  },
];

function prettyType(t: JobType) {
  switch (t) {
    case 'remove-bg':
      return 'Background removed';
    case 'generate-bg':
      return 'Background generated';
    case 'generate-3d':
      return '3D generation';
  }
}

function StatusPill({ status }: { status: JobStatus }) {
  if (status === 'done')
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
        <CheckCircle className="h-3 w-3" />
        Done
      </span>
    );
  if (status === 'processing')
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
        <Loader2 className="h-3 w-3 animate-spin" />
        Processing
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
      <XCircle className="h-3 w-3" />
      Failed
    </span>
  );
}

export default function HistoryList() {
  const [items] = useState<HistoryItem[]>(mockData);
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white dark:bg-slate-900/80 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#111827] dark:text-slate-100">
          Processing History
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-300">
          <Calendar className="h-4 w-4" />
          <span>All time</span>
        </div>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 dark:border-slate-800 p-6 text-center text-gray-500 dark:text-slate-400">
            No history yet
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-slate-800 transition p-3 bg-gray-50 dark:bg-slate-800/60"
              >
                <div className="relative w-full sm:w-20 h-40 sm:h-20 flex-none overflow-hidden rounded-md bg-gray-100 dark:bg-slate-700">
                  {it.imageSrc ? (
                    <Image
                      src={it.imageSrc}
                      alt="thumb"
                      fill
                      sizes="(max-width: 640px) 100vw, 80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-500 dark:text-slate-300">
                      No preview
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex w-full items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="truncate text-sm font-semibold text-gray-800 dark:text-slate-100">
                          {prettyType(it.type)}
                        </h3>
                        <StatusPill status={it.status} />
                      </div>
                      <p className="truncate text-sm text-gray-600 dark:text-slate-300 mt-1">
                        {it.inputNotes ?? '—'}
                      </p>
                    </div>

                    <div className="hidden sm:flex flex-col items-end gap-2">
                      <div className="text-xs text-gray-500 dark:text-slate-400">
                        {new Date(it.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col items-start gap-2 sm:hidden">
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      {new Date(it.createdAt).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      {it.variationCount && (
                        <div className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-slate-700/60 dark:text-slate-200">
                          {it.variationCount} variations
                        </div>
                      )}
                      {it.resultNotes && (
                        <div className="text-xs text-gray-500 dark:text-slate-300">
                          {it.resultNotes}
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                <div className="mt-3 sm:mt-0 sm:ml-auto flex w-full sm:w-auto flex-col sm:flex-col items-stretch sm:items-end gap-2">
                  <button
                    onClick={() => setSelected(it)}
                    className="w-full sm:w-auto rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-700/80"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      window.open(it.imageSrc || '/', '_blank');
                    }}
                    className="w-full sm:w-auto text-xs text-indigo-600 dark:text-indigo-300 underline"
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
            aria-hidden
          />

          <div
            className="relative z-10 w-full sm:w-[min(900px,92%)] max-h-[90vh] sm:max-h-[90vh] overflow-auto bg-white dark:bg-slate-900 p-4 sm:p-6
                          rounded-t-xl sm:rounded-2xl shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                  {prettyType(selected.type)} — {selected.id}
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusPill status={selected.status} />
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-700/80"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-200">
                  Input
                </div>
                <div className="rounded-md border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200">
                  {selected.inputNotes ?? '—'}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-200">
                  Result
                </div>
                <div className="rounded-md border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200">
                  {selected.resultNotes ?? 'No details available'}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-200">
                  Preview
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="relative h-40 w-full sm:w-40 overflow-hidden rounded-md bg-gray-100 dark:bg-slate-700">
                    {selected.imageSrc ? (
                      <Image src={selected.imageSrc} alt="preview" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-500 dark:text-slate-300">
                        No preview
                      </div>
                    )}
                  </div>

                  {selected.variationCount &&
                    Array.from({ length: selected.variationCount }).map((_, i) => (
                      <div
                        key={i}
                        className="relative h-40 w-40 overflow-hidden rounded-md bg-gray-100 dark:bg-slate-700"
                      >
                        <div className="flex h-full w-full items-center justify-center text-sm text-gray-500 dark:text-slate-300">
                          Variation {i + 1}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <a
                href={selected.imageSrc || '#'}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-700/80"
              >
                Open original
              </a>
              <button
                onClick={() => setSelected(null)}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
