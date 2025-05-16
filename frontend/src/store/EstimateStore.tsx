
import { create } from 'zustand'
import { nanoid } from 'nanoid'

interface EstimateItem {
  id: string
  mainType: string
  subTypes?: string[]
  hullType?: string
  inspirationIds?: string[]
  uploadedImages?: File[]
  wrapPurpose?: string
  wrapLevel?: string
  installPlan?: string
  shippingToPainterChic?: boolean
  installState?: string
  installCity?: string
  specialNotes?: string
}

interface EstimateStore {
  items: EstimateItem[]
  currentItem: EstimateItem | null
  currentStep: number
  editingItemId: string | null
  startNewItem: (mainType: string) => void
  updateCurrentItem: (fields: Partial<EstimateItem>) => void
  addItem: () => void
  editItem: (id: string) => void
  deleteItem: (id: string) => void
  goToStep: (step: number) => void
}

export const useEstimateStore = create<EstimateStore>((set, get) => ({
  items: [],
  currentItem: null,
  currentStep: 0,
  editingItemId: null,

  startNewItem: (mainType) => {
    const newItem: EstimateItem = {
      id: nanoid(),
      mainType,
      subTypes: [],
      inspirationIds: [],
      uploadedImages: [],
    }
    set({
      currentItem: newItem,
      editingItemId: null,
      currentStep: 0
    })
  },

  updateCurrentItem: (fields) => {
    set((state) => {
      const updated = state.currentItem ? { ...state.currentItem, ...fields } : null

      let updatedItems = [...state.items]
      if (updated && state.editingItemId) {
        updatedItems = updatedItems.map(item =>
          item.id === state.editingItemId ? updated : item
        )
      }

      return {
        currentItem: updated,
        items: updatedItems
      }
    })
  },

  addItem: () => {
    const { currentItem, items, editingItemId } = get()
    if (!currentItem) return
    let updatedItems = [...items]
    if (editingItemId) {
      updatedItems = items.map(item => item.id === editingItemId ? currentItem : item)
    } else {
      updatedItems.push(currentItem)
    }
    set({
      items: updatedItems,
      currentItem: null,
      editingItemId: null,
    })
  },

  editItem: (id) => {
    const { items } = get()
    const match = items.find((item) => item.id === id)
    if (!match) return
    set({
      currentItem: { ...match },
      editingItemId: id,
      currentStep: 0
    })
  },

  deleteItem: (id) => {
    const { items } = get()
    const updatedItems = items.filter((item) => item.id !== id)

    set({
      items: updatedItems,
      currentItem: updatedItems.length === 0 ? null : get().currentItem,
      editingItemId: updatedItems.length === 0 ? null : get().editingItemId,
      currentStep: updatedItems.length === 0 ? 0 : get().currentStep
    })
  },

  goToStep: (step) => {
    set({ currentStep: step })
  }
}))
