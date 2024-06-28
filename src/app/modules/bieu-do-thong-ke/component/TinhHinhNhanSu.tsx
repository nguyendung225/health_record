import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Button } from 'react-bootstrap';
import ChiTietBieuDo from './ChiTietBieuDo';

type Props = {}

const TinhHinhNhanSu = (props: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const chartRef = useRef(null);

    const initChart = () => {
        const chartInstance = echarts.init(chartRef.current);

        const data = {
            years: ['2021', '2022', '2023', '2024'],
            working: [50, 100, 150, 200],
            retired: [10, 20, 30, 40],
            suspended: [5, 10, 15, 20],
            resigned: [7, 14, 21, 28]
        };

        const totalByYear = data.years.map((_, i) => (
            data.working[i] + data.retired[i] + data.suspended[i] + data.resigned[i]
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
                left: 'center',
                data: ['Đang làm việc', 'Nghỉ chế độ', 'Đình chỉ công tác', 'Thôi việc']
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
                    name: 'Đang làm việc',
                    type: 'bar',
                    data: data.working,
                    itemStyle: { color: '#00A3E0' },
                    barWidth: '20%'
                },
                {
                    name: 'Nghỉ chế độ',
                    type: 'bar',
                    data: data.retired,
                    itemStyle: { color: '#1A237E' },
                    barWidth: '20%'
                },
                {
                    name: 'Đình chỉ công tác',
                    type: 'bar',
                    data: data.suspended,
                    itemStyle: { color: '#8BC34A' },
                    barWidth: '20%'
                },
                {
                    name: 'Thôi việc',
                    type: 'bar',
                    data: data.resigned,
                    itemStyle: { color: '#212121' },
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
                title={"Biểu đồ thống kê tình hình nhân sự"}
            />
        </div>
    );
}

export default TinhHinhNhanSu