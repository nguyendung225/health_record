import { useContext, useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Autocomplete from "../../component/input-field/Autocomplete";
import { GroupButton } from "../../component/GroupButton";
import { exportToFile } from "../../utils/FunctionUtils";
import AppContext from "../../../AppContext";
import { RESPONSE_STATUS_CODE, TYPE } from "../../utils/Constant";
import { toast } from "react-toastify";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import { IDataPreview, ITemplateExportWord } from "./models/exportWordModels";
import "./exportWord.scss";
import { exportWord, getDataPreviewWord } from "../../services";
import { IObject } from "../../models/models";

interface IProps {
  open: boolean;
  handleClose: () => void;
  templateList: ITemplateExportWord[];
  getObj: IObject;
  customFileName?: (dataPreview: IDataPreview, fileNameBase: string) => string; 
}

export function ExportWord(props: IProps) {
  const { open, handleClose, templateList, getObj, customFileName } = props;
  const { lang } = useMultiLanguage();

  const [dataPreview, setDataPreview] = useState<IDataPreview>({} as IDataPreview);
  const [template, setTemplate] = useState<ITemplateExportWord>(templateList[0]);
  const { setPageLoading } = useContext(AppContext);

  useEffect(() => {
    getDataPreview();
  }, []);

  const getDataPreview = async () => {
    try {
      setPageLoading(true);
      const { data } = await getDataPreviewWord(getObj);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        setDataPreview(data?.data || {})
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    } finally {
      setPageLoading(false);
    }
  };

  const handleExportWord = () => {
    exportToFile({
      exportAPI: () => exportWord(getObj),
      fileName: customFileName ? customFileName(dataPreview, template.name) : template.name,
      type: TYPE.WORD,
      setPageLoading
    });
  };

  return (
    <Modal
      show={open}
      size="xl"
      centered
      className="custom-modal profile export-word"
      aria-labelledby="example-custom-modal-styling-title"
      onHide={handleClose}
    >
      <Modal.Header className="spaces px-16 py-10">
        <div className="w-100">
          <div className="spaces flex flex-middle flex-space-between py-12 color-primary text-uppercase">
            <GroupButton type="btn-back" handleClose={handleClose} />
            <button className="button-primary" onClick={handleExportWord}>
              {lang("GENERAL.EXPORT_TYPE_WORD")}
            </button>
          </div>
          {templateList.length > 1 && (
            <Row>
              <Col xs={8} className="spaces z-index-10">
                <Autocomplete
                  horizontal={true}
                  lable={lang("GENERAL.SELECT_TEMPLATE_EXPORT_WORD")}
                  options={templateList}
                  value={template}
                  onChange={(value) => setTemplate(value)}
                />
              </Col>
            </Row>
          )}
        </div>
      </Modal.Header>
      <Modal.Body className="content">{template?.componentPreview && template.componentPreview(dataPreview)}</Modal.Body>
    </Modal>
  );
}
