import React, {FC, ReactNode} from "react";
import {Tab, Tabs} from "react-bootstrap";


type TabProps = {
    eventKey: string;
    title: string | ReactNode;
    children?: ReactNode;
    icon?: ReactNode;
}

export const CustomTab: FC<TabProps> = (props) => {
    const { eventKey, title, children, icon} = props;
    return (
        <Tab
            {...props}
            eventKey={eventKey}
            key={eventKey}
            title={
                <span>
                    {icon}
                    <span>{title}</span>
                </span>
            }
        >
            {children}
        </Tab>
    );
}