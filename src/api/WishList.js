import { collection, getDocs } from "firebase/firestore"
import { dbService } from "../fbase"
import { doc, deleteDoc} from "firebase/firestore";

export const getWishList = async(email) => {
  const wishList = []
  const querySnapshot =  await getDocs(collection(dbService, email))
  querySnapshot.forEach((doc) => {
    let data = doc.data()
    wishList.push(data)
})
return wishList
}

export const deleteWishListItem = async({email, docId}) => {
  const okDelete = window.confirm('정말로 삭제하시겠습니까?')
  if (okDelete) {
      await deleteDoc(doc(dbService, email, docId));
  }
}