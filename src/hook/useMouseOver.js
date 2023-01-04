import { useState } from "react"

export const useMouseOver = () => {
  const [currentVillage, setCurrentVillage] = useState('null')
  const handleMouseOver = (village) => {
    setCurrentVillage(village)
  }
  return{
    currentVillage,
    handleMouseOver
  }
}