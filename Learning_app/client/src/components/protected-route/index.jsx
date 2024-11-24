const { useLocation, Navigate } = require("react-router-dom");



function RouteGuard({ authenticated,user,element}){
    const location = useLocation();

    if(!authenticated && !location.pathname.includes("/auth")){
    return <Navigate to='/auth'/>
    }

    if(authenticated && user?.role !== 'admin'){}
}