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
import Footer from './components/Footer';

const serviceKey = process.env.REACT_APP_SERVICE_KEY
function App() {
  const state = useSelector((state)=> state.themeReducer)
  const themeObject = state.theme === 'light' ? lightTheme : darkTheme;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRestaurantData = async() => {
      return await axios
        .get('http://localhost:8000/restaurant',{
        })
        .then((res) => {
          console.log(res.data)
          dispatch(fetchRestaurant(res.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
    const fetchFestivalData = async() => {
      return await axios
        .get(`http://localhost:8000/festival`,{
        })
        .then((res) => {
          console.log(res.data)
          dispatch(fetchFestival(res.data))
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
          {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
