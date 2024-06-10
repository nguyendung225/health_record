import React from "react";
// import { useIntl } from 'react-intl';
import { Col, Row } from "react-bootstrap";
import { OCTKTSVG } from "../ktsvg";
import TextValidator from "../input-field/TextValidator";

function ActionTableTab(props: any) {
  // const intl = useIntl();

  const {
    title,
    buttonAdd,
    buttonExportExcel,
    handleOpenDialog,
    handleExport,
    selectedRows,
    handleCheckBoxAll,
    notDelete,
    handleShowConfirmDialog,
    handleChangeValueInput,
    isSearchable,
    handleSearch,
    searchKeywordObj,
    setSearchKeywordObj,
  } = props;
  const hasSelectedRow = selectedRows?.length > 0;
  return (
    <Row>
      <Col
        sm={4}
        xl={6}
        xxl={hasSelectedRow ? 7 : 9}
        className="spaces fs-18 text-header-table fw-600 title-action-tab"
      >
        {title}
      </Col>
      <Col
        sm={8}
        xl={6}
        xxl={hasSelectedRow ? 5 : 3}
        className="d-flex align-items-center flex-end"
      >
        {hasSelectedRow && (
          <>
            <span className="spaces mr-8">
              {"Đã chọn"}:
              <strong className="ps-2">
                {selectedRows ? selectedRows?.length : 0}
              </strong>
            </span>
            <span
              className="fw-bold text-warning cursor-pointer "
              onClick={() => handleCheckBoxAll(false)}
            >
              {"Bỏ chọn"}
            </span>
            {!notDelete && (
              <div
                className="delete-box cursor-pointer spaces mr-8"
                onClick={handleShowConfirmDialog}
              >
                <i className="bi bi-trash fs-4 text-danger px-4"></i>
                <span className="fw-bold text-danger">{"Xóa"}</span>
              </div>
            )}
          </>
        )}
        {isSearchable && (
          <TextValidator
            name="keyword"
            placeholder="Tìm kiếm"
            type={"text"}
            isSearch
            onChange={handleChangeValueInput}
            value={searchKeywordObj.keyword}
            handleSearch={handleSearch}
            // onKeyDown={handleKeyDownEnterSearch}
            // onKeyUp={handleKeyUpSearch}
          />
        )}
        {buttonAdd && (
          <button
            className="spaces button-primary flex flex-middle ml-8"
            onClick={(e: any) => {
              e.preventDefault();
              handleOpenDialog();
            }}
          >
            <i className="spaces bi bi-plus fs-20 white"></i>
            <p className="spaces fs-14 m-0 w-max-content">Thêm mới</p>
          </button>
        )}

        {buttonExportExcel && (
          <button
            className="flex flex-middle table-btn outline spaces ml-8"
            onClick={handleExport}
          >
            <OCTKTSVG path="/media/icons/export-excel.svg" /> {"Xuất Excel"}
          </button>
        )}
      </Col>
    </Row>
  );
}

export default ActionTableTab;
