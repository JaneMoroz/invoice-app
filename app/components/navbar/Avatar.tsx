"use client";

import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      className="rounded-full h-10 w-10"
      height={30}
      width={30}
      alt="avatar"
      src="/images/image-avatar.jpg"
    />
  );
};

export default Avatar;
