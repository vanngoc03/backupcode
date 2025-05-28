import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostsLimit } from "../../store/actions";
import { useSelector } from "react-redux";
import { SliderCustom } from "../../components";
import icons from "../../ultils/icons";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { Map, BoxInfo, RelatedPost } from "../../components";

const {
  CiLocationOn,
  MdAttachMoney,
  CiCrop,
  FaRegClock,
  FaHashtag,
  FaLocationDot,
} = icons;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
  center: {
    lat: 21.0281595,
    lng: 105.8008456,
  },
  zoom: 11,
};

const DetailPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   ({ coords: { longitude, latitude } }) => {
    //     setCoords({ lat: latitude, lng: longitude });
    //   }
    // );
    const getCoords = async () => {
      // //const addressArr = posts[0]?.address?.split(",");
      // // const results = await geocodeByAddress(posts[0]?.address);
      // // const latLng = await getLatLng(results[0]);
      // console.log(latLng);
    };
    posts && getCoords();
  }, [postId, posts]);
  console.log(posts);

  return (
    <div className="w-full flex gap-4">
      <div className="w-[70%] bg-white rounded-md shadow-md p-4">
        <SliderCustom
          images={
            posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)
          }
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-red-600">{posts[0]?.title}</h2>
          <div className="flex items-center gap-2">
            <span>Chuyên mục: </span>
            <span className="text-blue-500 underline font-medium hover:text-orange-600 cursor-pointer">
              {posts[0]?.overviews?.area}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <CiLocationOn color="red" />
            <span>{posts[0]?.address}</span>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <span className="flex items-center gap-1">
              <MdAttachMoney />
              <span className="font-semibold text-lg text-green-600">
                {posts[0]?.attributes?.price}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <CiCrop />
              <span>{posts[0]?.attributes?.acreage}</span>
            </span>
            <span className="flex items-center gap-1">
              <FaRegClock />
              <span>{posts[0]?.attributes?.published}</span>
            </span>
            <span className="flex items-center gap-1">
              <FaHashtag />
              <span>{posts[0]?.attributes?.hashtag}</span>
            </span>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-xl my-4">Thông tin mô tả: </h3>
          <div className="flex flex-col gap-3">
            {posts[0]?.description &&
              (() => {
                try {
                  const parsed = JSON.parse(posts[0].description);
                  return Array.isArray(parsed) ? (
                    parsed.map((item, index) => <span key={index}>{item}</span>)
                  ) : (
                    <span>{parsed}</span>
                  );
                } catch (error) {
                  console.error("Invalid JSON in description:", error);
                  return <span>Mô tả không hợp lệ</span>;
                }
              })()}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng: </h3>
          <table className="w-full">
            <tbody className="w-full">
              <tr className="w-full">
                <td className="p-4">Mã tin</td>
                <td className="p-4">{posts[0]?.overviews?.code}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-4">Khu vực</td>
                <td className="p-4">{posts[0]?.overviews?.area}</td>
              </tr>
              <tr className="w-full">
                <td className="p-4">Loại tin rao</td>
                <td className="p-4">{posts[0]?.overviews?.type}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-4">Đối tượng</td>
                <td className="p-4">{posts[0]?.overviews?.target}</td>
              </tr>
              <tr className="w-full">
                <td className="p-4">Gói tin</td>
                <td className="p-4">{posts[0]?.overviews?.bonus}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-4">Ngày đăng</td>
                <td className="p-4">{posts[0]?.overviews?.created}</td>
              </tr>
              <tr className="w-full">
                <td className="p-4">Ngày hết hạn</td>
                <td className="p-4">{posts[0]?.overviews?.expired}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
          <table className="w-full">
            <tbody className="w-full">
              <tr className="w-full">
                <td className="p-4">Liên hệ</td>
                <td className="p-4">{posts[0]?.users?.name}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-4">Số điện thoại</td>
                <td className="p-4">{posts[0]?.users?.phone}</td>
              </tr>
              <tr className="w-full">
                <td className="p-4">Zalo</td>
                <td className="p-4">{posts[0]?.users?.zalo}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-xl my-4">Bản đồ</h3>
          <Map coords={coords} />
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-8">
        <BoxInfo userData={posts[0]?.users} />
        <RelatedPost />
      </div>
    </div>
  );
};

export default DetailPost;
