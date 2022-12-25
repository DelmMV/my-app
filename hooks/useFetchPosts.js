import { useState, useEffect, useRef } from "react";
import { featchPost } from "../api/index";

export function useFetchPosts() {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    featchPost().then((newPosts) => {
      //setPosts([...newPosts.filter((e) => e.Status === 7)]);
      setPosts(newPosts);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    ref.current = setInterval(onRefresh, 0.5 * 60 * 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    const newPosts = await featchPost();
    //setPosts([...newPosts.filter((e) => e.Status === 7)]);
    setPosts(newPosts);
    setRefreshing(false);
  }

  return { isLoading, posts, onRefresh, isRefreshing };
}
