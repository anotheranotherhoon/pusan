import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFestival } from '../api/getFestival';
import Card from "../components/Card"
import Pagination from '../components/Pagination';
import { usePagination } from '../hook/usePagination';
import { fetchFestival, filterFestival } from '../redux/festivalReducer';
import {CommonContainer} from '../style'
import DropDown from '../components/DropDown';
const Festival = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        getFestival().then((res)=>dispatch(fetchFestival(res)))
    },[dispatch])
    const {page, setPage, offset} = usePagination()
    const state = useSelector((state) => state.festivalReducer)
    const { festivalList, filteredFestival,optionFestival, currentFilter } = state
    const handleFilter = (e) => {
        dispatch(filterFestival({festivalList, option : e}))
    }
    
    return (
        <CommonContainer>
            <DropDown  handleFilter={handleFilter} init={currentFilter}/>
            {filteredFestival.slice(offset, offset + 10).map((data,key) => <Card info={data} key={data.UC_SEQ}/> )}
            <footer>
                <Pagination
                    total={filteredFestival.length}
                    limit={15}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </CommonContainer>
    )
}

export default Festival