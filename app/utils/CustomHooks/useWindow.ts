import { useEffect } from "react";

function useWindow(props: { callback: Function }) {
  const { callback } = props;
  useEffect(() => {
    // 客户端环境下才执行
    if (typeof window !== "undefined") {
      callback && callback();
    }
  }, []);

  return {};
}

export default useWindow;
