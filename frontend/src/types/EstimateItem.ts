export interface EstimateItem {
    id: string;
    canvas_type: string;
    sub_type: string;
    inspiration_images: { image_url: string; preference_order: number }[];
    uploads: File[];
    isDraft: boolean;
  }