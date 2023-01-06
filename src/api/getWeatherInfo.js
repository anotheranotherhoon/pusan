import axios from "axios"
import { VILLAGE } from "../util/constValue"

export const getWeatherInfo = async (name, lat, lon) => {
  const weatherKey = process.env.REACT_APP_WEATHER_KEY
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`)
  return {
    name,
    data
  }
}
export const fetchWeather = async () => {
  return await Promise.all(
    VILLAGE.map((villageInfo) =>
    getWeatherInfo(villageInfo.name, villageInfo.lat, villageInfo.lon)
    )
  )
}