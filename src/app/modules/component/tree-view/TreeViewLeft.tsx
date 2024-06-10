import React, { useState } from "react";
import {  useAccordionButton } from "react-bootstrap"; //Accordion, Card,
import "./TreeView.scss";

type IProps = {
  data: any[];
  onNodeClick?: (node: any) => void;
  childrenKey: string;
  title: string;
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

const TreeViewLeft: React.FC<IProps> = ({
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

  const renderHtml = (data: any) => {
    return (
      <ul className="first-level-list">
        {data.map((node: any) => renderTreeNode(node))}
      </ul>
    );
  };
  const renderTreeNode = (node: any) => {
    console.log("node-->", node, childrenKey);
    if (node[childrenKey].length > 0) {
      return (
        // <Accordion key={node?.id}>
        //   <Card>
        //     <Card.Header
        //       className={`with-child ${
        //         selectedNodeId === node?.id ? "selected" : ""
        //       }`}
        //       onClick={() => {
        //         onToggleShowChild(node?.id);
        //         onNodeClick && onNodeClick(node);
        //       }}
        //     >
        //       <CustomToggle eventKey={node?.id?.toString()}>
        //         {node.name}
        //         {node[childrenKey].length > 0 && (
        //           <>
        //             {nodesExpand.includes(node?.id) ? (
        //               <i className="bi bi-chevron-down"></i>
        //             ) : (
        //               <i className="bi bi-chevron-right"></i>
        //             )}
        //           </>
        //         )}
        //       </CustomToggle>
        //     </Card.Header>
        //     <Accordion.Collapse eventKey={node?.id?.toString()}>
        //       <Card.Body>
        //         {node[childrenKey].map((child: any) => (
        //           <div key={child.id}>{renderTreeNode(child)}</div>
        //         ))}
        //       </Card.Body>
        //     </Accordion.Collapse>
        //   </Card>
        // </Accordion>
        <li className="item-menu left-menu">
          <div >{node?.name}</div>
          {renderHtml(node?.subs)}
        </li>
      );
    } else {
      return (
        <li className="item-menu">
          <div
            className={`${selectedNodeId === node?.id ? "selected" : ""}`}
            onClick={() => {
              setSelectedNodeId(node?.id);
              onNodeClick && onNodeClick(node);
            }}
          >
            {node?.name}
          </div>
        </li>
        // <Accordion key={node?.id}>
        //   <Card>
        //     <Card.Header
        //       onClick={() => {
        //         setSelectedNodeId(node?.id);
        //         onNodeClick && onNodeClick(node);
        //       }}
        //       className={`${selectedNodeId === node?.id ? "selected" : ""}`}
        //     >
        //       {node.name}
        //     </Card.Header>
        //   </Card>
        // </Accordion>
      );
    }
  };

  return (
    <>
      <div className="spaces fs-18 text-header-table fw-600 py-12">{title}</div>
      <div>{renderHtml(data)}</div>
    </>
  );
};

export default TreeViewLeft;
