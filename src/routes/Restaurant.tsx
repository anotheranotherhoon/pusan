import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/CardPage/Card";
import Pagination from '../components/CardPage/Pagination';
import {filterRestaurant, getRestaurant} from '../redux/restaurantReducer'
import { usePagination } from '../hook/usePagination';
import { CommonContainer } from '../style';
import { useEffect } from 'react';
import DropDown from '../components/CardPage/DropDown';
import { useModalMap } from '../hook/useModalMap';
import MapModal from '../components/Map/MapModal';
import LoadingSpinner from '../components/Common/LoadingSpinner'
import { AppDispatch, RootState } from '../store';

const Restaurant = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(getRestaurant())
    },[dispatch])
    const {page, setPage, offset} = usePagination()
    const {isModalOpen,showModal, closeModal, latProps, lonProps,name,  villageName}  = useModalMap()
    const state = useSelector((state : RootState) => state.restaurantReducer)
    const { status, restaurantList, filteredRestaurant, currentFilter } = state
    const handleFilter = (option : string) => {
        dispatch(filterRestaurant({restaurantList, option}))
    }
    if (status==='Loading') {
        return <CommonContainer><LoadingSpinner/></CommonContainer>
    }
    return (
        <CommonContainer>
            <DropDown handleFilter={handleFilter} init={currentFilter}/>
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