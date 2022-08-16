import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaceFilter from "../components/PlaceFilter";
import Card from "../components/Card"
import Pagination from "../components/Pagination";
import { dbService } from "../fbase";
import { collection, getDocs} from "firebase/firestore";
import { useEffect} from 'react';
import {fetchWish} from '../redux/wishToGoReducer'

const WishToGo = () => {
    
    //wish
    const tokenState = useSelector((state) => state.authReducer)
    const {token, isLoggedIn} = tokenState;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const state = useSelector((state) => state.wishToGoReducer)
    const { wishToGoList} = state

    useEffect(()=> {
        const fetchFromFireStore = async() => {
            const wishList = []
            const querySnapshot = await getDocs(collection(dbService,token));
            querySnapshot.forEach((doc) => {
                wishList.push(doc.data())
            })
            
            dispatch(fetchWish(wishList))
        }
        fetchFromFireStore()
    },[token,dispatch])
    return(
        <div>
            <PlaceFilter option={["금정구"]}/>
            {wishToGoList.slice(offset, offset + 10).map((data) => <Card data={data} key={data.UC_SEQ}/> )}
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