import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { TYPE } from "../utils/Constant";
import "./style.scss";
import {formatDateTable} from "../../AppFunction";

function TextUnderline(props: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [labelWidth, setLabelWidth] = useState<string>("");
  const [rows, setRows] = useState<number>(props?.rows || 1);
  const [rowsLabel, setRowsLabel] = useState<number>(props?.rows || 1);
  const defautlValueDate = "       /       /";

  useEffect(() => {
    if (props.type === TYPE.DATE && !props.value) {
      setValue(defautlValueDate);
      return;
    }

    if (props.type === TYPE.DATE && props.value) {
      setValue(formatDateTable(props?.value) || "");
      return;
    }

    const newValue =
      props.value && typeof props.value === TYPE.OBJECT ? props?.value?.name || props?.value?.code : props?.value || "";
    setValue(newValue);
  }, [props.type, props.value]);

  useEffect(() => {
    if (textareaRef?.current) {
      const computedStyle = window.getComputedStyle(textareaRef.current);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);
      const height = textareaRef.current.scrollHeight;
      setLineHeight(lineHeight);
      const newRows = Math.ceil((height - paddingTop - paddingBottom) / lineHeight);
      if (newRows !== rows) setRows(newRows);
    }
  }, [value]);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value || "");
  };

  useEffect(() => {
    if (labelRef?.current) {
      const width = labelRef.current.offsetWidth;
      const computedStyle = window.getComputedStyle(labelRef.current);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);
      const height = labelRef.current.scrollHeight;
      const newRows = Math.ceil((height - paddingTop - paddingBottom) / lineHeight);
      setRowsLabel(newRows);
      setLabelWidth(`${Math.ceil(width) + 5}px`);
    }
  }, [props?.label]);

  return (
    <div className={`${props.className} text-underline`}>
      <span ref={labelRef} className="label">
        {props.label ? `${props.label}${!props.noColon ? " :" : ""} ` : ""}
      </span>
      <Form.Control
        as="textarea"
        className="value"
        onChange={handleTextareaChange}
        ref={textareaRef}
        value={value}
        rows={rows}
        readOnly={(props.type === TYPE.DATE && !props.value) || props?.readOnly}
        style={{
          textIndent: labelWidth
        }}
      />
      {Array.from({ length: rows }, (_, index) => {
        return rowsLabel <= index + 1 ? (
          <div
            key={index}
            className={`underline`}
            style={{
              top: `calc(${lineHeight * index}px + ${lineHeight}px)`,
              left: `${index === 0 ? labelWidth : "0"}`,
              width: index === 0 ? `calc(100% - ${labelWidth})` : "100%"
            }}
          ></div>
        ) : (
          <div className="w-0"></div>
        );
      })}
    </div>
  );
}

export default TextUnderline;
