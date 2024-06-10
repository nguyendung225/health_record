/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FC, useEffect } from "react";
import { columnNamesType } from "./OCTTable";

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
}

const TableRow: FC<TableRowProps> = (props) => {
  const { idTable, dependencies, row, columns, index, searchObject, itemList, stickyColumnCount, handleOpenDetailDialog } = props;
  const numericalOrder = (((Number(searchObject?.pageIndex || 1) - 1) * Number(searchObject?.pageSize || 10) + index) + 1)

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

  return (
    <>
      {columns?.map((column: columnNamesType, idx: number) => {
        return (
          column?.render ?
            <td
              onClick={() => {
                if (column?.action && handleOpenDetailDialog) handleOpenDetailDialog(row);
              }}
              className={`td-vertical-center bg-white${idx < stickyColumnCount ? ` sticky-column-row-${idTable}-${index}` : ''}${column?.action ? " action-cell fw-bold" : ""}`}
              style={column?.cellStyle}
              key={idx}
            >
              {column.render ? column.render(row, index, numericalOrder, itemList) : row?.[column?.field]}
            </td> : <td
              onClick={() => {
                if (column?.action && handleOpenDetailDialog) handleOpenDetailDialog(row);
              }}
              className={`td-vertical-center bg-white${idx < stickyColumnCount ? ` sticky-column-row-${idTable}-${index}` : ''}${column?.action ? " action-cell fw-bold" : ""}`}
              key={idx}
              style={column?.cellStyle}
            >
              {row?.[column?.field]}
            </td>
        )
      }
      )}
    </>
  );
};

export default TableRow;