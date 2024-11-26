import React, { useState, useEffect } from 'react'
import Banner from '../../components/Banner'
import styles from './Home.module.css'
import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

const REACT_APP_BASEURL = "http://localhost:3001";
const reqAPI = {
    method: 'POST',
    headers : {
      "Content-Type": "application/json",
    },
    body: null,
    credentials: 'include',
};

export default function Home() {
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(0);

  const handleClick = (e) => {
    const data = {
      product_url: link
    }
    reqAPI.body = JSON.stringify(data)
    setFetch(fetch+1)
  }

  // Call API
  const {payload, status, isLoading} = useFetch(`${REACT_APP_BASEURL}/api/v1/product`, reqAPI);
  useEffect(() => {
      if (status === 'success'){
        navigate('/analyze', {state: {
          product: link,
          data: payload
        }})
      }
      else if (status !== 'success' && status !== 'fail') {
          toast.error(status);
          setLink('');
      }
      reqAPI.body = null;
      setFetch(fetch+1);
  }, [payload, status])

  return (
    <>
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
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
      <Modal
        keyboard={false}
        fullscreen={true}
        show={isLoading}
        centered={true}
        style={{
          opacity: 0.5,
        }}
      >
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Centers horizontally
            justifyContent: "center", // Centers vertically
            height: "100vh", // Ensures it takes up full screen height
            textAlign: "center", // Centers the text
          }}
        >
          <Spinner animation="border" />
          <p style={{ marginTop: "20px", fontSize: "1.2rem" }}>Đang phân tích</p>
        </Modal.Body>
      </Modal>
    <Banner/>
  </>
)
}
