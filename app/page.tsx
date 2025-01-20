"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { bindHandleScroll, removeScroll } from "@utils/elementUtils";
import { scrollTo } from "@utils/element";
import SysIcon from "@components/SysIcon";
// 图片
import bgImgLight from "@public/images/1.jpg";
import wallpaper from "@public/images/6.png";
import headPhoto from "@public/images/headphoto.png";

import { timeAixsList } from "@utils/dict";
import { loadingImag } from "@utils/dataImage";
import styles from "@styles/home.module.css";

export default function Home() {
  const typeTarget = useRef<any>(null);
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
    const typed = new Typed(typeTarget.current, {
      strings: [
        "心事浩茫连广宇，于无声处听惊雷。",
        "莫听穿林打叶声，何妨吟啸且徐行。",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      autoInsertCss: false,
      backDelay: 2000,
      showCursor: false,
    });

    return () => {
      removeScroll();
      typed.destroy();
    };
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.bg_card}>
        <Image
          className={styles.bg_card_img}
          width={2000}
          height={1000}
          src={bgImgLight}
          alt="blog-bg"
          priority={true}
        />
      </div>
      <div className={styles.bg_mask} id="bg_mask" />
      <div className={styles.bg_content}>
        <div className={styles.head_box}>
          <div className={styles.line_box}>
            <div className={styles.line_a}></div>
            <div className={styles.line_b}></div>
            <div className={styles.line_c}></div>
          </div>
          <Image
            className={styles.head_photo}
            src={headPhoto}
            alt="headPhoto"
          />
        </div>
        <div className={styles.title}>Welcome my friend</div>
        <div className={styles.description_box}>
          <div className={styles.description} ref={typeTarget} />
        </div>
        <div className={styles.jiantou}>
          <SysIcon
            className={styles.jiantou_icon}
            type="icon-a-jiantou-xia"
            onClick={goAbout}
          />
        </div>
      </div>
      {/* <div className={styles.project_box} ref={aboutDom}>
        <div className={styles.project_title}>BLOG GROWTH RECORD</div>
        <div className={styles.project_desc}>更多的作品</div>
        <div className={styles.project}></div>
      </div> */}
      <div className={styles.page_box} ref={aboutDom}>
        <div className={styles.page_title}>BLOG TOOL</div>
        <div className={styles.page_desc}>博客项目更多功能入口</div>
        <div className={styles.page_list}>
          <div className={styles.page_item}>
            <Image
              className={styles.page_item_bg}
              width={2000}
              height={1320}
              src={wallpaper}
              alt="必应每日壁纸"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={styles.page_item_link} href="/pages/wallpaper">
              在 线 壁 纸
            </Link>
          </div>
          <div className={styles.page_item}>
            <Image
              className={styles.page_item_bg}
              width={2000}
              height={1320}
              src={
                "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg"
              }
              alt="热点"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={styles.page_item_link} href="/pages/news">
              实 时 热 点
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.timeAixs_box}>
        <div className={styles.timeAixs_title}>BLOG RECORD</div>
        <div className={styles.timeAixs_desc}>「 左右滑动查看 」</div>
        <div className={styles.timeAixs}>
          <div className={styles.timeAixs_left} />
          <div className={styles.timeAixs_content}>
            {timeAixsList?.map((v) => (
              <div className={styles.timeAixs_item} key={v.id}>
                <div className={styles.timeAixs_item_time}>{v.time}</div>
                <div className={styles.timeAixs_item_title}>{v.title}</div>
              </div>
            ))}
            <div className={styles.timeAixs_item}>
              <div className={styles.timeAixs_item_desc}>GROWING...</div>
              <div className={styles.timeAixs_item_desc}>COMING SOON</div>
            </div>
          </div>
          <div className={styles.timeAixs_right} />
        </div>
      </div>
    </div>
  );
}
