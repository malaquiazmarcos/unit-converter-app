import styles from './ScrollButton.module.css';

const ScrollButton = () => {
  return (
    <button
      className={styles.scrollButton}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
};

export default ScrollButton;