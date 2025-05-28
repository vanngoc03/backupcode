import React, { useState } from "react";
import { InputForm, Button } from "../../components";
import Swal from "sweetalert2";

const Contact = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });

  const handleSubmit = () => {
    Swal.fire(
      `Thanks! ${payload.name ? payload.name : ""}`,
      "Phản hồi của bạn đã được ghi nhận.",
      "success"
    ).then(() => {
      setPayload({
        name: "",
        phone: "",
        content: "",
      });
    });
  };
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-6 ">Liên hệ với chúng tôi!</h1>
      <div className="flex gap-4 ">
        <div className="flex-1 flex flex-col gap-4 h-fit bg-green-400 rounded-3xl p-6 text-white bg-gradient-to-br from-[#64c49f] to-[#098d66]">
          <h4 className="font-medium">Thông tin liên hệ</h4>
          <span>
            Cảm ơn Quý Khách đã ghé thăm website cho thuê phòng trọ FullHouse!
          </span>
          <span>Chúng tôi rất vinh dự được đồng hành cùng Quý Khách.</span>
          <span>Điện thoại: 0367258479</span>
          <span>Email: CSKHFullHouse@gmail.com</span>
          <span>Zalo: 0367258479</span>
          <span>Địa chỉ: Lô 01, khu đô thị Vinhome Smart City</span>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-md p-4 mb-6">
          <h4 className="font-medium text-lg mb-4">Liên hệ trực tuyến</h4>
          <div className="flex flex-col gap-4">
            <InputForm
              label="Họ và tên"
              value={payload.name}
              setValue={setPayload}
              keyPayload="name"
            />
            <InputForm
              label="Số điện thoại"
              value={payload.phone}
              setValue={setPayload}
              keyPayload="phone"
            />
            <div>
              <label htmlFor="desc">Nội dung</label>
              <textarea
                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                id="desc"
                cols="30"
                rows="5"
                value={payload.content}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, content: e.target.value }))
                }
                name="content"
              ></textarea>
            </div>
            <Button
              text="Gửi liên hệ"
              bgcolor="bg-blue-500"
              textcolor="text-white"
              fullWidth
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
