import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import React from "react";
const InfoScreen = () => {
  return (
    <React.Fragment>
      <LoadingLayout>
        <Oval
          height={80}
          width={80}
          color="#5160EA"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#468FF7"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        <div>로딩 중입니다.</div>
      </LoadingLayout>
    </React.Fragment>
  );
};

const LoadingLayout = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  height: 80vh;
  flex-direction: column;
  div {
    margin-top: 5%;
  }
`;

export default InfoScreen;
