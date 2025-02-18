import { useEffect, useRef } from "react";

export function GigTitle({ isSelected, title }: { isSelected: boolean; title: string }) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      requestAnimationFrame(() => {
        itemRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [isSelected]);

  return (
    <span className={`text-xl ${isSelected ? "font-bold text-primary" : ""}`} ref={itemRef}>
      {title}
    </span>
  );
}
