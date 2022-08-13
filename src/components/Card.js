const Card = (props) => {
    return(
        <div key={props.data.UC_SEQ} >
            <div>{props.data.MAIN_TITLE}</div>
            <div>{props.data.ITEMCNTNTS}</div>
            <img src={props.data.MAIN_IMG_THUMB} alt={props.data.MAIN_TITLE}/>
        </div>
    )
}

export default Card;