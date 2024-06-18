import { Col, Row } from 'react-bootstrap'
import { OCTTable } from '@oceantech/oceantech-ui'
import { TYPE } from '../../utils/Constant'
import { getColumnsBenhNgheNghiep, getColumnsTaiNanLaoDong, getColumnsVaccinationInfo } from '../constants/columns'
import TrangThaiNhanSu from './TrangThaiNhanSu'
import { fakeDataTTTC } from '../constants/fakeData'

type Props = {}

const ChiTietTaiNanLaoDong = (props: Props) => {
    return (
        <div className='p-4 tab-content '>
            <Row>
                <Col xs="12">
                    <h4>Tai nạn lao động</h4>
                </Col>
                <Col xs="12">
                    <OCTTable
                        data={fakeDataTTTC || []}
                        columns={getColumnsTaiNanLaoDong({})}
                        justFilter={true}
                        noPagination={true}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ChiTietTaiNanLaoDong