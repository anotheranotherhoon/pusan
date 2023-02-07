import { collection, getDocs } from "firebase/firestore"
import { dbService } from "../fbase"
import { doc, deleteDoc} from "firebase/firestore";

interface WishDataType {
  ADDR1 : string;
  GUGUN_NM : string;
  ITEMCNTNTS : string;
  LAT : number;
  LNG : number;
  MAIN_IMG_THUMB : string;
  MAIN_TITLE : string;
  UC_SEQ : number;
  TITLE : string;
  docId ?: string
}

interface GetWishListType {
  (email : string) : Promise<WishDataType[]>
}



export const getWishList : GetWishListType = async(email) => {
  const wishList :  WishDataType[]= []
  const querySnapshot =  await getDocs(collection(dbService, email))
  querySnapshot.forEach((doc) => {
    let data : any = doc.data()
    data.docId = doc.id
    wishList.push(data)
})
return wishList
}



interface DeleteParams{
  email : string;
  docId : string
}

export const deleteWishListItem  = async({email, docId} : DeleteParams) => {
  const okDelete = window.confirm('정말로 삭제하시겠습니까?')
  if (okDelete) {
      await deleteDoc(doc(dbService, email, docId));
  }
}