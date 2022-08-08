import {useDispatch } from 'react-redux';
import { fetchRestaurant } from './redux/restaurantReducer'
import { fetchFestival } from './redux/festivalReducer'
import { useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './context/themeProvider';
import { GlobalStyle } from './theme/GlobalStyle';
import Router from './Router';
import Nav from './components/Nav';
import Title from './components/Title'
import ScrollToTop from './components/ScrollToTop';

const serviceKey = process.env.REACT_APP_SERVICE_KEY

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRestaurantData = async() => {
      return await axios
        .get(`https://pusanohmypusan.herokuapp.com/http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${serviceKey}&resultType=json&numOfRows=149`,{
          headers: {
            'Content-Type': 'application/json'
            }
        })
        .then((res) => {
          dispatch(fetchRestaurant(res.data.getFoodKr.item))
        })
        .catch((error) => {
          console.log(error)
        })
    }
    const fetchFestivalData = async() => {
      return await axios
        .get(`https://pusanohmypusan.herokuapp.com/http://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${serviceKey}&resultType=json&numOfRows=30`,{
          headers: {
            'Content-Type': 'application/json'
            }
        })
        .then((res) => {
          dispatch(fetchFestival(res.data.getFestivalKr.item))
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchRestaurantData()
    fetchFestivalData()
  }, [dispatch])
  return (
    <BrowserRouter>
      <ThemeProvider >
        <GlobalStyle />
        <Title />
        <Nav/>
        <ScrollToTop/>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
