import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  //form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  },
  resetFormData: () => {
    set({
      formData: { name: "", price: "", image: "" },
    });
  },

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetFormData();
      toast.success("Product added successfully!");

      // close modal
    } catch (error) {
      toast.error(
        `${
          error.response?.data?.error ||
          "Failed to add product. Please try again."
        }`
      );
    } finally {
      set({ loading: false });
      document.getElementById("add_product_modal").close();
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch {
      set({ error: "Failed to fetch products. Please try again." });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${productId}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
        error: null,
      }));
    } catch (error) {
      toast.error(
        `${
          error.response?.data?.error ||
          "Failed to delete product. Please try again."
        }`
      );
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${productId}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch {
      set({
        error: "Failed to fetch product. Please try again.",
        currentProduct: null,
      });
      toast.error("Failed to fetch product. Please try again.");
      return null;
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (productId) => {
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.put(`${BASE_URL}/api/products/${productId}`, formData);
      await get().fetchProducts();
      toast.success("Product updated successfully!");
    } catch (error) {
      set({
        error: "Failed to update product. Please try again.",
      });
      toast.error(
        `${
          error.response?.data?.error ||
          "Failed to update product. Please try again."
        }`
      );
    } finally {
      set({ loading: false });
    }
  },
}));
