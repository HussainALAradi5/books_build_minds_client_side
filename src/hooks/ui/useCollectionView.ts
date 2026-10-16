"use client";
import { useState } from "react";
import { CollectionView } from "@/enums/shared/CollectionView";
export const useCollectionView = (initial = CollectionView.List) => {
  const [view, setView] = useState(initial);
  return { view, setView };
};
