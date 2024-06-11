import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { OCTTable, InputSearch, OCTKTSVG } from '@oceantech/oceantech-ui';
import { ColumnDSKhamSKDinhKi } from './constants/columns';
import { listDataKhamSkDinhKi } from './constants/fakeData';
import { TYPE } from '../utils/Constant';
import AddNewDialog from './component/AddNewDialog';
import { useNavigate } from 'react-router-dom';
type Props = {}

const KhamSkDinhKi = (props: Props) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string>("");
    const [listKhamSkDinhKi, setListKhamSkDinhKi] = useState<any[]>(listDataKhamSkDinhKi);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [numberOfElements, setNumberOfElements] = useState<number>(0);
    const [showAddNewDialog, setShowAddNewDialog] = useState<boolean>(false);

    const handleChange = (e: any) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
    };

    return (
        <div className='wrapper-content'>
            <Row className='align-items-center py-2'>
                <Col xs="6" className='my-5'>
                    <h4 className='spaces m-0 color-primary'>Khám sức khỏe định kì</h4>
                </Col>
                <Col xs="6" className='d-flex flex-center justify-content-end'>
                    <InputSearch
                        className='min-w-250px'
                        onChange={handleChange}
                        handleSearch={handleSearch}
                        placeholder="Nhập vào đây"
                        isEnter
                    />
                    <Button
                        className='spaces w-100 button-primary py-4 h-30 mx-4'
                        size='sm'
                        onClick={() => { }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        className='spaces w-120 button-primary-outline py-4 h-31'
                        size='sm'
                        variant='primary-outline'
                        onClick={() => { }}
                    >
                        Tìm nâng cao
                    </Button>
                </Col>
            </Row>
            <Row className='mx-1 p-4 bg-white'>
                <Col xs="12" className='d-flex flex-center justify-content-start'>
                    <Button
                        className='spaces w-115 button-primary py-4 h-30 mx-4'
                        size='sm'
                        onClick={() => setShowAddNewDialog(true)}
                    >
                        <OCTKTSVG path='/media/icons/add.svg' className='text-white' svgClassName='fs-2 w-auto h-auto' />
                        Thêm mới
                    </Button>
                    <Button
                        className='spaces w-110 button-primary-outline py-4 h-31 mx-4'
                        size='sm'
                        variant='primary-outline'
                        onClick={() => { }}
                    >
                        <OCTKTSVG path='/media/icons/export-excel.svg' className='text-primary' svgClassName='fs-2 w-auto h-auto' />
                        Xuất Excel
                    </Button>
                </Col>
                <Col xs="12">
                    <OCTTable
                        data={listKhamSkDinhKi || []}
                        columns={ColumnDSKhamSKDinhKi({})}
                        justFilter={true}
                        totalElements={totalElements}
                        numberOfElements={numberOfElements}
                        type={TYPE.MULTILINE}
                        handleDoubleClick={(rowData) => {
                            navigate(`${rowData.id}`); 
                        }}
                    />
                </Col>
            </Row>
            {showAddNewDialog && (
                <AddNewDialog
                    show={showAddNewDialog}
                    onClose={() => setShowAddNewDialog(false)}
                />
            )}
        </div>
    )
}

export default KhamSkDinhKi;