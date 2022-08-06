import { useSelector } from 'react-redux';
import Card from "../components/Card"

const Festival = () => {
    const state = useSelector((state) => state.festivalReducer)
    const { festivalList, wishFestivalList } = state
    return (
        <div>
            {festivalList.map((data) => <Card data={data} key={data.UC_SEQ}/> )}
        </div>
    )
}

export default Festival