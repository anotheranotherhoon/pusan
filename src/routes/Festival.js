import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFestival } from '../api/getFestival';
import Card from "../components/Card"
import Pagination from '../components/Pagination';
import PlaceFilter from '../components/PlaceFilter';
import { usePagination } from '../hook/usePagination';
import { fetchFestival, filterFestival } from '../redux/festivalReducer';
import {CommonContainer} from '../style'

const Festival = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        getFestival().then((res)=>dispatch(fetchFestival(res)))
    },[dispatch])
    const {page, setPage, offset} = usePagination()
    const state = useSelector((state) => state.festivalReducer)
    const { festivalList, filteredFestival,optionFestival } = state
    const handleFilter = (event) => {
        dispatch(filterFestival({festivalList, option : event.target.value}))
    }
    
    return (
        <CommonContainer>
            <PlaceFilter option={optionFestival} handleFilter={handleFilter}/>
            {filteredFestival.slice(offset, offset + 10).map((data,key) => <Card data={data} key={data.UC_SEQ}/> )}
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