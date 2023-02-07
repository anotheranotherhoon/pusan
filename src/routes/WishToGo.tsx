import { useSelector } from "react-redux";
import Card from "../components/CardPage/Card"
import Pagination from "../components/CardPage/Pagination";
import { CommonContainer } from '../style'
import { useQuery } from "@tanstack/react-query"
import { getWishList } from "../api/WishList";
import styled from "styled-components";
import { usePagination } from "../hook/usePagination";
import { useModalMap } from '../hook/useModalMap';
import MapModal from '../components/Map/MapModal';
import { RootState } from "../store";

const WishToGo = () => {
    const { email } = useSelector((state: RootState) => state.persistedReducer.authReducer)
    const { page, setPage, offset } = usePagination()
    const { isModalOpen, showModal, closeModal, latProps, lonProps, name, villageName } = useModalMap()
    const { data } = useQuery(
        ['wishList'], () => getWishList(email),
        {
            suspense : true
        }
    )
    return (
        <CommonContainer>
            <WishList>Wish List</WishList>
            {data &&
                <>
                    {data.slice(offset, offset + 10).map((data) => <Card info={data} key={data.UC_SEQ} wish={true} showModal={showModal} />)}
                    <footer>
                        <Pagination
                            total={data.length}
                            limit={15}
                            page={page}
                            setPage={setPage} />
                    </footer>
                </>}
            {isModalOpen && <MapModal closeModal={closeModal} latProps={latProps} lonProps={lonProps} name={name} villageName={villageName} />}
        </CommonContainer>
    )
}

const WishList = styled.div`
    margin:2rem 0;
    width: 200px;
    color: ${(props) => props.theme.theme === 'light' ? 'black' : 'grey'};
    background-color:  ${(props) => props.theme.theme === 'light' ? 'white' : 'darkslategrey'};
    border: ${(props) => props.theme.theme === 'light' ? '1px solid #77af9c' : '1px solid grey'};
    box-sizing: border-box;
    border-radius: 10px;
    padding: 12px 13px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
`

export default WishToGo