import { useState, useEffect } from "react";
import { fetchPurchase } from "../api/index";

export function useFetchPurchase(id) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [purchase, setPurchase] = useState([]);

  useEffect(() => {
    fetchPurchase(id).then((newPurchase) => {
      setPurchase(newPurchase);
      setLoading(false);
    });
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    const newPurchase = await fetchPurchase(id);
    setPurchase(newPurchase);
    setRefreshing(false);
  }

  return { isLoading, purchase, onRefresh, isRefreshing };
}
