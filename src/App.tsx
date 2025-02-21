import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayoutComponent} from "./component/sidebar/RootLayoutComponent.tsx";
import Dashboard from "./pages/DashBoard.tsx";
import CustomerPage from "./pages/CustomerPage.tsx";
import EmployeePage from "./pages/EmployeePage.tsx";
import AppointmentPage from "./pages/AppointmentPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {SignInPage} from "./pages/SignInPage.tsx";
import {SignUpPage} from "./pages/SignUpPage.tsx";

function App() {

    const routers = createBrowserRouter([
        {
            path: "/",
            element:<RootLayoutComponent/>,
            children:[
                {path:'/',element:<HomePage/>},
                {path:'/signIn',element:<SignInPage/>},
                {path:'/signUp',element:<SignUpPage/>},
                {path: '/dashboard', element:<Dashboard/>},
                {path:'/customer',element:<CustomerPage/>},
                {path:'/employee',element:<EmployeePage/>},
                {path:'/appointment',element:<AppointmentPage/>},
                {path:'/payment',element:<PaymentPage/>},
                {path:'/service',element:<ServicePage/>}

            ]
        }
    ])
  return (
      <>

          <RouterProvider router={routers}/>
      </>
  )
}

export default App
