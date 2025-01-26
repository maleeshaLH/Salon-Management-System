import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayoutComponent} from "./component/sidebar/RootLayoutComponent.tsx";
import Dashboard from "./pages/DashBoard.tsx";

function App() {

    const routers = createBrowserRouter([
        {
            path: "/",
            element:<RootLayoutComponent/>,
            children:[
                {path: '/dashboard', element:<Dashboard/>}
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
