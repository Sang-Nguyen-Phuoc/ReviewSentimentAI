import React, { useState } from 'react'
import Banner from '../../components/Banner'
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';


export default function Home() {
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(link);
    navigate('/analyze', {
      state: {product: link}
    })
    setLink('')
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
            <h1 className={styles.heading}>
                BẠN VẪN CÒN PHÂN VÂN VỀ LỰA CHỌN CỦA MÌNH?
            </h1>
            <h1 className={styles.heading}>
                ĐỪNG LO, CHÚNG TÔI LUÔN SẴN SÀNG HỖ TRỢ BẠN!
                <FontAwesomeIcon icon={faHandshakeAngle} className={styles.icon}/>
            </h1>
        </div>
        <div className={styles.content}>
          <label htmlFor="input-link">
            Nhập đường liên kết của sản phẩm:
          </label>
          <div className={styles['input-container']}>
            <input type="text" 
                   id='input-link'
                   placeholder={`Link...`} 
                   value={link}
                   onChange={(e) => setLink(e.target.value)} 
            />
            <button type='button' 
                    onClick={handleClick}
                    disabled={link===''}
            >
              Phân tích
            </button>
          </div>
        </div>
      </div>
      <Banner/>
    </>
  )
}
