import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { featchPost } from "../api/index";
import AppContext from "../contexts/AppContext";

export const useFetchPosts = function useFetchPosts() {
  const { setItem } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isCanceled = false;
    featchPost().then((newPosts) => {
      if (!isCanceled) {
        setItem(newPosts);
        setPosts(newPosts);
        setLoading(false);
      }
    });

    return () => {
      isCanceled = true;
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => onRefresh(), 30000);

    return () => {
      clearInterval(interval);
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
