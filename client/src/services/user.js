import axios from "../axiosConfig";

export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user/get-current",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetUserById = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/v1/user/admin/${userId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: "/api/v1/user/",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAdminUpdateUser = (userId, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: `/api/v1/user/admin-update/${userId}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user/get-all-user",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteUserById = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "delete",
        url: `/api/v1/user/delete/${userId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
