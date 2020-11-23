// pages/blog/[slug].js
import Head from "next/head";
import Link from "next/link";
import styles from "..//../styles/Posts.module.css";
import { getAllSlugs, getPostBySlug } from "../../lib/api";
import Header from "../../components/header";

function Posts({ post }) {
  const createdAt = new Date(post._createdAt);

  return (
    <div>
      <Head>
        <title key={post.title}>{post.title}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header title={post.title} />
          <h2 className={styles.home}>
            <Link href={`/`}>🏠 Home</Link>
          </h2>
        </div>

        <div className={styles.info}>
          <div className={styles.author}>
            <Link href={`/author/${post.author.slug}`}>
              <a> By: {post.author.name}</a>
            </Link>
          </div>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <Link key={tag._id} href={`/tag/${tag._id}`}>
                <div className={styles.tag}>{tag.name}</div>
              </Link>
            ))}
          </div>
          <div className={styles.date}> {createdAt.toDateString()}</div>
        </div>

        <div className={styles.body}>
          <main dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllSlugs();
  const paths = allPosts.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
}

export default Posts;
