import { where } from "sequelize";
import db from "../models";

export const getOne = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "ok" : "failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(payload, {
        where: { id },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "updated" : "failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllUsers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        raw: true, // Trả về dữ liệu ở dạng object thuần
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Không tìm thấy người dùng",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteUserById = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "Không có hàng để xóa",
      });
    } catch (error) {
      reject(error);
    }
  });
