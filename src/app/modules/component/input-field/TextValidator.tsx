import { Form, FormControl } from 'react-bootstrap';
import { TYPE } from '../../utils/Constant';
import React, { useEffect, useRef, useState } from 'react';
import clsx from "clsx";
import {FormikErrors, FormikTouched} from "formik";

interface TextvalidatorProps extends React.HTMLAttributes<any> {
  isRequired?: boolean;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  errors?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
  type?: "password" | "text" | "textarea" | "number" | "multiline" | "date";
  as?: any;
  lable?: string;
  placeholder?: string;
  onChange?: (event: any) => void;
  className?: string;
  icon?: string;
  handleIcon?: () => void;
  handleSearch?: () => void;
  isSearch?: boolean;
  readOnly?: boolean;
  name?: string;
  value?: any;
}

const TextValidator = (propsComponent: TextvalidatorProps) => {
  const { isRequired, touched, ...props } = propsComponent;
  const [showPassword, setShowPassword] = useState(false);
  const [inputHeight, setInputHeight] = useState<any>(null);
  const isPasswordType = props?.type === TYPE.PASSWORD;
  const inputType = isPasswordType ? (!showPassword ? TYPE.PASSWORD : TYPE.TEXT) : props?.type;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setInputHeight(inputRef.current.offsetHeight);
    }
  }, []);

  const onChange = (event: any) => {
    if(event?.target?.value?.startsWith(" ")) {
      event.target.value = "";
    }
    props?.onChange?.(event);
  }

  return (
    <div className={props?.className}>
      {props?.lable && (
        <span className={`text-lable-input lable`}>
          {props?.lable}
          {isRequired && <span className="color-red"> *</span>}
        </span>
      )}
      <Form.Group className={`position-relative flex-grow-1 flex`}>
        <FormControl
          {...props}
          ref={inputRef}
          placeholder={props?.placeholder || props?.lable || ""}
          type={inputType}
          className={
            clsx(
              "form-control customs-input",
              props.errors && touched ? "is-invalid" : "",
              (props?.isSearch || isPasswordType) ? "background-image-none" : "",
              props?.as === TYPE.TEXTAREA ? "spaces py-7 px-12 resize-none" : "",
              props?.type === TYPE.NUMBER ? "no-spinners" : "",
              props?.readOnly ? "text-readOnly" :"",
              isPasswordType ? "spaces pr-40" : ""
            )
          }
          onChange={onChange}
        />

        {props?.isSearch && (
          <div
            className="searchTextField"
            style={{ height: inputHeight }}
            onClick={props?.isSearch && props?.handleSearch}>
            <i className="bi bi-search"></i>
          </div>
        )}

        {(props?.icon || isPasswordType) && (
          <div
            className="searchTextField icon-eye border-0"
            style={{ height: inputHeight }}
            onClick={isPasswordType
              ? () => setShowPassword(!showPassword)
              : props?.icon
                ? props?.handleIcon
                : () => {}
            }
          >
            <i
              className={
                isPasswordType
                  ? `bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`
                  : props?.icon
              }
            ></i>
          </div>
        )}
        {touched && props.errors && <div className="invalid-feedback">{props.errors as React.ReactNode}</div>}
      </Form.Group>
    </div>
  );
};

export default TextValidator