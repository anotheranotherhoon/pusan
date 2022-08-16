import styled from "styled-components";

const CardLi = styled.li`
    display:flex;
    margin-bottom: 1.5em;
`
const CardImg = styled.img`
    width:200px;
    height:200px;
    margin : 0 0.5em ;
`
const CardP = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const CardWrapper = styled.div`
    display: flex;
    align-items: center;
`
const Card = (props) => {
    return(
        <CardLi key={props.data.UC_SEQ} >
            <CardImg src={props.data.MAIN_IMG_THUMB} alt={props.data.MAIN_TITLE}/>
                <p>{props.data.MAIN_TITLE}</p>
                <CardP>{props.data.ITEMCNTNTS}</CardP>
                {props.wish ? <button onClick={()=>props.handleDelete(props.data)}>삭제하기</button>
                :
                <button onClick={()=>props.handleWish(props.data)}>추가하기</button>}
        </CardLi>
    )
}

export default Card;