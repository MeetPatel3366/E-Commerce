import { useEffect } from "react";

const useinfiniteScroll = (callback: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      const rechedBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (rechedBottom) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback]);
};

export default useinfiniteScroll;
