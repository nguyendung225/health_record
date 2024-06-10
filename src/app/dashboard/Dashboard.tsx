import { FC } from "react";
import { TMenu } from "./listMenu";
import { GRID } from "../Constant";
import { Link } from "react-router-dom";
import { useAuth } from "../modules/auth";
import { Col, Image, Row } from "react-bootstrap";
import { toAbsoluteUrl } from "../../_metronic/helpers";
import { getCurrentUserInformation } from "../AppFunction";
import { KEY_LOCALSTORAGE } from "../modules/auth/core/_consts";
import { localStorageItem } from "../modules/utils/LocalStorage";
import { checkMenuByPermissions } from "../modules/utils/FunctionUtils";
import { headerConstant } from "../../_metronic/layout/components/header/header-menus/constant";
import useMultiLanguage from "../hook/useMultiLanguage";
import './styles/styles.scss';

interface LinkBtnProps {
  linkTo: string;
  iconPath: string;
  text: string;
  modulePermission: string;
  moduleName: string;
  dataList: TMenu[];
}

const LinkButton = (props: LinkBtnProps) => {
  const { linkTo = "", iconPath, text, moduleName, dataList } = props;
  const checkedMenu = dataList;
  let colSize = 12;
  if (checkedMenu?.length === 1) {
    colSize = GRID.ONE_ITEM_PER_LINE;
  } else if (checkedMenu?.length === 2 || checkedMenu?.length === 4) {
    colSize = GRID.TWO_ITEM_PER_LINE;
  } else if (checkedMenu?.length === 3 || checkedMenu?.length === 6) {
    colSize = GRID.THREE_ITEM_PER_LINE;
  } else if (checkedMenu?.length > 9) {
    colSize = GRID.FOUR_ITEM_PER_LINE;
  } else {
    colSize = GRID.FOUR_ITEM_PER_LINE;
  }

  const handleButtonClick = (module: string) => {
    localStorageItem.set(KEY_LOCALSTORAGE.CURRENT_MODULE, module);
    const selectedMenu = checkedMenu.find((menu) => menu.name === module);
    if (selectedMenu) {
      localStorage.setItem(
        headerConstant.LIST_SUB_MENU,
        JSON.stringify(selectedMenu.subMenu)
      );
    }
  };

  return (
    <>
      <Col
        xs={12}
        sm={6}
        md={colSize}
        xl={colSize}
        className="flex flex-center"
      >
        <Link to={linkTo} onClick={() => handleButtonClick(moduleName)}>
          <div className="link-button-container">
            <button type="button" className="button-link">
              <div className="cirle-animation cirle-animation-1"></div>
              <div className="cirle-animation cirle-animation-2"></div>
              <Image src={toAbsoluteUrl(iconPath)} alt="image" />
            </button>
            <span className="button-text">{text}</span>
          </div>
        </Link>
      </Col>
    </>
  );
};

export const Dashboard: FC = () => {
  const { lang } = useMultiLanguage();
  const { logout } = useAuth();
  const userInfo = getCurrentUserInformation();
  document.title = `${lang("SOFTWARE")}`;
  const listMenuByPermission = checkMenuByPermissions();
  return (
    <div className="main">
      <div className="header">
        <div className="logo"></div>
        <div className="user">
          <div className="user-info">
            <span>{lang("GENERAL.HELLO")}</span>
            <h5>{userInfo.currentUser?.name}</h5>
          </div>
          <div className="user-avatar">
            <img
              src={
                localStorageItem.get(headerConstant.URL_IAMGE_AVATAR) ||
                toAbsoluteUrl("/media/avatars/blank.png")
              }
              alt="avatar"
            />
          </div>
          <div className="user-logout">
            <button type="button" onClick={logout}>
              {lang("LOGOUT")}
            </button>
          </div>
        </div>
      </div>
      <div className="z-100 main-content">
        <div className="body-container">
          <Row>
            <Col xs={12}>
              <h2 className="title-software">
                {lang("GENERAL.NAME_SOFTWARE")}
              </h2>
            </Col>
          </Row>

          {listMenuByPermission?.map((item: TMenu) => {
            return (
              <Row className="flex flex-start width-80 spaces mx-auto">
                <LinkButton
                  linkTo={item.to}
                  iconPath={item.icon}
                  text={lang(item.title)}
                  modulePermission={item.permission}
                  moduleName={item.name}
                  dataList={listMenuByPermission}
                />
              </Row>
            );
          })}
        </div>
      </div>
    </div>
  );
}