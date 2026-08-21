import { create } from "zustand";

export type GroceryCategory =
  "products" | "Dairy" | "Bakery" | "Pantry" | "Snacks";

export type GroceryPriority = "low" | "mediun" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  purchased: boolean;
  priority: GroceryPriority;
};

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { item: GroceryItem };

type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/items");
      const payload = (await res.json()) as ItemsResponse;

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      set({ items: payload.items });
    } catch (error) {
      console.log("Error loading items: ", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async () => {
    try {
    } catch (error) {}
  },
  updateQuantity: async () => {
    try {
    } catch (error) {}
  },
  togglePurchased: async () => {
    try {
    } catch (error) {}
  },
  removeItem: async () => {
    try {
    } catch (error) {}
  },
  clearPurchased: async () => {
    try {
    } catch (error) {}
  },
}));
