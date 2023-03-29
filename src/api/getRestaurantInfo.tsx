import axios from "axios";

export const getRestaurantInfo = async () => {
  const ServiceKey = decodeURIComponent(
    process.env.REACT_APP_SERVICE_KEY as string
  );
  if ("caches" in window) {
    const cacheStorage = await caches.open("restaurant");
    const cachedResponse = await cacheStorage.match("restaurant");
    if (!cachedResponse || !cachedResponse.ok) {
      const response = await axios.get(
        "https://apis.data.go.kr/6260000/FoodService/getFoodKr?",
        {
          params: {
            resultType: "json",
            numOfRows: "149",
            serviceKey: ServiceKey,
          },
        }
      );
      const data = response.data.getFoodKr.item;
      cacheStorage.put("restaurant", new Response(JSON.stringify(data)));
      return data;
    }
    const cached = await cachedResponse?.json();
    return cached;
  }
  return [];
};
