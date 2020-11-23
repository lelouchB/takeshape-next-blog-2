// components/post-container.js
import Link from "next/link";
import styles from "../styles/PostContainer.module.css";

export default function PostContainer({ title, deck, slug, author, date, tags }) {
  const createdDate = new Date(date);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {" "}
        <Link href={`/blog/${slug}`}>{title}</Link>{" "}
      </div>
     {author && (
        <Link href={`/author/${author.slug}`}>
          <div className={styles.author}> {author.name}</div>
        </Link>
       )}
      <div className={styles.date}> {createdDate.toDateString()}</div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Link key={tag._id} href={`/tag/${tag._id}`}>
            <div className={styles.tag}>{tag.name}</div>
          </Link>
        ))}
      </div>
      <div className={styles.deck}>
        <p>{deck}</p>
      </div>
      <div className={styles.read}>
        <Link href={`/blog/${slug}`}>Read More</Link>
      </div>
    </div>
  );
}