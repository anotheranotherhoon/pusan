import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaceFilter from "../components/PlaceFilter";
import Card from "../components/Card"
import Pagination from "../components/Pagination";
import { dbService } from "../fbase";
import { doc,collection, deleteDoc, getDocs} from "firebase/firestore";
import { useEffect} from 'react';
import {fetchWish} from '../redux/wishToGoReducer'
import { ref, deleteObject } from "@firebase/storage";

const WishToGo = () => {
    
    //wish
    const tokenState = useSelector((state) => state.authReducer)
    const {token, isLoggedIn, email} = tokenState;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const state = useSelector((state) => state.wishToGoReducer)
    const { wishToGoList} = state

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
    },[email,dispatch,wishToGoList])
    const handleDelete = async(e) => {
        const sayYes = window.confirm('정말로 삭제하시겠습니까?')
        if(sayYes) {
            await deleteDoc(doc(dbService, email, e.docId));
            // await deleteObject(ref(storageService, ))
        }
    }
    return(
        <div>
            <PlaceFilter option={["금정구"]}/>
            {wishToGoList.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ} handleDelete={handleDelete} wish={true}/> )}
            <footer>
                <Pagination
                    total={wishToGoList.length}
                    limit={10}
                    page={page}
                    setPage={setPage}/>
            </footer>
        </div>
    )
}

export default WishToGo