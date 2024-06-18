
export const dsThongTinTiemChung = Array.from({ length: 10 }, (_, i) => ({
    status: "Đã tiêm",
    code: "NV001",
    name: "Nguyễn Thế Tôn Phúc",
    gender: "Nam",
    birthday: "01-01-1990",
    department: "Phòng Kinh doanh",
    position: "Nhân viên",
    vaccineType: "VC-COVID",
    injectionDate: "01-01-2024",
    injections: "001",
    healthStatusAfterInjection: "Bình thường",
    nextDate: "01-01-2025",
}));


export const fakeDataTree = [
    {
        id: "1",
        name: "Tất cả",
        parent: true,
        subs: [
            {
                id: "1-1",
                name: "Loại vaccine",
                subs: [
                    {
                        id: "1-1-1",
                        name: "Covid",
                        subs: [],
                    },
                    {
                        id: "1-1-2",
                        name: "Viêm gan B",
                        subs: [],
                    },
                ],
            },
            {
                id: "1-2",
                name: "Khoa/phòng",
                subs: [
                    {
                        id: "1-2-1",
                        name: "Khoa khám bệnh",
                        subs: [],
                    },
                    {
                        id: "1-2-2",
                        name: "Phòng Tổ chức hành chính",
                        subs: [],
                    },
                    {
                        id: "1-2-3",
                        name: "Phòng Tài chính kế toán",
                        subs: [],
                    },
                ],
            },
            {
                id: "1-3",
                name: "Chức vụ",
                subs: [
                    {
                        id: "1-3-1",
                        name: "Nhân viên",
                        subs: [],
                    },
                    {
                        id: "1-3-2",
                        name: "Quản lý",
                        subs: [],
                    },
                ],
            }
        ],
    },
];

export const TRANG_THAI_NHAN_SU = {
    DANG_LAM_VIEC: "DANG_LAM_VIEC",
    CHUA_LAM_VIEC: "CHUA_LAM_VIEC",
}