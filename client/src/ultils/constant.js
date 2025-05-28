export const path = {
  HOME: "/*",
  HOME__PAGE: ":page",
  LOGIN: "login/*",
  CHO_THUE_CAN_HO: "cho-thue-can-ho",
  CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
  CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
  NHA_CHO_THUE: "nha-cho-thue",
  DETAIL_POST__TITLE__POSTID: "chi-tiet/:title/:postId",
  SEARCH: "tim-kiem",
  SYSTEM: "/he-thong/*",
  CREATE_POST: "tao-moi-bai-dang",
  MANAGE_POST: "quan-ly-bai-viet",
  EDIT_ACCOUNT: "sua-thong-tin-ca-nhan",
  CONTACT: "lien-he",
  DETAIL_ALL: "chi-tiet/*",
  DETAIL: "/chi-tiet/",
  ADMINPOST: "quan-ly-bai-dang",
  ADMINUSER: "quan-ly-nguoi-dung",
};

export const text = {
  HOME_TITLE: "Diễn đàn tìm kiếm phòng trọ, căn hộ hàng đầu.",
  HOME_DESCRIPTION:
    "Website cho thuê trọ giúp tìm kiếm và đăng tin nhanh chóng, dễ dàng với bộ lọc thông minh và thông tin minh bạch.",
};

export const location = [
  {
    id: "hcm",
    name: "Phòng trọ Hồ Chí Minh",
    image:
      "https://kinhtevadubao.vn/stores/news_dataimages/anhptp/082022/08/16/3743_ho-chi-minh.jpg?rt=20220808163744",
    provinceCode: "CUID",
  },
  {
    id: "dn",
    name: "Phòng trọ Hà Nội",
    image:
      "https://cdn.tuoitrethudo.vn/stores/news_dataimages/2024/072024/16/10/ho-hoan-kiem-718520240716105044.jpg?rt=20240716105336",
    provinceCode: "NDOE",
  },
  {
    id: "hn",
    name: "Phòng trọ Đà Nẵng",
    image:
      "https://tourism.danang.vn/wp-content/uploads/2023/02/cau-rong-da-nang.jpeg",
    provinceCode: "NNAE",
  },
];
