// pages/index.js
import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import PostContainer from "../components/post-container";
import { getAllPosts } from "../lib/api";
import { useRouter } from "next/router";

export default function Home({ posts }) {
  const [post, setPost] = useState(posts);
  const [direction, setDirection] = useState("desc");
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    await e.preventDefault();
    await router.push({ pathname: "/search", query: { query } });
  };

  const setValueAndOrder = async (e) => {
    await e.preventDefault();
    if (direction == "asc") {
      const res = await getAllPosts("desc");
      await setPost(res);
      await setDirection("desc");
    }
    if (direction == "desc") {
      const res = await getAllPosts("asc");
      await setPost(res);
      await setDirection("asc");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TakeShape Blog with NextJS</title>
      </Head>
      <Header title="TakeShape Blog with NextJS" />
      <div className={styles.sort}>
        <button onClick={setValueAndOrder}>
          Sort - Current Order {direction.toLocaleUpperCase()}
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Search for Posts ...    "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      {post.length > 0 &&
        post.map((post) => (
          <PostContainer
            key={post._id}
            title={post.title}
            slug={post.slug}
            author={post.author}
            deck={post.deck}
            date={post._createdAt}
            tags={post.tags}
          />
        ))}
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
