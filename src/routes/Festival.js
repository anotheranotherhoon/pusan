import { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from "../components/Card"
import Pagination from '../components/Pagination';

const Festival = () => {
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const state = useSelector((state) => state.festivalReducer)
    const { festivalList, wishFestivalList } = state
    return (
        <div>
            {festivalList.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ}/> )}
            <footer>
                <Pagination
                    total={festivalList.length}
                    limit={10}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </div>
    )
}

export default Festival