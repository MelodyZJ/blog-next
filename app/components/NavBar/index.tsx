"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import SysIcon from "../SysIcon";
import { navList } from "./routes";
import { handleThemeChange } from "@utils/dataUtils";
import { LayoutContext } from "@store/layoutStore";
import styles from "./navBar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const { changeTheme } = useContext(LayoutContext);
  // 主题
  const [theme, setTheme] = useState<any>(1);
  // 是否弹出遮罩
  const [avtive, setActive] = useState<boolean>(false);

  // 导航item
  const navItem = (obj) => {
    return (
      <Link
        className={`${styles.nav_item} nav_item_text ${
          pathname !== "/" && pathname === obj?.href
            ? styles.nav_item_active
            : ""
        }`}
        key={obj?.key}
        href={obj?.href}
        onClick={() => setActive(false)}
      >
        <SysIcon className={styles.nav_item_icon} type={obj?.icon} />
        <span className={styles.nav_item_title}>{obj?.title}</span>
      </Link>
    );
  };

  // 切换主题
  const themeSwitch = useCallback(
    (event) => {
      if (event === "click") {
        document.documentElement.classList.toggle("dark");
        setTheme(theme === 1 ? 2 : 1);
        changeTheme(theme === 1 ? 2 : 1);
      } else {
        setTheme(handleThemeChange(event));
        changeTheme(handleThemeChange(event));
      }
    },
    [setTheme, changeTheme, theme]
  );

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: light)"
    );

    // 添加一个监听器来监听主题切换
    darkModeMediaQuery &&
      darkModeMediaQuery.addEventListener("change", themeSwitch);
    themeSwitch(darkModeMediaQuery);

    return () => {
      darkModeMediaQuery &&
        darkModeMediaQuery.removeEventListener("change", themeSwitch);
    };
  }, []);

  return (
    <>
      <nav className={styles.nav} id="layout_nav">
        <div className={styles.nav_left}>
          <Link className={`${styles.title} nav_item_text`} href="/">
            <span className={styles.logo_text}>MelodyZJ</span>
          </Link>
        </div>
        <div className={styles.nav_right}>
          <div className={styles.nav_list}>
            {navList?.map((v) => navItem(v))}
          </div>
          {/* 主题切换按钮 */}
          <div className={styles.nav_type} onClick={() => themeSwitch("click")}>
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 2 && styles.nav_type_item_active
              }`}
              type="icon-taiyang1"
            />
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 1 && styles.nav_type_item_active
              }`}
              type="icon-yueliang1"
            />
          </div>
        </div>
        <div className={styles.nav_mobile}>
          <div
            className={styles.nav_mobile_btn}
            onClick={() => setActive(!avtive)}
          >
            <SysIcon type="icon-tubiao_daohangcaidan" />
          </div>
        </div>
      </nav>
      <div
        className={`${styles.nav_mobile_mask} ${
          avtive && styles.nav_mobile_mask_active
        }`}
        onClick={() => setActive(false)}
      />
      <div
        className={`${styles.nav_mobile_content} ${
          avtive && styles.nav_mobile_content_active
        }`}
      >
        <div
          className={`${styles.nav_mobile_btn}`}
          onClick={() => setActive(!avtive)}
        >
          <SysIcon type="icon-tubiao_daohangcaidan" />
        </div>
        <div className={styles.nav_mobile_list} id="nav_mobile_list">
          <div className={styles.nav_list}>
            {navList?.map((v) => navItem(v))}
          </div>
          <div className={styles.nav_type} onClick={() => themeSwitch("click")}>
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 2 && styles.nav_type_item_active
              }`}
              type="icon-taiyang1"
            />
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 1 && styles.nav_type_item_active
              }`}
              type="icon-yueliang1"
            />
          </div>
        </div>
      </div>
    </>
  );
}
