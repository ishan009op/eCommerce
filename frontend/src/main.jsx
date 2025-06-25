import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Home from './Components/Home.jsx'
import Product from './Components/Product.jsx'
import AddProduct from './Components/AddProduct.jsx'
import Edit from './Components/Edit.jsx'
import Register from './Components/Authentication/Register.jsx'
import Login from './Components/Authentication/Login.jsx'
const router=createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },

    {
      path:"/product/:id",
      element:<Product/>

    },
    {
      path:"/add",
      element:<AddProduct/>
    },
    {
      path:"/edit/:id",
      element:<Edit/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/login',
      element:<Login/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
