import { Col, Row } from 'react-bootstrap'
import { OCTTable } from '@oceantech/oceantech-ui'
import { TYPE } from '../../utils/Constant'
import { getColumnsVaccinationInfo } from '../constants/columns'
import TrangThaiNhanSu from './TrangThaiNhanSu'
import { fakeDataTTTC } from '../constants/fakeData'

type Props = {}

const ChiTietTTTiemChungTab = (props: Props) => {
    return (
        <div className='p-4 tab-content '>
            <Row>
                <Col xs="12">
                    <h4>Thông tin tiêm chủng</h4>
                </Col>
                <Col xs="12">
                    <OCTTable
                        data={fakeDataTTTC || []}
                        columns={getColumnsVaccinationInfo({})}
                        justFilter={true}
                        type={TYPE.MULTILINE}
                        noPagination={true}
                    />
                </Col>
                <Col xs="12" className='mt-4'>
                    <h4>Thông tin tiêm chủng</h4>
                </Col>
                <Col xs="12">
                    {TrangThaiNhanSu("DA_TIEM", "Số mũi đã tiêm")}
                    {TrangThaiNhanSu("CHUA_TIEM", "Số mũi chưa tiêm")}
                    {TrangThaiNhanSu("QUA_HEN", "Số mũi quá hẹn")}
                    {TrangThaiNhanSu("TONG_SO_MUI", "Tổng số mũi tiêm")}
                </Col>
            </Row>
        </div>
    )
}

export default ChiTietTTTiemChungTab