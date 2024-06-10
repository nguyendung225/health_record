import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { TableRow } from "./TableCollapseRow";
import { TablePagination } from "./TablePagination";
import {
  handlePagesChange,
  handleRowsPerPageChange,
  rowsForPage
} from "../../utils/PageUtils";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import { TYPE, VARIABLE_STRING } from "../../utils/Constant";
import { Col, Row } from "react-bootstrap";
import { ChangeColumnDialog } from "./ChangeColumnDialog";
import { KTSVG } from "../../../../_metronic/helpers";
import ActionTableTab from "./ActionTableTab";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import AppContext from "../../../AppContext";
import { toast } from "react-toastify";
import CustomTooltip from "../CustomTooltip";
import {DELETE_TYPE} from "../../../Constant";
import {handleKeyDown, handleKeyUp} from "../../../AppFunction";

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
  handleDeleteList?: (ids: any) => any;
  justFilter?: boolean;
  buttonAdd?: boolean;
  buttonDelete?: boolean;
  buttonEdit?: boolean;
  buttonView?: boolean;
  actionColumnComponent?: React.ReactNode;
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
  page?: number;
  setPage?: (page: any) => void;
  rowsPerPage?: number;
  setRowsPerPage?: (row: any) => void;
  handleDelete?: (row: any) => void;
  handleEdit?: (row: any) => void;
  handleView?: (row: any) => void;
  actionStyle?: React.CSSProperties;
  isSearchable?: boolean;
  updateTableData?: () => void;
}

type IDeleteConditional = {
  keyPath: string;
  value: any;
};

export type CellType = TYPE.TEXT | TYPE.NUMBER | TYPE.MONEY | TYPE.DATE;

export interface columnNamesType {
  name: string;
  field: string;
  sorting?: boolean;
  action?: boolean;
  type?: CellType;
  minWidth?: number | string;
  maxWidth?: number | string;
  width?: number | string;
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


const TableCustom: FC<TableProps> = (props) => {
  const {
    data,
    id,
    headerClasses,
    bodyClasses,
    height,
    scrollable,
    totalElements= 0,
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
    setSearchObject = () => {},
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    handleDeleteList,
    actionStyle,
    isSearchable,
    updateTableData,
  } = props;

  const { lang } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [itemList, setItemList] = useState<any>(data || []);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any[]>(dataChecked || []);
  const [shouldOpenConfirmDeleteDialog, setShouldOpenConfirmDeleteDialog] = useState(false);
  const [shouldOpenChangeColumnDialog, setShouldOpenChangeColumnDialog] = useState<boolean>(false);
  const [stickyColumnCount, setStickyColumnCount] = useState<number>(fixedColumnsCount || 0);
  const [fixedColumnsCSS, setFixedColumnsCSS] = useState<string>("");
  const [deleteType, setDeleteType] = useState<number>(0);
  const [currentRowData, setCurrentRowData] = useState<any>(null);

  const [visibleColumns, setVisibleColumns] = useState<columnNamesType[]>(
    props.columns.map((column) => ({
      ...column,
      isVisible: true
    }))
  );

  const handleChangeSearchObject = (name: string, value: any) => {
    switch (name) {
      case VARIABLE_STRING.PAGE_SIZE: {
        setRowsPerPage?.(value);
        setSearchObject({
          ...searchObject,
          [name]: value,
          [VARIABLE_STRING.PAGE_INDEX]: 1
        })
        break;
      }
      case VARIABLE_STRING.PAGE_INDEX: {
        setPage?.(value);
        setSearchObject({
          ...searchObject,
          [name]: value
        })
        break;
      }
      default:
        setSearchObject({
          ...searchObject,
          [name]: value
        })

    }
  }

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

  useEffect(() => {

    (!unSelectedAll && typeof unSelectedAll === 'boolean') && setSelectedRows([]);

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
              isChecked: true
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

  const checkedAll = (listData: any[]) => {
    let data = listData.filter((item: any) => item?.isChecked);
    setIsCheckAll(data?.length === 0 ? false : (data?.length === listData?.length));
  };


  const styles: object = {
    height: height || "auto",
    overflowY: scrollable && "auto"
  };

  const checkBox =
    type === TYPE.MULTILINE && props?.columns[0]?.name !== TYPE.MULTILINE
      ? [
        {
          name: TYPE.MULTILINE,
          field: "",
          headerStyle: {
            maxHeight: "20px",
            width: "20px",
            textAlign: "left"
          },
          cellStyle: {
            textAlign: "left",
            paddingLeft: "10px"
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
          )
        }
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
            textAlign: "center"
          },
          cellStyle: {
            textAlign: "center",
            paddingLeft: "10px"
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
          )
        }
      ]
      : [];

  const actionsColumn: columnNamesType[] = [
    {
      name: lang("TABLE.ACTION"),
      field: "action",
      isVisible: Boolean(props.buttonDelete || props.buttonEdit || props.actionColumnComponent),
      headerStyle: {
        width: 100,
        ...actionStyle,
      },
      cellStyle: {
        // width: 100,
        ...actionStyle,
      },
      render: (rowData: any) => (
        <div>
          <ButtonGroup size="sm" >
            {props.buttonDelete && (
              <CustomTooltip title={lang("BTN.DELETE")}>
                <Button
                  onClick={() => handleShowConfirmDialog(DELETE_TYPE.SINGLE_DELETE, rowData)}
                  variant="outline-danger"
                  className="hover-white"
                >
                  <i className="bi bi-trash-fill px-0" color="inherit"></i>
                </Button>
              </CustomTooltip>
            )}
            {props.buttonEdit && (
              <CustomTooltip title={lang("BTN.EDIT")}>
                <Button
                  onClick={() => props.handleEdit?.(rowData)}
                  variant="outline-warning"
                  className="hover-white"
                >
                  <i className="bi bi-pencil-fill px-0"></i>
                </Button>
              </CustomTooltip>
            )}
            {props.buttonView && (
              <CustomTooltip title={lang("BTN.VIEW")}>
                <Button
                  onClick={() => props.handleView?.(rowData)}
                  variant="outline-primary"
                  className="hover-white"
                >
                  <i className="bi bi-eye-fill px-0" color="inherit"></i>
                </Button>
              </CustomTooltip>
            )}
          </ButtonGroup>
          {props.actionColumnComponent}
        </div>
      )
    },
  ];

  const columns: columnNamesType[] = [
    ...checkRadio,
    ...checkBox,
    ...actionsColumn,
    ...visibleColumns,
  ].filter((column) => column?.isVisible);

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

  const handleChangeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchObject({
      ...searchObject,
      [event.target.name]: event.target.value
    });
  };

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

  useEffect(() => {
    if (itemList?.length > 0) {
      checkedAll(itemList);
    }
  }, [itemList]);

  const handleConfirmedDelete = async () => {
    try {
      if (deleteType === DELETE_TYPE.DELETE_ALL) {
        let ids = selectedRows?.map((row) => row?.[uniquePrefix])?.toString();
        if (handleDeleteList) {
          setPageLoading(true);
          const success = await handleDeleteList(ids)
          if (success) {
            setSelectedRows([])
          }
        }
      } else if (deleteType === DELETE_TYPE.SINGLE_DELETE) {
        handleDelete?.(currentRowData);
      }
    } catch {
    } finally {
      setPageLoading(false);
      setShouldOpenConfirmDeleteDialog(false);
    }
  }

  useEffect(() => {
    handleRenderStickyColumns();
  }, [columns, id, dependencies])

  const handleRenderStickyColumns = () => {
    let stickyColumns = document.querySelectorAll(
      `.sticky-column-${id}`
    );
    let leftOffset = 0;
    stickyColumns.forEach(function (column) {
      (column as HTMLElement).style.left = leftOffset + "px";
      (column as HTMLElement).style.zIndex = "0";
      leftOffset += (column as HTMLElement).offsetWidth;
    });
  };

  const handleShowConfirmDialog = (type: number, rowData?: any) => {
    if (DELETE_TYPE.DELETE_ALL === type) {
      if (deleteConditional && deleteConditional?.length > 0) {
        const isDelete = selectedRows.every(row => row.isDelete);
        if (!isDelete) {
          toast.warning(lang("TOAST.DELETE_DENIED"));
          return;
        }
      }
    } else if (deleteType === DELETE_TYPE.SINGLE_DELETE) {
      setCurrentRowData(rowData);
    }
    setDeleteType(type);
    setShouldOpenConfirmDeleteDialog(true)
  }

  const handleExport = (e: any) => {
    e.preventDefault();
    let ids = selectedRows?.map((row: any) => row?.id)
    handleExportExcel && handleExportExcel(ids);
  }

  const handleCalculateNumberOfElements = () => {
    if (searchObject.pageSize > (totalElements || 0)) {
      return totalElements;
    } else {
      return searchObject ? (searchObject.pageIndex) * searchObject.pageSize : 0;
    }
  }

  const handleCalculateTotalPages = () => {
    let pageSize = searchObject.pageSize || 0
    return Math.ceil(totalElements / pageSize)
  }

  const handleSearch = () => {
    setSearchObject({
      pageIndex: 0,
      ...searchObject
    });
    updateTableData?.();
  }

  const handleKeyDownEnterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(event, handleSearch);
  }
  const handleKeyUpSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleKeyUp(event, handleSearch);
  }

  return (
    <div id={id} className={className ? className : ""}>
      <style>{fixedColumnsCSS}</style>
      <div className={`table-toolbar rounded-top ${clearToolbar ? "p-0" : "py-3"}`}>
        {isActionTableTab ? (
          <ActionTableTab
            isSearchable={isSearchable}
            searchObject={searchObject}
            handleSearch={handleSearch}
            handleKeyUpSearch={handleKeyUpSearch}
            handleKeyDownEnterSearch={handleKeyDownEnterSearch}
            handleChangeTextSearch={handleChangeValueInput}
            title={title}
            buttonAdd={buttonAdd}
            buttonExportExcel={buttonExportExcel}
            handleOpenDialog={handleOpenDialog}
            handleExport={handleExport}
            selectedRows={selectedRows}
            handleCheckBoxAll={handleCheckBoxAll}
            notDelete={notDelete}
            handleShowConfirmDialog={() => handleShowConfirmDialog(DELETE_TYPE.DELETE_ALL)}
          />
        ) : (
          <Row>
            {!justFilter ? (
              <Col xs={10} className="spaces p-0 d-flex align-items-center">
                {buttonAdd && (
                  <button
                    className="spaces button-primary flex flex-middle mx-16"
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
                    <KTSVG path="/media/icons/export-excel.svg" />{" "}
                    {lang("BTN.EXPORT")}
                  </button>
                )}

                {selectedRows?.length > 0 && (
                  <>
                    <span className="spaces mr-16">
                      {lang("SELECTED")}:
                      <strong className="ps-2">
                        {selectedRows ? selectedRows?.length : 0}
                      </strong>
                    </span>
                    <span
                      className="spaces mr-16 fw-bold text-warning cursor-pointer "
                      onClick={() => handleUnCheckBoxAll()}
                    >
                      {isCheckAll
                        ? lang("UNSELECTED_ALL")
                        : lang("UNSELECTED")}
                    </span>
                    {!notDelete && (
                      <div
                        className="delete-box cursor-pointer spaces mr-16"
                        onClick={() => handleShowConfirmDialog(DELETE_TYPE.DELETE_ALL)}
                      >
                        <i className="bi bi-trash fs-4 text-danger px-4"></i>
                        <span className="fw-bold text-danger">
                          {lang("DELETE")}
                        </span>
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
                    <KTSVG
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
                const style= {
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                  ...column?.headerStyle,
                }
                return (
                  <th
                    key={column?.field + index}
                    className={clsx(
                      "p-table text-center bg-header-table",
                      index <= stickyColumnCount ? `sticky-column sticky-column-${id}` : "",
                      !column?.headerStyle
                    )}
                    style={style}
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
                    notEdit={notEdit}
                    handleDoubleClick={handleDoubleClick}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center border">
                  {lang("TABLE.DATA.EMPTY")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!noPagination && (
        <TablePagination
          page={page || searchObject?.pageIndex || 1}
          setPage={(pageIndex) => handleChangeSearchObject(VARIABLE_STRING.PAGE_INDEX, pageIndex)}
          handlePagesChange={handlePagesChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          rowsForPage={rowsForPage}
          rowsPerPage={rowsPerPage || searchObject?.pageSize}
          setRowsPerPage={(pageSize) => handleChangeSearchObject(VARIABLE_STRING.PAGE_SIZE, pageSize)}
          totalPages={handleCalculateTotalPages() || 0}
          totalElements={totalElements || 0}
          numberOfElements={handleCalculateNumberOfElements() || 0}
        />
      )}

      {shouldOpenConfirmDeleteDialog && (
        <ConfirmDialog
          show={shouldOpenConfirmDeleteDialog}
          title={lang("DIALOG.CONFIRM.DELETE.TITLE")}
          message={lang("DIALOG.CONFIRM.DELETE.MESSAGE")}
          yes={lang("BTN.CONFIRM")}
          onYesClick={handleConfirmedDelete}
          cancel={lang("BTN.CANCEL")}
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

export default TableCustom;
