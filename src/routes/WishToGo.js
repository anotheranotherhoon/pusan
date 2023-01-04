import { useSelector } from "react-redux";
import Card from "../components/Card"
import Pagination from "../components/Pagination";
import { CommonContainer } from '../style'
import { useQuery } from "@tanstack/react-query"
import { getWishList } from "../api/WishList";
import styled from "styled-components";
import { usePagination } from "../hook/usePagination";

const WishToGo = () => {
    const { email } = useSelector((state) => state.persistedReducer.authReducer)
    const {page, setPage, offset} = usePagination()
    const { data, isLoading } = useQuery(
        ['wishList'], () => getWishList(email)
    )

    if(isLoading){
        return <div>로딩 중</div>
    }
    
    return (
        <CommonContainer>
            <WishList>Wish List</WishList>
            {data.slice(offset, offset + 10).map((data) => <Card info={data} key={data.UC_SEQ} wish={true} />)}
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