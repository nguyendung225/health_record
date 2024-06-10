/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import {
  handlePagesChange,
  handleRowsPerPageChange,
  rowsForPage,
} from "../../utils/PageUtils";
import { Form } from "react-bootstrap";
import { TYPE, VARIABLE_STRING } from "../../utils/Constant";
import { Col, Row } from "react-bootstrap";
import { OCTKTSVG } from "../ktsvg";
import ActionTableTab from "./OCTActionTableTab";
// import useMultiLanguage from "../../hook/useMultiLanguage";
import ConfirmDialog from "../dialog/OCTConfirmDialog";
import AppContext from "../../context/OCTAppContext";
import { toast } from "react-toastify";
import ChangeColumnDialog from "./OCTChangeColumnDialog";
import TableRow from "./OCTTableRow";
import TablePagination from "./OCTTablePagination";

export interface TableProps {
  id?: string;
  data: any[];
  columns: columnNamesType[];
  headerClasses?: string;
  bodyClasses?: string;
  name?: string;
  height?: number;
  scrollable?: boolean;
  sorting?: boolean;
  noPagination?: boolean;
  fixedColumnsCount?: number;
  totalPages?: number;
  totalElements?: number;
  numberOfElements?: number;
  type?: string;
  objectSearch?: any;
  dataChecked?: any[];
  setDataChecked?: (dataChecked: any) => void;
  handleDoubleClick?: (row: any, index: number) => void;
  noToolbar?: boolean;
  notDelete?: boolean;
  notEdit?: boolean;
  handleDelete?: (ids: any) => any;
  justFilter?: boolean;
  buttonAdd?: boolean;
  buttonExportExcel?: boolean;
  handleOpenDetailDialog?: (row: any) => void;
  handleOpenDialog?: (row: any) => void;
  handleExportExcel?: (row: any) => void;
  dependencies?: string;
  className?: string;
  isActionTableTab?: boolean;
  title?: string;
  unSelectedAll?: boolean;
  deleteConditional?: IDeleteConditional[];
  uniquePrefix?: string;
  setCurIndexSelectSingle?: (index: number | null) => void;
  checkedInit?: boolean;
  clearToolbar?: boolean;
  searchObject?: any;
  setSearchObject?: (row: any) => void;
  buttonExportWord?: boolean;
  handleExportWord?: (row: any) => void;
  isSearchable?: boolean;
  updateTableData?: () => void;
}

type IDeleteConditional = {
  keyPath: string;
  value: any;
};
export interface columnNamesType {
  name: string;
  field: string;
  sorting?: boolean;
  action?: boolean;
  headerStyle?: React.CSSProperties | object;
  cellStyle?: React.CSSProperties | object;
  isVisible?: boolean;
  render?: (
    data: any,
    index: number,
    numericalOrder: number,
    itemList: any
  ) => any;
}

const Table: FC<TableProps> = (props) => {
  const {
    data,
    id,
    headerClasses,
    bodyClasses,
    height,
    scrollable,
    totalPages,
    totalElements,
    numberOfElements,
    noPagination,
    fixedColumnsCount,
    dataChecked,
    setDataChecked,
    handleDoubleClick,
    type,
    noToolbar,
    notDelete,
    notEdit,
    handleDelete,
    justFilter,
    handleOpenDetailDialog,
    handleOpenDialog,
    buttonAdd,
    buttonExportExcel,
    handleExportExcel,
    dependencies,
    className,
    isActionTableTab,
    unSelectedAll,
    title,
    deleteConditional,
    uniquePrefix = "id",
    setCurIndexSelectSingle,
    checkedInit = true,
    clearToolbar,
    searchObject,
    buttonExportWord,
    handleExportWord,
    setSearchObject = () => {},
    isSearchable,
    updateTableData,
  } = props;

  // const { lang } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [itemList, setItemList] = useState<any>(data || []);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isColumnSearch, setIsColumnSearch] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any[]>(dataChecked || []);
  const [searchKeywordObj, setSearchKeywordObj] = useState<any>({});
  const [shouldOpenConfirmDeleteDialog, setShouldOpenConfirmDeleteDialog] =
    useState(false);
  const [shouldOpenChangeColumnDialog, setShouldOpenChangeColumnDialog] =
    useState<boolean>(false);
  const [stickyColumnCount, setStickyColumnCount] = useState<number>(
    fixedColumnsCount || 0
  );
  const [fixedColumnsCSS, setFixedColumnsCSS] = useState<string>("");
  const [visibleColumns, setVisibleColumns] = useState<columnNamesType[]>([]);

  const styles: object = {
    height: height || "auto",
    overflowY: scrollable && "auto",
  };

  const checkBox =
    type === TYPE.MULTILINE && props?.columns[0]?.name !== TYPE.MULTILINE
      ? [
          {
            name: TYPE.MULTILINE,
            field: "",
            headerStyle: {
              maxHeight: "20px",
              minWidth: "20px",
              textAlign: "left",
            },
            cellStyle: {
              textAlign: "left",
            },
            isVisible: true,
            render: (
              rowData: any,
              index: number,
              numericalOrder: number,
              itemList: any
            ) => (
              <Form.Check
                className="checkBox"
                checked={rowData?.isChecked || false}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCheckBox(event?.target?.checked, index, itemList)
                }
              />
            ),
          },
        ]
      : [];

  const checkRadio =
    type === TYPE.SINGLE && props?.columns[0]?.name !== TYPE.SINGLE
      ? [
          {
            name: TYPE.SINGLE,
            field: "",
            headerStyle: {
              maxHeight: "20px",
              minWidth: "20px",
              textAlign: "center",
            },
            cellStyle: {
              textAlign: "center",
            },
            isVisible: true,
            render: (
              rowData: any,
              index: number,
              numericalOrder: number,
              itemList: any
            ) => (
              <Form.Check
                className="checkRadio"
                name="single"
                type={"radio"}
                checked={rowData?.isChecked || false}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCheckRadio(event?.target?.checked, index, itemList)
                }
              />
            ),
          },
        ]
      : [];

  const columns: columnNamesType[] = [
    ...checkRadio,
    ...checkBox,
    ...visibleColumns,
  ].filter((column) => column?.isVisible);
  useEffect(() => {
    setVisibleColumns(
      props.columns.map((column) => ({
        ...column,
        isVisible: true,
      }))
    );
  }, [props.columns]);
  useEffect(() => {
    updateTableData?.();
  }, []);
  useEffect(() => {
    !unSelectedAll && typeof unSelectedAll === "boolean" && setSelectedRows([]);

    if (data && data?.length > 0) {
      if (deleteConditional) {
        data?.forEach((item: any) => {
          let isDelete = deleteConditional?.some(
            (conditional: IDeleteConditional) => {
              let value = getNestedValue(item, conditional.keyPath);
              return value === conditional.value;
            }
          );
          item.isDelete = isDelete;
        });
      }

      if (checkedInit) {
        let selectedRowsIds = selectedRows?.map((row) => row?.[uniquePrefix]);
        let _data = data?.map((item) => {
          return selectedRowsIds.includes(item?.[uniquePrefix])
            ? {
                ...item,
                isChecked: true,
              }
            : item;
        });
        setItemList(_data);
      } else {
        setItemList(data);
      }
    } else {
      setItemList([]);
      setIsCheckAll(false);
    }
  }, [data]);
  useEffect(() => {
    if (type && fixedColumnsCount) {
      setStickyColumnCount(fixedColumnsCount + 1);
    } else if (!type && fixedColumnsCount) {
      setStickyColumnCount(fixedColumnsCount);
    } else if (type && !fixedColumnsCount) {
      setStickyColumnCount(1);
    } else {
      setStickyColumnCount(0);
    }
    if (stickyColumnCount) {
      let stickyColumns = document.querySelectorAll(`.sticky-column-${id}`);
      let leftOffset = 0;
      let columnsArray = Array.from(stickyColumns);

      columnsArray.forEach((column: any) => {
        column.style.left = leftOffset + "px";
        leftOffset += column.offsetWidth;
      });
    }
  }, [visibleColumns, dependencies, stickyColumnCount]);

  useEffect(() => {
    setFixedColumnsCSS(
      Array.from({ length: stickyColumnCount }, (_, index) => {
        return `
        #${id} td:nth-child(${index + 1}) {
          position: -webkit-sticky;
          position: sticky;
          z-index: 1;
        }
  
        #${id} th:nth-child(${index + 1}) {
          position: -webkit-sticky;
          position: sticky;
          background-color: $color-silver !important  ;
          z-index: 1;
        }
      `;
      }).join("\n")
    );
  }, [dependencies, stickyColumnCount]);
  useEffect(() => {
    if (itemList?.length > 0) {
      checkedAll(itemList);
    }
  }, [itemList]);
  useEffect(() => {
    handleRenderStickyColumns();
  }, [columns, id, dependencies]);
  const handleChangeSearchObject = (name: string, value: any) => {
    switch (name) {
      case VARIABLE_STRING.PAGE_SIZE: {
        setSearchObject({
          ...searchObject,
          [name]: value,
          [VARIABLE_STRING.PAGE_INDEX]: 1,
        });
        break;
      }
      default:
        setSearchObject({
          ...searchObject,
          [name]: value,
        });
    }
  };

  function getNestedValue(obj: any, keyPath: string) {
    let keys = keyPath.split(".");

    for (let key of keys) {
      if (obj && obj.hasOwnProperty(key)) {
        obj = obj[key];
      } else {
        return null;
      }
    }
    return obj;
  }

  const checkedAll = (listData: any[]) => {
    let data = listData.filter((item: any) => item?.isChecked);
    setIsCheckAll(
      data?.length === 0 ? false : data?.length === listData?.length
    );
  };
  const handleChangeValueInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeywordObj({
      ...searchKeywordObj,
      [event.target.name]: event.target.value,
    });
  };
  // const handleChangeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchObject({
  //     ...searchObject,
  //     [event.target.name]: event.target.value
  //   });
  // };
  const handleCheckBox = (checked: boolean, index: number, listData: any) => {
    listData[index].isChecked = checked;
    setItemList([...listData]);
    let updatedSelectedRows = [...selectedRows];
    const selectedItem = listData[index];
    if (checked) {
      updatedSelectedRows.push(selectedItem);
    } else {
      updatedSelectedRows = updatedSelectedRows.filter(
        (item: any) => item?.[uniquePrefix] !== selectedItem?.[uniquePrefix]
      );
    }
    setSelectedRows(updatedSelectedRows);
    setDataChecked && setDataChecked(updatedSelectedRows);
  };

  const handleCheckRadio = (checked: boolean, index: number, listData: any) => {
    listData[index].isChecked = checked;
    listData.map((element: any, indexData: number) => {
      element.isChecked = indexData === index;
      return element;
    });
    setItemList([...listData]);
    setSelectedRows([listData[index]]);
    setDataChecked && setDataChecked([listData[index]]);
    setCurIndexSelectSingle && setCurIndexSelectSingle(index);
  };

  const handleCheckBoxAll = (checked: boolean) => {
    itemList.map((element: any) => {
      element.isChecked = checked;
      return element;
    });
    setItemList([...itemList]);

    let updatedSelectedRows = [...selectedRows];
    itemList.forEach((element: any) => {
      const index = updatedSelectedRows?.findIndex(
        (item: any) => item?.[uniquePrefix] === element?.[uniquePrefix]
      );
      if (checked && !(index > -1)) {
        updatedSelectedRows.push(element);
        return;
      }

      if (!checked && index > -1) {
        updatedSelectedRows.splice(index, 1);
        return;
      }
    });
    setSelectedRows(updatedSelectedRows);
    setDataChecked && setDataChecked(updatedSelectedRows);
  };

  const handleUnCheckBoxAll = () => {
    itemList.map((element: any) => {
      element.isChecked = false;
      return element;
    });
    setItemList([...itemList]);
    setSelectedRows([]);
    setDataChecked && setDataChecked([]);
  };

  const handleConfirmedDelete = async () => {
    try {
      let ids = selectedRows?.map((row) => row?.[uniquePrefix])?.toString();
      if (handleDelete) {
        setPageLoading(true);
        const success = await handleDelete(ids);
        if (success) {
          setSelectedRows([]);
          setShouldOpenConfirmDeleteDialog(false);
        }
      }
    } catch (error) {
    } finally {
      setPageLoading(false);
    }
  };

  const handleRenderStickyColumns = () => {
    let stickyColumns = document.querySelectorAll(`.sticky-column-${id}`);
    let leftOffset = 0;
    stickyColumns.forEach(function (column) {
      (column as HTMLElement).style.left = leftOffset + "px";
      (column as HTMLElement).style.zIndex = "0";
      leftOffset += (column as HTMLElement).offsetWidth;
    });
  };

  const handleShowConfirmDialog = () => {
    if (deleteConditional && deleteConditional?.length > 0) {
      const isDelete = selectedRows.every((row) => row.isDelete);
      if (!isDelete) {
        toast.warning("Danh sách đã chọn chứa bản ghi không thể xóa");
        return;
      }
    }
    setShouldOpenConfirmDeleteDialog(true);
  };

  const handleExport = (e: any) => {
    e.preventDefault();
    let ids = selectedRows?.map((row: any) => row?.id);
    handleExportExcel && handleExportExcel(ids);
  };

  return (
    <div id={id} className={className ? className : ""}>
      <style>{fixedColumnsCSS}</style>
      <div
        className={`table-toolbar rounded-top ${clearToolbar ? "p-0" : "py-3"}`}
      >
        {isActionTableTab ? (
          <ActionTableTab
            title={title}
            buttonAdd={buttonAdd}
            buttonExportExcel={buttonExportExcel}
            handleOpenDialog={handleOpenDialog}
            handleExport={handleExport}
            selectedRows={selectedRows}
            handleCheckBoxAll={handleCheckBoxAll}
            notDelete={notDelete}
            handleShowConfirmDialog={handleShowConfirmDialog}
            isSearchable={isSearchable}
            updateTableData={updateTableData}
            searchKeywordObj={searchKeywordObj}
            setSearchKeywordObj={setSearchKeywordObj}
          />
        ) : (
          <Row>
            {!justFilter ? (
              <Col xs={10} className="d-flex align-items-center">
                {buttonAdd && (
                  <button
                    className="spaces button-primary flex flex-middle mr-16"
                    onClick={handleOpenDialog}
                    type="button"
                  >
                    <i className="spaces bi bi-plus fs-20 white"></i>
                    <p className="spaces fs-14 m-0 ">Thêm mới</p>
                  </button>
                )}

                {buttonExportExcel && (
                  <button
                    className="spaces flex flex-middle table-btn outline mr-16"
                    onClick={handleExport}
                    type="button"
                  >
                    <OCTKTSVG path="/media/icons/export-excel.svg" />{" "}
                    {"Xuất Excel"}
                  </button>
                )}

                {buttonExportWord && (
                  <button
                    className="spaces flex flex-middle table-btn outline mr-16"
                    onClick={handleExportWord}
                    type="button"
                  >
                    <OCTKTSVG path="/media/icons/export-word.svg" />{" "}
                    {"Xuất word"}
                  </button>
                )}

                {selectedRows?.length > 0 && (
                  <>
                    <span className="spaces mr-16">
                      {"Đã chọn"}:
                      <strong className="ps-2">
                        {selectedRows ? selectedRows?.length : 0}
                      </strong>
                    </span>
                    <span
                      className="spaces mr-16 fw-bold text-warning cursor-pointer "
                      onClick={() => handleUnCheckBoxAll()}
                    >
                      {isCheckAll ? "Bỏ chọn tất cả" : "Bỏ chọn"}
                    </span>
                    {!notDelete && (
                      <div
                        className="delete-box cursor-pointer spaces mr-16"
                        onClick={handleShowConfirmDialog}
                      >
                        <i className="bi bi-trash fs-4 text-danger px-4"></i>
                        <span className="fw-bold text-danger">{"Xóa"}</span>
                      </div>
                    )}
                  </>
                )}
              </Col>
            ) : (
              <Col xs={10}></Col>
            )}
            {!noToolbar && (
              <Col xs={2} className="flex-end d-flex gap-4">
                {!justFilter && (
                  <button
                    className="button-primary-outline"
                    onClick={() => {
                      setShouldOpenChangeColumnDialog(true);
                    }}
                  >
                    <OCTKTSVG
                      path={"/media/icons/filter.svg"}
                      className="svg-icon-filter spaces mr-4"
                    />
                    Bộ lọc
                  </button>
                )}
              </Col>
            )}
          </Row>
        )}
      </div>
      <div className="table-responsive customs-collapse-row m-0" style={styles}>
        <table
          className="table-row-dashed dataTable table w-100 border-bottom border-b-2"
          id="kt_table_users"
        >
          <thead
            className={clsx(headerClasses, "position-sticky top-0 z-index-1")}
          >
            <tr className="text-header-table fw-600 fw-bolder text-capitalize-first gs-0 border">
              {columns?.map((column: columnNamesType, index: number) => {
                return (
                  <th
                    key={column?.field + index}
                    className={clsx(
                      `p-table text-center bg-header-table ${
                        type && index === 0 ? "w-50px" : ""
                      } ${
                        index <= stickyColumnCount
                          ? `sticky-column sticky-column-${id}`
                          : ""
                      }`,
                      !column?.headerStyle
                    )}
                    style={column?.headerStyle}
                  >
                    {type && index === 0 ? (
                      <>
                        {type === TYPE.MULTILINE && (
                          <Form.Check
                            className="checkBox"
                            checked={isCheckAll}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleCheckBoxAll(event.target.checked)
                            }
                          />
                        )}
                      </>
                    ) : (
                      <div>
                        <div>{column?.name}</div>
                        {isColumnSearch && (
                          <input
                            onChange={handleChangeValueInput}
                            name={column.field}
                            className=" input-search form-control mt-2"
                          />
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={clsx(bodyClasses)}>
            {itemList?.length > 0 ? (
              itemList?.map((row: any, index: number) => (
                <tr
                  key={index}
                  className={`
                    border-bottom
                    border
                    ${row?.isChecked ? "bg-table-active" : ""}
                  `}
                  onClick={() =>
                    type === TYPE.SINGLE
                      ? handleCheckRadio?.(true, index, itemList)
                      : {}
                  }
                  onDoubleClick={() => {
                    !notEdit &&
                      handleDoubleClick &&
                      handleDoubleClick(row, index);
                  }}
                >
                  <TableRow
                    idTable={id}
                    dependencies={dependencies}
                    row={row}
                    index={index}
                    searchObject={searchObject}
                    columns={columns}
                    itemList={itemList}
                    stickyColumnCount={stickyColumnCount}
                    handleOpenDetailDialog={handleOpenDetailDialog}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center border">
                  {"Không có bản ghi nào"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!noPagination && (
        <TablePagination
          page={searchObject?.pageIndex || 1}
          setPage={(pageIndex) =>
            handleChangeSearchObject(VARIABLE_STRING.PAGE_INDEX, pageIndex)
          }
          handlePagesChange={handlePagesChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          rowsForPage={rowsForPage}
          rowsPerPage={searchObject?.pageSize}
          setRowsPerPage={(pageSize) =>
            handleChangeSearchObject(VARIABLE_STRING.PAGE_SIZE, pageSize)
          }
          totalPages={totalPages || 0}
          totalElements={totalElements || 0}
          numberOfElements={numberOfElements || 0}
        />
      )}

      {shouldOpenConfirmDeleteDialog && (
        <ConfirmDialog
          show={shouldOpenConfirmDeleteDialog}
          title={"Xác nhận xóa"}
          message={"Bạn có muốn xóa không?"}
          yes={"Xác nhận"}
          onYesClick={handleConfirmedDelete}
          cancel={"Hủy"}
          onCancelClick={() => setShouldOpenConfirmDeleteDialog(false)}
        />
      )}

      {shouldOpenChangeColumnDialog && (
        <ChangeColumnDialog
          columns={visibleColumns}
          handleClose={() => {
            setShouldOpenChangeColumnDialog(false);
          }}
          handleDragColumns={(columns) => setVisibleColumns(columns)}
        />
      )}
    </div>
  );
};

export default Table;
