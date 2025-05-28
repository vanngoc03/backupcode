import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";

const ManagePost = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { postOfCurrent, dataEdit } = useSelector((state) => state.post);
  const [updateData, setUpdateData] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    !dataEdit && dispatch(actions.getPostsLimitAdmin());
  }, [dataEdit, updateData]);

  useEffect(() => {
    setPosts(postOfCurrent);
  }, [postOfCurrent]);

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);

  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      moment(),
      "day"
    );

  const handleDeletePost = async (postId) => {
    //`console.log(postId);
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeletePost(postId);
        if (response?.data.err === 0) {
          setUpdateData((prev) => !prev);
          Swal.fire("Đã xóa!", "Bài viết đã được xóa.", "success");
        } else {
          Swal.fire("Oops!", "Có lỗi khi xóa!", "error");
        }
      }
    });
  };

  const handleFilterByStatus = (statusCode) => {
    if (statusCode === 1) {
      const activePost = postOfCurrent?.filter((item) =>
        checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(activePost);
    } else if (statusCode === 2) {
      const expirePost = postOfCurrent?.filter(
        (item) => !checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(expirePost);
    } else {
      setPosts(postOfCurrent);
    }
  };

  return (
    <div className="flex flex-col gap-6 ">
      <div className="py-4 border-b border-gray-300 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select
          onChange={(e) => handleFilterByStatus(+e.target.value)}
          className="outline-none border p-2 border-gray-200 rounded-md"
        >
          <option value="0">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hết hạn</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border p-2 text-center">Mã tin</th>
            <th className="border p-2 text-center">Ảnh đại diện</th>
            <th className="border p-2 text-center">Tiêu đề</th>
            <th className="border p-2 text-center">Giá</th>
            <th className="border p-2 text-center">Ngày bắt đầu</th>
            <th className="border p-2 text-center">Ngày hết hạn</th>
            <th className="border p-2 text-center">Trạng thái</th>
            <th className="border p-2 text-center">Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {!posts ? (
            <tr>
              <td className="border p-2 text-center" colSpan={8}>
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            posts.map((item) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">
                  {item?.overviews?.code}
                </td>
                <td className="border p-2 text-center">
                  <img
                    src={JSON.parse(item?.images?.image)[0] || ""}
                    alt="avatar-post"
                    className="w-10 h-10 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="border p-2 text-center">
                  <div className="truncate">{item?.title}</div>
                </td>
                <td className="border p-2 text-center">
                  {item?.attributes?.price}
                </td>
                <td className="border p-2 text-center">
                  {item?.overviews?.created}
                </td>
                <td className="border p-2 text-center">
                  {item?.overviews?.expired}
                </td>
                <td className="border p-2 text-center">
                  {checkStatus(item?.overviews?.expired?.split(" ")[3])
                    ? "Đang hoạt động"
                    : "Đã hết hạn"}
                </td>
                <td className="border p-2 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      text="Sửa"
                      bgcolor="bg-green-400"
                      onClick={() => {
                        dispatch(actions.editData(item));
                        setIsEdit(true);
                      }}
                    />
                    <Button
                      text="Xóa"
                      bgcolor="bg-orange-400"
                      onClick={() => handleDeletePost(item.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
