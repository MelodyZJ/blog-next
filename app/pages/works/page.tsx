"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { bindHandleScroll, removeScroll } from "@utils/elementUtils";
import { scrollTo } from "@utils/element";
import SysIcon from "@components/SysIcon";
// 图片
import works_bg1 from "@public/images/2.png";
import display_1 from "@public/display/juhui.png";
import display_2 from "@public/display/tijian.png";
import display_3 from "@public/display/jhdatav.png";

import { loadingImag } from "@utils/dataImage";
import styles from "./works.module.css";

export default function Home() {
  const aboutDom = useRef<any>(null);

  // 点击下部箭头
  const goAbout = () => {
    const aboutTop = aboutDom.current.offsetTop;
    scrollTo(aboutTop, {
      getContainer: () => document.body || window,
    });
  };

  useEffect(() => {
    bindHandleScroll();
    return () => {
      removeScroll();
    };
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.bg_card}>
        <Image
          className={styles.bg_card_img}
          width={2000}
          height={1000}
          src={works_bg1}
          alt="blog-bg"
          priority={true}
        />
      </div>
      <div className={styles.bg_mask} id="bg_mask" />
      <div className={styles.bg_content}>
        <div className={styles.title}>参与&完成项目</div>
        <div className={styles.jiantou}>
          <SysIcon
            className={styles.jiantou_icon}
            type="icon-a-jiantou-xia"
            onClick={goAbout}
          />
        </div>
      </div>
      <div className={styles.page_box} ref={aboutDom}>
        <div className={styles.page_title}>Complete Project</div>
        <div className={styles.page_desc}>项目集</div>
        <div className={styles.page_list}>
          <div className={styles.page_item}>
            <Image
              className={styles.page_item_bg}
              width={2000}
              height={1320}
              src={display_1}
              alt="剧荟广场"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={styles.page_item_link} href="">
              剧 荟 广 场 小 程 序
            </Link>
          </div>
          <div className={styles.page_item}>
            <Image
              className={styles.page_item_bg}
              width={2000}
              height={1320}
              src={display_2}
              alt="体检预约"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={styles.page_item_link} href="">
              体 检 预 约 H5 端
            </Link>
          </div>

          <div className={styles.page_item}>
            <Image
              className={styles.page_item_bg}
              width={2000}
              height={1320}
              src={display_3}
              alt="数据大屏"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={styles.page_item_link} href="">
              数 据 大 屏
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.timeAixs_box}>
        <div className={styles.timeAixs_title}>KNOW MORE</div>
        <div className={styles.timeAixs_desc}>
          「 想了解更多？请查看个人简历 」
        </div>
      </div>
    </div>
  );
}
