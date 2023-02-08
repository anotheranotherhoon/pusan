import { useEffect } from 'react';
import Card from "../components/CardPage/Card"
import Pagination from '../components/CardPage/Pagination';
import { usePagination } from '../hook/usePagination';
import { filterFestival, getFestival } from '../redux/festivalReducer';
import {CommonContainer} from '../style'
import DropDown from '../components/CardPage/DropDown';
import { useModalMap } from '../hook/useModalMap';
import MapModal from '../components/Map/MapModal';
import { useAppDispatch, useAppSelector } from '../hook/reduxHook';
const Festival = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(getFestival())
    },[dispatch])
    const {page, setPage, offset} = usePagination()
    const {isModalOpen,showModal, closeModal, latProps, lonProps, name, villageName}  = useModalMap()
    const state = useAppSelector((state) => state.festivalReducer)
    const { festivalList, filteredFestival, currentFilter } = state
    const handleFilter = (option : string) => {
        dispatch(filterFestival({festivalList, option}))
    }
    
    return (
        <CommonContainer>
            <DropDown  handleFilter={handleFilter} init={currentFilter}/>
            {filteredFestival.slice(offset, offset + 10).map((data) => <Card info={data} key={data.UC_SEQ} showModal={showModal}/> )}
            <footer>
                <Pagination
                    total={filteredFestival.length}
                    limit={15}
                    page={page}
                    setPage={setPage}/>
            </footer>
            {isModalOpen && <MapModal closeModal={closeModal} latProps={latProps} lonProps={lonProps} name={name} villageName={villageName} />}
        </CommonContainer>
    )
}

export default Festival