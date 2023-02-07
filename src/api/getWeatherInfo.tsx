import axios from "axios"
import { VILLAGE } from "../util/constValue"

interface GetWeatherInfoParams{
  (name : string, lat : number, lon : number) : Promise<{name : string; temp : number; icon : string}>
}


export const getWeatherInfo : GetWeatherInfoParams  = async (name, lat , lon ) => {
  const weatherKey = process.env.REACT_APP_WEATHER_KEY
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`)
  return {
    name,
    temp : data.main.temp,
    icon : data.weather[0].icon,
  }
}
export const fetchWeather = async () => {
  return await Promise.all(
    VILLAGE.map((villageInfo) =>
    getWeatherInfo(villageInfo.name, villageInfo.lat, villageInfo.lon)
    )
  )
}