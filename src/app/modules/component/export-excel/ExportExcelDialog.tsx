/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import AppContext from "../../../AppContext";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import TextValidator from "../../component/input-field/TextValidator";
import { exportToFile, removeDiacritics } from "../../utils/FunctionUtils";
import { AxiosResponse } from "axios";
import { IObject } from "../../models/models";
import { SUCCESS_CODE } from "../../constant";

type IProps = {
  handleClose: () => void;
  ids: string[];
  defaultCodeExportField?: string[];
  maxExportFields?: number;
  exportAPI: (obj: any) => void;
  getFieldsAPI: () => Promise<AxiosResponse<any, any>>;
  fileName: string;
  searchObj?: IObject;
};

export const ExportExcelDialog: React.FC<IProps> = ({
  handleClose,
  ids,
  defaultCodeExportField,
  maxExportFields,
  exportAPI,
  getFieldsAPI,
  fileName,
  searchObj = {}
}) => {
  const { lang } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [keyword, setKeyword] = useState<string>();
  const [dataFields, setDataFields] = useState<any[]>([]);
  const [exportFields, setExportFields] = useState<any[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<any>({});

  useEffect(() => {
    let _openSections: any = openSections;
    dataFields?.map((item) => {
      let key = item?.header;
      if (item?.matched === true) {
        openSections[key] = true;
      } else if (item?.matched === false && !openSections[key]) {
        openSections[key] = false;
      }
      return item;
    });
    setOpenSections({ ..._openSections });
  }, [dataFields]);

  useEffect(() => {
    addIndexPath(dataFields);
  }, [dataFields]);

  const addNamePath = (fields: any[], parentNamePath: string) => {
    return fields.map((field, index) => {
      const currentNamePath = parentNamePath
        ? `${parentNamePath}/${field.header}`
        : field.header;
      const updatedField = {
        ...field,
        namePath: currentNamePath,
        selected: defaultCodeExportField?.includes(field.code) || false
      };
      if (field?.fields) {
        updatedField.fields = addNamePath(field.fields, currentNamePath);
      }

      return updatedField;
    });
  };

  const handleSearch = (data: any, keyword: string) => {
    let _data = data;
    data.forEach((obj: any, index: number) => {
      if (
        removeDiacritics(obj.header.toLowerCase()).includes(
          removeDiacritics(keyword.toLowerCase())
        ) &&
        keyword
      ) {
        obj.matched = true;
      } else if (obj?.fields && obj.fields.length > 0 && keyword) {
        obj.matched = obj.fields?.some((field: any) => field.matched === true);
        handleSearch(obj.fields, keyword);
      } else {
        let key = obj?.header;
        obj.matched = false;
        openSections[key] = false;
      }
    });
    return _data;
  };

  const filterFieldsByCode = (fields: any, codes: string[]) => {
    return fields
      .filter((field: any) => codes.includes(field.code))
      .map((field: any) => {
        if (field.fields) {
          return {
            ...field,
            fields: filterFieldsByCode(field.fields, codes)
          };
        } else {
          return field;
        }
      });
  };

  const generateFilteredData = (data: any, codes: string[]) => {
    return data.map((category: any) => {
      return {
        ...category,
        fields: filterFieldsByCode(category.fields, codes)
      };
    });
  };

  const flattenFields = (data: any) => {
    let flattenedFields: any[] = [];

    function recursiveFlatten(fields: any) {
      fields.forEach((field: any) => {
        flattenedFields.push(field);
        if (field.fields) {
          recursiveFlatten(field.fields);
        }
      });
    }

    data.forEach((category: any) => {
      recursiveFlatten(category.fields);
    });

    return flattenedFields;
  };

  const toggleSelectField = (item: any, selected: boolean) => {
    let indexPath = item?.indexPath?.split(".");
    return Object.keys(dataFields).map((key, index) => {
      let depth = 1;
      if (Number(indexPath[depth - 1]) === index) {
        let current = {...dataFields[Number(key)]};
        if (current.fields) {
          depth += 1;
          let updatedField = current.fields?.map((item: any, index: number) => {
            if (Number(indexPath[depth - 1]) === index) {
              return {
                ...item,
                selected
              };
            }
            return item;
          });
          current.fields = updatedField;
        }
        current = {
          ...current,
          selected: selected || current.fields.some((item: any) => item.selected)
        };
        return current;
      }
      return dataFields[Number(key)];
    });
  };

  const addIndexPath = (data: any, path: string[] = []) => {
    return Object.keys(data).map((key, index) => {
      const newPath = [...path, key];
      const current = data[key];

      const updated = {
        ...current,
        indexPath: newPath.join("."),
        namePath: current.header
      };

      if (current?.fields) {
        let newFieldsWithIndexPath = addIndexPath(current.fields, newPath);
        let newFieldsWithNamePath = addNamePath(current.fields, current.header);
        let mergeFields = newFieldsWithIndexPath.map((item, index) => ({
          ...item,
          ...newFieldsWithNamePath[index]
        }));
        updated.fields = mergeFields;
        updated.selected = mergeFields?.some(
          (field: any) => field.selected === true
        );
      }

      return updated;
    });
  };

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prevOpenSections: any) => ({
      ...prevOpenSections,
      [sectionKey]: !prevOpenSections[sectionKey]
    }));
  };

  const handleAddField = (e: any, item: any) => {
    e.stopPropagation();
    if (exportFields?.length === maxExportFields) {
      toast.warning(lang("GENERAL.MAX.FIELD.EXPORT"));
      return;
    } else {
      setExportFields([...exportFields, item]);
      setDataFields([...toggleSelectField(item, true)]);
    }
  };

  const handleDeleteField = (e: any, item: any) => {
    e.stopPropagation();
    let code = item?.code;
    let index = exportFields.findIndex((item) => item?.code === code);
    let _exportFields = [...exportFields];
    _exportFields.splice(index, 1);
    setDataFields([...toggleSelectField(item, false)]);
    setExportFields([..._exportFields]);
  };

  const renderAccordionItem = (item: any, parentKey = "") => {
    const sectionKey = parentKey ? `${parentKey}_${item.header}` : item.header;

    return (
      <div key={sectionKey} className="accordion-item">
        <div
          className="accordion-header"
          onClick={() => toggleSection(sectionKey)}
        >
          <button
            className="accordion-button justify-content-between"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${sectionKey}`}
            aria-expanded="true"
            aria-controls={`collapse${sectionKey}`}
          >
            <div className="flex gap-2">
              <i
                className={`fs-5 bi bi-chevron-compact-right ${
                  openSections[sectionKey] ? "down" : ""
                }`}
              />
              {item.header}
            </div>
          </button>
        </div>
        {openSections[sectionKey] && (
          <div
            id={`collapse${sectionKey}`}
            className={`accordion-collapse collapse ${sectionKey && "show"}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-item">
              {item.fields.map((field: any, index: any) => {
                return field.fields
                  ? renderAccordionItem(field, sectionKey)
                  : !field?.selected &&
                      (!keyword ? (
                        <div key={index} className="accordion-item relative">
                          {field.header}
                          <i
                            className="spaces bi bi-plus fs-20 color-primary add-field-btn"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Thêm trường"
                            onClick={(e: any) => handleAddField(e, field)}
                          ></i>
                        </div>
                      ) : field?.matched && keyword ? (
                        <div key={index} className="accordion-item relative">
                          {field.header}
                          <i
                            className="spaces bi bi-plus fs-20 color-primary add-field-btn"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Thêm trường"
                            onClick={(e: any) => {
                              let key = openSections[sectionKey];
                              setOpenSections({
                                ...openSections,
                                [key]: true
                              });
                              handleAddField(e, field);
                            }}
                          ></i>
                        </div>
                      ) : null);
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = async () => {
    if (exportFields.length === 0) return toast.warning(lang("TOAST.SELECT_LIST_FIELDS"));
    let data: any = {};
    dataFields.forEach((item, index) => {
      let key = keys[index];
      data[key] = item;
    });
    try {
      setPageLoading(true);
      await exportToFile({
        exportAPI: () =>
          exportAPI({
            fieldExportResponseDto: data,
            ids,
            ...searchObj
          }),
        fileName
      });
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const fetchAvailableFieldsExport = async () => {
    try {
      setPageLoading(true);
      let { data } = await getFieldsAPI();
      if (data?.code === SUCCESS_CODE && data?.data) {
        let keys = Object.keys(data?.data);
        setKeys(keys);
        let dataFields = addIndexPath(Object.values(data?.data));
        if (defaultCodeExportField) {
          let filteredData = generateFilteredData(
            dataFields,
            defaultCodeExportField
          );
          let defaultFields = flattenFields(filteredData);
          setExportFields(defaultFields);
        }
        setDataFields(dataFields);
      }
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      console.error(error);
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  useEffect(() => {
    fetchAvailableFieldsExport();
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: handleSubmit
  });

  const handleChangeKeyword = (e: any) => {
    let { value } = e.target;
    setKeyword(value);
    let _data = handleSearch(dataFields, value);
    setDataFields([..._data]);
  };

  return (
    <Modal
      show={true}
      size="xl"
      onHide={handleClose}
      centered
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {lang("GENERAL.DATA.EXPORT")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-end">
            <Col md={6}>
              <TextValidator
                lable={lang("INPUT.FIELDS.AVAILABLES")}
                name="cacTruongKhaDung"
                value={keyword}
                type="text"
                onChange={(e: any) => handleChangeKeyword(e)}
              />
            </Col>
            <Col md={6}></Col>
            <Col md={6}>
              <div className="tree-list mt-4">
                <div className="accordion" id="accordionExample">
                  {dataFields.map((item: any, index: any) => {
                    return renderAccordionItem(item);
                  })}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="selected-fields">
                <div className="selected-fields-wrapper">
                  {exportFields?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-content-between p-2 selected-item cursor-pointer"
                    >
                      <div className="flex gap-2 align-items-center">
                        <i className="bi bi-arrows-move color-primary"></i>
                        {item?.namePath}
                      </div>
                      <i
                        className="bi bi-trash fs-4 color-red"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Xóa trường"
                        onClick={(e: any) => handleDeleteField(e, item)}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="flex-center">
          <Button
            variant="outline-secondary"
            className="button-secondary btn-sm"
            onClick={() => handleClose()}
          >
            {lang("BTN.CANCEL")}
          </Button>
          <Button
            variant="primary"
            className="button-primary btn-sm"
            type="submit"
          >
            {lang("GENERAL.EXPORT")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
