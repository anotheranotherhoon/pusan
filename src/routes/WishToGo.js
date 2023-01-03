import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaceFilter from "../components/PlaceFilter";
import Card from "../components/Card"
import Pagination from "../components/Pagination";
import { dbService } from "../fbase";
import { doc,collection, deleteDoc, getDocs} from "firebase/firestore";
import { useEffect} from 'react';
import {fetchWish, filterWish} from '../redux/wishToGoReducer'
import {CommonContainer} from '../style'


const WishToGo = () => {
    const dispatch = useDispatch()
    const email = useSelector((state) => state.persistedReducer.authReducer.email)
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const state = useSelector((state) => state.wishToGoReducer)
    const { wishToGoList,filteredWishToGoList, optionWish} = state

    useEffect(()=> {
        const fetchFromFireStore = async() => {
            const wishList = []
            const querySnapshot = await getDocs(collection(dbService,email));
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                data.docId = doc.id
                wishList.push(data)
            })
            dispatch(fetchWish(wishList))
        }
        fetchFromFireStore()
    },[dispatch,email])
    const handleDelete = async(e) => {
        const okDelete = window.confirm('정말로 삭제하시겠습니까?')
        if(okDelete) {
            await deleteDoc(doc(dbService, email, e.docId));
        }
    }
    const handleFilter = (event) => {
        dispatch(filterWish({wishToGoList, option : event.target.value}))
    }
    return(
        <CommonContainer>
            <PlaceFilter option={optionWish} handleFilter={handleFilter}/>
            {filteredWishToGoList.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ} handleDelete={handleDelete} wish={true}/> )}
            <footer>
                <Pagination
                    total={filteredWishToGoList.length}
                    limit={15}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </CommonContainer>
    )
}

export default WishToGo