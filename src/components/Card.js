import { useSelector } from "react-redux"
import styled from "styled-components";
import { AddWishList } from "../hook/AddWishList";

const Card = (props) => {
    const {email} = useSelector((state) => state.persistedReducer.authReducer)
    const {wishToGoList} = useSelector((state) => state.wishToGoReducer)
    return(
        <CardLi key={props.data.UC_SEQ} >
            <CardImg src={props.data.MAIN_IMG_THUMB} alt={props.data.MAIN_TITLE}/>
            <CardWrapper>
                <CardTitle>{props.data.TITLE}</CardTitle>
                <p>{props.data.ADDR1}</p>
                <CardP>{props.data.ITEMCNTNTS}</CardP>
            </CardWrapper>
            {props.wish ? <CardBtn onClick={()=>props.handleDelete(props.data)}>삭제하기</CardBtn>
            :
            <CardBtn onClick={()=>AddWishList(email, wishToGoList, props.data)}>가고 싶다</CardBtn>}
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
const CardTitle = styled.p`
    font-size : 25px;
    font-weight: bold;
    margin-bottom: 20px;
`

export default Card;