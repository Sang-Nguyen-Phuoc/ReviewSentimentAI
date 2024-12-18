import { Link, useNavigate } from 'react-router-dom';
import styles from '../Authentication.module.css';
import { useRef, useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
// import {CurrentUserContext} from '../../context/CurrentUserContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import toast, { Toaster } from 'react-hot-toast';

const REACT_APP_BASEURL = "http://localhost:3001";
const reqAPI = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null,
};

function Signin() {
    const handleSignIn = (e) => {
        e.preventDefault();

        const dataSignIn = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value
        };
        console.log(dataSignIn);

        emailRef.current.value = '';
        emailRef.current.focus();
        passwordRef.current.value = '';
        
        reqAPI.body = JSON.stringify(dataSignIn);
        setShow(false);
        setFetch(fetch+1);
    }

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [show, setShow] = useState(false);
    const [fetch, setFetch] = useState(0);
    const navigate = useNavigate();
    // const {setCurrentUser} = useContext(CurrentUserContext);


    // Call API
    const {payload, status} = useFetch(`${REACT_APP_BASEURL}/api/v1/auth/login`, reqAPI);

    useEffect(() => {
        if (status === 'success'){
            toast.success('Sign in successfully!');
            // setCurrentUser(payload);
            setTimeout(() => navigate('/'), 2000);
        }
        else if (status !== 'fail') {
            toast.error(status);
        }
        reqAPI.body = null;
        setFetch(fetch+1);
    }, [payload, status])

    return (
        <div className={styles.wrapper}>
            <Toaster
                position='top-right'
                reverseOrder={false}
            />
            <form className = {styles.form} onSubmit={handleSignIn}>
                <div className={styles.email}>
                    <label htmlFor='emailInput'>
                        Email
                        <span>*</span>
                    </label>
                    <input className={styles['email-input']} 
                           ref={emailRef}
                           id='emailInput' 
                           type='email' 
                           placeholder='Email' 
                           required
                    />
                </div>
                <div className={styles.password}>
                    <label htmlFor='passwordInput'>
                        Mật khẩu
                        <span>*</span>
                    </label>
                    <div className={styles['input-icon-container']}>
                        <input className={styles['password-input']}
                            ref={passwordRef}
                            id='passwordInput' 
                            type={show ? 'input' : 'password'}
                            placeholder='Mật khẩu' 
                            required
                        />  
                        <FontAwesomeIcon className={styles.icon} icon={show ? faEyeSlash : faEye} onClick={() => setShow(!show)}/>
                    </div>
                </div>
                <div className={styles.container}>
                    <button type='submit' className={styles.btn}>
                        ĐĂNG NHẬP
                    </button>
                </div>
                <div className={`${styles.container} ${styles.signup}`}>
                    <p className={styles.question}>Bạn chưa có tài khoản?</p>
                    <Link to='/signup' className={`${styles.link} ${styles['signup-link']}`}>Đăng ký ngay</Link>
                </div>
            </form>
        </div>
    );
}

export default Signin;