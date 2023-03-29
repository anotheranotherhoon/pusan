import { useState } from "react";

export const useMouseOver = () => {
  const [currentVillage, setCurrentVillage] = useState<string>("");
  const handleMouseOver = (village: string) => {
    setCurrentVillage(village);
  };
  return {
    currentVillage,
    handleMouseOver,
  };
};
