import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { OCTAutocomplete, OCTTextValidator } from '@oceantech/oceantech-ui'
import CheckboxField from '../../component/input-field/CheckboxField'
import { Formik } from 'formik'

type Props = {}

const ChiTietTTTrinhDoDaoTao = (props: Props) => {
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
                                <h4>Thông tin trình độ đào tạo</h4>
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Trình độ giáo dục phổ thông'
                                    isReadOnly
                                    isRequired
                                />
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Trình độ chuyên môn cao nhất`}
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Hính thức đào tạo`}
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Chuyên ngành đào tạo`}
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Năm tốt nghiệp`}
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Cơ sở đào tạo`}
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Trình độ ngoại ngữ cao nhất`}
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Trình độ lý luận chính trị`}
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Trình độ tin học cao nhất`}
                                    readOnly={true}
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="3" className='mb-3'>
                                <OCTTextValidator
                                    className=""
                                    lable={`Trình độ quản lý nhà nước`}
                                    readOnly
                                    name="id"
                                    value={"MS001"}
                                    type="text"
                                />
                            </Col>
                            <Col xs="12" className='mb-3'>
                                <OCTAutocomplete
                                    options={[]}
                                    lable='Kỹ năng mềm'
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

export default ChiTietTTTrinhDoDaoTao