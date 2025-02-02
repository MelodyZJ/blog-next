"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import aboutImg from "@public/images/about.png";
import style from "./about.module.css";

const About = (props) => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "about" });

  return (
    <div className={`${style.about} ${props.loading && "all-page-loading"}`}>
      <div className={style.about_content}>
        <div className={style.title}>About</div>
        <Image
          className={style.about_img}
          width={850}
          alt="about"
          src={aboutImg}
          priority={true}
        />
        <div className={style.title}>Me</div>
        <div className={style.info}>
          Hi！我是瓶中星辰🌈，目前在成都工作，从事Web前端工程师。
          <Link
            className={style.toResume}
            href={"/pages/resume"}
            target="_self"
          >
            （个人简历请点击这里）
          </Link>
        </div>
        <div className={style.title}>关于Blog</div>
        <div className={style.desc}>
          我的个人博客已经经历了三个不同版本的演进，从最初的纯HTML，到Vue，再到现在的NextJS。写博客的初衷是为了拓展自己的视野、记录自己的成长和生活，同时也希望通过自己的文章为读者们提供有价值的信息和知识。未来，我会持续探索和尝试新的技术和方法，让我的博客能够走得更远，为读者们带来更多有趣的内容和更好的阅读体验。
        </div>
        <div className={style.title}>Contact</div>
        <div className={style.contact}>
          <div className={style.contact_item}>
            <div className={style.contact_item_key}>Email:</div>
            <div className={style.contact_item_value}>1739593209@qq.com</div>
          </div>
          <div className={style.contact_item}>
            <div className={style.contact_item_key}>微信:</div>
            <div className={style.contact_item_value}>ZJ1739593209</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLoading(About);
