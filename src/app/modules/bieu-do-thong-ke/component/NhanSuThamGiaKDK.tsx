import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Button } from 'react-bootstrap';

const NhanSuThamGiaKDK = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const data = [
            { name: 'Chưa khám', value: 5, description: 'Nhân sự chưa tới lượt khám hoặc hẹn khám ngày hôm khác' },
            { name: 'Đang khám', value: 20, description: 'Đang trong lượt khám hoặc đang chờ kết quả' },
            { name: 'Đã khám xong', value: 30, description: 'Đã có kết quả khám của tất cả dịch vụ' },
            { name: 'Chưa đủ điều kiện khám', value: 45, description: 'Khám sức khỏe định kỳ là chế độ phúc lợi đối với tất cả nhân viên được ký hợp đồng chính thức' }
        ];

        const total = data.reduce((sum, item) => sum + item.value, 0);

        const options = {
            tooltip: {
                trigger: 'item',
                formatter: (params: any) => {
                    const percentage = ((params.value / total) * 100).toFixed(1);
                    return `${params.name}<br/>Số lượng: ${params.value}<br/>Phần trăm: ${percentage}%<br/>${params.data.description}`;
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: 'middle',
                data: data.map(item => item.name),
                formatter: (name: string) => {
                    const item = data.find(d => d.name === name);
                    return `${name}\n${item?.description || ""}`;
                }
            },
            series: [
                {
                    name: 'Trạng thái khám',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    label: {
                        formatter: '{d}%'
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

        return () => {
            chart.dispose();
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
};

export default NhanSuThamGiaKDK;
