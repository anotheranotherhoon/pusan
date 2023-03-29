import React, { useState } from "react";

interface DropDownHookParams {
  (items: string[], init: string, setFn: (option: string) => void): {
    isDropDownShow: boolean;
    selectedValue: string;
    handleDropDown: () => void;
    handleCurrntIndex: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  };
}

export const useDropDown: DropDownHookParams = (items, init, setFn) => {
  const [isDropDownShow, setIsDropDownShow] = useState<boolean>(false);
  const initValue = items.filter((item) => item === init)[0];
  const [selectedValue, setSelectedValue] = useState<string>(initValue);
  const handleDropDown = () => {
    setIsDropDownShow((prev) => !prev);
  };
  const handleCurrntIndex = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { target } = e;
    setIsDropDownShow((prev) => !prev);
    setSelectedValue((target as HTMLButtonElement).value);
    setFn((target as HTMLButtonElement).value);
  };
  return {
    isDropDownShow,
    selectedValue,
    handleDropDown,
    handleCurrntIndex,
  };
};
