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
import works_bg1 from "@public/images/2.png";
import display_1 from "@public/display/tijian.png";
import display_2 from "@public/display/echart.png";
import display_3 from "@public/display/jhdatav.png";
import display_4 from "@public/display/wanyiyun.png";

import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

import style from "./works.module.css";
import { Carousel } from "antd";

const Works: React.FC = (props) => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "works" });

  return (
    <div className={style.shell}>
      <Image className={style.image} src={works_bg1} alt="works_bg1" />
      <div className={style.content}>作品集</div>
    </div>
  );
};

export default withLoading(Works);
