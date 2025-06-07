"use client";
import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import SnakeGame from "./components/SnakeGame";
import styles from "./game.module.css";

const GamePage = (props) => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "game" });

  return (
    <div className={`${styles.game} ${props.loading && "all-page-loading"}`}>
      <div className={styles.game_content}>
        <h1 className={styles.title}>贪吃蛇游戏</h1>
        <p className={styles.description}>
          使用方向键或WASD控制蛇的移动方向，吃到食物可以增加长度和分数。
        </p>
        <SnakeGame />
      </div>
    </div>
  );
};

export default withLoading(GamePage);
