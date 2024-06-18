import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Button } from 'react-bootstrap';

type Props = {}

const BNNTheoGioiTinh = (props: Props) => {

    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const data = {
            years: ['Phổi', 'Tim mạch', 'Việm da', 'Ù tai (điêc)'],
            phoi: [50, 30, 40, 35],
            timMach: [20, 35, 20, 38],
        };

        const totalByYear = data.years.map((_, i) => (
            data.phoi[i] + data.timMach[i]
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
                data: ['Nam', 'Nữ'],
                left: 'center'
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
                    name: 'Nam',
                    type: 'bar',
                    data: data.phoi,
                    itemStyle: { color: '#545454' }
                },
                {
                    name: 'Nữ',
                    type: 'bar',
                    data: data.timMach,
                    itemStyle: { color: '#ff914d' }
                },
            ]
        };

        chartInstance.setOption(options);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return (
        <div className='d-flex flex-row flex-center'>
            <div
                ref={chartRef}
                style={{ height: '400px', width: '100%' }}
            />
            <div>
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
        </div>
    );
}

export default BNNTheoGioiTinh