import axios from "axios"

export const getFestivalInfo = async() => {
  const ServiceKey = process.env.REACT_APP_SERVICE_KEY
  if('caches' in window){
    const cacheStorage = await caches.open('festival')
    const cachedResponse = await cacheStorage.match('festival')
    if(!cachedResponse || !cachedResponse.ok){
      const {data} = await axios.get('/api/6260000/FestivalService/getFestivalKr?',
      {
        params :
        {
            resultType : 'json',
            numOfRows : '30',
            serviceKey : ServiceKey
        }
    })
      cacheStorage.put('festival', new Response(JSON.stringify(data)))
      return data
    }
    const cached = await cachedResponse?.json()
    return cached
  }
  return []
}
