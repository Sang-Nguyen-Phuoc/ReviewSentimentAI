import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from './Analyzation.module.css'
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import ImageCarousel from '../../components/ImageCarousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Analyzation() {
    const xData = ['Tích cực', 'Tiêu cực', 'Trung lập'];

    const location = useLocation();
    const {state} = location;

    const comments = [state.positive_comments, state.negative_comments, state.neutral_comments];

    const yData = comments.map((arr) => (arr.length));
    const total = yData.reduce((acc, val) => acc + val, 0);

    const formattedData = yData.map((value, index) => ({
    id: index,
    value,
    label: `${xData[index]} (${((value / total) * 100).toFixed(1)}%)`,
    color: index === 0 ? 'green' : index === 1 ? 'red' : 'blue',
    }));

    const rating = (state.rating).toFixed(1);
    const ratingPercent = (state.rating/5).toFixed(2);
    const [type, setType] = useState(0);

    useEffect(() => {
        document.getElementById('description').innerHTML = state.description; 
    })

    const handleClick = (event, item) => {
        setType(item.dataIndex);
    };

    return (
    <div className={styles.wrapper}>
        <div className={styles['product-information']}>
            <p className={styles.title}>Sản phẩm</p>
            <div className={styles.information}>
                <div className={styles.images}>
                    <ImageCarousel images={state['imgs_url']}/>
                </div>
                <div className={styles['information-container']}>
                    <div className={styles['information-detail']}>
                        <div className={styles.header}>
                            <div className={styles.name}>{state['product_name']}</div>
                            <div className={styles.detail}>
                                <div className={styles.rating}>
                                    {rating}
                                    <div className={styles['stars-outer']}>
                                        {[...Array(5)].map((_, index) => {
                                            return (
                                                <FontAwesomeIcon key={index} icon={faStar}/>
                                            )
                                        })}
                                        <div className={styles['stars-inner']}
                                            style={{
                                                width: `${Math.round(ratingPercent*100)}%`,
                                            }}
                                        >
                                            {[...Array(5)].map((_, index) => {
                                                return (
                                                    <FontAwesomeIcon key={index} icon={faStar}/>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.sold}>
                                    <div className={styles.line}></div>
                                    {`Đã bán ${state.sold}`}
                                </div>
                            </div>
                            <div className={styles.price}>
                                {new Intl.NumberFormat('de-DE').format(state.price)}
                                <span>₫</span>
                            </div>
                            <p>Mô tả sản phẩm:</p>
                        </div>
                        <div className={styles.description}>
                            <div id='description'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles['charts-container']}>
            <p className={styles.title}>Biểu đồ phân tích phản hồi từ khách hàng: <span>{total} lượt đánh giá</span></p>
            <div className={styles.charts}>
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
                        max: Math.max.apply(null, yData)+10,                 // Maximum value of the Y-axis
                        min: 0,                 // Minimum value of the Y-axis
                        showGrid: true,         // Show gridlines
                        },
                    ]}
                    series={[
                        {data: yData},
                    ]}
                    width={window.innerWidth*0.5}
                    height={window.innerHeight*0.6}
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
        </div>
        <div className={styles.comments}>
            <p className={styles.title}>
                Bình luận:
                <span className={styles.type}>{xData[type]}</span>
            </p>
            <ul>
                {comments[type].map((comment, index) => {
                    return <li key={index}>{comment}</li>
                })}
            </ul>
        </div>
    </div>
);
}
