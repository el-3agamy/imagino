export type AiEdit = {
  operation: string;
  provider: string;
  prompt?: string;
  parameters?: Record<string, unknown>;
  timestamp: string;
  processingTime?: number;
  cost?: number;
};

export type ImageDimensions = {
  width: number;
  height: number;
};

export type ImageDocument = {
  _id: string;
  user: string;
  parentId?: string | null;
  children?: string[];
  isOriginal: boolean;
  version: number;
  isBackgroundOnly?: boolean;
  url: string;
  storageKey: string;
  thumbnailUrl?: string;
  filename: string;
  originalFilename?: string;
  mimeType: string;
  size: number;

  dimensions: ImageDimensions;
  aiEdits: AiEdit[];
  status: 'uploading' | 'processing' | 'completed' | 'failed' | 'deleted';
  processingError?: string;
  tags: string[];
  title?: string;
  description?: string;
  category?: 'portrait' | 'landscape' | 'product' | 'art' | 'other';
  isPublic: boolean;
  shareToken?: string;
  views: number;
  downloads: number;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type EnhancedImageResult = {
  original: ImageDocument;
  enhanced: ImageDocument;
};

// & Enhance Image
export type EnhancedImageResponse = {
  message: string;
  status: number;
  result: EnhancedImageResult;
};

export type NewAngleImageResult = {
  original: ImageDocument;
  enhanced: ImageDocument;
};

// & New Angle Image (genImgWithNewDimension)
export type NewAngleImageResponse = {
  message: string;
  status: number;
  result: NewAngleImageResult;
};

export type ResizedImageResult = {
  originalImage: ImageDocument;
  resizedImage: ImageDocument;
};

// & Resize Image
export type ResizedImageResponse = {
  message: string;
  status: number;
  result: ResizedImageResult;
};

// &  Get Image
export type ImageResponse = {
  message: string;
  status: number;
  result: ImageDocument;
};

export type BackgroundsForImageResult = {
  parentImage: ImageDocument;
  backgrounds: ImageDocument[];
  totalCount: number;
  page: number;
  size: number;
};

// & Get List Backgrounds generated from an image
export type BackgroundsForImageResponse = {
  message: string;
  status: number;
  result: BackgroundsForImageResult;
};

export type BlurredImageResult = {
  originalImage: ImageDocument | null;
  blurredImage: ImageDocument;
};

// & Blur Image Region
export type BlurredImageResponse = {
  message: string;
  status: number;
  result: BlurredImageResult;
};
