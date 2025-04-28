export interface CanvasTypeOption {
    value: string;
    label: string;
    icon: string; // This could later be a URL or import path
  }
  
  export const canvasTypes: CanvasTypeOption[] = [
    { value: 'AIRBOAT', label: 'Airboat Wrap', icon: '🛶' },
    { value: 'BOAT', label: 'Boat or Yacht', icon: '🚤' },
    { value: 'GRAPHICS', label: 'Digital Graphics', icon: '💻' },
    { value: 'BRANDING', label: 'Branding Design', icon: '📦' }
  ];