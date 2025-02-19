import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayoutComponent} from "./component/sidebar/RootLayoutComponent.tsx";
import Dashboard from "./pages/DashBoard.tsx";
import CustomerPage from "./pages/CustomerPage.tsx";
import EmployeePage from "./pages/EmployeePage.tsx";
import AppointmentPage from "./pages/AppointmentPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";

function App() {

    const routers = createBrowserRouter([
        {
            path: "/",
            element:<RootLayoutComponent/>,
            children:[
                {path: '/', element:<Dashboard/>},
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
          {/*<div className="bg-gray-100 min-h-screen flex items-center justify-center">*/}
          {/*    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm">*/}
          {/*        <h1 className="text-2xl font-bold text-center text-blue-600">*/}
          {/*            Welcome to Tailwind with React!*/}
          {/*        </h1>*/}
          {/*        <p className="text-gray-600 mt-4 text-center">*/}
          {/*            This is a simple React app styled with TailwindCSS.*/}
          {/*        </p>*/}
          {/*        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">*/}
          {/*            Click Me*/}
          {/*        </button>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <RouterProvider router={routers}/>
      </>
  )
}

export default App
