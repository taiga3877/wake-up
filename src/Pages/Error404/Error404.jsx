import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";


export default function NotFoundPage() {
  const textRef = useRef(null);
  const handleRef = useRef(null);
  const replayRef = useRef(null);
  const tl = useRef(gsap.timeline({ paused: true }));
  const handleTL = useRef(gsap.timeline({ paused: true, repeat: -1, yoyo: true }));
  

  useEffect(() => {
    const mySplitText = new SplitType(textRef.current, { types: "chars, words" });
    const copyWidth = textRef.current.offsetWidth;

    tl.current
      .from(mySplitText.chars, { opacity: 0, stagger: 0.05, ease: "back.out(1.7)" })
      .call(() => handleTL.current.play());

    handleTL.current
      .fromTo(handleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .to(handleRef.current, { x: copyWidth, ease: "steps(12)", duration: 0.7 });

    tl.current.play();
  }, []);

  const restartAnimation = () => {
    tl.current.restart();
    handleTL.current.restart();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center relative">
        <p ref={textRef} className="text-2xl">404, page not found.</p>
        <span ref={handleRef} className="absolute bg-yellow-400 w-4 h-8 top-0 left-0 mt-1"></span>
        <svg
          ref={replayRef}
          onClick={restartAnimation}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 279.9 297.3"
          className="w-6 absolute right-0 bottom-0 cursor-pointer transition-transform duration-300 hover:rotate-12 hover:fill-gray-400"
        >
          <path d="M269.4,162.6c-2.7,66.5-55.6,120.1-121.8,123.9c-77,4.4-141.3-60-136.8-136.9C14.7,81.7,71,27.8,140,27.8 c1.8,0,3.5,0,5.3,0.1c0.3,0,0.5,0.2,0.5,0.5v15c0,1.5,1.6,2.4,2.9,1.7l35.9-20.7c1.3-0.7,1.3-2.6,0-3.3L148.6,0.3 c-1.3-0.7-2.9,0.2-2.9,1.7v15c0,0.3-0.2,0.5-0.5,0.5c-1.7-0.1-3.5-0.1-5.2-0.1C63.3,17.3,1,78.9,0,155.4 C-1,233.8,63.4,298.3,141.9,297.3c74.6-1,135.1-60.2,138-134.3c0.1-3-2.3-5.4-5.3-5.4l0,0C271.8,157.6,269.5,159.8,269.4,162.6z" />
        </svg>
      </div>
    </div>
  );
}
