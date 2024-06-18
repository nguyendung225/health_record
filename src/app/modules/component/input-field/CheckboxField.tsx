import { ErrorMessage, Field, FormikHandlers } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { covertDateToString } from '../../utils/FunctionUtils';

type Props = {
  label: string,
  name: string,
  isView?: boolean,
  value: boolean,
  handleChange: any,
  className?: string
};

const CheckboxField = (props: Props) => {
  const { label, name, isView, value, handleChange, className } = props;
  const intl = useIntl();
  return (
    <div className={className}>
      <span className='text-label'>
        {intl.formatMessage({ id: label })}
      </span>
      <input type="checkbox"
        className="form-check-input mt-0 checkbox-content me-2"
        value={value?'true':'false'}
        onChange={handleChange}
        disabled={isView}
        name={name}
        checked={value}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className='text-danger'>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default CheckboxField;