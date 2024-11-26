import Logo from "../../components/Logo";
import styles from './AuthenticationLayout.module.css'

const AuthenticationLayout = ({children}) => {
    return (
        <div className = {styles.wrapper}>
            <Logo className = {styles.logo}/>
            <div className = {styles.form}>{children}</div>
        </div>
        
    );
}
 
export default AuthenticationLayout;