import { Link } from 'react-router-dom';
import styles from '../Authentication.module.css'
import { useRef, useState } from 'react';
// import useFetch from '../../hooks/useFetch';
// import toast, { Toaster } from 'react-hot-toast';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

// const REACT_APP_BASEURL = "http://localhost:3002";
// const reqAPI = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: null,
// };

function SignUp() {
    const handleValidatePassword = (password) => {
        if (password === '')
          setValidation(false);
        else if (password.length < 8)
          setValidation(false);
        else 
          setValidation(true);
    }

    const handleConfirmPassword = (repassword) => {
        if (repassword === '')
          setConfirm(false);
        else if (repassword === passwordRef.current.value)
          setConfirm(true);
        else
          setConfirm(false);
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        const newDataSignUp = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
        }

        console.log(newDataSignUp);
        
        emailRef.current.value = '';
        passwordRef.current.value = '';
        repasswordRef.current.value = '';
        emailRef.current.focus();
        // reqAPI.body = JSON.stringify(newDataSignUp);
    }

    // const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const [chkbox, setChkbox] = useState(false);
    const [validation, setValidation] = useState(true);
    const [confirm, setConfirm] = useState(true);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const repasswordRef = useRef(null);

    // Fetch API
    // const {payload, status} = useFetch(`${REACT_APP_BASEURL}/api/v1/auth/register`, reqAPI);

    // useEffect(() => {
    //     if (status === 'success'){
    //         toast.success('Register successfully!');
    //         const navi = setTimeout(() => navigate('/signin'), 2000);
    //     }
    //     else if (status !== 'fail') {
    //         toast.error(status);
    //     }
    //     reqAPI.body = null;
    // }, [payload, status])

    return (
        <div className={styles.wrapper}>
            {/* <Toaster 
                position='top-right'
                reverseOrder={false}
            /> */}
            <form className={styles.form} onSubmit={handleSignUp}>
                <div className={styles.username}>
                    <label htmlFor='usernameInput'>
                        Họ và tên
                        <span>*</span>
                    </label>
                    <input
                        className={styles['username-input']}
                        id='usernameInput'
                        placeholder='Họ và tên'
                        required
                    />
                </div>
                <div className={styles.email}>
                    <label htmlFor='emailInput'>
                        Email
                        <span>*</span>
                    </label>
                    <input ref={emailRef}
                        className={styles['email-input']}
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
                        <input ref={passwordRef}
                            className={styles['password-input']}
                            id='passwordInput'
                            type={showPass ? 'input' : 'password'}
                            placeholder='Mật khẩu'
                            onChange={password => handleValidatePassword(password.target.value)}
                            required
                        />
                        <FontAwesomeIcon className={styles.icon} icon={showPass ? faEyeSlash : faEye} onClick={() => setShowPass(!showPass)}/>
                    </div>
                    {validation || <p className={styles.invalid}>Mật khẩu ít nhất 8 ký tự</p>}
                </div>
                <div className={styles.password}>
                    <label htmlFor='repasswordInput'>
                        Xác nhận mật khẩu
                        <span>*</span>
                    </label>
                    <div className={styles['input-icon-container']}>
                        <input ref={repasswordRef}
                            className={styles['password-input']}
                            id='repasswordInput'
                            type={showRePass ? 'input' : 'password'}
                            placeholder='Nhập lại mật khẩu'
                            onChange={password => handleConfirmPassword(password.target.value)}
                            required
                        />
                        <FontAwesomeIcon className={styles.icon} icon={showRePass ? faEyeSlash : faEye} onClick={() => setShowRePass(!showRePass)}/>
                    </div>
                    {confirm || <p className={styles.invalid}>Mật khẩu không trùng khớp</p>}
                </div>
                <div className={styles.container}>
                    <input type="checkbox"
                        className={styles['checkbox-input']}
                        checked={chkbox}
                        onChange={v => setChkbox(v.target.checked)} />
                    <p className={styles['policy-content']}>Tôi đã đọc và đồng ý với các
                        <Link to={'/about-us'} className={styles.link}> Quy định & Điều khoản </Link>
                        và
                        <Link to={'/about-us'} className={styles.link}> Chính sách bảo mật </Link>
                        của Sentiment Analysis
                    </p>
                </div>
                <div className={styles.container}>
                    <button type='submit'
                        className={styles.btn}
                        disabled={
                               !chkbox
                            || !validation
                            || !confirm
                            || repasswordRef.current.value === ''
                            || passwordRef.current.value === ''
                        }>
                        ĐĂNG KÝ
                    </button>
                </div>
                <div className={`${styles.container} ${styles.signin}`}>
                    <p className={styles.question}>Bạn đã có tài khoản?</p>
                    <Link to='/signin' className={`${styles.link} ${styles['signup-link']}`}>Đăng nhập ngay</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;