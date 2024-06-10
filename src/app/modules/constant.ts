
export const inputTypeList = {
    text: 'text',
    select: 'select',
    date: 'date',
    number: 'number',
    file: 'file',
    checkbox: 'checkbox'
};

export const TYPE_CATEGORY ={
    cap:1,
    bac:2,
    chucVuDang:3,
    chucVuDoan:4,
    chuyenNganh:5,
    phuCap:6,
    danToc: 7,
    chucDanh:8,
    phongBan: 9,
    nganHang: 10,
    binhChung: 11,
    chungChi:12,
    tonGiao:13,
    capBacQuanSu: 14,
    chucVuQuanSu: 15,
    hangThuongBenhBinh: 16,
    phongBenh: 17,
    viTriCongViec:28,
    noiDaoTao:31,
    donVi:100,
    nhomChungChi: 34,
    trinhDoDaoTao: 35,
    quanHeGiaDinh: 36,
    kyNangMem: 37,
    trinhDoNgoaiNgu: 38,
    trinhDoTinHoc: 39,
    trinhDoQuanLyNhaNuoc: 40,
    trinhDoLyLuan: 41,
    hinhThucKhenThuong: 42,
    danhHieu: 43,
    loaiThuTuc: 44,
    loaiDieuDong: 45,
    phanLoaiBaoCao: 46
};

export const rowPerPage = [1,5,10,20,30];

export const regex = {
    phone: /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/,
}

export const INIT_SEARCH_OBJECT = {
    pageIndex: 1,
    pageSize: 10
}

export const SUCCESS_CODE = 200;

export const STATUS_NV = {
    DANG_LAM_VIEC : 1,
    THOI_VIEC: 2,
    DINH_CHI_CONG_TAC: 3,
    NGHI_CHE_DO: 4,
    NGHI_KHONG_LUONG: 5
}

export const LIST_STATUS_NV = [
    { code: STATUS_NV.DANG_LAM_VIEC, name: "Đang làm việc", styleClass: " bg-green" },
    { code: STATUS_NV.THOI_VIEC, name: "Thôi việc", styleClass: "bg-slate-gray" },
    { code: STATUS_NV.DINH_CHI_CONG_TAC, name: "Đình chỉ công tác", styleClass: "bg-coral" },
    { code: STATUS_NV.NGHI_CHE_DO, name: "Nghỉ chế độ", styleClass: "bg-amber" },
    { code: STATUS_NV.NGHI_KHONG_LUONG, name: "Nghỉ không lương", styleClass: "bg-purple" },
]

export enum TYPE_OF {
    NUMBER = "number",
    STRING = "string",
    OBJECT = "object"
}