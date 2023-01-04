import { useState } from "react";
export const useModalMap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return{
    isModalOpen,showModal, closeModal
  }
}