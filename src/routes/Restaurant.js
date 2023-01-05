import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/Card";
import Pagination from '../components/Pagination';
import {fetchRestaurant, filterRestaurant} from '../redux/restaurantReducer'
import { usePagination } from '../hook/usePagination';
import { CommonContainer } from '../style';
import { useEffect } from 'react';
import { getRestaurantInfo } from '../api/getRestaurantInfo';
import DropDown from '../components/DropDown';
import { useModalMap } from '../hook/useModalMap';
import MapModal from '../components/MapModal';

const Restaurant = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        getRestaurantInfo().then((res)=>dispatch(fetchRestaurant(res)))
    },[dispatch])
    const {page, setPage, offset} = usePagination()
    const {isModalOpen,showModal, closeModal, latProps, lonProps, name}  = useModalMap()
    const state = useSelector((state) => state.restaurantReducer)
    const { restaurantList, filteredRestaurant, currentFilter } = state
    const handleFilter = (e) => {
        dispatch(filterRestaurant({restaurantList, option : e}))
    }
    return (
        <CommonContainer>
            <DropDown  handleFilter={handleFilter} init={currentFilter}/>
            {filteredRestaurant.slice(offset, offset + 10).map((data) => <Card info={data} key={data.UC_SEQ} showModal={showModal}/>)}
            <footer>
                <Pagination
                    total={filteredRestaurant.length}
                    limit={15}
                    page={page}
                    setPage={setPage}/>
            </footer>
            {isModalOpen && <MapModal closeModal={closeModal} latProps={latProps} lonProps={lonProps} name={name} />}
        </CommonContainer>
    )
}


export default Restaurant