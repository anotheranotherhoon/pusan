import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/Card";
import Pagination from '../components/Pagination';
import PlaceFilter from '../components/PlaceFilter';
import {filterRestaurant} from '../redux/restaurantReducer'
import { usePagination } from '../hook/usePagination';
import { CommonContainer } from '../style';

const Restaurant = () => {
    const dispatch = useDispatch();
    const {page, setPage, offset} = usePagination()
    const state = useSelector((state) => state.restaurantReducer)
    const { restaurantList, filteredRestaurant,optionRestaurant } = state
    const handleFilter = (event) => {
        dispatch(filterRestaurant({restaurantList, option : event.target.value}))
    }
    return (
        <CommonContainer>
            <PlaceFilter option={optionRestaurant} handleFilter={handleFilter}/>
            {filteredRestaurant.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ} />)}
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