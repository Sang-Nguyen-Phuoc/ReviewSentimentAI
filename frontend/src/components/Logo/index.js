import styles from './Logo.module.css'
import { Link } from 'react-router-dom';
const Logo = () => {
    return (
        <Link to='/' className={styles.link}>
            <div className={styles.wrapper}>
                <img src="/logo192.png" alt="TalentHive" className={styles.img} />
                <p className={styles.name}>Sentiment Analysis</p>
            </div>
        </Link>
    );
}
 
export default Logo;