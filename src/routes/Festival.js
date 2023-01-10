import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/Card"
import Pagination from '../components/Pagination';
import { usePagination } from '../hook/usePagination';
import { filterFestival, getFestival } from '../redux/festivalReducer';
import {CommonContainer} from '../style'
import DropDown from '../components/DropDown';
import { useModalMap } from '../hook/useModalMap';
import MapModal from '../components/MapModal';
const Festival = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getFestival())
    },[dispatch])
    const {page, setPage, offset} = usePagination()
    const {isModalOpen,showModal, closeModal, latProps, lonProps, name, villageName}  = useModalMap()
    const state = useSelector((state) => state.festivalReducer)
    const { festivalList, filteredFestival, currentFilter } = state
    const handleFilter = (e) => {
        dispatch(filterFestival({festivalList, option : e}))
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