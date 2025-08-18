import React, { useState, useRef, useEffect } from "react";

export default function MovableDiv({ parentRef, onMove, width = 50, height = 550 }) {
  const [position, setPosition] = useState({ x: 33, y: 100 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const [bounce,setBounce] =useState(false);

  const startDrag = (clientX, clientY) => {
    setDragging(true);
    offset.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const doDrag = (clientX, clientY) => {
    if (!dragging || !parentRef.current) return;

    const container = parentRef.current.getBoundingClientRect();
    let newX = clientX - offset.current.x - container.left;
    let newY = clientY - offset.current.y - container.top;

    // boundaries inside parent
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > container.width - width) newX = container.width - width;
    if (newY > container.height - height) newY = container.height - height;

    const newPos = { x: newX, y: newY };
    setPosition(newPos);

    if (onMove) {
      onMove(newPos);
    }
  };

  const handleMouseDown = (e) => startDrag(e.clientX, e.clientY);
  const handleMouseMove = (e) => doDrag(e.clientX, e.clientY);
  const handleTouchStart = (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY);
  const handleTouchMove = (e) => doDrag(e.touches[0].clientX, e.touches[0].clientY);
  const endDrag = () => setDragging(false);

  useEffect(()=>{
    const timer = setTimeout(()=>setBounce(true),10000);
    return ()=> clearTimeout(timer);
  },[]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", endDrag);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", endDrag);
    };
  }, [dragging]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={bounce?"bounce":""}
      style={{
        width: width,
        height: height,
        position: "absolute",
        left: position.x,
        top: position.y,
        background: "blue",
        zIndex: 1,
        cursor: "grab",
        rotate: "-5deg",
        borderRadius: "6px",
        transition:"transform 0.2s",
      }}
    />
  );
}
