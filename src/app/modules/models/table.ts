import React from "react";
import {CellType} from "../component/table-custom/TableCustom";

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
    numericalOrder?: number,
    itemList?: any
  ) => any;
}