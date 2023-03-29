import axios from "axios";

export const getFestivalInfo = async () => {
  const ServiceKey = decodeURIComponent(
    process.env.REACT_APP_SERVICE_KEY as string
  );
  if ("caches" in window) {
    const cacheStorage = await caches.open("festival");
    const cachedResponse = await cacheStorage.match("festival");
    if (!cachedResponse || !cachedResponse.ok) {
      const response = await axios.get(
        "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?",
        {
          params: {
            resultType: "json",
            numOfRows: "30",
            serviceKey: ServiceKey,
          },
        }
      );
      const data = response.data.getFestivalKr.item;
      cacheStorage.put("festival", new Response(JSON.stringify(data)));
      return data;
    }
    const cached = await cachedResponse?.json();
    return cached;
  }
  return [];
};
