import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AuthRoute = () => {
    const { token } = useAuthStore();

    return token ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;
