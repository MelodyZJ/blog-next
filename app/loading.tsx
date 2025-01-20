"use client";
// 定义一个名为LoadingCom的函数组件
const LoadingCom = () => {
  // 返回一个包含加载动画的div
  return (
    <div className="preloader_box">
      {/* 左侧加载动画 */}
      <div className="preloader_left"></div>
      {/* 右侧加载动画 */}
      <div className="preloader_right"></div>
      {/* 加载动画 */}
      <div className="preloader">
        {/* 加载动画中的字母 */}
        <span className="inner">L</span>
        <span className="inner">o</span>
        <span className="inner">a</span>
        <span className="inner">d</span>
        <span className="inner">i</span>
        <span className="inner">n</span>
        <span className="inner">g</span>
        {/* 加载动画中的点 */}
        <span className="inner">.</span>
        <span className="inner">.</span>
        <span className="inner">.</span>
      </div>
    </div>
  );
};

export default LoadingCom;
