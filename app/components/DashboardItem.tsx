import React from "react";

type DashboardItemProps = {
  width: 1 | 2 | 3;
  title?: string;
  children: React.ReactNode;
};

const DashboardItem = ({ width, title, children }: DashboardItemProps) => {
  return (
    <div
      className={`p-2
      md:p-4
      w-full 
      ${width === 1 && "md:w-1/3"}
      ${width === 2 && "md:w-2/3"}
      `}
    >
      <div className="
      bg-neutral
      text-neutral-content
      p-4
      md:p-8
      rounded-lg
      shadow-md
      ">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default DashboardItem;
