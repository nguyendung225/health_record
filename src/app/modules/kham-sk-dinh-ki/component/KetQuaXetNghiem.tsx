import { OCTTable } from '@oceantech/oceantech-ui'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { ColumnKetQuaXetNghiem } from '../constants/columns'
import { HOA_SINH, HUYET_HOC, VI_SINH_MIEN_DICH_TU_DONG, VI_SINH_TEST_NHANH } from '../constants/fakeData'

type Props = {}

const KetQuaXetNghiem = (props: Props) => {
    return (
        <div className='p-4 tab-content'>
            <Row>
                <Col xs="12">
                    <h5 className='ps-2 mt-5 mb-n5'>Vi sinh - Test nhanh</h5>
                    <OCTTable
                        data={VI_SINH_TEST_NHANH || []}
                        columns={ColumnKetQuaXetNghiem({})}
                        justFilter={true}
                        noPagination
                    />
                </Col>
                <Col xs="12">
                    <h5 className='ps-2 mt-5 mb-n5'>Hóa sinh - Biochemistry</h5>
                    <OCTTable
                        data={HOA_SINH || []}
                        columns={ColumnKetQuaXetNghiem({})}
                        justFilter={true}
                        noPagination
                    />
                </Col>
                <Col xs="12">
                    <h5 className='ps-2 mt-5 mb-n5'>Vi sinh - Miễn dịch tự động</h5>
                    <OCTTable
                        data={VI_SINH_MIEN_DICH_TU_DONG || []}
                        columns={ColumnKetQuaXetNghiem({})}
                        justFilter={true}
                        noPagination
                    />
                </Col>
                <Col xs="12">
                    <h5 className='ps-2 mt-5 mb-n5'>Huyết học/Hematology</h5>
                    <OCTTable
                        data={HUYET_HOC || []}
                        columns={ColumnKetQuaXetNghiem({})}
                        justFilter={true}
                        noPagination
                    />
                </Col>
            </Row>
        </div>
    )
}

export default KetQuaXetNghiem