import * as services from "../services/user";

export const getCurrent = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getOne(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "failed" + error,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await services.getOne(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get user: " + error,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "Thiếu payload",
      });
    const response = await services.updateUser(payload, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "failed" + error,
    });
  }
};

export const updateUserByAdmin = async (req, res) => {
  const userId = req.params.id;
  const data = req.body;

  try {
    const response = await services.updateUser(data, userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Update failed",
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const result = await services.getAllUsers();

    if (result.err === 0) {
      return res.status(200).json({
        err: 0,
        msg: result.msg,
        users: result.response,
      });
    } else {
      return res.status(404).json({
        err: 1,
        msg: result.msg,
        users: [],
      });
    }
  } catch (error) {
    console.error("Error in getAllUsersController:", error);
    return res.status(500).json({
      err: -1,
      msg: "Lỗi server, vui lòng thử lại sau",
    });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await services.deleteUserById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ err: 1, msg: "User không tồn tại" });
    }

    return res.status(200).json({ err: 0, msg: "Xóa user thành công" });
  } catch (error) {
    return res
      .status(500)
      .json({ err: -1, msg: "Lỗi server: " + error.message });
  }
};
