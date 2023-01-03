import { collection, getDocs } from "firebase/firestore"
import { dbService } from "../fbase"

export const getWishList = async(email) => {
  const wishList = []
  const querySnapshot =  await getDocs(collection(dbService, email))
  querySnapshot.forEach((doc) => {
    let data = doc.data()
    data.docId = doc.id
    wishList.push(data)
})
return wishList
}