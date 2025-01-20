"use client";

import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import withLoading from "@components/WithLoading";
import styles from "./dinosaur.module.css";

const Dinosaur = (props) => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "dinosaur" });

  return (
    <div className={`${styles.news} ${props.loading && "all-page-loading"}`}>
      <div className={styles.news_content}></div>
    </div>
  );
};

export default withLoading(Dinosaur);
