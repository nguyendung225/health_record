import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Button } from 'react-bootstrap';
import ChiTietBieuDo from './ChiTietBieuDo';

type Props = {}

const BNNTheoDoTuoi = (props: Props) => {

    const chartRef = useRef(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const initChart = () => {
        const chartInstance = echarts.init(chartRef.current);

        const data = {
            years: ['18-20 (tuổi)', '20-30 (tuổi)', '30-40 (tuổi)', '40-50 (tuổi)', '50-60 (tuổi)', '60-70 (tuổi)'],
            phoi: [1, 6, 25, 20, 30, 10],
            timMach: [2, 12, 40, 19, 20, 25],
            viemDa: [1, 5, 38, 15, 17, 15],
            diec: [2, 7, 45, 20, 30, 21],
        };

        const totalByYear = data.years.map((_, i) => (
            data.phoi[i] + data.timMach[i] + data.viemDa[i] + data.diec[i]
        ));

        const getPercentage = (value: number, total: number) => ((value / total) * 100).toFixed(1);

        const options = {
            tooltip: {
                trigger: 'item',
                formatter: (params: any) => {
                    const yearIndex = data.years.indexOf(params.name);
                    const total = totalByYear[yearIndex];
                    const percentage = getPercentage(params.value, total);
                    return `${params.seriesName}<br/>Số lượng: ${params.value}<br/>Phần trăm: ${percentage}%`;
                }
            },
            legend: {
                data: ['Phổi', 'Tim mạch', 'Viêm da', 'Ù tai (điếc)']
            },
            xAxis: {
                type: 'category',
                data: data.years
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Phổi',
                    type: 'bar',
                    data: data.phoi,
                    itemStyle: { color: '#009299' },
                    barWidth: '20%'
                },
                {
                    name: 'Tim mạch',
                    type: 'bar',
                    data: data.timMach,
                    itemStyle: { color: '#ff3131' },
                    barWidth: '20%'
                },
                {
                    name: 'Viêm da',
                    type: 'bar',
                    data: data.viemDa,
                    itemStyle: { color: '#ffbd59' },
                    barWidth: '20%'
                },
                {
                    name: 'Ù tai (điếc)',
                    type: 'bar',
                    data: data.diec,
                    itemStyle: { color: '#2f5f98' },
                    barWidth: '20%'
                }
            ]
        };

        chartInstance.setOption(options);
        return chartInstance;
    }

    useEffect(() => {
        const chartInstance = initChart();

        return () => {
            chartInstance.dispose();
        };
    }, []);

    const handleShowModal = () => {
        setShowModal(true);
        setTimeout(() => {
            const chartInstance = initChart();
        }, 0);
    };

    return (
        <div className='d-flex justify-content-center align-items-center spaces p-4'>
            <div
                ref={chartRef}
                style={{ height: '400px', width: '100%' }}
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

            <ChiTietBieuDo
                showModal={showModal}
                setShowModal={setShowModal}
                chartRef={chartRef}
                title={"Biểu đồ thống kê tỉ lệ bệnh nghề nghiệp theo độ tuổi"}
            />
        </div>
    );
}

export default BNNTheoDoTuoi