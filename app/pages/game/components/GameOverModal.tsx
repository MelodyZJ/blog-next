import React from "react";
import styles from "./snakeGame.module.css";

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>游戏结束</h2>
        <p className={styles.modalScore}>最终得分: {score}</p>
        <button onClick={onRestart} className={styles.modalButton}>
          重新开始
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
