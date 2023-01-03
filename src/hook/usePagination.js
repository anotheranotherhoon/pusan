import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  return{
    page, setPage, offset
  }
}