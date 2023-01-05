import axios from "axios"

export const getRestaurantInfo = async() => {
  if('caches' in window){
    const cacheStorage = await caches.open('restaurant')
    const cachedResponse = await cacheStorage.match('restaurant')
    if(!cachedResponse || !cachedResponse.ok){
      const {data} = await axios.get('http://localhost:80/restaurant')
      cacheStorage.put('restaurant', new Response(JSON.stringify(data)))
      return data
    }
    const cached = await cachedResponse?.json()
    return cached
  }
  return []
}