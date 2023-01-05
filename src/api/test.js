import axios from "axios"

export const test = async() => {
  const ServiceKey = process.env.REACT_APP_PUBLIC_PORTAL_KEY
  try{
    const response = await axios.get('/api/festival',
    {
      params :
      {
          resultType : 'json',
          numOfRows : '30',
          serviceKey : ServiceKey
      }
  })
  const data = response.data.getFestivalKr.item
  return(data)
  }catch(error){
    console.log(error)
  }
}