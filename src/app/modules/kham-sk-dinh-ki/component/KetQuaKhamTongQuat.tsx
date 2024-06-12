import React from 'react'
import { Col, Row } from 'react-bootstrap'

type Props = {}

const KetQuaKhamTongQuat = (props: Props) => {
    return (
        <div className='p-4 tab-content'>
            <Row>
                <Col xs="12">
                    <h4>I. Khám thể lực:</h4>
                </Col>
                <Col xs="6">
                    <ul className='ps-12'>
                        <li>Chiều cao: <span className='ms-2'>178cm</span></li>
                        <li>Cân nặng: <span className='ms-2'>79kg</span></li>
                        <li>BMI: <span className='ms-2'>25.15 kg/m2</span></li>
                        <li>Huyết áp: <span className='ms-2'>139.58 mmHg</span></li>
                        <li>Mạch: <span className='ms-2'>85 lần/phút</span></li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h4>II. Tiền sử:</h4>
                </Col>
                <Col xs="6">
                    <h4 className='ps-2 mb-0'>1. Tiền sử y khoa:</h4>
                    <ul className='ps-12'>
                        <li>Tiền sử nội khoa: <span className='ms-2'>--</span></li>
                        <li>Tiền sử ngoại khoa: <span className='ms-2'>Tôi chưa từng phẫu thuật</span></li>
                        <li>Dị ứng thuốc: <span className='ms-2'>Tôi không bi dị ứng thuốc</span></li>
                        <li>Tiền sử gia đình: <span className='ms-2'>--</span></li>
                    </ul>
                </Col>
                <Col xs="6">
                    <h4 className='ps-2 mb-0'>2. Thói quen:</h4>
                    <ul className='ps-12'>
                        <li>Thuốc lá: <span className='ms-2'>Tôi không hút thuốc</span></li>
                        <li>Vận động: <span className='ms-2'>Tôi không vận động</span></li>
                        <li>Rượu, bia: <span className='ms-2'>Tôi không sử dụng rượu bia</span></li>
                        <li>Cà phê: <span className='ms-2'>--</span></li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h4>III. Khám lâm sàng:</h4>
                </Col>
                <Col xs="6">
                    <h4 className='ps-2 mb-0'>1. Nội khoa - Thạc sĩ, bác sĩ Huỳnh Thị Nhung:</h4>
                    <ul className='ps-12'>
                        <li>Tuần hoàn: <span className='ms-2'>Bình thường</span></li>
                        <li>Hô hấp: <span className='ms-2'>Bình thường</span></li>
                        <li>Tiêu hóa: <span className='ms-2'>Bình thường</span></li>
                        <li>Thận - tiết niệu: <span className='ms-2'>Bình thường</span></li>
                        <li>Cơ xương khớp: <span className='ms-2'>Bình thường</span></li>
                        <li>Thần kinh: <span className='ms-2'>Bình thường</span></li>
                        <li>Tâm thần: <span className='ms-2'>Bình thường</span></li>
                        <li>Nội tiết: <span className='ms-2'>Bình thường</span></li>
                    </ul>
                </Col>
                <Col xs="6">
                    <h4 className='ps-2 mb-0'>2. Ngoại khoa - Thạc sĩ, bác sĩ Huỳnh Thị Nhung:</h4>
                    <ul className='ps-12'>
                        <li>Kết quả khám: <span className='ms-2'>Bình thường</span></li>
                    </ul>
                </Col>
                <Col xs="6">
                    <h4 className='ps-2 mb-0'>3. Mắt - Lương Thị Bích Phượng:</h4>
                    <ul className='ps-12'>
                        <li>Kết quả khám thị lực: <span className='ms-2 d-block'>
                            <p> + Không kính: Mắt trái: 8/10; Mắt phải: 9/10</p>
                            <p> + Có kính: Mắt trái: 10/10; Mắt phải: 10/10</p>
                        </span></li>
                        <li>Kết luận và tư vấn: <span className='ms-2 d-block'>
                        Hai mắt cận thị. Mắt không viêm cấp. Thị lực hai mắt nhìn xa giảm. GIữ vệ sinh mắt, nên tra dung dịch nước muối sinh lý 0.9% hoặc nước mắt nhân tạo hàng ngày. Nếu làm việc máy tính, điện thoại trong thời gian dài nên cho mắt nghỉ ngơi tránh mỏi mắt. Khám chuyên khoa mắt định kỳ 6 tháng/lần.    
                        </span></li>
                    </ul>
                </Col>
                <Col xs="6">
                    <h4 className='ps-2 mb-0'>4. Tai mũi họng - Thạc sĩ, BSCK I Hà Minh Quý:</h4>
                    <ul className='ps-12'>
                        <li>Kết quả khám thính lực: <span className='ms-2 d-block'>
                            <p> + Nói thường: Tai trái: 5; Tai phải: 5</p>
                            <p> + Nói thầm: Tai trái: 0.5; Tai phải: 0.5</p>
                        </span></li>
                        <li>Kết luận và tư vấn: <span className='ms-2 d-block'>
                            Lệch vách ngăn mũi sang trái. Nên súc miệng hàng ngày với nước muối sinh lý để phòng bệnh. Khám sức khỏe định kì 6 tháng/lần.
                        </span></li>
                    </ul>
                </Col>
                <Col xs="6">
                    <h4 className='ps-2 mb-0'>5. Răng hàm mặt - Nguyễn Thị Thu Hương:</h4>
                    <ul className='ps-12'>
                        <li>Kết quả khám: <span className='ms-2 d-block'>
                            <p> + Hàm trên: Bình thường</p>
                            <p> + Hàm dưới: Lệch lạc răng cửa, răng 48 lợi trùm</p>
                        </span></li>
                        <li>Kết luận và tư vấn: <span className='ms-2 d-block'>
                            Lệch lạc răng cửa, răng 48 lợi trùm.
                            Chụp X-quang để kiểm tra và có kế hoạch nhổ răng khôn. Khám răng miệng và lấy cao răng định kỳ 6 tháng/lần.
                        </span></li>
                    </ul>
                </Col>
                <Col xs="6">
                    <h4 className='ps-2 mb-0'>6. Da liễu - Thạc sĩ, BS Huỳnh Thị Nhung:</h4>
                    <ul className='ps-12'>
                        <li>Kết quả khám: <span className='ms-2'>Bình thường</span></li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h4>IV. Tóm tắt khuyến nghị của bác sĩ:</h4>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0'>1. Tóm tắt thông tin sức khỏe:</h4>
                    <>
                        <h4 className='ps-4 mb-0'>1.1 Tình trạng sức khỏe nền:</h4>
                        <ul className='ps-12'>
                            <li>Khách hàng có tiền sử khỏe mạnh</li>
                        </ul>
                    </>
                    <>
                        <h4 className='ps-4 mb-0'>1.2 Kết quả khám lâm sàng và các dịch vụ trong gói:</h4>
                        <p className='ps-2'>1.2.1  Nhận định chung về lâm sàng:</p>
                        <ul className='ps-12'>
                            <li>Thể trạng thừa cân. Thăm khám lâm sàng hiện không phát hiện dấu hiệu bất thường đáng lưu ý</li>
                        </ul>

                        <p className='ps-2'>1.2.2  Một số kết quả cần lưu ý trong gói khám theo chuyên khoa:</p>
                        <ul className='ps-12'>
                            <li>Nội tiết: <span className='ms-2 d-block'>
                                <p> + Tăng nhẹ acid uric máu. Nên điều chỉnh chế độ ăn.</p>
                                <p> + Siêu âm có hình ảnh gan nhiễm mỡ độ II, men gan tăng nhẹ. Xét nghiệm máu có tăng nhẹ: Cholesterol toàn phần, Triglycerid, LDL C (loại mỡ không tốt với cơ thể): Cần thực hiện chế độ ăn và luyện tập.</p>
                                <p>+ Gan mật: Gợi ý polyp túi mật. Khách hàng cần khám định kỳ hàng năm.</p>
                                <p>+ Các kết quả xét nghiệm khác trong gói khấm không có bất thường bệnh lý</p>
                            </span></li>
                        </ul>
                    </>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0'>2. Kết luận:</h4>
                    <ul className='ps-12'>
                        <li>Hiện tình trạng sức khỏe ổn định.</li>
                    </ul>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0'>3. Khuyến cáo về chế độ sinh hoạt, ăn uống:</h4>
                    <ul className='ps-12'>
                        <li>Chế độ ăn: Nên hạn chế ăn phủ tạng động vật (tim, gan, thận, lá lách, óc, lòng,..) trứng vịt/gà/cút lột, trứng cá, cá trích, cá đối, cá mòi. Hạn chế thực phẩm giàu chất đạm: Hải sản, cơm, đậu đỗ hạt và chế phẩm, măng tây. Sô cô la, cacao, trà, cà phê. Hạn chế ăn mỡ động vật. Những thực phẩm nên dùng nhiều: Các loại rau xanh, trái cây tươi. Uống nhiều nước, nước khoáng có bicarbonate.</li>
                        <li>Chế độ sinh hoạt luyện tập: Khách hàng nên tăng cường tập thể dục thường xuyên tối thiểu 30 phút/ngày. Chú ý uống đủ nước hàng ngày (khoảng 2 lít/ngày)</li>
                    </ul>
                </Col>
                <Col xs="12">
                    <h4 className='ps-2 mb-0'>4. Kế hoạch theo dõi và kiểm tra sức khỏe tiếp theo:</h4>
                    <ul className='ps-12'>
                        <li>Hiện tại không mắc viêm gan B. HBsAb âm tính: Hiện tại chưa có miễn dịch với viêm gan B. Nên khá với trung tâm vaccin để được tư vấn và tiêm phòng.</li>
                        <li>Khách hàng nên khám sức khỏe tổng quát định kỳ 12 tháng/lần. Nếu có vấn đề bất thường về sức khỏe cần khám và tư vấn với bác sỹ.</li>
                    </ul>
                </Col>
            </Row>
        </div>
    )
}

export default KetQuaKhamTongQuat