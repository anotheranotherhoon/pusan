import { useState } from "react";

interface shoModalParams {
  (
    latParam: number,
    lonParam: number,
    nameParam: string,
    villageParam: string
  ): void;
}

export const useModalMap = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [latProps, setLatProps] = useState<number>(0);
  const [lonProps, setLonProps] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [villageName, setVillageName] = useState<string>("");

  const showModal: shoModalParams = (
    latParam,
    lonParam,
    nameParam,
    villageParam
  ) => {
    setIsModalOpen(true);
    setLatProps(latParam);
    setLonProps(lonParam);
    setName(nameParam);
    setVillageName(villageParam);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return {
    isModalOpen,
    showModal,
    closeModal,
    latProps,
    lonProps,
    name,
    villageName,
  };
};
