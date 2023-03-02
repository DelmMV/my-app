import { useState, useEffect, useContext, useRef } from "react";
import { featchPost } from "../api/index";
import AppContext from "../contexts/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFetchPosts = function useFetchPosts() {
  const { setItem } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
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

  return { isLoading, posts, onRefresh, isRefreshing };
};

// const fetcher = () => featchPost();
// export function useFetchPostsSwr() {
//   const { data, error } = useSWR(fetcher);
//   console.log(data);
// }
// console.log(fetcher());
