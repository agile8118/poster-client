import React, { useState, useEffect } from "react";
import axios from "axios";
import InlineLoading from "../reusable/InlineLoading";
import t from "../lib/tokens";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      /** @API call */
      const { data } = await axios.get("/api/posts");
      setPosts(data);
    } catch (e) {
      alert(t.alert.error.default, "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="u-text-center u-margin-top-3">
        <InlineLoading color="gray" />
      </div>
    );
  return (
    <div className="posts-container">
      {posts.map((post) => {
        return (
          <div className="post" key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <span className="post__author">By {post.author}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
