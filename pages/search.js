// pages/search.js
import { searchPosts } from "../lib/api";
import Head from "next/head";
import styles from "../styles/Search.module.css";
import Link from "next/link";
import Header from "../components/header";
import PostContainer from "../components/post-container";

export default function Search({ post, searchedQuery }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{searchedQuery}</title>
      </Head>
      <Header title="TakeShape Blog with NextJS" />
      <h2 className={styles.home}>
        <Link href={`/`}>🏠 Home</Link>
      </h2>
      {searchedQuery && (
        <div className={styles.query}>Searched Query: {searchedQuery}</div>
      )}
      {post.length > 0 ? (
        <div className={styles.posts}>
          {" "}
          {post.map((post) => (
            <PostContainer
              post={post}
              key={post._id}
              title={post.title}
              slug={post.slug}
              deck={post.deck}
              author={post.author}
              tags={post.tags}
              date={post._createdAt}
            />
          ))}
        </div>
      ) : (
        <h1>No Results</h1>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const post = await searchPosts(query.query);
  return {
    props: {
      post,
      searchedQuery: query.query,
    },
  };
}