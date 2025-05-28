import icons from "./icons";

const { FaPencil, RiContactsBookUploadLine, MdManageAccounts } = icons;

const memuSidebar = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
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
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <MdManageAccounts />,
  },
  {
    id: 5,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <MdManageAccounts />,
  },
];

export default memuSidebar;
