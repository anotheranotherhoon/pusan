import styled from "styled-components"
import { convertFahtoCel } from "../util/convertFn"

const Weather = ({ weatherData, currentVillage, handleMouseOver }) => {
  const CELSIUS = convertFahtoCel(weatherData.data.main.temp)
  return (
    <WeatherContainer currentVillage={currentVillage} name={weatherData.name} onMouseOver={() => handleMouseOver(weatherData.name)}>
      <section>
        <div className="village">{weatherData.name}</div>
        <div>현재 기온 {CELSIUS}</div>
      </section>
      <img src={`http://openweathermap.org/img/w/${weatherData.data.weather[0].icon}.png`} alt={weatherData.name} />
    </WeatherContainer>
  )
}

const WeatherContainer = styled.section`
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