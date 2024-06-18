import { useState } from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap';
import { OCTKTSVG } from '@oceantech/oceantech-ui';
import { useNavigate } from 'react-router-dom';
import TabMenu from '../../component/tabs/TabMenu';

import '../styles/style.scss';
import TrangThaiNhanSu from './TrangThaiNhanSu';
import { TRANG_THAI_NHAN_SU } from '../constants/fakeData';
import ChiTietTTChung from './ChiTietTTChungTab';
import ChiTietTTTiemChung from './ChiTietTTTiemChungTab';
import ChiTietTTCongViec from './ChiTietTTCongViecTab';
import ChiTietTTChungTab from './ChiTietTTChungTab';
import ChiTietTTCongViecTab from './ChiTietTTCongViecTab';
import ChiTietTTTiemChungTab from './ChiTietTTTiemChungTab';
import ChiTietTTSucKhoeTab from './ChiTietTTSucKhoeTab';
import ChiTietBenhNgheNghiep from './ChiTietBenhNgheNghiepTab';
import ChiTietTaiNanLaoDong from './ChiTietTaiNanLaoDong';
import ChiTietQuanHeThanNhan from './ChiTietQuanHeThanNhan';
import ChiTietTTTrinhDoDaoTao from './ChiTietTTTrinhDoDaoTao';

type Props = {}

const DSNhanSuChiTiet = (props: Props) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string>("");

    const handleChange = (e: any) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
    };

    const danhsachTabs = [
        {
            eventKey: "0",
            title: <i className="bi bi-person-vcard-fill fs-1"></i>,
            component: <ChiTietTTChungTab />,
        },
        {
            eventKey: "1",
            title: <i className="bi bi-briefcase-fill fs-1"></i>,
            component: <ChiTietTTCongViecTab />,
        },
        {
            eventKey: "2",
            title: <i className="bi bi-heart-fill fs-1"></i>,
            component: <ChiTietTTSucKhoeTab />,
        },
        {
            eventKey: "3",
            title: <i className="bi bi-person-workspace fs-1"></i>,
            component: <ChiTietBenhNgheNghiep />,
        },
        {
            eventKey: "4",
            title: <i className="fa-solid fa-user-injured fs-1"></i>,
            component: <ChiTietTaiNanLaoDong />,
        },
        {
            eventKey: "5",
            title: <i className="fa-solid fa-clipboard-check fs-1"></i>,
            component: <ChiTietTTTrinhDoDaoTao />,
        },
        {
            eventKey: "6",
            title: <i className="bi bi-people-fill fs-1"></i>,
            component: <ChiTietQuanHeThanNhan />,
        },
        {
            eventKey: "7",
            title: <i className="fa-solid fa-syringe fs-1"></i>,
            component: <ChiTietTTTiemChungTab />,
        },
    ]

    return (
        <div className='wrapper-content'>
            <Row className='spaces align-items-center py-12'>
                <Col xs="6" >
                    <h4 className='spaces m-0 ps-1'>
                        <span className='cursor-pointer'
                            onClick={() => navigate(-1)}
                        >|<OCTKTSVG path='/media/icons/arrow-long-left.svg' className='text-dark' svgClassName='fs-2 w-auto h-auto me-2' />
                            Quay lại</span>
                    </h4>
                </Col>
                <Col xs="6" className='d-flex flex-center justify-content-end'>
                    <Button
                        className='spaces w-115 button-primary py-4 h-30 mx-4'
                        onClick={() => { }}
                    >
                        <i className="bi bi-pencil-square text-white fs-2 w-auto h-auto"></i>
                        Sửa
                    </Button>
                    <Button
                        className='spaces w-115 button-primary py-4 h-30 mx-4'
                        onClick={() => { }}
                    >
                        <i className="bi bi-file-earmark-word-fill fs-2 w-auto h-auto"></i>
                        Xuất word
                    </Button>
                </Col>
            </Row>
            <Row className='mx-1 p-0 body-normal'>
                <Col xs="3" className='d-flex flex-column ps-0 pe-1'>
                    <div className='w-100 d-flex flex-column align-items-center person-info'>
                        <Image
                            className='w-150px h-150px my-5'
                            src='https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
                            roundedCircle
                        />
                        <h3>Trịnh Bùi Quang Huy</h3>
                        <p className='text-primary fs-4 mb-2'>OCT_000010</p>
                        {TrangThaiNhanSu(TRANG_THAI_NHAN_SU.DANG_LAM_VIEC , "Đang làm việc")}
                        <p className='fs-4 mb-2'>TT hồ sơ: <span>Chờ tiếp nhận</span></p>
                    </div>
                    <div className='bg-white p-4 flex-grow-1'>
                        <ul>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Ngày sinh: <span className='text-dark fw-normal text-end '>01/01/2000</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Giới tính: <span className='text-dark fw-normal text-end '>Nam</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Nơi sinh: <span className='text-dark fw-normal text-end '>Hà Nội</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>ĐTDĐ: <span className='text-dark fw-normal text-end '>0325468745</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>CCCD: <span className='text-dark fw-normal text-end '>001325468774</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Vị trí: <span className='text-dark fw-normal text-end '>Trưởng khoa</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Chức danh: <span className='text-dark fw-normal text-end '>Bác sĩ CK II</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Phòng ban: <span className='text-dark fw-normal text-end '>Khám bệnh</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Ngày thử việc: <span className='text-dark fw-normal text-end '>22/02/2022</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Ngày chính thức: <span className='text-dark fw-normal text-end '>22/03/2022</span></span>
                            </li>
                            <li className='text-primary w-100 py-2 fw-bold'>
                                <span className='d-flex justify-content-between'>Tính chất LĐ: <span className='text-dark fw-normal text-end '>Chính thức</span></span>
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
                <Col xs="9" className='bg-white nhan-su-chi-tiet'>
                    <TabMenu
                        danhsachTabs={danhsachTabs}
                        className='justify-content-start h-55px'
                        isIconTitle={true}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default DSNhanSuChiTiet;
