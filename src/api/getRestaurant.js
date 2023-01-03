import axios from "axios"

export const getRestaurant = async() => {
  if('caches' in window){
    const cacheStorage = await caches.open('restaurant')
    const cachedResponse = await cacheStorage.match('restaurant')
    if(!cachedResponse || !cachedResponse.ok){
      const {data} = await axios.get('http://localhost:8000/restaurant')
      cacheStorage.put('restaurant', new Response(JSON.stringify(data)))
      return data
    }
    const cached = await cachedResponse?.json()
    return cached
  }
  return []
}