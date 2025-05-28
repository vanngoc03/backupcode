import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
//import { apiGetCategories } from "../../services/category";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnamesToString";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const notActive =
  "hover:bg-secondary3 px-4 h-full flex items-center justify-center";
const Active =
  "hover:bg-secondary3 px-4 h-full flex items-center justify-center bg-secondary3";

const Navigation = ({ isAdmin }) => {
  //const [categories, setCategories] = useState([])
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    // const fetchCategories = async () => {
    //     const response = await apiGetCategories()
    //     if (response?.data.err === 0) {
    //         setCategories(response.data.response)
    //     }
    // }
    // fetchCategories()
    dispatch(actions.getCategories());
  }, []);

  return (
    <div
      className={`w-full flex items-center ${
        isAdmin ? "justify-start" : "justify-center"
      } h-[40px] bg-secondary1 text-white`}
    >
      <div className="w-3/5 flex items-center text-sm font-medium h-full">
        <NavLink
          to={`/`}
          className={({ isActive }) => (isActive ? Active : notActive)}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div
                key={item.code}
                className=" flex items-center justify-center h-[40px]"
              >
                <NavLink
                  to={`/${formatVietnameseToString(item.value)}`}
                  className={({ isActive }) => (isActive ? Active : notActive)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
        <NavLink
          to={`/lien-he`}
          className={({ isActive }) => (isActive ? Active : notActive)}
        >
          Liên hệ
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
