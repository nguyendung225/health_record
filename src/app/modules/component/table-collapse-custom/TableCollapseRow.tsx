import clsx from "clsx";
import React, { ChangeEvent, FC, useState } from "react";
import { Form } from "react-bootstrap";
import {SELECTION_MODE, TYPE} from "../../utils/Constant";
import {columnNamesType} from "../../models/table";
import {getColumnsAlignByType} from "../../../AppFunction";


export interface TableRowProps {
  row: any;
  index: number;
  name?: string;
  nameParent?: string;
  columnNameList: columnNamesType[];
  isCollapsed?: boolean;
  nameChildren:string;
  sorting?: boolean;
  isParent?: boolean;
  toggleCollapse?: () => void;
  handleCheckBox: (event: ChangeEvent<HTMLInputElement>, data: any, parentIndex: number) => void;
  toggleRowSelection: (row: any, parentIndex: number) => void;
  handleSingleSelect: (row: any, parentIndex: number) => void;
  selectionMode?: typeof SELECTION_MODE[keyof typeof SELECTION_MODE];
  handleCheckBoxAll: (event: ChangeEvent<HTMLInputElement>, data: any) => void;
  parentIndex: number;
  isSelect?: boolean;
  disabledSelect?: boolean;
  handleDoubleClick?: (row: any) => void;
  isRenderCollapseIcon?: boolean;
  level: number;
}

export const TableRow: FC<TableRowProps> = (props) => {
  const {
    row,
    columnNameList,
    index,
    nameParent,
    nameChildren,
    selectionMode,
    toggleRowSelection,
    handleSingleSelect,
    parentIndex,
    isSelect,
    disabledSelect,
    handleDoubleClick,
    isRenderCollapseIcon,
    level,
  } = props;
  
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const isParent = row?.[nameChildren] && row?.[nameChildren]?.length > 0;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Row name */}
      {nameParent && row[nameParent] && isParent && <tr key={index}
        className={clsx("bg-white row-name position-sticky start-0 border border-bottom", isParent ? "cursor-pointer" : "")}
        onClick={toggleCollapse}
      >
        <td
          colSpan={1}
          className={clsx(
            "cell-action position-sticky start-0 bg-white z-index-1",
            isCollapsed && "chevron-rotate-down"
          )}
          onClick={toggleCollapse}
        >
          <span className="">
            {(isParent) && <i className="fs-5 bi bi-chevron-compact-right" />}
          </span>
        </td>
        <td colSpan={columnNameList?.length}>
          <div className="flex flex-middle">
            <span className="spaces mr-8">
              {isSelect && (
                <Form.Check
                  className="checkBox"
                  type="checkbox"
                  onChange={(event) => !disabledSelect && props?.handleCheckBoxAll(event, index)}
                  checked={row?.isParentChecked || false}
                  disabled={disabledSelect}
                />
              )}
            </span>
            <span className="position-sticky spaces left-38px fw-bold">
              {`${row[nameParent]} (${row[nameChildren]?.length})`}
            </span>
          </div>
        </td>
      </tr>}

      {/* Row content */}
      {!(nameParent && row[nameParent]) && <tr
        className={clsx(
          `custom-${nameChildren} table-collapse-border-bottom cursor-pointer`,
          row.isChecked && "selected-row"
        )}
        onClick={() => {
          if(selectionMode === SELECTION_MODE.MULTIPLE){
            !disabledSelect && toggleRowSelection(row, parentIndex);
          }
          if(selectionMode === SELECTION_MODE.SINGLE){
            !disabledSelect && handleSingleSelect(row, parentIndex);
          }
        }}
        onDoubleClick={() => handleDoubleClick && handleDoubleClick(row)}
        style={{
          background: `rgba(0, 0, 0, ${level / 40})`
        }}
      >
        {/*checkbox and icon cell*/}
        {(isParent || isRenderCollapseIcon) && (
          <td
            className={clsx(
              "cell-action position-sticky start-0",
              isCollapsed && "chevron-rotate-down",
            )}
          >
            <div className="flex justify-content-center">
              {(isParent) && (
                <span
                  className={clsx(
                    "btn-icon-md",
                    isCollapsed && "rotate-90",
                  )}
                  onClick={toggleCollapse}
                >
                  {
                    isCollapsed
                    ? <i className="fs-5 bi bi-chevron-compact-down" />
                    : <i className="fs-5 bi bi-chevron-compact-right" />
                  }
                </span>
              )}
              {selectionMode === SELECTION_MODE.MULTIPLE && (
                <Form.Check
                  className="checkBox"
                  type="checkbox"
                  checked={row.isChecked}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => !disabledSelect && props?.handleCheckBox(event, row, parentIndex)}
                  disabled={disabledSelect}
                />
              )}
              {selectionMode === SELECTION_MODE.SINGLE && (
                <Form.Check
                  className="customs-form-check__radio__table"
                  type="radio"
                  checked={row.isChecked}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => !disabledSelect && props?.handleCheckBox(event, row, parentIndex)}
                  disabled={disabledSelect}
                />
              )}
            </div>
          </td>
        )}
        {/*other cell*/}
        {columnNameList?.map((column, indexTd) => {
          const textAlign = {textAlign: getColumnsAlignByType(column)} as React.CSSProperties;
          const style= {
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
            ...textAlign,
            ...column?.cellStyle,
          }

          return (
            <td
              className="text-primary"
              key={indexTd}
              style={style}
              onClick={toggleCollapse}
            >
              {column.render ? column.render(row, index) : row[column?.field]}
            </td>
          )
        })}
      </tr>}

      {/* Nếu có [nameChildren] thì tiếp tục map [nameChildren] */}
      {(isCollapsed && row?.[nameChildren] && row?.[nameChildren]?.length > 0) &&
        row?.[nameChildren].map((child: any, i: number) => (
          <TableRow
            handleSingleSelect={handleSingleSelect}
            toggleRowSelection={toggleRowSelection}
            key={i}
            nameChildren={nameChildren}
            columnNameList={columnNameList}
            row={child}
            index={i}
            handleCheckBox={props?.handleCheckBox}
            selectionMode={selectionMode}
            handleCheckBoxAll={props?.handleCheckBoxAll}
            parentIndex={index}
            isSelect={isSelect}
            disabledSelect={disabledSelect}
            handleDoubleClick={handleDoubleClick}
            isRenderCollapseIcon={isRenderCollapseIcon}
            level={level + 1} //adds 1 level of depth each time render the children
          />
        ))}
    </>
  );
};