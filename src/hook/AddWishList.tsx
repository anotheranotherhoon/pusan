import { collection,addDoc } from "@firebase/firestore";
import { dbService } from "../fbase";
import type {FestivalInfoType} from '../redux/festivalReducer' ;
import type {RestaurantInfoType} from '../redux/restaurantReducer'

export interface WishToGoListType{
  ADDR1 : string;
  GUGUN_NM : string;
  ITEMCNTNTS : string;
  LAT : number;
  LNG : number;
  MAIN_IMG_THUMB : string;
  MAIN_TITLE : string;
  TITLE : string;
  UC_SEQ : number;
  docId : string
}

interface AddWishListParams{
  (email : string, wishToGoList : WishToGoListType[] , data : FestivalInfoType | RestaurantInfoType) : void
}

export const AddWishList : AddWishListParams = async(email, wishToGoList, data) => {
  if(wishToGoList){
    const check = wishToGoList.filter((el : WishToGoListType)=>el.UC_SEQ === data.UC_SEQ)
    if(check.length>0){
      return alert('이미 저장했습니다.')
    }
    await addDoc(collection(dbService, email),{
      UC_SEQ : data.UC_SEQ,
      MAIN_IMG_THUMB : data.MAIN_IMG_THUMB,
      ADDR1 : data.ADDR1,
      MAIN_TITLE : data.MAIN_TITLE,
      TITLE : data.TITLE,
      ITEMCNTNTS : data.ITEMCNTNTS,
      GUGUN_NM : data.GUGUN_NM,
      LAT : data.LAT,
      LNG : data.LNG
  })
  window.alert('위시리스트에 추가하였습니다!')
  }
}