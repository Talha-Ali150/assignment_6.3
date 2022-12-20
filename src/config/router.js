import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    Navigate
} from "react-router-dom"

import Login from '../components/Login'
import Companies from '../components/Companies'
import Home from '../components/Home'
import AddCompany from '../components/AddCompany'
import NormalUser from '../components/NormalUser'
import CompanySettings from '../components/CompanySettings'
import { useState, useEffect } from "react"
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"



export default function Router() {
    const [user, setUser] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            setUser(!!user)
        })
    }, [])


    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={
                    <ProtectedRoute
                        user={user}
                        route={<Home />}
                        navigateTo='/login' />}
                />
                <Route path="/login" element={
                    <ProtectedRoute
                        user={!user}
                        route={<Login />}
                        navigateTo='/' />}
                />

                <Route path="/companies" element={<Companies />} />
                <Route path="/add-company" element={<AddCompany />} />
                <Route path="/normal-user" element={<NormalUser />} />
                <Route path="company-settings" element={<CompanySettings />} />

            </>
        )
    )


    return <RouterProvider router={router} />
}

function ProtectedRoute({ user, route, navigateTo }) {
    return user ? route : <Navigate to={navigateTo} replace={true} />
}
