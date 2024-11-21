import { Fragment } from "react";
// import Header from "../../components/Header";
import NavBar from "../../components/NavBar";

const DefaultLayout = ({ children }) => {
    return (
        <Fragment>
            <NavBar />
            <div>{children}</div>
        </Fragment>
    );
}

export default DefaultLayout;