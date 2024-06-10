import React, {
  BaseSyntheticEvent,
  ChangeEvent,
  FC,
  useCallback, useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import clsx from "clsx";
import {TableRow} from "./TableCollapseRow";
import { CustomElementbyTagName } from "./CustomElementbyTagName";
import { KEY, SELECTION_MODE } from "../../utils/Constant";
import { removeDiacritics } from "../../utils/FunctionUtils";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import ActionTableTab from "../table-custom/ActionTableTab";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import {columnNamesType} from "../../models/table";
import CustomTooltip from "../CustomTooltip";
import {DELETE_TYPE} from "../../../Constant";
import {toast} from "react-toastify";
import AppContext from "../../../AppContext";
import {handleKeyDown, handleKeyUp} from "../../../AppFunction";

export interface TableProps {
  data: any[];
  columnNameList: columnNamesType[];
  headerClasses?: string;
  bodyClasses?: string;
  name?: string;
  nameParent?: string;
  height?: number;
  scrollable?: boolean;
  nameChildren: string;
  titleComponent?: string;
  setData: (data: any) => void;
  selectData: (data: any) => void;
  selectionMode?: typeof SELECTION_MODE[keyof typeof SELECTION_MODE];
  isSelect?: boolean;
  notDelete?: boolean;
  handleDeleteList?: (ids: any) => void;
  title?: string;
  buttonAdd?: boolean;
  handleOpenDialog?: () => void;
  noToolbar?: boolean;
  uniquePrefix?: string;
  disabledSelect?: boolean;
  handleDoubleClick?: (row: any) => void;
  buttonDelete?: boolean;
  buttonEdit?: boolean;
  buttonView?: boolean;
  actionColumnComponent?: React.ReactNode;
  handleDelete?: (row: any) => void;
  handleEdit?: (row: any) => void;
  handleView?: (row: any) => void;
  actionStyle?: React.CSSProperties;
  searchObject: object;
  setSearchObject?: any;
  isSearchable?: boolean;
  updateTableData?: () => void;
}


const CustomTable: FC<TableProps> = (props) => {
  const { data,
    nameChildren,
    nameParent,
    headerClasses,
    bodyClasses,
    columnNameList,
    height,
    scrollable,
    setData,
    selectionMode,
    isSelect,
    notDelete,
    handleDelete,
    title,
    buttonAdd,
    handleOpenDialog,
    noToolbar,
    uniquePrefix = "id",
    disabledSelect,
    handleDoubleClick,
    handleDeleteList,
    actionStyle,
    isSearchable,
    updateTableData,
    searchObject,
    setSearchObject,
  } = props;

  const { lang } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [itemList, setItemList] = useState<any[]>([]);
  const [dataList, setDataList] = useState<any[]>([]);
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [shouldOpenConfirmDeleteDialog, setShouldOpenConfirmDeleteDialog] = useState<boolean>(false);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<number>(0);
  const [currentRowData, setCurrentRowData] = useState<any>(null);

  const isRenderCollapseIcon = data?.some((item:any) => item[nameChildren]?.length > 0)

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>, item: any, parentIndex: number) => {
    const { checked } = event.target;
    const updatedData = updateCheckedSingle(checked, data, item, parentIndex);
    const updatedItem = updateCheckedSingle(checked, itemList, item, parentIndex);
    
    setAfterDataChecked(updatedData, updatedItem);
  };

  const handleCheckBoxAll = (event: ChangeEvent<HTMLInputElement>, index: any) => {
    const { checked } = event.target;
    const updatedData = updateCheckedAll(data, checked, index);
    const updatedItem = updateCheckedAll(itemList, checked, index);

    setAfterDataChecked(updatedData, updatedItem);
  }

  const updateCheckedAll = (data: any[], isParentChecked: boolean, rowIndex: any) => {
    return data.map((item, index) => {
      return index === rowIndex ? { ...updateChildren(data[index], isParentChecked), isParentChecked } : item;
    })
  }

  const setAfterDataChecked = (updatedData: any, updatedItemList: any) => {
    setData(updatedData);
    setItemList(updatedItemList);
    setDataList(updatedData);
    checkAllItemChecked(updatedData);

    const checkedItems = getCheckedItems(updatedData);
    props?.selectData(checkedItems);
  };

  const updateCheckedSingle = (isChecked: boolean, data: any[], currentItem: any, parrentIndex: number) => {
    return data.map((row: any, index: number) => {
      if (index === parrentIndex) {
        const updatedDataItem: any[] = (row?.[nameChildren] || []).map((item: any) => ({
          ...item,
          isChecked: currentItem?.[uniquePrefix] === item?.[uniquePrefix] ? isChecked : item.isChecked
        }));

        let isParentChecked = updatedDataItem.every((item: any) => item.isChecked);

        return { ...row, [nameChildren]: updatedDataItem, isParentChecked };
      }
      return row;
    })
  }

  useEffect(() => {
    checkAllItemChecked(data);
  }, [data])

  const updateChildren = (items: any, isChecked: boolean) => {
    if (items?.[nameChildren]?.length > 0) {
      items?.[nameChildren]?.forEach((item: any) => {
        item.isChecked = isChecked
        updateChildren(item, isChecked)
      });
    }
    return items;
  }

  const getCheckedItems = useCallback((data: any[]): any[] => {
    let checkedItems: any[] = [];

    const traverse = (item: any) => {
      if (item.isChecked) {
        checkedItems.push(item);
      }

      if (item?.[nameChildren] && item?.[nameChildren].length > 0) {
        item?.[nameChildren].forEach((child: any) => traverse(child));
      }
    };

    if (data) {
      data.forEach((item: any) => traverse(item));
    }
    return checkedItems;
  },[nameChildren]);

  useEffect(() => {
    if(selectionMode === SELECTION_MODE.SINGLE){
      setDataTable(dataList);
      const checkedItems = getCheckedItems(dataList);
      props?.selectData(checkedItems[0]);
    }else if(selectionMode === SELECTION_MODE.MULTIPLE){
      setDataTable(itemList);
      const checkedItems = getCheckedItems(itemList);
      props?.selectData(checkedItems);
    }else{
      setDataTable(data);
    }
  },[data, dataList, itemList, selectionMode, getCheckedItems])

  const styles: object = {
    height: height,
    overflowY: scrollable && 'auto',
  }

  const checkSearch = useCallback(() => {
    let check = Object.values(searchObject)?.some((value: any) => value);
    return check
  }, [searchObject])

  useEffect(() => {
    if (!checkSearch()) {
      setItemList(data)
      setDataList(data);
    }
  }, [data, checkSearch]);

  const search = () => {
    if (!checkSearch()) {
      setItemList(data);
      setDataList(data);
      return false;
    }

    const filteredData = data.map((item: any) => {
      if (item?.[nameChildren] && item?.[nameChildren].length > 0) {
        const filteredServices = item?.[nameChildren].filter((service: any) => {
          for (const [key, value] of Object.entries(searchObject)) {
            const lowerCaseString = removeDiacritics(service[key]?.toLowerCase());
            const lowerCaseSearchString = removeDiacritics(value?.toLowerCase().trim());
            if (lowerCaseSearchString && !lowerCaseString?.includes(lowerCaseSearchString)) {
              return false;
            }
          }
          return true;
        });

        const newItem = listItemService(item);
        newItem[nameChildren] = filteredServices;
        return newItem;
      }
      return item;
    });

    setItemList(filteredData);
    setDataList(filteredData);
  };

  const listItemService = (item: any) => {
    const newItem = { ...item };
    if (newItem?.[nameChildren]) {
      newItem[nameChildren] = newItem?.[nameChildren].map((service: any) => listItemService(service));
    }
    return newItem;
  };

  const handleSingleSelect = (row: any, parentIndex: number) => {
    const checked = row.isChecked;
    if(checked){
      setDataList(data);
    }else{
      const updatedData = updateCheckedSingle(true, data, row, parentIndex);
      checkAllItemChecked(updatedData);
      setDataList(updatedData);
    }
  }

  const toggleRowSelection = (row: any, parentIndex: number) => {
    const checked = row.isChecked;
    const updatedItem = updateCheckedSingle(!checked, itemList, row, parentIndex);
    checkAllItemChecked(updatedItem);
    setItemList(updatedItem);
  }

  const handleSwitchAllChecked = (data: any[], checkedSwitch: boolean) => {
    return data.map((item) => {
      return { ...updateChildren(item, checkedSwitch), isParentChecked: checkedSwitch };
    })
  }

  const handleUnCheckBoxAll = () => {
    const updatedData = handleSwitchAllChecked(data, false);
    const updatedItem = handleSwitchAllChecked(itemList, false);

    setAfterDataChecked(updatedData, updatedItem);
  }

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsCheckAll(checked);
    const updatedData = handleSwitchAllChecked(data, checked);
    const updatedItem = handleSwitchAllChecked(itemList, checked);

    setAfterDataChecked(updatedData, updatedItem);
  }

  const checkedItem = useMemo(() => {
    return getCheckedItems(itemList);
  }, [itemList])

  const checkAllItemChecked = (dataChecked: any[]) => {
    setIsCheckAll(
      dataChecked
        .map((item: any) => item[nameChildren])
        .flat()
        .every((item: any) => item?.isChecked)
    );
  }

  const handleShowConfirmDialog = (type: number, rowData?: any) => {
    if (DELETE_TYPE.DELETE_ALL === type) {

    } else if (deleteType === DELETE_TYPE.SINGLE_DELETE) {
      setCurrentRowData(rowData);
    }
    setDeleteType(type);
    setShouldOpenConfirmDeleteDialog(true)
  }

  const handleConfirmedDelete = async () => {
    try {
      if (deleteType === DELETE_TYPE.DELETE_ALL) {
        let ids = getCheckedItems(itemList)
          ?.map((row) => row?.[uniquePrefix])
          ?.toString();
        handleDeleteList && handleDeleteList(ids);
        setShouldOpenConfirmDeleteDialog(false);
      } else if (deleteType === DELETE_TYPE.SINGLE_DELETE) {
        handleDelete?.(currentRowData);
      }
    } catch {
    } finally {
      setPageLoading(false);
      setShouldOpenConfirmDeleteDialog(false);
    }
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

  const handleChangeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchObject({
      ...searchObject,
      [event.target.name]: event.target.value
    });
  };

  const actionsColumn: columnNamesType[] = [
    {
      name: lang("TABLE.ACTION"),
      field: "action",
      isVisible: Boolean(props.buttonDelete || props.buttonEdit || props.actionColumnComponent),
      width: actionStyle?.width || 100,
      headerStyle: {
        ...actionStyle,
        width: actionStyle?.width || 100,
      },
      cellStyle: {
        ...actionStyle,
        width: actionStyle?.width || 100,
      },
      render: (rowData: any) => (
        <div className="flex flex-center flex-middle">
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

  const mergedColumns = [
    ...actionsColumn,
    ...columnNameList,
  ]

  return (
    <>
      {!noToolbar && (
        <div className="table-toolbar rounded-top p-3">
          <ActionTableTab
            title={title}
            buttonAdd={buttonAdd}
            handleCheckBoxAll={handleUnCheckBoxAll}
            selectedRows={checkedItem}
            notDelete={notDelete}
            setShouldOpenConfirmDeleteDialog={setShouldOpenConfirmDeleteDialog}
            handleOpenDialog={handleOpenDialog}
            handleShowConfirmDialog={() => setShouldOpenConfirmDeleteDialog(true)}
            isSearchable={isSearchable}
            searchObject={searchObject}
            handleSearch={handleSearch}
            handleKeyUpSearch={handleKeyUpSearch}
            handleKeyDownEnterSearch={handleKeyDownEnterSearch}
            handleChangeTextSearch={handleChangeValueInput}
          />
        </div>
      )}
      <div
        className="table-responsive customs-collapse-row m-0"
        style={styles}
      >
        <table className="dataTable table w-100 p-0 py-2 border">
          <thead className={clsx(headerClasses, "position-sticky top-0 z-index-0 border")}>
            <tr className="text-white fw-bolder fs-7 text-capitalize-first gs-0 bg-header-table text-black">
              {(isSelect || isRenderCollapseIcon) && (
                <th className="cell-action cell-action position-sticky start-0 bg-header-table">
                  {isSelect && (
                    <Form.Check
                      className="checkBox"
                      checked={isCheckAll}
                      onChange={(event) => !disabledSelect && handleCheckAll(event)}
                      disabled={disabledSelect}
                    />
                  )}
                </th>
              )}
              {mergedColumns?.map((column: columnNamesType, index: number) => (
                <th
                  key={index}
                  className={clsx("text-center p-table", !column?.headerStyle && "min-w-40px")}
                  style={column?.headerStyle}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={clsx(bodyClasses)}>
            {dataTable?.length > 0 ? (
              dataTable?.map((row: any, index: number) => {
                let level = 0;
                return (
                  <TableRow
                    row={row}
                    key={index}
                    index={index}
                    nameParent={nameParent && nameParent}
                    nameChildren={nameChildren}
                    columnNameList={mergedColumns}
                    handleCheckBox={handleCheckBox}
                    selectionMode={selectionMode && selectionMode}
                    handleSingleSelect={handleSingleSelect}
                    toggleRowSelection={toggleRowSelection}
                    handleCheckBoxAll={handleCheckBoxAll}
                    parentIndex={index}
                    isSelect={isSelect}
                    disabledSelect={disabledSelect}
                    handleDoubleClick={handleDoubleClick}
                    isRenderCollapseIcon={isRenderCollapseIcon} // todo: check if one row has children, another will row adds action box
                    level={level}
                  />
                )
              })
            ) : (
              <tr>
                <td
                  className="text-center"
                  colSpan={columnNameList?.length + 1}
                >
                  {lang("GENERAL.NO_DATA")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
      </div>
    </>
  );
};

const TableCollapseCustom: FC<TableProps> = (props: TableProps) => {
  const { name, titleComponent } = props;
  const titleComponentType = (titleComponent ? titleComponent : "h1") as keyof JSX.IntrinsicElements
  
  return (
    <div>
      {name && <CustomElementbyTagName tagName={titleComponentType} content={name} />}
      <CustomTable {...props} />
    </div>
  );
};

export default TableCollapseCustom;
