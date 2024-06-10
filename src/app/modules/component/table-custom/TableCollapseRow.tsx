/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect} from "react";
import {columnNamesType} from "./TableCustom";
import clsx from "clsx";
import {renderCellValueByType} from "../../utils/FunctionUtils";
import {TYPE} from "../../utils/Constant";
import {TABLE_FIELD} from "../../../Constant";
import {getColumnsAlignByType} from "../../../AppFunction";

export interface TableRowProps {
  idTable?: string;
  row: any;
  index: number;
  searchObject:any;
  columns: columnNamesType[];
  nameChildren?: string;
  sorting?: boolean;
  itemList?: any;
  dependencies?: string;
  stickyColumnCount: number;
  handleOpenDetailDialog?: (row: any) => void;
  notEdit?: boolean;
  handleDoubleClick: ((row: any, index: number) => void) | undefined
}

export const TableRow: FC<TableRowProps> = (props) => {
  const {
    idTable,
    dependencies,
    row,
    columns,
    index,
    searchObject,
    itemList,
    stickyColumnCount,
    handleOpenDetailDialog,
    notEdit,
    handleDoubleClick
  } = props;
  const numericalOrder = (
    ((Number(searchObject?.pageIndex || 1) - 1) * Number(searchObject?.pageSize || 10) + index)
    + 1
  )

  useEffect(() => {
    handleRenderStickyColumns(index);
  }, [columns, index, dependencies])

  const handleRenderStickyColumns = (index: number) => {
    let stickyColumns = document.querySelectorAll(
      `.sticky-column-row-${idTable}-${index}`
    );
    let leftOffset = 0;
    stickyColumns.forEach(function (column) {
      (column as HTMLElement).style.left = leftOffset + "px";
      (column as HTMLElement).style.zIndex = "0";
      leftOffset += (column as HTMLElement).offsetWidth;
    });
  };

  const getColumnsCellStyleByField = (column: columnNamesType): React.CSSProperties => {
    switch (column.field) {
      case TABLE_FIELD.STT:
        return {
          textAlign: "center",
        };
      case TABLE_FIELD.ACTION:
        return {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
      default:
        return {};
    }
  }

  const handleCellClick = (column: columnNamesType) => {
    if (column?.action && handleOpenDetailDialog) {
      handleOpenDetailDialog(row);
    }
  }
  
  const isCheckColumn = (column: any) => {
    if(column.name === TYPE.MULTILINE || column.name === TYPE.SINGLE){
      return true;
    }else{
      return false;
    }
  }

  const onDoubleClick = (row: any, index: number, column: any) => {
    if(isCheckColumn(column) || notEdit || !handleDoubleClick) return;
    handleDoubleClick(row, index);
  }

  return (
    <>
      {columns?.map((column: columnNamesType, idx: number) => {
        const textAlign = {textAlign: getColumnsAlignByType(column)} as React.CSSProperties;
        const textAlignByField = getColumnsCellStyleByField(column);
        const style= {
          width: column.width,
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          ...textAlign,
          ...textAlignByField,
          ...column?.cellStyle,
        }

        return (
          column?.render ? (
            <td
              onClick={() => handleCellClick(column)}
              onDoubleClick={() => onDoubleClick(row, index, column)}
              className={
                clsx(
                  "td-vertical-center bg-white",
                  idx < stickyColumnCount ? `sticky-column-row-${idTable}-${index}` : '',
                  column?.action ? " action-cell fw-bold" : "",
                )
              }
              style={style}
              key={idx}
            >
              {column.render ? column.render(row, index, numericalOrder, itemList) : renderCellValueByType(column, row)}
            </td>
            ) : (
              <td
                onClick={() => handleCellClick(column)}
                onDoubleClick={() => onDoubleClick(row, index, column)}
                className={clsx(
                  "td-vertical-center bg-white",
                  idx < stickyColumnCount ? ` sticky-column-row-${idTable}-${index}` : '',
                  column?.action ? " action-cell fw-bold" : "",
                )}
                key={idx}
                style={style}
              >
                {renderCellValueByType(column, row)}
              </td>
            )
        )
      }
      )}
    </>
  );
};