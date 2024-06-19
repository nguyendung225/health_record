import React, { useEffect, useRef } from 'react';
import TinhHinhNhanSu from './component/TinhHinhNhanSu';
import { Col, Row } from 'react-bootstrap';
import NhanSuThamGiaKDK from './component/NhanSuThamGiaKDK';
import BNNTheoDoTuoi from './component/BNNTheoDoTuoi';
import BNNTheoGioiTinh from './component/BNNTheoGioiTinh';
import DenHanKhamSK from './component/DenHanKhamSK';

type Props = {}

const BieuDoThongKe = (props: Props) => {

    return (
        <div>
           <Row className='flex-center mt-10'>
                <Col xs="10">
                    <TinhHinhNhanSu />
                    <p className='text-center fst-italic fs-20 mt-n5 spaces mb-50'>Biểu đồ thống kê tình hình nhân sự</p>
                </Col>
                <Col xs="10">
                    <NhanSuThamGiaKDK />
                    <p className='text-center fst-italic fs-20 mt-n5 spaces mb-150'>Biểu đồ thống kê nhân sự tham gia khám định kì</p>
                </Col>
                <Col xs="10">
                    <BNNTheoDoTuoi />
                    <p className='text-center fst-italic fs-20 mt-n5 spaces mb-150'>Biểu đồ thống kê tỉ lệ bệnh nghề nghiệp theo độ tuổi</p>
                </Col>
                <Col xs="10">
                    <BNNTheoGioiTinh />
                    <p className='text-center fst-italic fs-20 mt-n5 spaces mb-150'>Biểu đồ thống kê tỉ lệ bệnh nghề nghiệp theo giới tính</p>
                </Col>
           </Row>
           
            <Row >
                <Col xs={6}>
                    <DenHanKhamSK />
                    <p className='text-center fst-italic fs-20 mt-n5 spaces mb-150'>Biểu đồ cảnh báo đến hạn khám sức khỏe</p>
                </Col>
                <Col xs={6}>
                    <DenHanKhamSK />
                    <p className='text-center fst-italic fs-20 mt-n5 spaces mb-150'>Biểu đồ cảnh báo đến hạn đăng ký khám sức khỏe</p>
                </Col>
            </Row>
        </div>
    );
}

export default BieuDoThongKe