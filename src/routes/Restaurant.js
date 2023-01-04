import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/Card";
import Pagination from '../components/Pagination';
import {fetchRestaurant, filterRestaurant} from '../redux/restaurantReducer'
import { usePagination } from '../hook/usePagination';
import { CommonContainer } from '../style';
import { useEffect } from 'react';
import { getRestaurant } from '../api/getRestaurant';
import DropDown from '../components/DropDown';

const Restaurant = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        getRestaurant().then((res)=>dispatch(fetchRestaurant(res)))
    },[dispatch])
    const {page, setPage, offset} = usePagination()
    const state = useSelector((state) => state.restaurantReducer)
    const { restaurantList, filteredRestaurant, currentFilter } = state
    const handleFilter = (e) => {
        dispatch(filterRestaurant({restaurantList, option : e}))
    }
    return (
        <CommonContainer>
            <DropDown  handleFilter={handleFilter} init={currentFilter}/>
            {filteredRestaurant.slice(offset, offset + 10).map((data) => <Card info={data} key={data.UC_SEQ} />)}
            <footer>
                <Pagination
                    total={filteredRestaurant.length}
                    limit={15}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </CommonContainer>
    )
}


export default Restaurant