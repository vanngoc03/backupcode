import React from "react";
import { apiGetAllUser, apiDeleteUserById } from "../../services";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import Swal from "sweetalert2";
import { UpdatedUser } from "../../components";

const AdminManageUser = () => {
  const [users, setUsers] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetAllUser();
        // response có cấu trúc { data: { err, msg, users }, ... }
        if (response?.data?.err === 0) {
          setUsers(response.data.users);
        } else {
          console.error(
            "Lấy user lỗi:",
            response?.data?.msg || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Lỗi gọi API getAllUser:", error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setIsEdit(true);
    console.log(userId);
  };

  const handleDeleteUser = async (userId) => {
    console.log(userId);
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiDeleteUserById(userId);
          if (response?.data.err === 0) {
            const res = await apiGetAllUser();
            if (res?.data?.err === 0) {
              setUsers(res.data.users);
            }
            Swal.fire("Đã xóa!", "Người dùng đã được xóa.", "success");
          } else {
            Swal.fire("Oops!", response?.data?.msg || "Xóa thất bại!", "error");
          }
        } catch (error) {
          Swal.fire("Lỗi!", "Có lỗi xảy ra khi xóa!", "error");
          console.error("Delete error:", error);
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên người dùng..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm"
      />
      <div className="overflow-y-auto max-h-[500px]">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tên</th>
              <th className="border px-4 py-2">Số điện thoại</th>
              <th className="border px-4 py-2">Zalo</th>
              <th className="border px-4 py-2">Ngày tạo</th>
              <th className="border p-2 text-center">Lựa chọn</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan={5}>
                  Không có dữ liệu người dùng
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    {user.id?.match(/\d/g)?.join("").slice(0, 6)}
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="border px-4 py-2">{user.zalo || "-"}</td>
                  <td className="border px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        text="Sửa"
                        bgcolor="bg-green-400"
                        onClick={() => {
                          handleEditUser(user.id);
                        }}
                      />
                      <Button
                        text="Xóa"
                        bgcolor="bg-orange-400"
                        onClick={() => handleDeleteUser(user.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {isEdit && (
          <UpdatedUser setIsEdit={setIsEdit} userId={selectedUserId} />
        )}
      </div>
    </div>
  );
};

export default AdminManageUser;
