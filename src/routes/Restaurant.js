import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/Card";
import Pagination from '../components/Pagination';
import PlaceFilter from '../components/PlaceFilter';
import {filterRestaurant} from '../redux/restaurantReducer'

const Restaurant = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const state = useSelector((state) => state.restaurantReducer)
    const { restaurantList, filteredRestaurant, wishRestaurantList,optionRestaurant } = state
    const handleFilter = (event) => {
        dispatch(filterRestaurant({restaurantList, option : event.target.value}))
    }
    return (
        <div>
            <PlaceFilter option={optionRestaurant} handleFilter={handleFilter}/>
            {restaurantList.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ}/>)}
            <footer>
                <Pagination
                    total={restaurantList.length}
                    limit={10}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </div>
    )
}

export default Restaurant