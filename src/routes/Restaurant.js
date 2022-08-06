import { useSelector } from 'react-redux';
import Card from "../components/Card"
const Restaurant = () => {
    const state = useSelector((state) => state.restaurantReducer)
    const { restaurantList, wishRestaurantList } = state
    return (
        <div>
            {restaurantList.map((data) => <Card data={data} key={data.UC_SEQ}/>)}
        </div>
    )
}

export default Restaurant