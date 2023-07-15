import { useState, useEffect, useContext, useRef, memo } from "react";
import { featchPost } from "../api/index";
import { featchIntensive } from "../api/fetchIntensive";
import AppContext from "../contexts/AppContext";

function useFetchPosts() {
  const { setItem } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [getIntensive, setGetIntensive] = useState(null);

  const ref = useRef(null);

  useEffect(() => {
    featchPost().then(async (newPosts) => {
      setItem(newPosts);
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
    let isCanceled = false;
    setRefreshing(true);
    const newPosts = await featchPost();
    if (!isCanceled) {
      setItem(newPosts);
      setPosts(newPosts);
      setRefreshing(false);
    }

    return () => {
      isCanceled = true;
    };
  }

  useEffect(() => {
    console.log("fetch intensive");
    featchIntensive().then(async (newIntensive) => {
      setGetIntensive(newIntensive);
    });
  }, [posts]);

  return { isLoading, posts, onRefresh, isRefreshing, getIntensive };
}

export default useFetchPosts;
