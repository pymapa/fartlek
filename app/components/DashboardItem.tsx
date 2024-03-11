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
      flex
      flex-col
      bg-neutral
      text-neutral-content
      p-4
      md:p-8
      rounded-lg
      shadow-md
      h-auto
      md:h-96
      ">
        {title && (
          <div className="h-10">
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
        )}
        <div className="h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardItem;
