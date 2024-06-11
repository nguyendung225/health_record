
export const ColumnDSKhamSKDinhKi = (props: any) => {
    return [
        {
            name: "STT",
            field: "stt",
            headerStyle: {
                minWidth: "40px",
                textAlign: "center"
            },
            render: (row: any, index: number, numericalOrder: number) => (
                <span>{numericalOrder}</span>
            )
        },
        {
            name: "Trạng thái",
            field: "status",
            headerStyle: {
                minWidth: "150px",
                textAlign: "center"
            }
        },
        {
            name: "Thời gian",
            field: "date",
            headerStyle: {
                minWidth: "150px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            name: "Cơ sở khám chữa bệnh",
            field: "healthFacilities",
            headerStyle: {
                minWidth: "250px",
            },
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            name: "Địa điểm",
            field: "address",
            headerStyle: {
                minWidth: "350px",
            },
            cellStyle: {
                textAlign: "left"
            }   
        },
        {
            name: "SL",
            field: "quantity",
            headerStyle: {
                minWidth: "50px",
                maxWidth: "50px",
            },
            cellStyle: {
                textAlign: "left"
            }
        },
    ];
}

export const ColumnDSKhamSKDinhKiChiTiet = (props: any) => {
    return [
        {
            name: "STT",
            field: "stt",
            headerStyle: {
                minWidth: "40px",
                textAlign: "center"
            },
            render: (row: any, index: number, numericalOrder: number) => (
                <span>{numericalOrder}</span>
            )
        },
        {
            name: "Mã NV",
            field: "code",
            headerStyle: {
                minWidth: "150px",
                textAlign: "center"
            }
        },
        {
            name: "Họ tên",
            field: "name",
            headerStyle: {
                minWidth: "200px",
                textAlign: "center"
            },
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            name: "Ngày sinh",
            field: "birthday",
            headerStyle: {
                minWidth: "150px",
            },
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            name: "Giới tính",
            field: "gender",
            headerStyle: {
                minWidth: "100px",
            },
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            name: "Khám thể lực",
            field: "healthParameters",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                textAlign: "left"
            },
            render: (row: any) => (
                <ul>
                    <li>BMI: {row?.healthParameters?.BMI || ""}</li>
                    <li>Huyết áp: {row?.healthParameters?.bloodPressure || ""}</li>
                    <li>BMI: {row?.healthParameters?.heartbeat || ""}</li> 
                </ul>
            )
        },
        {
            name: "Nội khoa",
            field: "healthParameters",
            headerStyle: {
                minWidth: "250px",
            },
            cellStyle: {
                textAlign: "left"
            },
            render: (row: any) => (
                <ul>
                    {Array.isArray(row?.internalMedicine) && row?.internalMedicine?.map((item: any) => <li>{item || ""}</li>)} 
                </ul>
            )
        },
        {
            name: "Ngoại khoa",
            field: "healthParameters",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                textAlign: "left"
            },
            render: (row: any) => (
                <ul>
                    {Array.isArray(row?.surgery) && row?.surgery?.map((item: any) => <li>{item || ""}</li>)}
                </ul>
            )
        },
        {
            name: "Mắt",
            field: "healthParameters",
            headerStyle: {
                minWidth: "250px",
            },
            cellStyle: {
                textAlign: "left"
            },
            render: (row: any) => (
                <ul>
                    {Array.isArray(row?.eyes) && row?.eyes?.map((item: any) => <li>{item || ""}</li>)}
                </ul>
            )
        },
        {
            name: "Tai-mũi-họng",
            field: "healthParameters",
            headerStyle: {
                minWidth: "250px",
            },
            cellStyle: {
                textAlign: "left"
            },
            render: (row: any) => (
                <ul>
                    {Array.isArray(row?.otolaryngology) && row?.otolaryngology?.map((item: any) => <li>{item || ""}</li>)}
                </ul>
            )
        },
        {
            name: "Răng hàm mặt",
            field: "healthParameters",
            headerStyle: {
                minWidth: "250px",
            },
            cellStyle: {
                textAlign: "left"
            },
            render: (row: any) => (
                <ul>
                    {Array.isArray(row?.dentistry) && row?.dentistry?.map((item: any) => <li>{item || ""}</li>)}
                </ul>
            )
        },
        {
            name: "Da liễu",
            field: "healthParameters",
            headerStyle: {
                minWidth: "200px",
            },
            cellStyle: {
                textAlign: "left"
            },
            render: (row: any) => (
                <ul>
                    {Array.isArray(row?.dermatology) && row?.dermatology?.map((item: any) => <li>{item || ""}</li>)}
                </ul>
            )
        },
    ];
}