import CloudPage from "../components/pages/CloudPage"
import LoginPage from "../components/pages/LoginPage"

export const privateRoutes = [
    {path: '/cloud', component: CloudPage, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: LoginPage, exact: true},
]