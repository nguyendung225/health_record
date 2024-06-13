import React, { useState } from "react";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import "../../component/tree-view/TreeView.scss";
import "../styles/styleTreeView.scss";
import { InputSearch } from "@oceantech/oceantech-ui";

type IProps = {
  data: any[];
  onNodeClick?: (node: any) => void;
  childrenKey: string;
  title: string | JSX.Element;
};

function CustomToggle({
  children,
  eventKey,
  callback,
}: {
  children?: any;
  eventKey: string;
  callback?: (eventKey: string) => void;
}) {
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  return (
    <div className="accordion-header" onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

const TreeViewPersonnel: React.FC<IProps> = ({
  data,
  onNodeClick,
  childrenKey,
  title,
}) => {
  const [nodesExpand, setNodesExpand] = useState<any[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>();

  const checkAndModifyArray = (arr: string[] = [], str: string) => {
    // Kiểm tra xem str có trong mảng hay không
    const index = arr.indexOf(str);

    // Nếu str đã có trong mảng, xóa str khỏi mảng
    if (index !== -1 && index !== undefined) {
      arr.splice(index, 1);
    }
    // Nếu str không có trong mảng, thêm str vào cuối mảng
    else {
      arr.push(str);
    }

    // Trả về mảng sau khi đã được sửa đổi
    return arr;
  };

  const onToggleShowChild = (id: string) => {
    setSelectedNodeId(id);
    let _nodesExpand = checkAndModifyArray(nodesExpand, id);
    setNodesExpand([..._nodesExpand]);
  };

  const renderTreeNode = (node: any) => {
    if (node[childrenKey].length > 0) {
      return (
        <Accordion key={node?.id}>
          <Card>
            <Card.Header
              className={`with-child ${
                selectedNodeId === node?.id ? "selected" : ""
              }`}
              onClick={() => {
                onToggleShowChild(node?.id);
                onNodeClick && onNodeClick(node);
              }}
            >
              <CustomToggle eventKey={node?.id?.toString()}>
                <div className="fw-bold">
                  {node[childrenKey].length > 0 && (
                    <>
                      {nodesExpand.includes(node?.id) ? (
                        <span>
                          <i className="bi bi-caret-right-fill"></i>
                          {
                            node.parent ?
                              <i className="bi bi-house-door"></i>
                              :
                              <i className="bi bi-dash-square"></i>
                          }
                        </span>
                      ) : (
                        <span>
                          <i className="bi bi-caret-down-fill"></i>
                          {
                            node.parent ?
                              <i className="bi bi-house-door"></i>
                              :
                              <i className="bi bi-plus-square"></i>
                          }
                        </span>
                      )}
                    </>
                  )}
                  {node.name}
                </div>
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={node?.id?.toString()}>
              <Card.Body>
                {node[childrenKey].map((child: any) => (
                  <div key={child.id}>{renderTreeNode(child)}</div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
    } else {
      return (
        <Accordion key={node?.id}>
          <Card>
            <Card.Header
              onClick={() => {
                setSelectedNodeId(node?.id);
                onNodeClick && onNodeClick(node);
              }}
              className={`${selectedNodeId === node?.id ? "selected" : ""}`}
            >
              <i className="spaces bi bi-square mx-4"></i>
              {node.name}
            </Card.Header>
          </Card>
        </Accordion>
      );
    }
  };

  return (
    <>
      <div className="spaces fs-14 text-header-table fw-600 py-12">{title}</div>
      <div>
        <InputSearch
          onChange={() => { }}
          handleSearch={() => { }}
          placeholder="Tìm kiếm đơn vị/phòng ban"
        />
      </div>
      <div className="mt-2">{data.map((node) => renderTreeNode(node))}</div>
    </>
  );
};

export default TreeViewPersonnel;
