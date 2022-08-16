import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Card from "../components/Card";
import Pagination from '../components/Pagination';
import PlaceFilter from '../components/PlaceFilter';
import { dbService } from '../fbase';
import { collection,addDoc } from "@firebase/firestore";
import {filterRestaurant} from '../redux/restaurantReducer'

const RestaurantContainer = styled.ul`
    margin-left: 10em;
`

const Restaurant = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const state = useSelector((state) => state.restaurantReducer)
    const tokenState = useSelector((state) => state.authReducer)
    const {token, isLoggedIn} = tokenState
    const { restaurantList, filteredRestaurant, wishRestaurantList,optionRestaurant } = state
    const handleFilter = (event) => {
        dispatch(filterRestaurant({restaurantList, option : event.target.value}))
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
        <RestaurantContainer>
            <PlaceFilter option={optionRestaurant} handleFilter={handleFilter}/>
            {filteredRestaurant.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ} handleWish={handleWish}/>)}
            <footer>
                <Pagination
                    total={filteredRestaurant.length}
                    limit={10}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </RestaurantContainer>
    )
}

export default Restaurant