import React from 'react';
import { Modal, Button, Col, Row } from 'react-bootstrap';
import { OCTTextValidator } from '@oceantech/oceantech-ui';
interface AddNewDialogProps {
    show: boolean;
    onClose: () => void;
    areaDetail?: any;
}

const AddNewDialog: React.FC<AddNewDialogProps> = ({
    show,
    onClose,
}) => {

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            animation
        >
            <Modal.Header closeButton className='spaces py-15 bg-primary'>
                <Modal.Title className=' text-white'>
                    Thêm mới
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='spaces '>
                <Row className='mb-3'>
                    <Col xs="5">
                        <label className='mt-2 fs-6'>Thời gian bắt đầu</label>
                    </Col>
                    <Col xs="7">
                        <OCTTextValidator
                            name="startDate"
                            type="date"
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs="5">
                        <label className='mt-2 fs-6'>Thời gian kết thúc</label>
                    </Col>
                    <Col xs="7">
                        <OCTTextValidator
                            name="endDate"
                            type="date"
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs="5">
                        <label className='mt-2 fs-6'>Cơ sở khám chữa bệnh</label>
                    </Col>
                    <Col xs="7">
                        <OCTTextValidator
                            name="healthFacilities"
                            type="text"
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs="5">
                        <label className='mt-2 fs-6'>Địa điểm</label>
                    </Col>
                    <Col xs="7">
                        <OCTTextValidator
                            name="address"
                            type="text"
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs="5">
                        <label className='mt-2 fs-6'>Số lượng tham dự</label>
                    </Col>
                    <Col xs="7">
                        <OCTTextValidator
                            name="quantity"
                            type="text"
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center py-2'>
                <Button
                    onClick={onClose}
                    className="spaces button-primary  fs-12 h-30"
                >
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNewDialog;