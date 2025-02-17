import { useEffect, useRef } from "react";

export function JobTitle({ isSelected, title }: { isSelected: boolean; title: string }) {
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
    <span className={isSelected ? "font-bold text-black" : ""} ref={itemRef}>
      {title}
    </span>
  );
}
