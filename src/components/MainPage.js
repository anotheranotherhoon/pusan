
import { useQuery } from "@tanstack/react-query"
import Weather from "../components/Weather"
import styled from "styled-components"
import { CommonContainer } from "../style"
import { useMouseOver } from "../hook/useMouseOver"
import WeatherMap from "./WeatherMap"
import { fetchWeather } from "../api/getWeatherInfo"
const MainPage = () => {
  const {currentVillage, handleMouseOver} = useMouseOver()
  const { data, isLoading } = useQuery(
    ['weather'], fetchWeather
  )
  if (isLoading) {
    return <div>로딩 중</div>
  }
  return (
    <CommonContainer>
      <Comment>놀러 가기 전 날씨부터 확인!</Comment>
      <WeatherMap currentVillage={currentVillage} handleMouseOver={handleMouseOver}/>
      <GridLayout>
        {data.map((weather) =>
          <Weather weatherData={weather} currentVillage={currentVillage} handleMouseOver={handleMouseOver}/>
        )}
      </GridLayout>
    </CommonContainer>

  )
}

const GridLayout = styled.div`
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  margin : 10px 0;
  gap: 10px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 50%);
    grid-row-gap: 10%;
    padding-bottom: 20%;
  }
  @media screen and (max-width: 413px) {
    grid-template-columns: repeat(1, 100%);
    grid-row-gap: 2.5%;
    padding-bottom: 40%;
  }
`
const Comment = styled.h1`
  font-size: 200%;
  font-weight: bold;
  margin: 100px 0;
  color: 'darkslategrey';
`


export default MainPage