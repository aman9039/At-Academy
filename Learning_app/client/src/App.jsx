import {Route,Routes} from "react-router-dom"
import AuthPage from './pages/auth/index'
import RouteGuard from "./components/RouteGuard"
import { useContext } from "react"
import { AuthContext } from "./context/auth-context"
import InstructorDashbordPage from "./pages/instructor"
import StudentViewCommonLayout from "./components/student-view/common-layout"
import StudentHomePage from "./pages/student/home"



function App() {
  
 const {auth} = useContext(AuthContext);
  return (
    <>
    <Routes>

   <Route
   path="/auth"
   element = {
    <RouteGuard
    element={<AuthPage/>}
    authenticated={auth?.authenticated}
    user={auth?.user}
    />
   }
   />

   <Route 
   path="/instructor"
   element = {
    <InstructorDashbordPage
    authenticated={auth?.authenticated}
    user={auth?.user}
    />
   }
   />

   <Route path="/"
   element = {
    <RouteGuard
    element={<StudentViewCommonLayout/>}
    authenticated={auth?.authenticated}
    user={auth?.user}
    />
   }
   >
   <Route path="/" element ={<StudentHomePage/>}/>

   <Route path="/home" element ={<StudentHomePage/>}/>

   </Route>
    </Routes>
    </>
  )
}

export default App
