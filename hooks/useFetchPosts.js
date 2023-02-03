import { useState, useEffect, useContext, useRef } from "react";
import { featchPost } from "../api/index";
import AppContext from "../contexts/AppContext";

export const useFetchPosts = function useFetchPosts() {
  const { setItem } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    featchPost().then((newPosts) => {
      setItem(newPosts);
      setPosts(newPosts);
      setLoading(false);
    });
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    const newPosts = await featchPost();
    setItem(newPosts);
    setPosts(newPosts);

    setRefreshing(false);
  }

  return { isLoading, posts, onRefresh, isRefreshing };
};
