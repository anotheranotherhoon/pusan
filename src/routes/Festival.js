import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/Card"
import Pagination from '../components/Pagination';
import PlaceFilter from '../components/PlaceFilter';
import { filterFestival } from '../redux/festivalReducer';
const Festival = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const state = useSelector((state) => state.festivalReducer)
    const { festivalList, filteredFestival, wishFestivalList, optionFestival } = state
    const handleFilter = (event) => {
        dispatch(filterFestival({festivalList, option : event.target.value}))
    }
    return (
        <div>
            <PlaceFilter option={optionFestival} handleFilter={handleFilter}/>
            {filteredFestival.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ}/> )}
            <footer>
                <Pagination
                    total={filteredFestival.length}
                    limit={10}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </div>
    )
}

export default Festival