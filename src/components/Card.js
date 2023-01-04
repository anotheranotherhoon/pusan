import { useSelector } from "react-redux"
import styled from "styled-components";
import { AddWishList } from "../hook/AddWishList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getWishList } from "../api/WishList";
import { deleteWishListItem } from "../api/WishList";
const Card = ({info, wish}) => {
    const {email} = useSelector((state) => state.persistedReducer.authReducer)
    const {wishToGoList} = useSelector((state) => state.wishToGoReducer)
    const { data, isLoading } = useQuery(
        ['wishList'], () => getWishList(email)
    )
    const isInWishList = isLoading ? []: data.filter((el)=>el.UC_SEQ === info.UC_SEQ).length
    const queryClient = useQueryClient()
    const {mutate} = useMutation(deleteWishListItem,{
        onSuccess : () => queryClient.invalidateQueries(['wishList'])
    })
    return(
        <CardLi key={info.UC_SEQ} >
            <CardImg src={info.MAIN_IMG_THUMB} alt={info.MAIN_TITLE}/>
            <CardWrapper>
                <CardTitle>{info.TITLE}</CardTitle>
                <p>{info.ADDR1}</p>
                <CardP>{info.ITEMCNTNTS}</CardP>
            </CardWrapper>
            {wish ?
            <CardBtn onClick={()=>mutate({
                email, 
                docId :info.docId
            })}>삭제하기</CardBtn>
            :
            isInWishList ?
            <IsInWishList className="isInWishList">저장 완료!</IsInWishList>
            :
            <CardBtn onClick={()=>AddWishList(email, wishToGoList, info)}>가고 싶다</CardBtn>
            }
        </CardLi>
    )
}

const CardLi = styled.li`
    display:flex;
    width: 100%;
    margin-bottom: 1.5em;
`
const CardImg = styled.img`
    width:200px;
    height:200px;
    margin : 0 0.5em ;
`
const CardP = styled.p`
    margin-top: 20px;
    height: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-line;
`
const CardWrapper = styled.div`
    width: 75%;
`

const CardBtn = styled.button`
    padding: 15px 30px;
    border: none;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    background-color : ${(props) => props.theme.theme === 'light' ? '#77af9c': 'grey'};
    color:${(props) => props.theme.theme === 'light' ? 'white': 'black'};
    transition: 0.3s;
    :hover{
        cursor: pointer;
        transform:scale(1.1);
        background-color : ${(props) => props.theme.theme === 'light' ? '#519d9e': '#D3D3D3'};
    }
`
const IsInWishList = styled.button`
    padding: 15px 30px;
    border: none;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    background-color : ${(props) => props.theme.theme === 'light' ? 'tomato': 'navy'};
    color:${(props) => props.theme.theme === 'light' ? 'white': 'grey'};
    transition: 0.3s;
`

const CardTitle = styled.p`
    font-size : 25px;
    font-weight: bold;
    margin-bottom: 20px;
`

export default Card;