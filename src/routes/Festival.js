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
    const {token, isLoggedIn, email} = tokenState
    const { festivalList, filteredFestival, wishFestivalList, optionFestival } = state
    const stateWish = useSelector((state) => state.wishToGoReducer)
    const {wishToGoList} = stateWish
    const handleFilter = (event) => {
        dispatch(filterFestival({festivalList, option : event.target.value}))
    }
    const handleWish = async(data) => {
        const check = wishToGoList.filter((el)=>el.UC_SEQ === data.UC_SEQ)
        
        if(check.length>0){
            alert("이미 저장한 축제입니다.")
            return
        }
        await addDoc(collection(dbService, email),{
            UC_SEQ : data.UC_SEQ,
            MAIN_IMG_THUMB : data.MAIN_IMG_THUMB,
            MAIN_TITLE : data.MAIN_TITLE,
            ITEMCNTNTS : data.ITEMCNTNTS,
            GUGUN_NM: data.GUGUN_NM
        })
    }
    
    return (
        <FestivalContainer>
            <PlaceFilter option={optionFestival} handleFilter={handleFilter}/>
            {filteredFestival.slice(offset, offset + 10).map((data,key) => <Card data={data} key={data.UC_SEQ} handleWish={handleWish}/> )}
            <footer>
                <Pagination
                    total={filteredFestival.length}
                    limit={15}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </FestivalContainer>
    )
}

export default Festival