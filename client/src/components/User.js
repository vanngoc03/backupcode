import React from "react";
import { useSelector } from "react-redux";
import anonAvatar from "../assets/avatar.jpg";
import { blobToBase64 } from "../ultils/Common/tobase64";

const User = () => {
  const { currentData } = useSelector((state) => state.user);

  return (
    <div className="flex items-center gap-2">
      <img
        src={blobToBase64(currentData.avatar) || anonAvatar}
        alt="avatar"
        className="w-10 h-10 object-cover rounded-full"
      />
      <div className="flex flex-col">
        <span>
          Xin Chào, <span className="font-semibold ">{currentData?.name}</span>
        </span>
        <span>
          Mã tài khoản:{" "}
          <span>{`${currentData?.id
            ?.match(/\d/g)
            .join("")
            ?.slice(0, 6)}`}</span>
        </span>
      </div>
    </div>
  );
};

export default User;
