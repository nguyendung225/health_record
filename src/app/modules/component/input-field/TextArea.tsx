import React from 'react'
import TextValidator from './TextValidator'
import { KEY } from '../../utils/Constant';

function TextArea({ ...props }) {
    const { onChange, bulletPoints = "-", ...newProps } = props;
    const handleKeyDown = (e: any) => {
        if (e.key === KEY.ENTER) {
            e.preventDefault();
            const cursorPosition = e.target.selectionStart;
            const newText =
                cursorPosition === 0
                    ? `${bulletPoints} ${props?.value?.substring(cursorPosition)}`
                    : `${props?.value?.substring(0, cursorPosition)}\n${bulletPoints} ${props?.value?.substring(cursorPosition)}`;
            onChange(newText, e.target.name)
        }
    };

    const handleChange = (event: any) => {
        const { value: newValue, name } = event.target;
        if (newValue) {
            if (!props?.value?.startsWith(bulletPoints)) {
                onChange(`${bulletPoints} ` + newValue, name)
            } else {
                onChange(newValue, name)
            }
        } else {
            onChange(newValue, name)
        }
    };

    return (
        <TextValidator
            {...newProps}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
        />
    )
}

export default TextArea