import {toast} from "react-toastify";
import {DATE_FORMAT, RESPONSE_CODE, VARIABLE} from "./Constant";
import {localStorageItem} from "./modules/utils/LocalStorage";
import moment from "moment";
import {KEY_LOCALSTORAGE} from "./modules/auth/core/_consts";
import {useIntl} from "react-intl";
import React from "react";
import {KEY, TYPE} from "./modules/utils/Constant";
import {columnNamesType} from "./modules/component/table-custom/TableCustom";


export function TranslateMessage (messageId?: string) {
  const intl = useIntl();
  return intl.formatMessage({ id: messageId || "" });
}

export const handleThrowResponseMessage = (res: any) => {
  // todo: Trả ra message theo 2 loại message của response
  const { message, data, code } = res?.data;
  const singleMessageKey = VARIABLE.FUNCTION_CONSTANT.ERROR_MESSAGE;
  const multipleMessageKey = VARIABLE.FUNCTION_CONSTANT.MESSAGE;

  toast.clearWaitingQueue();
  if(handleMessageByResponseCode(code)) {
    return;
  }

  let firstObject = data?.[0];
  if (Object.keys(firstObject).includes(singleMessageKey)) {
    //case:  data = [{errorMessage: "..."}]
    toast.warning(
      firstObject[singleMessageKey] ? firstObject[singleMessageKey] : message //case:  data = [{errorMessage: null}]
    );
  } else if (Object.keys(firstObject).includes(multipleMessageKey)) {
    data.forEach((x: any) => {
      toast.warning(x.field + ": " + x[multipleMessageKey]);
    });
  } else {
    toast.error("GENERAL.ERROR");
  }
};

const handleMessageByResponseCode = (code?: number) => {
  switch (code) {
    case RESPONSE_CODE.FORBIDDEN:
      toast.warning(TranslateMessage("TOAST.ERROR.FORBIDDEN"));
      return true;
    case RESPONSE_CODE.METHOD_NOT_ALLOWED:
      toast.warning(TranslateMessage("TOAST.ERROR.METHOD_NOT_ALLOWED"));
      return true;
    case RESPONSE_CODE.CONFLICT:
      toast.warning(TranslateMessage("TOAST.ERROR.CONFLICT"));
      return true;
    default:
      return false;
  }
}

export const getCurrentUserInformation = () => {
  let currentUser = localStorageItem.get(KEY_LOCALSTORAGE.CURRENT_USER);

  return {
    currentUser: currentUser ? currentUser : {},
  }
}

export const formatDateTable = (date: any) => {
  let newDate = new Date(date);
  return date && moment(newDate).isValid() ? moment(date).format(DATE_FORMAT.TABLE) : null;
};

export const isSuccessfulResponse = (code: number) => RESPONSE_CODE.SUCCESS === code;

export const isEven = (number: number) => number % 2 === 0;

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, callBack: () => void) => {
  if (KEY.ENTER === event.key) {
    callBack()
  }
}

export const flatArrayByChildrenName = (arr: any, childName: string) => {
  let result: any = [];

  arr.forEach((item: any) => {
    result.push(item);
    if (item[childName] && item[childName].length > 0) {
      result = result.concat(flatArrayByChildrenName(item[childName], childName));
    }
  });

  return result;
}

export const getColumnsAlignByType = (column: columnNamesType) => {
  switch (column.type) {
    case TYPE.DATE:
      return "center";
    case TYPE.NUMBER:
      return "center";
    case TYPE.MONEY:
      return "right";
    case TYPE.TEXT:
      return "left";
    default:
      return "left";
  }
}

export const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>, callBack: () => void) => {
  if (!event.target.value) {
    callBack()
  }
}