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
        },
        {
            name: "Vị trí",
            field: "address",
            headerStyle: {
                minWidth: "210px",
                textAlign: "center"
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