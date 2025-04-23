import React from 'react';

interface EstimateItem {
  id: string;
  canvas_type: string;
  sub_type: string;
  isDraft: boolean;
}

interface SidebarItemListProps {
  items: EstimateItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const SidebarItemList: React.FC<SidebarItemListProps> = ({
  items,
  currentIndex,
  onSelect,
  onDelete,
  onAdd,
}) => {
  return (
    <div>
      <h4 className="font-bold mb-2">Estimate Items</h4>
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`p-2 mb-1 rounded cursor-pointer ${
            i === currentIndex ? 'bg-blue-100' : 'bg-white'
          }`}
          onClick={() => onSelect(i)}
        >
          <div className="flex justify-between items-center">
            <span>
              {item.canvas_type || 'Untitled'} — {item.sub_type || 'Subtype'}
              {item.isDraft && (
                <span className="ml-1 text-xs text-yellow-600">(Draft)</span>
              )}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="text-red-500 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="mt-2 w-full px-3 py-2 bg-green-600 text-white rounded text-sm"
      >
        + Add Another Item
      </button>
    </div>
  );
};

export default SidebarItemList;
