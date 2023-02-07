import styled from "styled-components"
import { convertFahToCel } from "../util/convertFn"

interface weatherDataType {
  name : string;
  temp : number;
  icon : string;
}

interface WeatherProps {
  weatherData: weatherDataType;
  currentVillage : string;
  handleMouseOver ?: (village : string ) => void
}

const Weather = ({ weatherData, currentVillage, handleMouseOver } : WeatherProps) => {
  const CELSIUS = convertFahToCel(weatherData.temp)
  return (
    <WeatherContainer currentVillage={currentVillage} name={weatherData.name} onMouseOver={() => handleMouseOver?.(weatherData.name)}>
      <section>
        <div className="village">{weatherData.name}</div>
        <div>현재 기온 {CELSIUS}</div>
      </section>
      <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt={weatherData.name} />
    </WeatherContainer>
  )
}

interface WeatherContinerProps {
  currentVillage : string;
  name : string;
}

const WeatherContainer = styled.section<WeatherContinerProps>`
  display:flex;
  padding: 5px;
  transition : 0.3s;
  background-color :  ${(props)=>props.theme.theme==='light' ? props.currentVillage === props.name ? 'darkslategrey' : 'white'  : props.currentVillage === props.name ? 'darkslategrey' : 'navy'} ;
  color :  ${(props)=>props.theme.theme==='light' ? props.currentVillage === props.name ? 'white' : 'black'  : 'grey'} ;
  border-radius: 10px;
  .village{
    font-size: 1.3rem;
    margin-bottom: 5px;
  }
  section{
    margin-left: 10px;
  }
  img{
    margin-left: auto;
  }
`

export default Weather