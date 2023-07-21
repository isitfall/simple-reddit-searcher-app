import React, { FC } from "react";
import { BaseSearchItem } from "../../../types/search-result";

const placeholderUrl = "https://img.icons8.com/doodle/344/reddit--v4.png";

const handleLoadError = ({ currentTarget }: React.SyntheticEvent<HTMLImageElement>) => {
  currentTarget.onerror = null;
  currentTarget.src = placeholderUrl;
};

export const Card: FC<BaseSearchItem> = ({ title, url, thumbnail }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="
    flex 
    flex-row 
    justify-start 
    items-center
    gap-2
    rounded-xl 
    p-4 
    leading-normal 
    bg-gradient-to-r 
    from-cyan-500 
    to-blue-500 
    hover:to-blue-100 
    transition-all 
    duration-200 w-full
    "
  >
    {thumbnail && (
      <img src={thumbnail} className="w-16 h-16 object-cover" onError={handleLoadError} />
    )}
    <p className="text-gray-900 text-base">{title}</p>
  </a>
);
