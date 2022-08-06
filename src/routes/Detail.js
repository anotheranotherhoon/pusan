import { useParams } from 'react-router-dom'


const Detail = () => {
    const params = useParams()
    console.log(params.UC_SEQ)
    return(
        <div>Detail</div>
    )
}

export default Detail