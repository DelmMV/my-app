import { useState, useEffect } from "react";
import { fetchPictureId } from "../api/index";

export function useFetchhPictureId(id) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [pictureId, setPictureId] = useState([]);

  useEffect(() => {
    fetchPictureId(id).then((pictureId) => {
      setPictureId(pictureId);
      setLoading(false);
    });
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    const pictureId = await fetchPictureId(id);
    setPictureId(pictureId);
    setRefreshing(false);
  }

  return { isLoading, pictureId, onRefresh, isRefreshing };
}
