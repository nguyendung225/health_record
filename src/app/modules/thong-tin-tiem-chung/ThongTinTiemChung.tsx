import { Button, Col, Row } from "react-bootstrap";
import { InputSearch, OCTKTSVG, OCTTable } from "@oceantech/oceantech-ui";
import { TYPE } from "../utils/Constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_ROUTES } from "../../Constant";
import TreeViewPersonnel from "../ds-nhan-su/component/TreeViewPersonnel";
import { dsThongTinTiemChung, fakeDataTree } from "./constants/fakeData";
import { getColumnsPersonnel } from "./constants/columns";

type Props = {}

const ThongTinTiemChung = (props: Props) => {
    const navigate = useNavigate();
    const [totalElements, setTotalElements] = useState<number>(0);
    const [numberOfElements, setNumberOfElements] = useState<number>(0);

    const handleDetailPersonnel = (row: any) => {
        console.log('handleDetailPersonnel: ', row);
        navigate(PATH_ROUTES.DSNS + "/chi-tiet-nhan-su/" + row.code);
    }

    return (
        <>
            <Row className="spaces pt-12 align-items-center">
                <Col xs={4}>
                    <h3 className='spaces m-0 color-primary'>Danh sách tiêm chủng</h3>
                </Col>
                <Col xs={8} className="d-flex flex-center justify-content-end">
                    <InputSearch
                        className='min-w-250px'
                        onChange={() => { }}
                        handleSearch={() => { }}
                        placeholder="Nhập vào đây"
                        isEnter
                    />
                    <Button
                        className='spaces w-100 button-primary py-4 h-30 mx-4'
                        // size='sm'
                        onClick={() => { }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        className='spaces w-120 button-primary-outline py-4 h-31'
                        // size='sm'
                        variant='primary-outline'
                        onClick={() => { }}
                    >
                        Tìm nâng cao
                    </Button>
                </Col>
            </Row>
            <Row className="spaces mt-12 mx-1 bg-white rounded">
                <Col xs={3} className="border-end text-primary">
                    <TreeViewPersonnel
                        data={fakeDataTree}
                        childrenKey="subs"
                        onNodeClick={(node) => { console.log('onNodeClick: ', node) }}
                        title={<span className="text-primary">
                            <i className="fs-3 bi bi-briefcase-fill me-2"></i>
                            Phân loại
                        </span>}
                        hasSearchInput={false}
                    />
                </Col>
                <Col xs={9} className="border-start">
                    <Col xs="9" className='d-flex flex-center justify-content-start mt-5 mb-n2'>
                        <Button
                            className='spaces w-115 button-primary py-4 h-30 mr-4'
                            size='sm'
                            onClick={() => {}}
                        >
                            <OCTKTSVG path='/media/icons/add.svg' className='text-white' svgClassName='fs-2 w-auto h-auto' />
                            Thêm mới
                        </Button>
                        <Button
                            className='spaces w-110 button-primary-outline py-4 h-31 mr-4'
                            size='sm'
                            variant='primary-outline'
                            onClick={() => { }}
                        >
                            <OCTKTSVG path='/media/icons/export-excel.svg' className='text-primary' svgClassName='fs-2 w-auto h-auto' />
                            Xuất Excel
                        </Button>
                    </Col>
                    <Row className="">
                        <Col xs={12}>
                            <OCTTable
                                data={dsThongTinTiemChung || []}
                                columns={getColumnsPersonnel({ handleDetailPersonnel })}
                                justFilter={true}
                                sorting={false}
                                handleOpenDialog={() => { console.log("Thêm mới") }}
                                handleDeleteList={() => { console.log("xóa những") }}
                                totalElements={totalElements}
                                numberOfElements={numberOfElements}
                                height={425}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ThongTinTiemChung;