import styles from "./NFTCard.module.scss";

const NFTCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src="" alt="" />
      </div>
      <div className={styles.info}>
        <p className={styles.id}>
          <span>#AMKD234KJ97S</span>
        </p>
        <p className={styles.organization}>Flipkart</p>
        <p className={styles.mindtedOn}>Minted on: 11/07/2022</p>
        <p className={styles.expiresIn}>
          Expires in : <span>17 days</span>
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
