// General
import Home from "./Home";

// Authentication
import Signin from "./Authentication/Signin";
import SignUp from "./Authentication/Signup";

// User UI
import Account from "./Account";


// Export for use
const routes = [
    { path: '/', component: Home },

    { path: '/signin', component: Signin },
    { path: '/signup', component: SignUp },

    { path: '/account', component: Account },
]

export default routes