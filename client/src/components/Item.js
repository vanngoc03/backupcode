import React, { memo, useState } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/Common/formatVietnamesToString";
import { path } from "../ultils/constant";

const indexs = [0, 1, 2, 3];
const { FaStar, FaRegHeart, FaHeart, BsBookmarkStarFill } = icons;

const Item = ({
  images,
  users,
  title,
  star,
  description,
  attributes,
  address,
  id,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);

  const handleStar = (star) => {
    let stars = [];
    for (let i = 0; i < +star; i++) {
      stars.push(<FaStar className="star-item" size={18} color="yellow" />);
    }
    return stars;
  };
  return (
    <div className="w-full flex border-t border-orange-600 py-4">
      <Link
        to={`${path.DETAIL}${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
        className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
      >
        {images.length > 0 &&
          images
            .filter((i, index) => indexs.some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="preview"
                  className="w-[47%] h-[120px] object-cover"
                />
              );
            })}
        <span className="bg-overlay-30 text-white px-2 rounded-md absolute left-1 bottom-3">{`${images.length} ảnh`}</span>
        <span
          className=" text-white absolute right-5 bottom-1"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <FaHeart size={24} color="red" />
          ) : (
            <FaRegHeart size={24} />
          )}
        </span>
      </Link>
      <div className="w-3/5">
        <div className="flex justify-between gap-4">
          <Link
            to={`${path.DETAIL}${formatVietnameseToString(
              title?.replaceAll("/", "")
            )}/${id}`}
            className=" text-red-500 font-medium "
          >
            {handleStar(+star).length > 0 &&
              handleStar(star).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
            {title}
          </Link>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="my-2 flex items-center justify-between gap-2">
          <span className="font-bold flex-3 text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">{`${
            address.split(",")[address.split(",").length - 2]
          },${address.split(",")[address.split(",").length - 1]}`}</span>
        </div>
        <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex items-center my-3 justify-between">
          <div className="flex items-center">
            <img
              src="https://png.pngtree.com/png-vector/20190221/ourmid/pngtree-male-avatar-vector-icon-png-image_691612.jpg"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p>{users?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="bg-blue-700 rounded-md text-white p-1"
            >{`Gọi ${users?.phone}`}</button>
            <a
              href={`https://zalo.me/${users?.zalo}`}
              className="text-blue-700 rounded-md p-1 border border-blue-700 "
              target="_blank"
            >
              Nhắn Zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
