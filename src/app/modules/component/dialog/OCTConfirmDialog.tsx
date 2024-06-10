import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import "./confirmDialog.scss";

interface IConfirmProps {
  show: boolean;
  onCloseClick?: () => void;
  onYesClick?: () => void;
  onCancelClick?: () => void;
  title?: string;
  message?: string;
  yes?: string;
  cancel?: string;
  close?: string;
  isView?: boolean;
  isWarning?: boolean;
}
  
const ConfirmDialog: FC<IConfirmProps> = (props) => {
  const { show, onCloseClick, onYesClick, onCancelClick, title, message, yes, cancel, close, isView, isWarning } = props;

  return (
    <Modal
      show={show}
      onHide={onCloseClick}
      backdrop="static"
      centered
      animation
      aria-labelledby="example-custom-modal-styling-title"
      className="custom-modal confirm-dialog"
    >
      <Modal.Header className={`${isWarning ? "bg-warning" : "bg-primary"} p-3`}>
        <Modal.Title className="text-white text-uppercase">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex text-center">
        <h4 className="spaces m-0">{message}</h4>
      </Modal.Body>

      <Modal.Footer className="flex-center py-4">
        {!isView && yes && (
          <Button
            variant="primary"
            className="button-primary btn-sm"
            type="submit"
            onClick={onYesClick}
          >
            {yes}
          </Button>
        )}
        {cancel && (
          <Button
            variant="outline-secondary"
            className="button-gray-outline btn-sm"
            onClick={onCancelClick}
          >
            {cancel}
          </Button>
        )}
        {close && (
          <Button
            className="btn btn-primary btn-sm"
            onClick={onCloseClick}
          >
            {close}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
