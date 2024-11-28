import { useNavigate } from "react-router-dom";
// import { useContext } from 'react';
import { useState } from "react";
// import { CurrentUserContext } from "../../context/CurrentUserContext";
import styles from './NavBar.module.css';
import Logo from '../../images/account-logo.png';

const NavBar = () => {
    const navigate = useNavigate();
    // const {initUser, currentUser, setCurrentUser} = useContext(CurrentUserContext);
    // const role = currentUser.user.role;
    const [role, setRole] = useState('user');
    const handleNavigate = (path) => {
        navigate(path);
    };

    // const handleLogout = () => {
    //     setCurrentUser(initUser);
    // }


    return (
        <div className={styles["navbar-container"]}>
            <div className={styles['logo-container']} onClick={() => handleNavigate('/')} >
                <img src="/logo192.png" alt="Sentiment Analysis" className={styles["logo"]} />
                <p>Sentiment Analysis</p>
            </div>
            <div className={styles['navbar-cta']}>

                {/* User */}
                {role === 'user' && (
                    <>
                        <div className={styles['text']} onClick={() => handleNavigate('/history')}><span>Lịch sử</span></div>
                        <div className={styles['profile-logo-container']}>
                            <img src={Logo} alt="Profile" className={styles["profile-logo"]} />
                            <div className={styles['dropdown-menu']}>
                                <div onClick={() => handleNavigate('/account')}>Tài khoản</div>
                                <div onClick={() => setRole('guest')}>Đăng xuất</div>
                            </div>
                        </div>
                    </>
                )}

                {/* Guest */}
                {role === 'guest' && (
                    <>
                        <div className={styles['text']} onClick={() => handleNavigate('/signin')}><span>Đăng nhập</span></div>
                        <div className={styles['text']} onClick={() => handleNavigate('/signup')}><span>Đăng ký</span></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
