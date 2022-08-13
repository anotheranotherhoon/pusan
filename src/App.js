import {useDispatch, useSelector } from 'react-redux';
import { fetchRestaurant } from './redux/restaurantReducer'
import { fetchFestival } from './redux/festivalReducer'
import { useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './theme/GlobalStyle';
import Router from './Router';
import Nav from './components/Nav';
import Title from './components/Title'
import ScrollToTop from './components/ScrollToTop';
import { darkTheme, lightTheme } from './theme/theme';

const serviceKey = process.env.REACT_APP_SERVICE_KEY
function App() {
  const state = useSelector((state)=> state.themeReducer)
  const themeObject = state.theme === 'light' ? lightTheme : darkTheme;
  console.log(themeObject)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRestaurantData = async() => {
      return await axios
        .get(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${serviceKey}&resultType=json&numOfRows=149`,{
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
        .get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=aq8sYaH34Y%2BsCLkpFAAApTVKwdrQx1uzzu20XopOisJqIeZ0daJUTV6xBr2D061DFF41yMuVZvge2kcn6%2FfbMA%3D%3D&resultType=json&numOfRows=30`,{
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
      <GlobalStyle theme={themeObject}/>
          <Title />
          <Nav/>
          <ScrollToTop/>
          <Router />
    </BrowserRouter>
  );
}

export default App;
