import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/Card";
import Pagination from '../components/Pagination';
import {filterRestaurant, getRestaurant} from '../redux/restaurantReducer'
import { usePagination } from '../hook/usePagination';
import { CommonContainer } from '../style';
import { useEffect } from 'react';
import DropDown from '../components/DropDown';
import { useModalMap } from '../hook/useModalMap';
import MapModal from '../components/MapModal';
import LoadingSpinner from '../components/LoadingSpinner'

const Restaurant = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getRestaurant())
    },[dispatch])
    const {page, setPage, offset} = usePagination()
    const {isModalOpen,showModal, closeModal, latProps, lonProps,name,  villageName}  = useModalMap()
    const state = useSelector((state) => state.restaurantReducer)
    const { status, restaurantList, filteredRestaurant, currentFilter } = state
    const handleFilter = (e) => {
        dispatch(filterRestaurant({restaurantList, option : e}))
    }
    if (status==='Loading') {
        return <CommonContainer><LoadingSpinner/></CommonContainer>
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
            {isModalOpen && <MapModal closeModal={closeModal} latProps={latProps} lonProps={lonProps} name={name} villageName={villageName} />}
        </CommonContainer>
    )
}


export default Restaurant