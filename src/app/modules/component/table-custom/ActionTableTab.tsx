import { KTSVG } from '../../../../_metronic/helpers';
import { useIntl } from 'react-intl';
import { Col, Row } from 'react-bootstrap';
import TextValidator from "../input-field/TextValidator";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import InputSearch from "../input-field/InputSearch";


function ActionTableTab(props: any) {
    const intl = useIntl();
    const {lang} = useMultiLanguage();

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
      isSearchable,
      handleChangeTextSearch,
      handleKeyDownEnterSearch,
      searchObject,
      handleKeyUpSearch,
      handleSearch,
    } = props;
    return (
        <Row>
            <Col sm={6} md={6} xl={6} xxl={7} className="spaces fs-18 text-header-table fw-600">{title}</Col>
            <Col sm={6} md={6} xl={6} xxl={5} className="spaces p-0 d-flex align-items-center flex-end">
                {selectedRows?.length > 0 && (
                    <>
                        <span className="spaces mr-8">
                            {intl.formatMessage({ id: "SELECTED" })}:
                            <strong className="ps-2">
                                {selectedRows ? selectedRows?.length : 0}
                            </strong>
                        </span>
                        <span
                            className="spaces mr-16 fw-bold text-warning cursor-pointer "
                            onClick={() => handleCheckBoxAll(false)}
                        >
                            {intl.formatMessage({ id: "UNSELECTED" })}
                        </span>
                        {!notDelete &&
                            <div
                                className="delete-box cursor-pointer spaces mr-8"
                                onClick={handleShowConfirmDialog}
                            >
                                <i className="bi bi-trash fs-4 text-danger px-4"></i>
                                <span className="fw-bold text-danger">
                                    {intl.formatMessage({ id: "DELETE" })}
                                </span>
                            </div>
                        }
                    </>
                )}
                {isSearchable && (
                  <InputSearch
                    name="keyword"
                    placeholder={lang("GENERAL.SEARCH")}
                    type={"text"}
                    handleChange={handleChangeTextSearch}
                    value={searchObject.keyword}
                    handleSearch={handleSearch}
                    onKeyDown={handleKeyDownEnterSearch}
                    onKeyUp={handleKeyUpSearch}
                  />
                )}
                {buttonAdd && (
                    <button
                        className="spaces button-primary flex flex-middle mx-8 min-w-105"
                        onClick={(e: any) => {
                            e.preventDefault();
                            handleOpenDialog();
                        }}
                    >
                        <i className="spaces bi bi-plus fs-20 white"></i>
                        <p className="spaces fs-14 m-0 w-max-content">Thêm mới</p>
                    </button>
                )}

                {
                    buttonExportExcel &&
                    <button
                        className="flex flex-middle table-btn outline"
                        onClick={handleExport}
                    >
                        <KTSVG path="/media/icons/export-excel.svg" />{" "}
                        {intl.formatMessage({ id: "BTN.EXPORT" })}
                    </button>
                }
            </Col>

        </Row>
    )
}

export default ActionTableTab