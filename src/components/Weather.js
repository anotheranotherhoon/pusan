import styled from "styled-components"
import { convertFahtoCel } from "../util/convertFn"

const weather = ({weatherData, currentVillage, handleMouseOver}) => {
  const CELSIUS = convertFahtoCel(weatherData.data.main.temp)
  return(
    <WeatherContainer currentVillage={currentVillage} name={weatherData.name} onMouseOver={()=>handleMouseOver(weatherData.name)}>
      <div>{weatherData.name}</div>
      <div>현재 기온 {CELSIUS}</div>
              <img src={`http://openweathermap.org/img/w/${weatherData.data.weather[0].icon}.png`} alt={weather.name}/>
    </WeatherContainer>
  )
}

const WeatherContainer = styled.section`
  padding: 5px;
  transition : 0.3s;
  background-color : ${(props)=>props.currentVillage === props.name ? 'darkslategrey' : 'white'};
  color :  ${(props)=>props.currentVillage === props.name ? 'white' : 'black'};
`

export default weather