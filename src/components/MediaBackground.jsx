import { useEffect, useState } from "react";

export default function MediaBackground({ backdrop }) {
  const [opacity, setOpacity] = useState(1);

  function onScroll(e) {
    if (window.scrollY > 140) {
      return;
    }

    if (window.scrollY < 10) {
      setOpacity(1);
      return;
    }

    let nOpacity = 100 - window.scrollY / 2;

    if (nOpacity < 50) {
      nOpacity = 50;
    }

    setOpacity(nOpacity / 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="media-back">
      <div
        className="media-backdrop"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${backdrop}')`,
          // backgroundImage: `url('https://image.tmdb.org/t/p/original/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg')`,
          opacity: opacity,
        }}
      ></div>
    </div>
  );
}
