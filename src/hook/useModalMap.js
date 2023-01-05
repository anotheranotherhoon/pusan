import { set } from "firebase/database";
import { useState } from "react";
export const useModalMap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [latProps, setLatProps] = useState('')
  const [lonProps, setLonProps] = useState('')
  const [name, setName] = useState('')
  const showModal = (latParam, lonParam, nameParam) => {
    setIsModalOpen(true)
    setLatProps(latParam)
    setLonProps(lonParam)
    setName(nameParam)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return{
    isModalOpen,showModal, closeModal, latProps, lonProps, name
  }
}