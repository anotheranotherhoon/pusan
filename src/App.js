import { useSelector, useDispatch } from 'react-redux';
import {fetchRestaurant} from './redux/restaurantReducer'
import {fetchFestival} from './redux/festivalReducer'
import { useEffect, useState } from 'react';
import axios from 'axios';
const serviceKey = process.env.REACT_APP_SERVICE_KEY
function App() {
  const state = useSelector((state)=> state.restaurantReducer)
  const {restaurantList, wishRestaurantList} = state
  const stateFest = useSelector((state)=>state.festivalReducer)
  const {festivalList, wishFestivalList} = stateFest
  console.log(restaurantList)
  console.log(festivalList)
  
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchRestaurantData() {
        return axios
        .get(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${serviceKey}&resultType=json&numOfRows=149`)
        .then((res)=>{
          dispatch(fetchRestaurant(res.data.getFoodKr.item))
        })
        .catch((error)=>{
          console.log(error)
        })
    }
    async function fetchFestivalData(){
      return axios
      .get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${serviceKey}&resultType=json&numOfRows=30`)
      .then((res)=>{
        dispatch(fetchFestival(res.data.getFestivalKr.item))
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    fetchRestaurantData()
    fetchFestivalData()
},[dispatch])
  return (
    <div className="App">
    </div>
  );
}

export default App;
