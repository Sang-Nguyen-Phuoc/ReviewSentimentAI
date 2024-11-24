import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from './Analyzation.module.css'
import { useLocation } from 'react-router';
import data from './data';
import { useState } from 'react';

export default function Analyzation() {
  const xData = ['Tích cực', 'Tiêu cực', 'Trung lập'];
  const yData = data.map((arr) => (arr.length));

  const total = yData.reduce((acc, val) => acc + val, 0);
  const formattedData = yData.map((value, index) => ({
    id: index,
    value,
    label: `${xData[index]} (${((value / total) * 100).toFixed(1)}%)`,
    color: index === 0 ? 'green' : index === 1 ? 'red' : 'blue',
  }));

  const [type, setType] = useState(0);
  const location = useLocation();
  const {state} = location

  const handleClick = (event, item) => {
    setType(item.dataIndex);
  };

  return (
    <div className={styles.wrapper}>
        <p className={styles.title}>
            Sản phẩm:
            <span>{state ? state.product : "No product"}</span>
        </p>
        <div className={styles['charts-container']}>
            <BarChart
                title='Phân tích'
                xAxis={[
                    { 
                    label: 'Trạng thái',
                    scaleType: 'band', 
                    data: xData
                    }
                ]}
                yAxis={[
                    {
                    label: 'Số lượng đánh giá',       // Y-axis label
                    tickSpacing: 1,         // Spacing between ticks
                    max: 10,                 // Maximum value of the Y-axis
                    min: 0,                 // Minimum value of the Y-axis
                    showGrid: true,         // Show gridlines
                    },
                ]}
                series={[
                    {data: yData},
                ]}
                width={window.innerWidth*0.5}
                height={400}
                colors={['#1a4a81']}
                onAxisClick={handleClick} // Attach the click handler
                margin={{
                    bottom: 100,
                    top: 100,
                    right: 100,
                    left: 100
                }}
            />
            <PieChart
                series={[{
                    data: formattedData,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
                ]}
                width={window.innerWidth*0.4}
                height={window.innerWidth*0.15}
            />
        </div>
        <div className={styles.detail}>
            <p>
                Bình luận:
                <span className={styles.type}>{xData[type]}</span>
            </p>
            <ul>
                {data[type].map((comment, index) => {
                    return <li key={index}>{comment}</li>
                })}
            </ul>
        </div>
    </div>
  );
}
