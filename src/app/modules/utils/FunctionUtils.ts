//@ts-nocheck
import moment from "moment";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {IItemSearch} from "../profile/models/ProfileModels";
import {localStorageItem} from "./LocalStorage";
import {EXTENSIONS, JUST_ALLOW_NUMBER, NUMBER_EXCEPT_THIS_SYMBOLS, TYPE} from "./Constant";
import {IObject, OptionReactSelect} from "../models/models";
import {ITemplateExportWord} from "../component/exportWord";
import {SUCCESS_CODE} from "../constant";
import {formatDateTable} from "../../AppFunction";
import { TMenu, TSubMenu, allMenu } from "../../dashboard/listMenu";

type IPropsExport = {
  exportAPI: any;
  fileName?: string;
  setPageLoading?: any,
  type?: string;
}

export const checkTypeOf = (value: any) => {
  return Object.prototype.toString.call(value).slice(8, -1);
};
export const covertDateToString = (value: any) => {
  return value ? moment(value).format("YYYY-MM-DD") : "";
};
export function transformArray(arr: any[]) {
  return arr?.map((item) => {
    return {
      code: item?.id,
      name: item?.value,
    };
  });
}
export function transformArrayByName(name: string, arr: any[]) {
  return arr?.map((item) => {
    return {
      value: item?.id,
      name: item[name],
    };
  });
}
export function transformArrayByNameForLocation(name: string, arr: any[]) {
  return arr?.map((item) => {
    return {
      ...item,
      code: item?.id,
      name: item[name],
    };
  });
}
export function useCustomIntl(messageId: string) {
  const intl = useIntl();
  return intl.formatMessage({ id: messageId });
}
export const getOptionById = (id: string, options: OptionReactSelect[]) => {
  return options.find((option) => option?.id === id);
};
export const balanceElements = (tableClass1, tableClass2) => {
  const table1Rows = document.querySelectorAll(`.${tableClass1} tbody tr`);
  const table2Rows = document.querySelectorAll(`.${tableClass2} tbody tr`);
  const table1HeaderCells = document.querySelectorAll(`.${tableClass1} th`);
  const table2HeaderCells = document.querySelectorAll(`.${tableClass2} th`);

  for (let i = 0; i < Math.max(table1Rows.length, table1HeaderCells.length); i++) {
    if (i < table1HeaderCells.length) {
      const headerCell1 = table1HeaderCells[i];
      const headerCell2 = table2HeaderCells[i];
      const maxHeightHeaderCell = Math.max(headerCell1?.offsetHeight, headerCell2?.offsetHeight);
      if (maxHeightHeaderCell < 64) {
        headerCell1.style.height = `${maxHeightHeaderCell}px`;
        headerCell2.style.height = `${maxHeightHeaderCell}px`;
      }
    }
    if (i < table1Rows.length) {
      const row1 = table1Rows[i];
      const row2 = table2Rows[i];
      const maxHeightRow = Math.max(row1?.offsetHeight, row2?.offsetHeight);
      row1.style.height = `${maxHeightRow}px`;
      row2.style.height = `${maxHeightRow}px`;
    }
  }
};

export const exportToFile = async (props: IPropsExport) => {
  const { exportAPI, fileName = "Danh sách", setPageLoading, type = TYPE.EXCEL } = props;
  try {
    if (setPageLoading) {
      setPageLoading(true);
    }
    const data = await exportAPI();
    if (data.status === SUCCESS_CODE) {
      const url = window.URL.createObjectURL(new Blob([data.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.${EXTENSIONS[type]}`);
      document.body.appendChild(link);
      link.click();
      toast.success("Export thành công");
    } else {
      toast.error("Lỗi hệ thống");
    }
  } catch {
    toast.error("Lỗi hệ thống");
  } finally {
    if (setPageLoading) {
      setPageLoading(false);
    }
  }
};

export const convertArray = (arr: string[]) => {
  let result = [];
  if (arr?.length > 0) {
    for (let item of arr) {
      let obj: any = {
        name: item,
        code: item,
      };
      result.push(obj);
    }
  }
  return result;
};


export const hasAuthority = (permission: string, ability: string, type?: string): boolean => {
  const authoritiesString = localStorage.getItem("authorities");
  const authorities = authoritiesString ? JSON.parse(authoritiesString) : {};
  const permissionAndAbility = type === TYPE?.MODULE ? `${permission}_${ability}` : `${permission}.${ability}`;
  return authorities[permissionAndAbility];
};

export const hasRole = (permission): boolean => {
  const authorities = localStorageItem.get("authorities") || {};
  return authorities[permission];
};

export const hasAccessAuthority = (permission: string, ability: string): boolean => {
  const authoritiesString = localStorage.getItem("authorities");
  const authorities = authoritiesString ? JSON.parse(authoritiesString) : {};
  const authorityKey = `${permission}.${ability}`
  return authorities[authorityKey];
};

export const checkInvalidDate = (date: any) => {
  const newDate = new Date(date);
  if (1900 > newDate.getFullYear() || newDate.getFullYear() > 9999) {
    return true;
  }
  return isNaN(Date.parse(newDate));
};

export const handleBlurDate = (setFieldValue, date, name) => {
  if (checkInvalidDate(date)) {
    setFieldValue(name, "");
    return;
  }
}

export const checkObject = (obj: any) => {
  return Object.keys(obj ? obj : {}).length === 0;
};

export const convertSearch = (data: any[]) => {
  let dataSearch: any = {}
  data.forEach((item: IItemSearch) => {
    if (Array.isArray(item.value) && item.value?.length > 0) {
      let ischeckId = item.value.some(itemValue => itemValue?.id)
      dataSearch[item?.field] = item.value?.map((itemValue) => ischeckId ? itemValue?.id : itemValue?.code).toString()
      return;
    }

    if (typeof item.value === TYPE.OBJECT) {
      dataSearch[item?.field] = item.value?.id ? item.value?.id : item.value?.code;
      return;
    }

    dataSearch[item.field] = item.value || null;

  })
  return dataSearch;
}

export const numberExceptThisSymbols = (event: any) => {
  return NUMBER_EXCEPT_THIS_SYMBOLS.includes(event?.key) && event.preventDefault()
}

export const justAllowNumber = (event: any) => {
  return JUST_ALLOW_NUMBER.includes(event?.key) && event.preventDefault();
}

export const removeDiacritics = (str: string) => {
  return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : "";
}

export const formatDateTime = (date) => {
  const newDate = new Date(date)
  return date ? moment(newDate).format("YYYY-MM-DD") : null;
};

export const checkMenuByPermissions = (): TMenu[] => {
  const checkedMenu: TMenu[] = [];
  allMenu.forEach((menu) => {
    const filteredSubMenu: TSubMenu[] = [];
    if (hasAccessAuthority(menu.permission, menu.ability)) {
      menu.subMenu.forEach((subMenu) => {
        if (hasAccessAuthority(subMenu.permission, subMenu.ability)) {
          filteredSubMenu.push(subMenu);
        }
      });
      const checkedMenuItems: TMenu = {
        ...menu,
        subMenu: filteredSubMenu,
      };
      checkedMenu.push(checkedMenuItems);
    }
  });  
  return checkedMenu;
};

export const convertTextPrice = (value: string) => {
  return String(value).replace(/\D/g, '');
}

export const convertNumberPrice = (value: number | string | null) => {
  const valueNumber = String(value).replace(/\D/g, '');
  if(!valueNumber){
    return "";
  }

  const number = Number(valueNumber ? valueNumber : 0);
  const plainNumber = number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const valuePrice = plainNumber.substr(0, plainNumber.length - 2)
  return (valuePrice || valuePrice === 0) ? valuePrice : "";
};

export const addMoreYear = (currentDate: string | null, quality: number) => {
  if (!currentDate) return "";
  let currentDateObj = new Date(currentDate);
  currentDateObj.setFullYear(currentDateObj.getFullYear() + quality);
  currentDateObj.setDate(currentDateObj.getDate() - 1);
  let newYear = currentDateObj.getFullYear();
  let newMonth = currentDateObj.getMonth() + 1;
  let newDay = currentDateObj.getDate();

  return `${newYear}-${String(newMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`;
};

export const addMoreMonth = (currentDateString: string, quality: number) => {
  if (!currentDateString) return "";
  var currentDate = new Date(currentDateString);
  currentDate.setMonth(currentDate.getMonth() + quality);
  currentDate.setDate(currentDate.getDate() - 1);

  let newYear = currentDate.getFullYear();
  let newMonth = currentDate.getMonth() + 1;
  let newDay = currentDate.getDate();

  return `${newYear}-${String(newMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`;
};

export const addMoreDay = (currentDate: string, quality: number) => {
  if (!currentDate) return "";
  let newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + quality);

  let newYear = newDate.getFullYear();
  let newMonth = newDate.getMonth() + 1;
  let newDay = newDate.getDate();

  return `${newYear}-${String(newMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`;
};

//Kiểm tra độ sâu của mảng (arr là mảng trong mảng, không hỗ trợ mảng trong object)
export const countArrayDeep = (arr: any[]): number => {
  if (!Array.isArray(arr)) return 0;

  let maxDeep = 1;

  arr.forEach(item => {
    if (Array.isArray(item)) {
      const deep = 1 + countArrayDeep(item);
      maxDeep = Math.max(maxDeep, deep);
    }
  })

  return maxDeep;
}

//Tách các phần tử của mảng theo độ sâu của mảng
export const extractElementsByDepth = (array: any[], level: number = 0, target: any[] = []) => {
  array.forEach((element) => {
    if (Array.isArray(element)) {
      extractElementsByDepth(element, level + 1, target);
    } else {
      target[level] ? target[level].push(element) : (target[level] = [element]);
    }
  });

  return target;
};

//Chuyển đổi số Integer sang số la mã
export const romanize = (num: number): string => {
  if (isNaN(num)) return "NaN";
  let digits = String(+num).split("");
  const key: string[] = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
  ];
  let roman = "";
  let i = 3;
  while (i--) roman = (key[+digits.pop()! + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};

export const checkStatus = (listStatus: any[], code: any) => {
  let itemFinded = listStatus ? listStatus.find((item: any) => item?.code === code) : null;
  return itemFinded?.styleClass || "";
};

//Tìm template word khớp với type
export const matchTemplateWord = (contractType: string | number, templateList: ITemplateExportWord[]) => {
  let templateFinded = templateList.find((template) => template.type === contractType);
  return templateFinded ? [templateFinded] : null;
}

export const renderCellValueByType = (cell: any, row: IObject) => {
  switch (cell?.type) {
    case TYPE.MONEY:
      return convertNumberPrice(row[cell?.field]);
    case TYPE.NUMBER_FLOAT:
      return row[cell?.field]?.toFixed(cell?.numberFixed || 2);
    case TYPE.DATE:
      return formatDateTable(row[cell?.field]);
    default:
      return row[cell?.field];
  }
};