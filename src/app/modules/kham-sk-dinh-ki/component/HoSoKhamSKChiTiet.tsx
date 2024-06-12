import { useState } from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap';
import { OCTKTSVG } from '@oceantech/oceantech-ui';
import { useNavigate } from 'react-router-dom';
import TabMenu from '../../component/tabs/TabMenu';
import { HomePage } from '../../../homepage/HomePage';
import KetQuaKhamTongQuat from './KetQuaKhamTongQuat';
import KetQuaXetNghiem from './KetQuaXetNghiem';
import KetQuaChuanDoanHinhAnh from './KetQuaChuanDoanHinhAnh';
import '../style.scss';
type Props = {}

const HoSoKhamSKChiTiet = (props: Props) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string>("");
    const [totalElements, setTotalElements] = useState<number>(0);
    const [numberOfElements, setNumberOfElements] = useState<number>(0);
    const [showAddNewDialog, setShowAddNewDialog] = useState<boolean>(false);

    const handleChange = (e: any) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
    };

    const danhsachTabs = [
        {
            eventKey: "0",
            title: "Kết quả khám tổng quát",
            component: <KetQuaKhamTongQuat />,
        },
        {
            eventKey: "1",
            title: "Kết quả xét nhiệm",
            component: <KetQuaXetNghiem />,
        },
        {
            eventKey: "1",
            title: "Kết quả chuẩn đoán hình ảnh",
            component: <KetQuaChuanDoanHinhAnh />,
        },
    ]

    return (
        <div className='wrapper-content'>
            <Row className='align-items-center py-2'>
                <Col xs="6" className='my-5'>
                    <h4 className='spaces m-0 ps-1'>
                        <span className='cursor-pointer'
                            onClick={() => navigate(-1)}
                        >|<OCTKTSVG path='/media/icons/arrow-long-left.svg' className='text-dark' svgClassName='fs-2 w-auto h-auto me-2' />
                            Quay lại</span>
                    </h4>
                </Col>
                <Col xs="6" className='d-flex flex-center justify-content-end'>
                    <Button
                        className='spaces w-80 button-primary py-4 h-30 mx-4'
                        size='sm'
                        onClick={() => { }}
                    >
                        Lưu
                    </Button>
                </Col>
            </Row>
            <Row className='mx-1 p-0 body-normal'>
                <Col xs="3" className='d-flex flex-column ps-0 pe-1'>
                    <div className='w-100 d-flex flex-column align-items-center person-info'>
                        <Image 
                            className='w-150px h-150px my-5'
                            src='https://cdn1.vectorstock.com/i/1000x1000/80/60/avatar-icon-on-black-round-flat-symbol-vector-21698060.jpg'
                            roundedCircle 
                        />
                        <h3>Trịnh Bùi Quang Huy</h3>
                        <p className='text-primary fs-4'>OCT_000010</p>
                    </div>
                    <div className='bg-white p-4 flex-grow-1'>
                        <ul>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Ngày sinh: <span className='text-dark fw-normal text-end '>01/01/2000 24 tuổi</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Giới tính: <span className='text-dark fw-normal text-end '>Nam</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Địa chỉ: <span className='text-dark fw-normal text-end '>Hà Nội</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Chức vụ: <span className='text-dark fw-normal text-end '>Nhân viên</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Phòng ban: <span className='text-dark fw-normal text-end '>IT</span></span>
                            </li>
                        </ul>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button
                                className='spaces w-110 button-primary-outline py-4 h-30 mx-4 text-center'
                                size='sm'
                                onClick={() => { }}
                            >
                                <i className="bi bi-pencil fs-3 me-2 text-primary"></i>
                                Tùy chỉnh
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col xs="9" className='bg-white ho-so-chi-tiet'>
                    <TabMenu danhsachTabs={danhsachTabs} className='justify-content-start'/>
                </Col>
            </Row>
        </div>
    )
}

export default HoSoKhamSKChiTiet;