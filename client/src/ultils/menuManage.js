import icons from "./icons";

const { FaPencil, RiContactsBookUploadLine, MdManageAccounts } = icons;

const menuManage = [
  {
    id: 1,
    text: "Đăng tin mới ",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <FaPencil />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-viet",
    icon: <RiContactsBookUploadLine />,
  },
  {
    id: 4,
    text: "Thông tin tài khoản",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <MdManageAccounts />,
  },
];

export default menuManage;
