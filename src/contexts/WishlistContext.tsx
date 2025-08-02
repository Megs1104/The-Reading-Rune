import React from "react";
import { useContext, useState, createContext, ReactNode } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "./AuthContext";

type WishlistBook = {
  title: string;
  author: string;
  blurb: string;
  coverImage: string;
  publishedDate: string;
  isbn: string;
  pageCount: string;
};
type WishlistContextType = {
  wishlist: WishlistBook[];
  fetchWishlist: () => Promise<void>;
  addToWishlist: (book: WishlistBook) => Promise<void>;
};
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistBook[]>([]);
  const { userId } = useAuth();

  const fetchWishlist = async () => {
    const { data, error } = await supabase
      .from("user_wishlist")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    setWishlist(data || []);
  };
};
