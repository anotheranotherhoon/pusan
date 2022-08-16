import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Card from "../components/Card"
import Pagination from '../components/Pagination';
import PlaceFilter from '../components/PlaceFilter';
import { dbService } from '../fbase';
import { collection,addDoc } from "@firebase/firestore";
import { filterFestival } from '../redux/festivalReducer';

const FestivalContainer = styled.ul`
    margin-left: 10em;
`

const Festival = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const state = useSelector((state) => state.festivalReducer)
    const tokenState = useSelector((state) => state.authReducer)
    const {token, isLoggedIn} = tokenState
    const { festivalList, filteredFestival, wishFestivalList, optionFestival } = state
    const handleFilter = (event) => {
        dispatch(filterFestival({festivalList, option : event.target.value}))
    }
    const handleWish = async(data) => {
        console.log(data.MAIN_TITLE)
        await addDoc(collection(dbService, token),{
            UC_SEQ : data.UC_SEQ,
            MAIN_IMG_THUMB : data.MAIN_IMG_THUMB,
            MAIN_TITLE : data.MAIN_TITLE,
            ITEMCNTNTS : data.ITEMCNTNTS
        })
    }
    
    return (
        <FestivalContainer>
            <PlaceFilter option={optionFestival} handleFilter={handleFilter}/>
            {filteredFestival.slice(offset, offset + 10).map((data,key) => <Card data={data} key={data.UC_SEQ} handleWish={handleWish}/> )}
            <footer>
                <Pagination
                    total={filteredFestival.length}
                    limit={10}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </FestivalContainer>
    )
}

export default Festival