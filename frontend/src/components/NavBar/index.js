import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './NavBar.module.css';
import Logo from '../../images/account-logo.png';
import { getCurrentUser, removeCurrentUser } from "../../utils/userStorage";

const NavBar = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        removeCurrentUser();
        navigate('/');
    }

    return (
        <div className={styles["navbar-container"]}>
            <div className={styles['logo-container']} onClick={() => handleNavigate('/')} >
                <img src="/logo192.png" alt="Sentiment Analysis" className={styles["logo"]} />
                <p>Sentiment Analysis</p>
            </div>
            <div className={styles['navbar-cta']}>
                {currentUser
                    ? (
                        <>
                            <div className={styles['text']} onClick={() => handleNavigate('/history')}><span>Lịch sử</span></div>
                            <div className={styles['profile-logo-container']}>
                                <img src={Logo} alt="Profile" className={styles["profile-logo"]} />
                                <div className={styles['dropdown-menu']}>
                                    <div onClick={() => handleNavigate('/account')}>Tài khoản</div>
                                    <div onClick={() => handleLogout()}>Đăng xuất</div>
                                </div>
                            </div>
                        </>
                    )
                    : (
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
