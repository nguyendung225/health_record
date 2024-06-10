import React, { Dispatch, SetStateAction } from "react";

type IEventSource = {
  eventSourceRemind: any;
}
type IAppContext = {
  pageLoading: boolean;
  setPageLoading: Dispatch<SetStateAction<boolean>>
  eventSource: IEventSource;
  setEventSource: Dispatch<SetStateAction<any>>
}

const initValue: IAppContext = {
  pageLoading: false,
  setPageLoading: () => { },
  eventSource: { eventSourceRemind: {} },
  setEventSource: () => { }
}

const AppContext = React.createContext(initValue);

export default AppContext;