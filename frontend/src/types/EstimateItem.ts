// types/EstimateItem.ts

import { CanvasType } from './canvasTypes';

export interface EstimateItem {
  id: string;
  canvas_type: CanvasType;
  sub_types: string[];
  hull_subtype?: string;
  inspiration_images: { image_url: string; preference_order: number }[];
  uploads: File[];
  isDraft: boolean;
}
