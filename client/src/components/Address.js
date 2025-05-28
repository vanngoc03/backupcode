import { memo, useEffect, useState } from "react";
import React from "react";
import { Select } from "./";
import { apiGetPublicProvinces, apiGetPublicDistricts } from "../services";
import { useSelector } from "react-redux";

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {
  const { dataEdit } = useSelector((state) => state.post);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  //console.log(provinces);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    if (dataEdit?.address && provinces.length > 0) {
      let addressArr = dataEdit.address.split(",");
      let foundProvince = provinces.find(
        (item) => item.name === addressArr[addressArr.length - 1]?.trim()
      );
      setProvince(foundProvince || "");
    } else {
      setProvince("");
    }
  }, [provinces, dataEdit]);

  useEffect(() => {
    if (dataEdit?.address && districts.length > 0) {
      let addressArr = dataEdit.address.split(",");
      let foundDistrict = districts.find(
        (item) => item.name === addressArr[addressArr.length - 2]?.trim()
      );
      setDistrict(foundDistrict || "");
    } else {
      setDistrict("");
    }
  }, [districts, dataEdit]);

  // Fetch provinces
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      //console.log(response);
      if (response?.data?.code === "success") {
        setProvinces(response?.data?.data || []); // Set provinces from the API response
      }
    };
    fetchPublicProvince();
  }, []);

  // Fetch districts based on selected province
  useEffect(() => {
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistricts(province?.id);
      //console.log(response);
      if (response?.data?.code === "success") {
        setDistricts(response?.data?.data || []);
      }
    };
    if (province) {
      fetchPublicDistrict();
    } else {
      setDistricts([]);
      setDistrict("");
    }
  }, [province]);
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${district?.name ? `${district.name}, ` : ""}${
        province?.name || ""
      }`,
      province: province?.name ? province?.name : "",
    }));
  }, [province, district]);

  const handleProvinceChange = (value) => {
    const selected = provinces.find((p) => p.id === value);
    setProvince(selected || "");
    setDistrict("");
    setDistricts([]); // Reset districts when province changes
  };

  const handleDistrictChange = (value) => {
    const selected = districts.find((d) => d.id === value);
    setDistrict(selected || "");
  };

  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={province?.id || ""}
            setValue={handleProvinceChange}
            options={provinces}
            label="Tỉnh/Thành Phố"
            type="province"
          />
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={district?.id || ""}
            setValue={handleDistrictChange}
            options={districts}
            label="Quận/Huyện"
            type="district"
          />
        </div>
        <input
          value={`${district?.name ? `${district.name}, ` : ""}${
            province?.name || ""
          }`}
          id="exactly-address"
          type="text"
          readOnly
          className="border border-gray-300 rounded-md bg-slate-200 p-2 w-full outline-none"
        />
      </div>
    </div>
  );
};

export default memo(Address);
