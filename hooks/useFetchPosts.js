import { useState, useEffect, useRef, useContext } from "react";
import { featchPost } from "../api/index";
import AppContext from "../contexts/AppContext";

export function useFetchPosts() {
  const { item, setItem } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    featchPost().then((newPosts) => {
      setItem(newPosts);
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
    setItem(newPosts);
    setPosts(newPosts);
    setRefreshing(false);
  }

  return { isLoading, posts, onRefresh, isRefreshing };
}
