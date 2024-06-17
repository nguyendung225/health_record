export const getColumnsPersonnel = ({ handleDetailPersonnel }: any) => {
    return [
        {
            name: "STT",
            field: "",
            headerStyle: {
                minWidth: "40px",
                textAlign: "center"
            },
            render: (row: any, index: number, numericalOrder: number) => (
                <span>{numericalOrder}</span>
            )
        },
        {
            name: "Mã NV",
            field: "code",
            headerStyle: {
                minWidth: "125px",
                textAlign: "center"
            },
            render: (row: any, index: number) => (
                <span className="hyperlink" onClick={() => handleDetailPersonnel(row)}>{row.code}</span>
            )
        },
        {
            name: "Họ và tên",
            field: "name",
            headerStyle: {
                minWidth: "220px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Giới tính",
            field: "gender",
            headerStyle: {
                minWidth: "90px",
                textAlign: "center"
            },
        },
        {
            name: "Ngày sinh",
            field: "birthday",
            headerStyle: {
                minWidth: "115px",
                textAlign: "center"
            },
        },
        {
            name: "Số ĐTDĐ",
            field: "phone",
            headerStyle: {
                minWidth: "115px",
                textAlign: "center"
            },
        },
        {
            name: "CCCD",
            field: "cccd",
            headerStyle: {
                minWidth: "115px",
                textAlign: "center"
            },
        },
        {
            name: "Phòng ban",
            field: "department",
            headerStyle: {
                minWidth: "210px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Vị trí",
            field: "address",
            headerStyle: {
                minWidth: "210px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Chức danh",
            field: "position",
            headerStyle: {
                minWidth: "210px",
                textAlign: "center"
            },
        }
    ]
}

export const getColumnsVaccinationInfo = ({ }: any) => {
    return [
        {
            name: "STT",
            field: "",
            headerStyle: {
                minWidth: "40px",
                textAlign: "center"
            },
            render: (row: any, index: number, numericalOrder: number) => (
                <span>{numericalOrder}</span>
            )
        },
        {
            name: "Ngày tiêm",
            field: "dateOfInjection",
            headerStyle: {
                minWidth: "115px",
                textAlign: "center"
            },
        },
        {
            name: "Vaccine",
            field: "vaccine",
            headerStyle: {
                minWidth: "180px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Loại vaccine",
            field: "typeOfVaccine",
            headerStyle: {
                minWidth: "180px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Mũi tiêm",
            field: "injections",
            headerStyle: {
                minWidth: "125px",
                textAlign: "center"
            },
        },
        {
            name: "Tình trạng SK sau khi tiêm",
            field: "statusHealth",
            headerStyle: {
                minWidth: "330px",
                textAlign: "center"
            },
        },
        {
            name: "Lần tiêm tiếp theo",
            field: "nextInjections",
            headerStyle: {
                minWidth: "210px",
                textAlign: "center"
            },
        },
    ]
}

export const getColumnsBenhNgheNghiep = ({ }: any) => {
    return [
        {
            name: "STT",
            field: "",
            headerStyle: {
                minWidth: "40px",
                textAlign: "center"
            },
            render: (row: any, index: number, numericalOrder: number) => (
                <span>{numericalOrder}</span>
            )
        },
        {
            name: "Ngày phát hiện",
            field: "dateOfInjection",
            headerStyle: {
                minWidth: "115px",
                textAlign: "center"
            },
        },
        {
            name: "Loại bệnh nghề nghiệp",
            field: "vaccine",
            headerStyle: {
                minWidth: "180px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Nguyên nhân",
            field: "typeOfVaccine",
            headerStyle: {
                minWidth: "180px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
    ]
}

export const getColumnsTaiNanLaoDong = ({ }: any) => {
    return [
        {
            name: "STT",
            field: "",
            headerStyle: {
                minWidth: "40px",
                textAlign: "center"
            },
            render: (row: any, index: number, numericalOrder: number) => (
                <span>{numericalOrder}</span>
            )
        },
        {
            name: "Ngày tai nạn",
            field: "dateOfInjection",
            headerStyle: {
                minWidth: "115px",
                textAlign: "center"
            },
        },
        {
            name: "Phân loại tai nạn",
            field: "vaccine",
            headerStyle: {
                minWidth: "180px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Địa điểm",
            field: "typeOfVaccine",
            headerStyle: {
                minWidth: "180px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Nguyên nhân",
            field: "injections",
            headerStyle: {
                minWidth: "125px",
                textAlign: "center"
            },
        },
    ]
}


export const getColumnsThongTinGiaDinh = ({ }: any) => {
    return [
        {
            name: "STT",
            field: "",
            headerStyle: {
                minWidth: "40px",
                textAlign: "center"
            },
            render: (row: any, index: number, numericalOrder: number) => (
                <span>{numericalOrder}</span>
            )
        },
        {
            name: "Quan hệ thân nhân",
            field: "dateOfInjection",
            headerStyle: {
                minWidth: "115px",
                textAlign: "center"
            },
        },
        {
            name: "Họ tên thân nhân",
            field: "vaccine",
            headerStyle: {
                minWidth: "180px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Ngày sinh",
            field: "typeOfVaccine",
            headerStyle: {
                minWidth: "180px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            name: "Mã số thuế NPT",
            field: "injections",
            headerStyle: {
                minWidth: "125px",
                textAlign: "center"
            },
        },
        {
            name: "Giảm trừ",
            field: "injections",
            headerStyle: {
                minWidth: "125px",
                textAlign: "center"
            },
        },
    ]
}