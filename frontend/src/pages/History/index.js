import styles from './History.module.css';
import { useState, useEffect, useRef } from 'react';
import useFetch from '../../hooks/useFetch';
import AnalyzeModal from '../../components/AnalyzeModal';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faStar } from '@fortawesome/free-solid-svg-icons';
import { getCurrentUser } from '../../utils/userStorage';

const REACT_APP_BASEURL = "http://localhost:3001";
const API = {
    method: 'POST',
    headers : {
      "Content-Type": "application/json",
    },
    body: null,
};


const History = () => {

    const handleClick = () => {
        const key = inputRef.current.value;
        const rating = ratingRef.current.value;
        const price = priceRef.current.value;

        const newProductsList = (
            key === '' 
            ? productsList.slice() 
            : productsList.filter((product) => product.name.toLowerCase().includes(key.toLowerCase()))
        )

        if (rating !== 'default') {
            if (rating === 'ascending')
                newProductsList.sort((p1, p2) => p1.rating - p2.rating)
            else
                newProductsList.sort((p1, p2) => p2.rating - p1.rating)
        }

        if (price !== 'default') {
            if (price === 'ascending')
                newProductsList.sort((p1, p2) => p1.price - p2.price)
            else
                newProductsList.sort((p1, p2) => p2.price - p1.price)
        }
        setProductsList(newProductsList)
    }

    const inputRef = useRef(null);
    const ratingRef = useRef(null);
    const priceRef = useRef(null);

    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        const getProductsList = async () => {
            try {
                const response = await fetch(`${REACT_APP_BASEURL}/api/v1/link/get/${getCurrentUser().id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setProductsList(data.data);
                }
                else
                    return 'Error';
        
            } catch (error) {
                toast.error('Lỗi kết nối đến server');
            }
        }
        getProductsList();
    }, [])

    const [reqAPI, setReqAPI] = useState(API);

    const navigate = useNavigate();

    // Call API
    const {payload, status, isLoading} = useFetch(`${REACT_APP_BASEURL}/api/v1/product`, reqAPI);
    useEffect(() => {
        if (status === 'success'){
            navigate('/analyze', {state: payload});
        }
        else if (status !== 'success' && status !== 'fail') {
            toast.error(status);
        }
        setReqAPI({...reqAPI, body:null});
    }, [payload, status])

    return ( 
        <div className={styles.wrapper}>
            <AnalyzeModal show={isLoading}/>
            <div className={styles.search}>
                <div className={styles.input} >
                    <input ref={inputRef} placeholder='Nhập tên sản phẩm'/>
                </div>
                <div className={styles.filter}>
                    <select ref={ratingRef} defaultValue={'default'}>
                        <option value="default" disabled>Đánh giá</option>
                        <option value="ascending">Tăng dần</option>
                        <option value="descending">Giảm dần</option>
                    </select>
                    <select ref={priceRef} defaultValue={'default'}>
                        <option value="default" disabled>Giá</option>
                        <option value="ascending">Tăng dần</option>
                        <option value="descending">Giảm dần</option>
                    </select>
                    {/* <FontAwesomeIcon icon={faSort}/> */}
                    <button className={styles.btn} onClick={handleClick}>
                        Lọc
                        <FontAwesomeIcon icon={faFilter}/>
                    </button>
                </div>
            </div>
            <div className={styles.quantity}>
                        <span>{productsList.length}</span>
                        sản phẩm
            </div>
            <div className={styles['products-list']}>
                {productsList.map((product, index) => {
                    return (
                        <div className={styles.product} key={index} onClick={() => setReqAPI({...reqAPI, body: JSON.stringify({product_url: product.product_url})})}>
                            <img src={product.imgs_url[0]} alt="img" className={styles.image}/>
                            <div className={styles.detail}>
                                <div className={styles.name}>{product.product_name}</div>
                                <div className={styles['rating-sold']}>
                                    <div className={styles.rating}>
                                        {product.rating}
                                        <div className={styles['stars-outer']}>
                                            {[...Array(5)].map((_, index) => {
                                                return (
                                                    <FontAwesomeIcon key={index} icon={faStar}/>
                                                )
                                            })}
                                            <div className={styles['stars-inner']}
                                                style={{
                                                    width: `${Math.round((product.rating/5)*100)}%`,
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
                                        {`Đã bán ${product.sold}`}
                                    </div>
                                </div>
                                <div className={styles.price}>
                                    {new Intl.NumberFormat('de-DE').format(product.price)}
                                    <span>₫</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
     );
}
 
export default History;