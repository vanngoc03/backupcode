import React, { useEffect, useState } from "react";
import { Address, Overview, Loading, Button } from "../../components";
import { FaCamera } from "react-icons/fa";
import { apiUploadImages } from "../../services";
import { MdDeleteForever } from "react-icons/md";
import { getCodePrice, getCodeArea } from "../../ultils/Common/getCodes";
import { useSelector } from "react-redux";
import { apiCreatePost, apiUpdatePost } from "../../services";
import Swal from "sweetalert2";
import validate from "../../ultils/Common/validateFields";
import { useDispatch } from "react-redux";
import { resetDataEdit } from "../../store/actions";

const CreatePost = ({ isEdit }) => {
  const dispatch = useDispatch();
  const { dataEdit } = useSelector((state) => state.post);
  //console.log(dataEdit);
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber * 1000000 || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images: dataEdit?.images.image ? JSON.parse(dataEdit?.images.image) : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      description: dataEdit?.description
        ? JSON.parse(dataEdit?.description)
        : "",
      target: dataEdit?.overviews?.target || "",
      province: dataEdit?.province || "",
    };

    return initData;
  });

  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { prices, areas, categories, provinces } = useSelector(
    (state) => state.app
  );
  const [invalidFields, setInvalidFields] = useState([]);
  const { currentData } = useSelector((state) => state.user);

  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image);
      images && setImagesPreview(images);
    }
  }, [dataEdit]);

  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let imagesabc = [];
    const files = e.target.files;
    const images = new FormData();
    for (let i of files) {
      images.append("file", i);
      images.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);

      const response = await apiUploadImages(images);
      if (response.status === 200) {
        imagesabc = [...imagesabc, response.data?.secure_url];
      }
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...imagesabc]);
    setPayload((prev) => ({
      ...prev,
      images: [...prev.images, ...imagesabc],
    }));
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };

  const handleSubmit = async () => {
    const priceNumber = +payload.priceNumber / Math.pow(10, 6);
    const areaNumber = +payload.areaNumber;

    const priceCode = getCodePrice(priceNumber, prices);
    const areaCode = getCodeArea(areaNumber, areas);

    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userId: currentData.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((item) => item.code === payload.categoryCode)?.value
      } ${payload?.address?.split(",")[0]}`,
    };

    const result = validate(finalPayload, setInvalidFields);
    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;

        const response = await apiUpdatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công",
            "Đã cập nhật bài viết thành công!",
            "success"
          ).then(() => {
            resetPayload();
            dispatch(resetDataEdit());
          });
        } else {
          Swal.fire("Oops !", "Có lỗi rồi anh bạn à !", "error");
        }
      } else {
        console.log(finalPayload);
        const response = await apiCreatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công",
            "Thêm bài đăng mới thành công!",
            "success"
          ).then(() => {
            resetPayload();
          });
        } else {
          Swal.fire("Oops !", "Có lỗi rồi anh bạn à !", "error");
        }
      }
    }
  };

  const resetPayload = () => {
    setPayload({
      categoryCode: "",
      title: "",
      priceNumber: 0,
      areaNumber: 0,
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
    });
  };

  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-300">
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto ">
          <Address
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <Overview
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>
              Cập nhật hình ảnh đầy đủ rõ ràng giúp tăng tỷ lệ cho thuê thành
              công
            </small>
            <div className="w-full">
              <label
                htmlFor="file"
                className="w-full border-2 h-[200px] my-4 gap-4 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FaCamera color="green" size={40} />
                    Thêm ảnh
                  </div>
                )}
              </label>
              <input
                onChange={handleFiles}
                hidden
                type="file"
                id="file"
                multiple
              />
              <small className="text-red-500 block w-f">
                {invalidFields?.some((item) => item.name === "images") &&
                  invalidFields?.find((item) => item.name === "images")
                    ?.message}
              </small>
              <div className="w-full">
                <h3 className="font-medium py-4">Ảnh đã tải lên</h3>
                <div className="flex gap-4 items-center">
                  {imagesPreview.map((item) => {
                    return (
                      <div key={item} className="relative w-1/3 h-1/3 ">
                        <img
                          src={item}
                          alt="preview"
                          className="object-cover rounded-md w-full h-full"
                        />
                        <span
                          title="Xóa"
                          onClick={() => handleDeleteImage(item)}
                          className="absolute top-1 right-1 p-[1px] rounded-full cursor-pointer bg-gray-300 hover:bg-gray-400"
                        >
                          <MdDeleteForever size={24} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            text={isEdit ? "Cập nhật" : "Tạo mới"}
            bgcolor="bg-green-600"
            textcolor="text-white"
          />
          <div className="h-[300px]"></div>
        </div>
        <div className="w-[30%] flex-none items-center justify-center">
          Đang tải google map
          <Loading />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
