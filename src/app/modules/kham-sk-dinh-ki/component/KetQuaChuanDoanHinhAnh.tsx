import React from 'react'
import { Col, Row } from 'react-bootstrap'

type Props = {}

const KetQuaChuanDoanHinhAnh = (props: Props) => {
    return (
        <div className='p-4 tab-content'>
            <Row>
                <Col xs="12">
                    <h4>Vi sinh - Test nhanh:</h4>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0'>1. Gan - Mật</h4>
                    <ul className='ps-12'>
                        <li>Gan: Kích thước bình thường, bờ đều, nhu mô tăng âm mức độ trung bình, không thấy khối khu trú bất thường.</li>
                        <li>Đường mật trong gan: Không giãn.</li>
                        <li>Túi mật: Co nhỏ (sau ăn), sơ bộ thành có vài nốt tăng âm, nốt lớn nhất d#48mm</li>
                        <li>Tĩnh mạch cửa và tĩnh mạch gan: Không giãn, không có huyết khối</li>
                    </ul>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0'>2. Tụy - Lách</h4>
                    <ul className='ps-12'>
                        <li>Tụy: Kích thước và nhu mô bình thường, không thấy giãn ống tụy</li>
                        <li>Lách: Kích thước bình thường, nhu mô đồng nhất</li>
                    </ul>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0'>3. Hệ tiết niệu</h4>
                    <ul className='ps-12'>
                        <li>Thận phải: Kích thước và nhu mô bình thường, phân biệt tùy vỏ rõ, đài bế thận không giãn, không thấy sỏi.</li>
                        <li>Thận trái: Kích thước và nhu mô bình thường, phân biệt tủy vỏ rõ, đài bể thận không giãn, không thấy sỏi.</li>
                        <li>Bàng quang: Dung tích bình thường, thành mỏng, nhẵn, trong lòng không thấy sỏi</li>
                    </ul>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0'>4. Khảo sát khác</h4>
                    <ul className='ps-12'>
                        <li>Tuyến tiền liệt: Kích thước bình thường, nhu mô đồng nhất, vỏ bọc đều</li>
                        <li>Douglas: Không có dịch</li>
                    </ul>
                </Col>
                <Col xs="12">
                    <p className='ms-4 text-primary text-decoration-underline cursor-pointer'>Xem ảnh</p>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col xs="12">
                    <h4>Chụp Xquang ngực thẳng</h4>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0 text-info'>Mô tả</h4>
                    <ul className='ps-12'>
                        <li>Kích thước bóng tim trong giới hạn bình thường.</li>
                        <li>Trúng thất không rộng.</li>
                        <li>Hai phổi sáng, không thấy. hình mờ bất thường</li>
                        <li>Góc sườn hoành hai bên sáng, nhọn.</li>
                        <li>Không thấy tổn thương khung xương lồng ngực và phần mềm thành ngực.</li>
                    </ul>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0 text-info'>Kết luận</h4>
                    <ul className='ps-12'>
                        <li>Hiện không thấy bất thường có ý nghĩa bệnh lý trên phim chụp Xquang tim phổi.</li>
                    </ul>
                </Col>
                <Col xs="12">
                    <p className='ms-4 text-primary text-decoration-underline cursor-pointer'>Xem ảnh</p>
                </Col>
            </Row>
        </div>
    )
}

export default KetQuaChuanDoanHinhAnh