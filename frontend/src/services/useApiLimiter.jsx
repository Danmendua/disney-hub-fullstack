import { useEffect, useState } from "react";

const MAX_REQUESTS = 150;
const TIME_LIMIT = 10 * 60 * 1000;

export function useApiLimiter(endpoint, fetchFunction, cachedData) {
  const [data, setData] = useState(cachedData || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (cachedData) {
        setData(cachedData);
        return;
      }

      const now = Date.now();
      const requests = JSON.parse(localStorage.getItem("apiRequests")) || [];
      const recentRequests = requests.filter(
        (timestamp) => now - timestamp < TIME_LIMIT
      );

      if (recentRequests.length >= MAX_REQUESTS) {
        setError("Limite de requisições atingido. Tente novamente mais tarde.");
        return;
      }

      try {
        const response = await fetchFunction();
        setData(response.data);

        recentRequests.push(now);
        localStorage.setItem("apiRequests", JSON.stringify(recentRequests));
      } catch (err) {
        setError("Erro ao buscar dados. Tente novamente.");
      }
    };

    fetchData();
  }, [cachedData, endpoint, fetchFunction]);

  return { data, error };
}
