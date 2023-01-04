import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { VILLAGE } from "../util/constValue"
import Weather from "../components/Weather"
import styled from "styled-components"
import { CommonContainer } from "../style"
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useMouseOver } from "../hook/useMouseOver"
const MainPage = () => {
  const weatherKey = process.env.REACT_APP_WEATHER_KEY
  const {currentVillage, handleMouseOver} = useMouseOver()
  const getWeather = async (name, lat, lon) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`)
    return {
      name,
      data
    }
  }
  const fetchWeather = async () => {
    return await Promise.all(
      VILLAGE.map((villageInfo) =>
        getWeather(villageInfo.name, villageInfo.lat, villageInfo.lon)
      )
    )
  }

  const { data, isLoading } = useQuery(
    ['weather'], fetchWeather
  )
  if (isLoading) {
    return <div>로딩 중</div>
  }
  return (
    <CommonContainer>
      <Comment>놀러 가기 전 날씨 부터 확인!</Comment>
      <MapLayout>
        <Map
          center={{ lat: 35.189, lng: 129.07573898218627 }}
          style={{ width: "100%", height: "360px" }}
          level={9}
        >
          {VILLAGE.map((village, idx) =>
            <>
              <CustomOverlayMap
                position={{ lat: `${village.lat}`, lng: `${village.lon}` }}
                yAnchor={1}
              >
                <div className="customoverlay">
                <MapSpan className="title" onMouseOver={()=>handleMouseOver(village.name)} currentVillage={currentVillage} name={village.name}>{village.name}</MapSpan>
                </div>
              </CustomOverlayMap>
            </>
          )}
        </Map>
      </MapLayout>
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
`

const MapLayout = styled.div`
  width:100%;
  height:100%;

`
const MapSpan =styled.span`
    background-color : ${(props)=>props.currentVillage === props.name ? 'darkslategrey' : 'white'};
    color :  ${(props)=>props.currentVillage === props.name ? 'white' : 'black'};
    padding: 5%;
    border-radius: 10px;
    transition : 0.3s;
`
export default MainPage