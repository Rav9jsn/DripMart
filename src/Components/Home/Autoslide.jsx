import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import { useState, useEffect } from "react";

const Autoslide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgArray = [img1, img2, img3, img4];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imgArray.length);
    }, 1500); // 3 seconds

    return () => clearInterval(interval);
  });
  return (
    <div>
      <div className="relative w-full  overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-800 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imgArray.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`slide-${i}`}
              className="w-full flex-shrink-0 object-contain "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Autoslide;
