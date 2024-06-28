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
      <div className="m-auto">
        <h3 className="spaces fw-bold color-primary my-12">
          Thông tin thống kê
        </h3>
        <Row>
          <Col xs={12} lg={10} xl={6} xxl={4} className='text-center m-auto'>
            <div className="border border-3 d-flex flex-column spaces p-4 mb-10">
              <TinhHinhNhanSu />
              <p className="text-center fst-italic fs-20 mt-n5 spaces mb-10">
                Biểu đồ thống kê tình hình nhân sự
              </p>
            </div>
          </Col>
          <Col xs={12} lg={10}xl={6} xxl={4} className='text-center m-auto'>
            <div className="border border-3 d-flex flex-column spaces p-4 mb-10">
              <NhanSuThamGiaKDK />
              <p className="text-center fst-italic fs-20 mt-n5 spaces mb-10">
                Biểu đồ thống kê nhân sự tham gia khám định kì
              </p>
            </div>
          </Col>
          <Col xs={12} lg={10}xl={6} xxl={4} className='text-center m-auto'>
            <div className="border border-3 d-flex flex-column spaces p-4 mb-10">
              <BNNTheoDoTuoi />
              <p className="text-center fst-italic fs-20 mt-n5 spaces mb-10">
                Biểu đồ thống kê tỉ lệ bệnh nghề nghiệp theo độ tuổi
              </p>
            </div>
          </Col>
          <Col xs={12} lg={10}xl={6} xxl={4} className='text-center m-auto'>
            <div className="border border-3 d-flex flex-column spaces p-4 mb-10">
              <BNNTheoGioiTinh />
              <p className="text-center fst-italic fs-20 mt-n5 spaces mb-10">
                Biểu đồ thống kê tỉ lệ bệnh nghề nghiệp theo giới tính
              </p>
            </div>
          </Col>
          <Col xs={12} lg={10}xl={6} xxl={4} className='text-center m-auto'>
            <div className="border border-3 d-flex flex-column spaces p-4 mb-10">
              <DenHanKhamSK />
              <p className="text-center fst-italic fs-20 mt-n5 spaces mb-10">
                Biểu đồ cảnh báo đến hạn khám sức khỏe
              </p>
            </div>
          </Col>
          <Col xs={12} lg={10}xl={6} xxl={4} className='text-center m-auto'>
            <div className="border border-3 d-flex flex-column spaces p-4 mb-10">
              <DenHanKhamSK />
              <p className="text-center fst-italic fs-20 mt-n5 spaces mb-10">
                Biểu đồ cảnh báo đến hạn đăng ký khám sức khỏe
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
}

export default BieuDoThongKe