export type RemoveBgJobType = 'remove-bg';

export type RemoveBgJobStatus = 'done' | 'processing' | 'failed';

export type RemoveBgHistoryItem = {
  id: string;
  type: RemoveBgJobType;
  status: RemoveBgJobStatus;
  createdAt: string;
  imageSrc?: string;
  originalImageSrc?: string;
  processingTime?: number;
  provider?: string;
};


