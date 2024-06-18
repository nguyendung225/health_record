import { Col, Row } from 'react-bootstrap'
import { OCTTable } from '@oceantech/oceantech-ui'
import { TYPE } from '../../utils/Constant'
import { getColumnsBenhNgheNghiep, getColumnsVaccinationInfo } from '../constants/columns'
import TrangThaiNhanSu from './TrangThaiNhanSu'
import { fakeDataTTTC } from '../constants/fakeData'

type Props = {}

const ChiTietBenhNgheNghiep = (props: Props) => {
    return (
        <div className='p-4 tab-content '>
            <Row>
                <Col xs="12">
                    <h4>Bệnh nghề nghiệp</h4>
                </Col>
                <Col xs="12">
                    <OCTTable
                        data={fakeDataTTTC || []}
                        columns={getColumnsBenhNgheNghiep({})}
                        justFilter={true}
                        noPagination={true}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ChiTietBenhNgheNghiep