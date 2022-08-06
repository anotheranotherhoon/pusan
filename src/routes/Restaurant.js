import { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from "../components/Card";
import Pagination from '../components/Pagination';

const Restaurant = () => {
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;

    const state = useSelector((state) => state.restaurantReducer)
    const { restaurantList, wishRestaurantList } = state
    return (
        <div>
            {restaurantList.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ}/>)}
            <footer>
                <Pagination
                    total={restaurantList.length}
                    limit={10}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </div>
    )
}

export default Restaurant