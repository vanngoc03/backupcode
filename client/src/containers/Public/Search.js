import React, { useCallback, useEffect, useState } from "react";
import { SearchItem, Modal } from "../../components";
import icons from "../../ultils/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { path } from "../../ultils/constant";

const {
  MdOutlineNavigateNext,
  LuBuilding2,
  CiLocationOn,
  MdAttachMoney,
  CiCrop,
  FaDeleteLeft,
  CiSearch,
} = icons;

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("second");
  const { provinces, areas, prices, categories } = useSelector(
    (state) => state.app
  );
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});
  const [defaultText, setDefaultText] = useState("");

  useEffect(() => {
    if (!location?.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);

  const handleShowModal = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setDefaultText(defaultText);
    setIsShowModal(true);
  };

  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsShowModal(false);
      arrMaxMin && setArrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
    },
    [isShowModal, queries]
  );
  const handleSearch = () => {
    //const queryCodes = Object.entries(queries).filter(item => item[0].includes('Code')).filter(item => item[1] )
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((item) => item[1]);
    let queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    //const queryText = Object.entries(queries).filter(item => !item[0].includes('Code'))
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });
    let titleSearch = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả "
    } 
      ${queryTextObj.province ? `, Tại ${queryTextObj.province}` : ""}  
      ${queryTextObj.price ? `, Giá ${queryTextObj.price}` : ""} 
      ${queryTextObj.area ? `, Diện tích ${queryTextObj.area}` : ""}`;
    navigate(
      {
        pathname: `/${path.SEARCH}`,
        search: createSearchParams(queryCodesObj).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <>
      <div className=" p-[10px] w-3/5 my-3 bg-[#EFDCAB] rounded-md flex-col lg:flex-row flex items-center justify-around gap-2">
        <span
          onClick={() => handleShowModal(categories, "category", "Tất cả ")}
          className="flex-1 cursor-pointer"
        >
          <SearchItem
            IconBefore={<LuBuilding2 />}
            fontWeight
            IconAfter={<FaDeleteLeft />}
            text={queries.category}
            defaultText="Tất cả "
          />
        </span>
        <span
          onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
          className="flex-1 cursor-pointer"
        >
          <SearchItem
            IconBefore={<CiLocationOn />}
            IconAfter={<MdOutlineNavigateNext />}
            text={queries.province}
            defaultText="Toàn quốc"
          />
        </span>
        <span
          onClick={() => handleShowModal(prices, "price", "Chọn giá")}
          className="flex-1 cursor-pointer"
        >
          <SearchItem
            IconBefore={<MdAttachMoney />}
            IconAfter={<MdOutlineNavigateNext />}
            text={queries.price}
            defaultText="Chọn giá"
          />
        </span>
        <span
          onClick={() => handleShowModal(areas, "area", "Chọn diện tích")}
          className="flex-1 cursor-pointer"
        >
          <SearchItem
            IconBefore={<CiCrop />}
            IconAfter={<MdOutlineNavigateNext />}
            text={queries.area}
            defaultText="Chọn diện tích"
          />
        </span>
        <button
          type="button"
          className="outline-none py-2 px-4 flex-1 bg-secondary3 text-[13px] flex items-center justify-center gap-2 text-white"
          onClick={handleSearch}
        >
          <CiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          handleSubmit={handleSubmit}
          queries={queries}
          arrMinMax={arrMinMax}
          content={content}
          name={name}
          setIsShowModal={setIsShowModal}
          defaultText={defaultText}
        />
      )}
    </>
  );
};
export default Search;
