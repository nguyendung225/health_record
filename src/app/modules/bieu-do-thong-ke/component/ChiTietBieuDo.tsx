import React from "react";
import { Button, Modal } from "react-bootstrap"

type props = {
    showModal: boolean,
    setShowModal: (value: boolean) => void;
    chartRef: React.RefObject<HTMLDivElement>;
    title?: string
}

const ChiTietBieuDo = ({ showModal, setShowModal, chartRef, title }: props) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết biểu đồ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    ref={chartRef}
                    style={{ height: '400px', width: '100%' }}
                />
                {title && <p className='text-center fst-italic fs-20 m-0 spaces'>{title}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChiTietBieuDo;