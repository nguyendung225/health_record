import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { OCTAutocomplete, OCTTextValidator } from '@oceantech/oceantech-ui'
import CheckboxField from '../../component/input-field/CheckboxField'
import { Formik } from 'formik'

type Props = {}

const ChiTietTTSucKhoeTab = (props: Props) => {
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
                                <h4>Thông tin sức khỏe</h4>
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Số thẻ BHYT`}
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Nơi ĐKKCB BĐ'
                                    isReadOnly
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Nơi đăng ký KCB'
                                    isReadOnly
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Mã số nơi đăng ký KCB`}
                                    readOnly={true}
                                    name="code"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="4" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Lần khám sức khỏe định ký gần nhất'
                                    isReadOnly
                                />
                            </Col>
                        </Row>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ChiTietTTSucKhoeTab