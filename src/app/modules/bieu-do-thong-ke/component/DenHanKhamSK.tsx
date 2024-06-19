import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Button } from 'react-bootstrap';
import ChiTietBieuDo from './ChiTietBieuDo';

const DenHanKhamSK = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const chartRef = useRef(null);

    const initChart = (isLegend = false, radius = '50%') => {
        const chart = echarts.init(chartRef.current);
        const data = [
            { name: 'Đến hạn khám', value: 50 },
            { name: 'Dời lịch khám', value: 130 },
            { name: 'Đã khám xong', value: 156 },
        ];
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const options = {
            tooltip: {
                trigger: 'item',
                formatter: (params: any) => {
                    const percentage = ((params.value / total) * 100).toFixed(1);
                    return `${params.name}<br/>Số lượng: ${params.value}<br/>Phần trăm: ${percentage}%`;
                }
            },
            legend: isLegend ? {
                orient: 'vertical',
                left: 'left',
                data: data.map(item => item.name),
            } : undefined,
            series: [
                {
                    name: 'Hạn khám sức khỏe',
                    type: 'pie',
                    radius: radius,
                    center: ['50%', '50%'],
                    data: data,
                    label: {
                        formatter: '{d}%',
                        fontSize: 14,
                        fontFamily: 'Arial, sans-serif',
                        color: '#333',
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        chart.setOption(options);
        return chart;
    };

    useEffect(() => {
        const chart = initChart();
        return () => {
            chart.dispose();
        };
    }, []);

    const handleShowModal = () => {
        setShowModal(true);
        setTimeout(() => {
            const chart = initChart(true, '80%');
        }, 0);
    };

    return (
        <div className='d-flex flex-row flex-center'>
            <div
                ref={chartRef}
                style={{ height: '400px', width: '90%' }}
            />
            <div>
                <Button
                    className='spaces w-80 button-primary py-4 h-31 mx-4 mb-10'
                    size='sm'
                    variant='primary'
                    onClick={handleShowModal}
                >
                    <i className="bi bi-eye fs-2"></i>
                    Xem
                </Button>
                <Button
                    className='spaces w-80 button-primary py-4 h-31 mx-4 mb-10'
                    size='sm'
                    variant='primary'
                    onClick={() => { }}
                >
                    <i className="bi bi-printer fs-2"></i>
                    In
                </Button>
                <Button
                    className='spaces w-80 button-primary py-4 h-31 mx-4 mb-10'
                    size='sm'
                    variant='primary'
                    onClick={() => { }}
                >
                    <i className="bi bi-download fs-2"></i>
                    PNG
                </Button>
                <Button
                    className='spaces w-80 button-primary py-4 h-31 mx-4 mb-10'
                    size='sm'
                    variant='primary'
                    onClick={() => { }}
                >
                    <i className="bi bi-download fs-2"></i>
                    PDF
                </Button>
                <Button
                    className='spaces w-80 button-primary py-4 h-31 mx-4 mb-10'
                    size='sm'
                    variant='primary'
                    onClick={() => { }}
                >
                    <i className="bi bi-download fs-2"></i>
                    SVG
                </Button>
                <Button
                    className='spaces w-80 button-primary py-4 h-31 mx-4 mb-10'
                    size='sm'
                    variant='primary'
                    onClick={() => { }}
                >
                    <i className="bi bi-download fs-2"></i>
                    JPEG
                </Button>
            </div>

            {
                showModal && <ChiTietBieuDo
                    showModal={showModal}
                    setShowModal={setShowModal}
                    chartRef={chartRef}
                    title={"Biểu đồ cảnh báo đến hạn đăng ký khám sức khỏe"}
                />
            }
        </div>
    );
};

export default DenHanKhamSK;
