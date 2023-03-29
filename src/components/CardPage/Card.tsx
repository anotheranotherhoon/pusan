import { useSelector } from "react-redux";
import styled from "styled-components";
import { AddWishList } from "../../hook/AddWishList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishList, deleteWishListItem } from "../../api/WishList";
import { RootState } from "../../store";
import type { WishToGoListType } from "../../types/wishToGoListType";

interface CardProps {
  info: any;
  wish?: boolean;
  showModal: (
    latParam: number,
    lonParam: number,
    nameParam: string,
    villageParam: string
  ) => void;
}

const Card = ({ info, wish, showModal }: CardProps) => {
  const { email } = useSelector(
    (state: RootState) => state.persistedReducer.authReducer
  );
  const { data, isLoading } = useQuery(["wishList"], () => getWishList(email), {
    suspense: true,
  });
  const isInWishList = isLoading
    ? []
    : data!.filter((el) => el.UC_SEQ === info.UC_SEQ).length;
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (data: { email: string; docId: string }) => deleteWishListItem(data),
    {
      onSuccess: () => queryClient.invalidateQueries(["wishList"]),
    }
  );

  return (
    <CardLi key={info.UC_SEQ}>
      <Wrapper>
        <CardImg src={info.MAIN_IMG_THUMB} alt={info.MAIN_TITLE} />
        <CardWrapper className="inMobileNone">
          <CardTitle>
            <a
              href={`https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=부산+${info.TITLE}`}
            >
              {info.TITLE}
            </a>
          </CardTitle>
          <p>{info.ADDR1}</p>
          <CardP>{info.ITEMCNTNTS}</CardP>
        </CardWrapper>
        <ButtonWrapper>
          {wish ? (
            <CardBtn onClick={() => mutate({ email, docId: info.docId })}>
              삭제하기
            </CardBtn>
          ) : isInWishList ? (
            <IsInWishList className="isInWishList">저장 완료!</IsInWishList>
          ) : (
            <CardBtn
              onClick={() =>
                AddWishList(email, data as WishToGoListType[], info)
              }
            >
              가고 싶다
            </CardBtn>
          )}
          <CardBtn
            className="map"
            onClick={() =>
              showModal(info.LAT, info.LNG, info.TITLE, info.GUGUN_NM)
            }
          >
            지도 보기
          </CardBtn>
        </ButtonWrapper>
      </Wrapper>
      <CardWrapper className="inWebNone">
        <CardTitle>
          <a
            href={`https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=부산+${info.TITLE}`}
          >
            {info.TITLE}
          </a>
        </CardTitle>
        <p>{info.ADDR1}</p>
        <CardP>{info.ITEMCNTNTS}</CardP>
      </CardWrapper>
    </CardLi>
  );
};

const CardLi = styled.li`
  display: flex;
  width: 100%;
  margin-bottom: 3em;
  height: auto;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    max-height: 2000px;
  }
`;
const Wrapper = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const CardImg = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 0.5em;
`;
const CardP = styled.div`
  margin-top: 20px;
  overflow: scroll;
  line-height: 30px;
  width: 100%;
  height: 75%;
  @media screen and (max-width: 1024px) {
    max-height: 200px;
  }
`;
const CardWrapper = styled.div`
  width: 75%;
  height: 200px;
  &.inWebNone {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    &.inMobileNone {
      display: none;
    }
    &.inWebNone {
      display: block;
    }
  }
`;
const ButtonWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const CardBtn = styled.button`
  padding: 15px 30px;
  border: none;
  width: 120px;
  height: 50px;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  background-color: ${(props) =>
    props.theme.theme === "light" ? "#77af9c" : "grey"};
  color: ${(props) => (props.theme.theme === "light" ? "white" : "black")};
  transition: 0.3s;
  white-space: nowrap;
  margin-right: 5%;
  &.map {
    margin-top: 5px;
  }
  :hover {
    cursor: pointer;
    transform: scale(1.1);
    background-color: ${(props) =>
      props.theme.theme === "light" ? "#519d9e" : "#D3D3D3"};
  }
  @media screen and (max-width: 1024px) {
    margin-left: auto;
  }
`;
const IsInWishList = styled.button`
  padding: 15px 30px;
  border: none;
  width: 120px;
  height: 50px;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  background-color: ${(props) =>
    props.theme.theme === "light" ? "tomato" : "darkslategrey"};
  color: ${(props) => (props.theme.theme === "light" ? "white" : "grey")};
  transition: 0.3s;
  margin-right: 5%;
  @media screen and (max-width: 1024px) {
    margin-left: auto;
  }
`;

const CardTitle = styled.p`
  font-size: 25px;
  font-weight: bold;
  height: 15%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  a {
    text-decoration: none;
    color: ${(props) =>
      props.theme.theme === "light" ? "darkslategrey" : "grey"};
  }
  p {
    height: 10%;
  }
`;

export default Card;
