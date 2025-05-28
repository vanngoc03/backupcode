import React, { memo } from "react";
import anonAvatar from "../assets/avatar.jpg";
import icons from "../ultils/icons";
import Button from "./Button";

const { BsDot, FaPhone } = icons;

const BoxInfo = ({ userData }) => {
  return (
    <div className="w-full bg-[#FFE99A] rounded-md items-center flex flex-col p-4 gap-4">
      <img
        src={anonAvatar}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
      <h3 className="font-medium text-xl">{userData?.name}</h3>
      <span className="flex items-center">
        <BsDot color="green" size={30} />
        <span>Đang hoạt động</span>
      </span>
      <a
        href="/"
        className="bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg"
      >
        <FaPhone /> {userData?.phone}
      </a>
      <a
        href={`https://zalo.me/${userData?.zalo}`}
        className="bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg"
      >
        {"Nhắn tin Zalo"}
      </a>
    </div>
  );
};

export default memo(BoxInfo);
