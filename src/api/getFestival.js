import axios from "axios"

export const getFestival = async() => {
  if('caches' in window){
    const cacheStorage = await caches.open('festival')
    const cachedResponse = await cacheStorage.match('festival')
    console.log(cachedResponse)
    if(!cachedResponse || !cachedResponse.ok){
      const {data} = await axios.get('http://localhost:8000/festival')
      cacheStorage.put('festival', new Response(JSON.stringify(data)))
      return data
    }
    const cached = await cachedResponse?.json()
    return cached
  }
  return []
}

