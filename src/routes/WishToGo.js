import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card"
import Pagination from "../components/Pagination";
import { dbService } from "../fbase";
import { doc, deleteDoc} from "firebase/firestore";
import { CommonContainer } from '../style'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getWishList } from "../api/getWishList";
import styled from "styled-components";
import { usePagination } from "../hook/usePagination";

const WishToGo = () => {
    const { email } = useSelector((state) => state.persistedReducer.authReducer)
    const {page, setPage, offset} = usePagination()
    const queryClient = useQueryClient()
    const handleDelete = async (e) => {
        const okDelete = window.confirm('정말로 삭제하시겠습니까?')
        if (okDelete) {
            await deleteDoc(doc(dbService, email, e.docId));
        }
    }
    const { data, isLoading } = useQuery(
        ['wishList'], () => getWishList(email)
    )
    const {mutate} = useMutation(handleDelete,{
        onSuccess : () => queryClient.invalidateQueries(['wishList'])
    })
    if(isLoading){
        return <div>로딩 중</div>
    }
    return (
        <CommonContainer>
            <WishList>Wish List</WishList>
            {data.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ} handleDelete={mutate} wish={true} />)}
            <footer>
                <Pagination
                    total={data.length}
                    limit={15}
                    page={page}
                    setPage={setPage} />
            </footer>
        </CommonContainer>
    )
}

const WishList = styled.div`
    margin:2rem 0;
    width: 200px;
    border: ${(props) => props.theme.theme === 'light' ? '1px solid #77af9c' : '1px solid grey'};
    color: ${(props) => props.theme.theme === 'light' ? '1px solid #77af9c' : '1px solid grey'};
    box-sizing: border-box;
    border-radius: 10px;
    padding: 12px 13px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
`

export default WishToGo