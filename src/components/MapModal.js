import { useRef } from 'react';
import styled from 'styled-components'
import KakaoMap from './KakaoMap'
import { useQuery } from "@tanstack/react-query";
import { getWeatherInfo } from '../api/getWeatherInfo';
import Weather from './Weather'
import LoadingIndicator from './LoadingIndicator';
const MapModal = ({ closeModal, latProps, lonProps, name, villageName }) => {
  const {data, isLoading} = useQuery([villageName], ()=>getWeatherInfo(villageName, latProps, lonProps))
  const modalRef = useRef(null)
  const cllickBackground = (e) => {
    if (modalRef.current === e.target) {
      closeModal()
    }
  }
  if(isLoading){
    return <LoadingIndicator/>
  }
  return (
    <Container>
      <Background ref={modalRef} onClick={cllickBackground} />
      <ModalBox>
        <div>
          <Title>{name}</Title>
          <MapSection>
            <div><a href={`https://map.naver.com/?query=부산+${name}`}>네이버 지도 바로가기</a></div>
            <div><a href={`https://m.map.kakao.com/actions/searchView?q=부산+${name}`}>카카오 지도 바로가기</a></div>
          </MapSection>
          <KakaoMap latProps={latProps} lonProps={lonProps} name={name} />
          <Weather weatherData={data} currentVillage={name}/>
        </div>
      </ModalBox>
    </Container>
  )
}

const Container = styled.div`
    font-size: 2rem;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`
const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background-color: rgba(0,0,0,.85);
    animation: modal-bg-show 0.5s;
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Title = styled.div`
  border-bottom :  2px dashed white;
  margin-bottom: 10px;
  padding:0 0 10px 0;
`

const MapSection = styled.section`
  display:flex;
  margin-top: 5px;
  div{
    width:100%;
    text-align:center;
  }
  a{
    text-decoration:none;
    color: var(--color-black);
  }
`

const ModalBox = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  border-radius: 5px;
  padding: 20px;
  font-size: 15px;
`



export default MapModal