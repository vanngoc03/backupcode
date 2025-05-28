import React from "react";
import { Select, InputReadOnly, InputFormV2 } from ".";
import { useSelector } from "react-redux";

const targets = [
  { code: "Nam", name: "Nam" },
  { code: "Nữ", name: "Nữ" },
  { code: "Tất cả", name: "Tất cả" },
];

const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  // const handleCategoryChange = (value) => {
  //   console.log("Category selected:", value);
  //   // Nếu bạn muốn làm gì đó khi chọn category, có thể lưu giá trị này vào state
  // };

  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-4">
        <div className="w-1/2">
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            type="category"
            name="categoryCode"
            options={categories.map((c) => ({
              code: c.code,
              value: c.value,
            }))}
            label="Loại chuyên mục"
            value={payload.categoryCode}
            setValue={setPayload}
          />
        </div>
        <div>
          <InputFormV2
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.title}
            setValue={setPayload}
            label="Tiêu đề"
            name="title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="desc">Nội dung mô tả</label>
          <textarea
            value={payload.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e.target.value }))
            }
            onFocus={() => setInvalidFields([])}
            cols="30"
            rows="10"
            id="desc"
            className="w-full rounded-md border outline-none border-gray-300 p-2"
          ></textarea>
          <small className="text-red-500 block w-f">
            {invalidFields?.some((item) => item.name === "description") &&
              invalidFields?.find((item) => item.name === "description")
                ?.message}
          </small>
        </div>

        <div className="w-1/2 flex flex-col gap-4">
          <InputReadOnly
            label="Thông tin liên hệ"
            value={currentData?.name || currentData.username}
          />
          <InputReadOnly label="Điện thoại" value={currentData?.phone} />
          <InputFormV2
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.priceNumber}
            setValue={setPayload}
            small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập 1000000"
            label="Giá cho thuê"
            unit="Đồng"
            name="priceNumber"
          />
          <InputFormV2
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.areaNumber}
            setValue={setPayload}
            label="Diện tích"
            unit="m2"
            name="areaNumber"
          />
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.target}
            setValue={setPayload}
            name="target"
            label="Đối tượng cho thuê"
            options={targets}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
