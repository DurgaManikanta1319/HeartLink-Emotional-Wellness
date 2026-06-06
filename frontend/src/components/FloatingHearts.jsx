import { useEffect, useRef } from "react";

const FloatingHearts = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      const heart = document.createElement("div");

      heart.className = "heart";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.opacity = String(Math.random());
      heart.style.animationDuration = `${3 + Math.random() * 2}s`;

      container.appendChild(heart);

      const removeDelayMs = 5000;
      window.setTimeout(() => {
        heart.remove();
      }, removeDelayMs);
    }, 120);

    return () => {
      clearInterval(intervalId);
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
    />
  );
};

export default FloatingHearts;
