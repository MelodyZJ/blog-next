"use client";
import React, { useEffect, useState } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import {
  web_desc,
  skillList,
  workList,
  projectList,
  schoolUndergo,
  myProject,
  about,
} from "@utils/dict";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import style from "./resume.module.css";

const Resume = (props) => {
  const [project, setProject] = useState<number[]>([]);

  const clickProject = (v) => {
    if (project.includes(v)) {
      setProject((data) => data.filter((v1) => v1 !== v));
    } else {
      setProject((data) => [...data, v]);
    }
  };

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "resume" });

  return (
    <div className={`${style.resume} ${props.loading && "all-page-loading"}`}>
      <div className={style.resume_content}>
        <div className={style.title}>瓶中星辰 🌈</div>
        <div className={style.main}>
          <div className={style.main_title}>职业概述</div>
          <div className={style.main_item_desc}>{web_desc}</div>
          <div className={style.main_title}>技能和工具</div>
          <div className={style.main_item}>
            {skillList?.map((v) => (
              <li key={v.id}>{v.value}</li>
            ))}
          </div>
          <div className={style.main_title}>工作经历</div>
          {workList?.map((v, ind) => (
            <div
              className={`${style.main_item} ${
                ind < workList.length - 1 && style.border
              }`}
              key={v.id}
            >
              <div className={style.main_item_title}>
                <div className={style.company_name}>{v.companyName}</div>
                <div className={style.work_time}>{v.workTime}</div>
              </div>
              <div className={style.main_item_info}>
                <div className={style.role}>{v.role}</div>
                <div className={style.place}>{v.place}</div>
              </div>
              <div className={style.main_item_content}>
                {v?.operatingDuty?.map((v1) => (
                  <li key={v1.id}>{v1.value}</li>
                ))}
              </div>
            </div>
          ))}
          <div className={style.main_title}>
            主要项目
            <span className={style.tootip}>（点击项目名称展开）</span>
          </div>
          {projectList?.map((v, ind) => (
            <div
              className={`${style.main_item} ${
                ind < projectList.length - 1 && style.border
              } ${
                project.includes(v.id)
                  ? style.main_item_expand
                  : style.main_item_retract
              }`}
              key={v.id}
            >
              <div
                className={`${style.main_item_title} ${style.cursor_pointer}`}
                onClick={() => clickProject(v.id)}
              >
                <div className={style.project_name}>{v.projectName}</div>
                <div className={style.project_time}>{v.projectTime}</div>
              </div>
              <div
                className={`${style.project_desc} ${
                  !project.includes(v.id) && style.box_none
                }`}
              >
                {v.desc}
              </div>
              <div
                className={`${style.main_item_lectotype} ${
                  !project.includes(v.id) && style.box_none
                }`}
              >
                技术选型：{v.lectotype}
              </div>
              <div
                className={`${style.main_item_title} ${style.top16} ${
                  !project.includes(v.id) && style.box_none
                }`}
              >
                职责和贡献
              </div>
              <div
                className={`${style.main_item_content} ${
                  !project.includes(v.id) && style.box_none
                }`}
              >
                {v?.jobOrContribute?.map((v1) => (
                  <li key={v1.id}>{v1.value}</li>
                ))}
              </div>
              <div
                className={`${style.main_item_title} ${style.top16} ${
                  !project.includes(v.id) && style.box_none
                }`}
              >
                项目成果
              </div>
              <div
                className={`${style.main_item_content} ${
                  !project.includes(v.id) && style.box_none
                }`}
              >
                {v?.projectResults?.map((v1) => (
                  <li key={v1.id}>{v1.value}</li>
                ))}
              </div>
            </div>
          ))}
          <div className={style.main_title}>教育背景</div>
          {schoolUndergo?.map((v, ind) => (
            <div
              className={`${style.main_item} ${
                ind < schoolUndergo.length - 1 && style.border
              }`}
              key={v.id}
            >
              <div className={style.main_item_title}>
                <div className={style.education_item}>{v.schoolName}</div>
                <div className={style.education_item}>{v.specialityName}</div>
                <div className={style.education_item}>{v.education}</div>
                <div className={style.education_item}>{v.time}</div>
              </div>
            </div>
          ))}
          <div className={style.main_title}>我的项目</div>
          {myProject?.map((v, ind) => (
            <div
              className={`${style.main_item} ${
                ind < myProject.length - 1 && style.border
              }`}
              key={v.id}
            >
              <div className={style.main_item_title}>
                <div className={style.project_name}>{v.projectName}</div>
                <div className={style.project_time}>{v.projectTime}</div>
              </div>
              <div className={style.project_desc}>{v.desc}</div>
              <div className={style.main_item_lectotype}>
                技术选型：{v.lectotype}
              </div>
              <div className={`${style.main_item_title} ${style.top16}`}>
                职责和成果
              </div>
              <div className={style.main_item_jobOrAchievement}>
                {v?.jobOrAchievement}
              </div>
            </div>
          ))}
          <div className={style.main_title}>自我评价</div>
          <div className={style.main_item_about}>{about}</div>
        </div>
      </div>
    </div>
  );
};

export default withLoading(Resume);
