import { ProductsAPIType } from "@/_types/ProductsType";
import styles from "./Comments.module.scss";
import Rating from "@/app/components/layout/Rating";
import { formatDate } from "@/utils/treatDates";

export default function Comments({
  comments,
}: {
  comments: ProductsAPIType["reviews"];
}) {
  return (
    <section className={styles.comments}>
      {comments.map((comment) => (
        <div
          className={styles.comment}
          key={comment.reviewerName + comment.comment}
        >
          <div className={styles.comment_header}>
            <div className={styles.header_name}>
              <p>{comment.reviewerName}</p>
            </div>
            <div className={styles.header_date}>
              <p>{formatDate(comment.date)}</p>
            </div>
          </div>
          <div className={styles.comment_rating}>
            <Rating count={comment.rating} rate={comment.rating} />
          </div>
          <div className={styles.comment_text}>{comment.comment}</div>
        </div>
      ))}
    </section>
  );
}
