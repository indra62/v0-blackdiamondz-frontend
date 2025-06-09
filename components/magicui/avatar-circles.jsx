/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
  darkMode = true,
}) => {
  return (
    <div className={cn("z-10 flex -space-x-2 rtl:space-x-reverse flex-shrink-0", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={url?.profileName || ""}
        >
          <img
            className={`h-10 w-10 rounded-full object-cover object-[center_10%] border-2 ${darkMode ? "border-[#BD9574]" : "border-[#211F17]"}`}
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#211F17] bg-[#BD9574] text-center text-xs font-medium text-[#211F17] hover:bg-[#9A795F]"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  );
};
