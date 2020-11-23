// pages/author/[slug].js
import Head from "next/head";
import Link from "next/link";
import styles from "..//../styles/Authors.module.css";
import { getAllAuthorSlugs, getAuthorBySlug } from "../../lib/api";
import Header from "../../components/header";
import PostContainer from "../../components/post-container";

function Authors({ author }) {
  return (
    <div>
      <Head>
        <title key={author.name}>{author.name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header title={author.name} />
          <h2 className={styles.home}>
            <Link href={`/`}>🏠 Home</Link>
          </h2>
        </div>
        <div className={styles.author_bio}>
          <img
            width={250}
            height={300}
            src={`https://images.takeshape.io/${author.photo.path}`}
            alt={author.name}
          />
          <div className={styles.body}>
            <main dangerouslySetInnerHTML={{ __html: author.biographyHtml }} />
          </div>
        </div>
        <div className={styles.posts}>
          <div className={styles.posts_title}>Posts by {author.name}</div>
          <div className={styles.posts_body}>
            {author.postSet.items.map((post) => (
              <PostContainer
                key={post._id}
                title={post.title}
                slug={post.slug}
                deck={post.deck}
                date={post._createdAt}
                tags={post.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const allAuthors = await getAllAuthorSlugs();
  const paths = allAuthors.map((author) => ({
    params: { slug: author.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const author = await getAuthorBySlug(params.slug);

  return {
    props: {
      author,
    },
  };
}

export default Authors;
