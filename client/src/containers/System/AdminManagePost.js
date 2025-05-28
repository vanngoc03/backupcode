import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";

const AdminManagePost = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { posts, dataEdit } = useSelector((state) => state.post); // CHỈ 1 lần
  const [updateData, setUpdateData] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    !dataEdit && dispatch(actions.getPosts());
  }, [dataEdit, posts, updateData]);

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);

  const handleDeletePost = async (postId) => {
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

  const filteredPosts = posts?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 ">
      <div className="py-4 border-b border-gray-300 flex items-center justify-between">
        <h1 className="text-3xl font-medium">Quản lý tin đăng</h1>
      </div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full max-w-md"
        />
      </div>
      <div className="overflow-y-auto max-h-[500px]">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border p-2 text-center">Id tin đăng</th>
              <th className="border p-2 text-center">Ảnh đại diện</th>
              <th className="border p-2 text-center">Tiêu đề</th>
              <th className="border p-2 text-center">Giá</th>
              <th className="border p-2 text-center">Người đăng</th>
              <th className="border p-2 text-center">Lựa chọn</th>
            </tr>
          </thead>
          <tbody>
            {!filteredPosts || filteredPosts.length === 0 ? (
              <tr>
                <td className="border p-2 text-center" colSpan={8}>
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              filteredPosts.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">
                    {item?.id?.match(/\d/g).join("")?.slice(0, 6)}
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
                    {item?.users?.name}
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
      </div>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default AdminManagePost;
