import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SelectField from '../../component/input-field/SelectField'
import Autocomplete from '../../component/input-field/Autocomplete'
import { OCTAutocomplete, OCTTextValidator } from '@oceantech/oceantech-ui'

type Props = {}

const ChiTietTTChungTab = (props: Props) => {
    return (
        <div className='p-4 tab-content '>
            <Row className="Chi-Tiet-Thong-Tin-Chung">
                <Col xs="12">
                    <h4>Thông tin chung</h4>
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTTextValidator
                        className=""
                        lable={`ID nhân viên`}
                        readOnly={true}
                        name="id"
                        value={"MS001"}
                        type="text"
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTTextValidator
                        className=""
                        lable={`Mã nhân viên`}
                        isRequired
                        readOnly={true}
                        name="code"
                        value={"MS001"}
                        type="text"
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTTextValidator
                        className=""
                        lable={`Họ và tên`}
                        readOnly={true}
                        isRequired
                        name="code"
                        value={"MS001"}
                        type="text"
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTTextValidator
                        className=""
                        lable={`Bí danh`}
                        readOnly={true}
                        name="code"
                        value={"MS001"}
                        type="text"
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTAutocomplete
                        options={[]}
                        lable='Giới tính'
                        isReadOnly
                        isRequired
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTTextValidator
                        className=""
                        lable={`Ngày sinh`}
                        readOnly={true}
                        isRequired
                        name="code"
                        type="date"
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTAutocomplete
                        options={[]}
                        lable='Dân tộc'
                        isReadOnly
                        isRequired
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTAutocomplete
                        options={[]}
                        lable='Tôn giáo'
                        isReadOnly
                        isRequired
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTAutocomplete
                        options={[]}
                        lable='Quốc tịch'
                        isReadOnly
                        isRequired
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTTextValidator
                        className=""
                        lable={`Nơi sinh`}
                        readOnly={true}
                        isRequired
                        name="code"
                        value={"MS001"}
                        type="text"
                    />
                </Col>
                <Col xs="8" className='mb-3'>
                    <OCTTextValidator
                        className=""
                        lable={`Nguyên quán`}
                        readOnly={true}
                        name="code"
                        value={"MS001"}
                        type="text"
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTAutocomplete
                        options={[]}
                        lable='Tình trạng hôn nhân'
                        isReadOnly
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTAutocomplete
                        options={[]}
                        lable='Khoa/Phòng'
                        isReadOnly
                    />
                </Col>
                <Col xs="4" className='mb-3'>
                    <OCTAutocomplete
                        options={[]}
                        lable='Loại cán bộ'
                        isReadOnly
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ChiTietTTChungTab