import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { OCTAutocomplete, OCTTextValidator } from '@oceantech/oceantech-ui'
import CheckboxField from '../../component/input-field/CheckboxField'
import { Formik } from 'formik'

type Props = {}

const ChiTietTTCongViecTab = (props: Props) => {
    const initialValues = { myCheckbox: false };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={() => { }}
        >
            {({ handleChange, values }) => (
                <Form>
                    <div className='p-4 tab-content '>
                        <Row className="Chi-Tiet-Thong-Tin-Chung">
                            <Col xs="12">
                                <h4>Thông tin công việc</h4>
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Đơn vị công tác`}
                                    isRequired
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Khoa/Phòng`}
                                    isRequired
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Chức vụ'
                                    isRequired
                                    isReadOnly
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Mã ngạch/Chức danh'
                                    isRequired
                                    isReadOnly
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Bậc'
                                    isRequired
                                    isReadOnly
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Loại hợp đồng'
                                    isReadOnly
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Quản lý trực tiếp'
                                    isReadOnly
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Ngày học việc`}
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="date"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Ngày thử việc`}
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="date"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Ngày tập sự`}
                                    isRequired
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="date"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Ngày chính thức`}
                                    isRequired
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="date"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Ngày nghỉ việc`}
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="date"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Lý do nghỉ`}
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Ngày nghỉ hưu dự kiến`}
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="date"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Ngày nghỉ hưu chính thức`}
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="date"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Tính chất lao động'
                                    isRequired
                                    isReadOnly
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Trạng thái lao động'
                                    isRequired
                                    isReadOnly
                                />
                            </Col>

                            <Col xs="4" className='mb-3 mt-9'>
                                <CheckboxField
                                    className={"d-flex flex-row-reverse justify-content-end"}
                                    value={true}
                                    label='Tham gia công đoàn'
                                    name='active'
                                    handleChange={() => { }}
                                />
                            </Col>

                        </Row>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ChiTietTTCongViecTab