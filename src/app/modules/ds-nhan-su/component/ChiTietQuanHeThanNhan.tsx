import { Col, Row } from 'react-bootstrap'
import { OCTTable } from '@oceantech/oceantech-ui'
import { TYPE } from '../../utils/Constant'
import { getColumnsBenhNgheNghiep, getColumnsTaiNanLaoDong, getColumnsThongTinGiaDinh, getColumnsVaccinationInfo } from '../constants/columns'
import TrangThaiNhanSu from './TrangThaiNhanSu'
import { fakeDataTTTC } from '../constants/fakeData'

type Props = {}

const ChiTietQuanHeThanNhan = (props: Props) => {
    return (
        <div className='p-4 tab-content '>
            <Row>
                <Col xs="12">
                    <h4>Thông tin gia đình</h4>
                </Col>
                <Col xs="12">
                    <OCTTable
                        data={fakeDataTTTC || []}
                        columns={getColumnsThongTinGiaDinh({})}
                        justFilter={true}
                        type={TYPE.MULTILINE}
                        noPagination={true}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ChiTietQuanHeThanNhan