import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Login from './components/Login.js';
import Api from "./Api";

const ProtectedRoute = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                await Api.get("/auth");
                setIsAuth(true);
            } catch (err) {
                localStorage.removeItem('_token');
                setIsAuth(false);
            }
        };
        fetchAuthStatus();
        // eslint-disable-next-line
    }, []);

    if (!isAuth) {
        return <Login />;
    } else if (isAuth) {
        return <Outlet />;
    }
};

export default ProtectedRoute;