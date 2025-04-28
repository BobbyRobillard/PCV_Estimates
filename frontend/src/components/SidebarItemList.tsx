// SidebarItemList.tsx — Clean and ID-driven
import React from 'react';
import { EstimateItem } from '../types/EstimateItem';

interface SidebarItemListProps {
  items: EstimateItem[];
  activeItemId: string | null;
  setActiveItemId: (id: string) => void;
  onDelete: (id: string) => void;
}

const SidebarItemList: React.FC<SidebarItemListProps> = ({ items, activeItemId, setActiveItemId, onDelete }) => {
  return (
    <div>
      <h5>Estimate Items</h5>
      <div className="d-flex flex-column gap-2">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => setActiveItemId(item.id)}
            className={`d-flex justify-between items-center p-2 border rounded ${item.id === activeItemId ? 'bg-primary text-white' : 'bg-white'}`}
            style={{ cursor: 'pointer' }}
          >
            <span>{item.canvas_type || 'Untitled'}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="btn btn-sm btn-link text-danger"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarItemList;
