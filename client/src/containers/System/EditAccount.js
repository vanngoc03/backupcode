import React, { useState, useEffect } from "react";
import { InputReadOnly, InputFormV2, Button } from "../../components";
import avatar from "../../assets/avatar.jpg";
import { useSelector, useDispatch } from "react-redux";
import {
  apiGetUserById,
  apiUpdateUser,
  apiAdminUpdateUser,
} from "../../services";
import { fileToBase64 } from "../../ultils/Common/tobase64";
import { blobToBase64 } from "../../ultils/Common/tobase64";
import { getCurrent } from "../../store/actions";
import Swal from "sweetalert2";

const EditAccount = ({ userId, setIsEdit }) => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  const [invalidFields, setInvalidFields] = useState([]);
  const [userData, setUserData] = useState(currentData);

  const [payload, setPayload] = useState({
    name: "",
    avatar: "",
    fbUrl: "",
    zalo: "",
  });
  //console.log(currentData);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const res = await apiGetUserById(userId);
        if (res?.data?.err === 0) setUserData(res.data.response);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setPayload({
        name: userData.name || "",
        avatar: blobToBase64(userData.avatar) || "",
        fbUrl: userData.fbUrl || "",
        zalo: userData.zalo || "",
      });
    }
  }, [userData]);

  const handleSubmit = async () => {
    try {
      let response;
      if (userId) {
        // Admin đang sửa người khác
        response = await apiAdminUpdateUser(userId, payload);
      } else {
        // User tự sửa mình
        response = await apiUpdateUser(payload);
      }

      if (response?.data.err === 0) {
        Swal.fire("Done", "Cập nhật thành công!", "success").then(() => {
          if (!userId) dispatch(getCurrent()); // chỉ gọi getCurrent khi user tự sửa
          if (setIsEdit) setIsEdit(false);
        });
      } else {
        Swal.fire("Oops!", response?.data.msg || "Cập nhật thất bại!", "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Lỗi!", "Có lỗi xảy ra khi cập nhật!", "error");
    }
  };

  const handleUploadFile = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setPayload((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-300">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 flex items-center justify-center">
        <div className="w-full py-6 flex flex-col gap-4">
          <InputReadOnly
            value={`#${userData?.id?.match(/\d/g).join("")?.slice(0, 6)}` || ""}
            direction="flex-row"
            label="Mã thành viên"
          />
          <InputReadOnly
            value={userData?.phone || ""}
            editPhone
            direction="flex-row"
            label="Số điện thoại"
          />

          <InputFormV2
            name="name"
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label="Tên hiển thị"
            direction="flex-row"
            value={payload.name}
          />
          <InputFormV2
            name="zalo"
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label="Zalo"
            direction="flex-row"
            value={payload.zalo}
          />
          <InputFormV2
            name="fbUrl"
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label="Facebook"
            direction="flex-row"
            value={payload.fbUrl}
          />
          <div className="flex ">
            <label className="w-48 flex-none" htmlFor="password">
              Mật khẩu
            </label>
            <small className="flex-auto h-12 text-blue-500 hover:text-orange-400 cursor-pointer">
              Đổi mật khẩu
            </small>
          </div>
          <div className="flex mb-6">
            <label className="w-48 flex-none" htmlFor="avatar">
              Ảnh đại diện
            </label>
            <div>
              <img
                src={payload?.avatar || avatar}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover"
              />
              <input
                onChange={handleUploadFile}
                type="file"
                id="avatar"
                className="appearance-none my-4"
              />
            </div>
          </div>
          <Button
            text="Cập nhật"
            bgcolor="bg-green-400"
            textcolor="text-white"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
