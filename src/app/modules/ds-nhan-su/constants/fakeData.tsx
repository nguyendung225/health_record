
export const fakeDataPersonnel = [
    {
        code: "NV001",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
    {
        code: "NV002",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
    {
        code: "NV003",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
    {
        code: "NV004",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
    {
        code: "NV005",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
    {
        code: "NV006",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
    {
        code: "NV007",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
    {
        code: "NV008",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
    {
        code: "NV009",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
    {
        code: "NV010",
        name: "Nguyễn Thế Tôn Phúc",
        gender: "Nam",
        birthday: "01/01/1990",
        phone: "0909090909",
        cccd: "123456789",
        address: "Địa chỉ 1",
        department: "Phong Kinh doanh",
        position: "Nhân viên",
    },
]


export const fakeDataTree = [
    {
        id: "1",
        name: "Bệnh viện đa khoa Ocean",
        parent: true,
        subs: [
            {
                id: "1-1",
                name: "Phòng Kế toán",
                subs: [],
            },
            {
                id: "1-2",
                name: "Phòng Tổ chức hành chính",
                subs: [],
            },
            {
                id: "1-3",
                name: "Phòng Tài chính kế toán",
                subs: [],
            },
            {
                id: "1-4",
                name: "Phòng Điều dưỡng",
                subs: [],
            },
            {
                id: "1-5",
                name: "Khoa Cấp cứu",
                subs: [],
            },
            {
                id: "1-6",
                name: "Khoa Xét nghiệm",
                subs: [],
            },
            {
                id: "1-7",
                name: "Khoa Khoa khám bệnh",
                subs: [
                    {
                        id: "1-7-1",
                        name: "Đơn nguyên Khám bệnh",
                        subs: [],
                    },
                    {
                        id: "1-7-2",
                        name: "Đơn nguyên Hồi sức tích sức khám bệnh",
                        subs: [],
                    },
                ],
            },
            {
                id: "1-8",
                name: "Khoa nội tổng hợp",
                subs: [
                    {
                        id: "1-8-1",
                        name: "Đơn nguyên Khám bệnh",
                        subs: [],
                    },
                    {
                        id: "1-8-2",
                        name: "Đơn nguyên Hồi sức tích sức khám bệnh",
                        subs: [],
                    },
                ],
            }
        ],
    },
];

export const fakeDataTTTC = [
    {
        id: "2",
        dateOfInjection: "01/01/2022",
        vaccine: "Vaccine 1",
        typeOfVaccine: "Vaccine 1",
        injections: "1",
        statusHealth: "Đang tiếp theo",
        nextInjections: "01/01/2022",
    },
    {
        id: "3",
        dateOfInjection: "01/01/2022",
        vaccine: "Vaccine 1",
        typeOfVaccine: "Vaccine 1",
        injections: "1",
        statusHealth: "Đang tiếp theo",
        nextInjections: "01/01/2022",
    },
]

export const TRANG_THAI_NHAN_SU = {
    DANG_LAM_VIEC: "DANG_LAM_VIEC",
    CHUA_LAM_VIEC: "CHUA_LAM_VIEC",
    DA_TIEM: "DA_TIEM",
    CHUA_TIEM: "CHUA_TIEM",
    QUA_HEN: "QUA_HEN",
    TONG_SO_MUI: "TONG_SO_MUI",
}

