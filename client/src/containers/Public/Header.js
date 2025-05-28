import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../assets/logonobg.png";
import logoicon from "../../assets/logo.png";
import { Button, User } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultils/menuManage";
import menuAdmin from "../../ultils/menuAdmin";

const { AiOutlinePlusCircle, LuLogOut, FaChevronDown } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const headerRef = useRef();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  useEffect(
    (first) => {
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [searchParams.get("page")]
  );

  return (
    <div ref={headerRef} className="w-3/5">
      <div className="max-w-1100 flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex items-center gap-4">
            <img
              src={logoicon}
              alt="logoicon"
              className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
            />
            <img
              src={logo}
              alt="logo"
              className="w-[240px] h-[70px] object-contain"
            />
          </div>
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className="flex items-center gap-1">
              <span>Xin chao quy khach!!</span>
              <Button
                text={"Đăng nhập"}
                textcolor="text-white"
                bgcolor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng ký"}
                textcolor="text-white"
                bgcolor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          )}

          {isLoggedIn && (
            <div className="flex items-center gap-3 relative">
              <User />
              {currentData?.name === "admin" ? (
                <>
                  <Button
                    text={"Admin"}
                    textcolor="text-white"
                    bgcolor="bg-red-600"
                    px="px-12"
                    onClick={() => setIsShowMenu((prev) => !prev)}
                    IcAfter={FaChevronDown}
                  />
                  {isShowMenu && (
                    <div className="absolute min-w-200 top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col ">
                      {menuAdmin.map((item) => {
                        return (
                          <Link
                            className="hover:text-orange-500 flex items-center gap-1 text-blue-500 border-b border-gray-200 py-2"
                            key={item.id}
                            to={item?.path}
                          >
                            {item.icon}
                            {item.text}
                          </Link>
                        );
                      })}
                      <span
                        className="cursor-pointer flex items-center gap-1 hover:text-orange-500 text-blue-500 border-b border-gray-200 py-2"
                        onClick={() => {
                          setIsShowMenu(false);
                          dispatch(actions.logout());
                        }}
                      >
                        <LuLogOut />
                        Đăng xuất
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Button
                    text={"Quản lý"}
                    textcolor="text-white"
                    bgcolor="bg-secondary2"
                    px="px-12"
                    onClick={() => setIsShowMenu((prev) => !prev)}
                    IcAfter={FaChevronDown}
                  />
                  {isShowMenu && (
                    <div className="absolute min-w-200 top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col ">
                      {menuManage.map((item) => {
                        return (
                          <Link
                            className="hover:text-orange-500 flex items-center gap-1 text-blue-500 border-b border-gray-200 py-2"
                            key={item.id}
                            to={item?.path}
                          >
                            {item.icon}
                            {item.text}
                          </Link>
                        );
                      })}
                      <span
                        className="cursor-pointer flex items-center gap-1 hover:text-orange-500 text-blue-500 border-b border-gray-200 py-2"
                        onClick={() => {
                          setIsShowMenu(false);
                          dispatch(actions.logout());
                        }}
                      >
                        <LuLogOut />
                        Đăng xuất
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* {isLoggedIn && (
            <div className="flex items-center gap-3 relative">
              <User />

              <Button
                text={"Quản lý"}
                textcolor="text-white"
                bgcolor="bg-secondary2"
                px="px-12"
                onClick={() => setIsShowMenu((prev) => !prev)}
                IcAfter={FaChevronDown}
              />
              {isShowMenu && (
                <div className="absolute min-w-200 top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col ">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        className="hover:text-orange-500 flex items-center gap-1 text-blue-500 border-b border-gray-200 py-2"
                        key={item.id}
                        to={item?.path}
                      >
                        {item.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                  <span
                    className="cursor-pointer flex items-center gap-1 hover:text-orange-500 text-blue-500 border-b border-gray-200 py-2"
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout());
                    }}
                  >
                    <LuLogOut />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )} */}
          <Button
            text={"Đăng tin mới"}
            textcolor="text-white"
            bgcolor="bg-secondary2"
            IcAfter={AiOutlinePlusCircle}
            onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
