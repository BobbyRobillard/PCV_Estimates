import { create } from 'zustand'
import { nanoid } from 'nanoid'

export interface EstimateItem {
  id: string
  canvasType: string
  subTypes: string[]
  inspirationImages: string[]
  uploadedImages: File[]
  specialRequests?: string
}

interface EstimateState {
  items: EstimateItem[]
  currentItem: EstimateItem | null
  editingItemId: string | null
  currentStep: number

  goToStep: (step: number) => void
  startNewItem: () => void
  editItem: (id: string) => void
  deleteItem: (id: string) => void
  resetEstimate: () => void
  updateCurrentItem: (patch: Partial<EstimateItem>) => void
  finalizeCurrentItem: () => void
}

export const useEstimateStore = create<EstimateState>((set, get) => ({
  items: [],
  currentItem: null,
  editingItemId: null,
  currentStep: 0,

  goToStep: (step) => set({ currentStep: step }),

  startNewItem: () =>
    set({
      currentItem: {
        id: nanoid(),
        canvasType: '',
        subTypes: [],
        inspirationImages: [],
        uploadedImages: []
      },
      editingItemId: null,
      currentStep: 0
    }),

  editItem: (id) => {
    const item = get().items.find(i => i.id === id)
    if (item) {
      set({
        currentItem: { ...item },
        editingItemId: id,
        currentStep: 0
      })
    }
  },

  deleteItem: (id) =>
    set({
      items: get().items.filter(item => item.id !== id),
      currentItem: null,
      editingItemId: null
    }),

  resetEstimate: () =>
    set({
      items: [],
      currentItem: null,
      editingItemId: null,
      currentStep: 0
    }),

  updateCurrentItem: (patch) =>
    set(state => ({
      currentItem: state.currentItem
        ? { ...state.currentItem, ...patch }
        : state.currentItem
    })),

  finalizeCurrentItem: () => {
    const { currentItem, editingItemId, items } = get()
    if (!currentItem) return

    if (editingItemId) {
      set({
        items: items.map(item =>
          item.id === editingItemId ? currentItem : item
        ),
        editingItemId: null
      })
    } else {
      set({ items: [...items, currentItem] })
    }
  }
}))
