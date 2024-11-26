import { useState } from 'react';
import styles from './Account.module.css';

const Account = () => {
    const [validation, setValidation] = useState(true);
    const [confirm, setConfirm] = useState(true);

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const handleValidatePassword = (password) => {
        setPassword(password);
        if (password === '')
          setValidation(false);
        else if (password.length < 8)
          setValidation(false);
        else 
          setValidation(true);
    }

    const handleConfirmPassword = (repassword) => {
        setRepassword(repassword)
        setConfirm(repassword === password);
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        const dataUpdate = {
            currentPassword: currentPassword,
            password: password,
            rePassword: repassword,
        };

        setCurrentPassword('');
        setPassword('');
        setRepassword('');

        console.log(dataUpdate);
    }

    return (
        <div className={styles.container}>
            <div className={styles.account}>
                <div className={styles.title}>
                    <h3>Tài khoản</h3>
                </div>
                <div className={styles.info}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Họ tên</td>
                                <td>John Doe</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>abc@sample.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={styles.account}>
                <div className={styles.title}>
                    <h3>Đổi mật khẩu</h3>
                </div>
                <div className={styles.info}>
                    {/* Current Password Field */}
                    <div className={styles.password}>
                        <input
                            value={currentPassword}
                            className={styles['password-input']}
                            id="currentPasswordInput"
                            type="password"
                            placeholder="Mật khẩu hiện tại"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* New Password Field */}
                    <div className={styles.password}>
                        <input
                            value={password}
                            className={styles['password-input']}
                            id="passwordInput"
                            type="password"
                            placeholder="Mật khẩu mới"
                            onChange={(e) => handleValidatePassword(e.target.value)}
                            required
                        />
                        {validation || <p className={styles.invalid}>Mật khẩu ít nhất 8 ký tự</p>}
                    </div>
                    {/* Confirm Password Field */}
                    <div className={styles.password}>
                        <input
                            value={repassword}
                            className={styles['password-input']}
                            id="repasswordInput"
                            type="password"
                            placeholder="Xác nhận mật khẩu mới"
                            onChange={(e) => handleConfirmPassword(e.target.value)}
                            required
                        />
                        {confirm || <p className={styles.invalid}>Mật khẩu không trùng khớp</p>}
                    </div>

                    {/* Update New Password Button */}
                    <div className={styles['btn-container']}>
                        <button
                            type='button'
                            onClick={handleUpdatePassword}
                            className={styles.button}
                            disabled = {
                                !validation
                                || !confirm
                                || (currentPassword === '')
                                || (password === '')
                                || (repassword === '')
                            }
                        >
                            Cập nhật mật khẩu
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Account;