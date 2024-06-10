import { memo, useMemo } from "react";
import {formatDateTable} from "../../../../AppFunction";

interface IProps {
  size?: number;
  className?: string;
  isDate?: boolean;
  value?: string | number;
}

function ValueOrDots(props: IProps) {
  const { size = 30, value, className = "", isDate } = props;
  const _value = useMemo(() => {
    return isDate ? formatDateTable(value) : value;
  }, [value, isDate]);
  return <span className={`break-word ${className}`}>{_value || new Array(size).fill(".").join("")}</span>;
}

export default memo(ValueOrDots);
