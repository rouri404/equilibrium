import { useEffect, useRef } from "react";

const WireframeCube = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes rotate3d {
        0% { transform: rotateX(-20deg) rotateY(0deg); }
        100% { transform: rotateX(-20deg) rotateY(360deg); }
      }
      .cube-container {
        perspective: 600px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cube {
        width: 400px;
        height: 400px;
        position: relative;
        transform-style: preserve-3d;
        animation: rotate3d 20s linear infinite;
      }
      .face {
        position: absolute;
        width: 400px;
        height: 400px;
        border: 1px solid rgba(45, 212, 191, 0.5);
        background: rgba(45, 212, 191, 0.02);
      }
      .face.front { transform: translateZ(200px); }
      .face.back { transform: rotateY(180deg) translateZ(200px); }
      .face.right { transform: rotateY(90deg) translateZ(200px); }
      .face.left { transform: rotateY(-90deg) translateZ(200px); }
      .face.top { transform: rotateX(90deg) translateZ(200px); }
      .face.bottom { transform: rotateX(-90deg) translateZ(200px); }
      
      .cube-inner {
        width: 280px;
        height: 280px;
        position: absolute;
        top: 60px;
        left: 60px;
        transform-style: preserve-3d;
      }
      .face-inner {
        position: absolute;
        width: 280px;
        height: 280px;
        border: 1px solid rgba(15, 53, 69, 0.8);
        background: rgba(15, 53, 69, 0.05);
      }
      .face-inner.front { transform: translateZ(140px); }
      .face-inner.back { transform: rotateY(180deg) translateZ(140px); }
      .face-inner.right { transform: rotateY(90deg) translateZ(140px); }
      .face-inner.left { transform: rotateY(-90deg) translateZ(140px); }
      .face-inner.top { transform: rotateX(90deg) translateZ(140px); }
      .face-inner.bottom { transform: rotateX(-90deg) translateZ(140px); }
    `;
    container.appendChild(style);

    return () => {
      container.removeChild(style);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" style={{ background: "linear-gradient(180deg, #030b10 0%, #081a1a 100%)" }}>
      <div className="cube-container">
        <div className="cube">
          <div className="face front" />
          <div className="face back" />
          <div className="face right" />
          <div className="face left" />
          <div className="face top" />
          <div className="face bottom" />
          <div className="cube-inner">
            <div className="face-inner front" />
            <div className="face-inner back" />
            <div className="face-inner right" />
            <div className="face-inner left" />
            <div className="face-inner top" />
            <div className="face-inner bottom" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireframeCube;
