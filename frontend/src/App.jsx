import {Routes,Route} from 'react-router-dom'
import Layout from './Layout'
import Home from './components/HomeElements/Home.jsx'
import Explore from './components/ExploreElements/Explore.jsx'
import AdminLayout from './AdminLayout.jsx'
import Dashboard from './admin/dashboard.jsx'
import AllUsers from './admin/AllUsers.jsx'
import SignIn from './root/SignIn.jsx'
import ProtectedRoute from './root/ProtecteRoute.jsx'


function App() {
    return (
        <main className='relative min-h-screen'>
        <Routes>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/' element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='explore' element={<ProtectedRoute> <Explore /> </ProtectedRoute>} />
            </Route>
            <Route path='/admin' element={<ProtectedRoute> <AdminLayout /> </ProtectedRoute>}>
                <Route path='dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                <Route path='all-users' element={<ProtectedRoute> <AllUsers /> </ProtectedRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
    )
}

const NotFound = () => (
  <main className="pt-16 p-4 container mx-auto">
    <h1>404</h1>
    <p>The requested page could not be found.</p>
  </main>
);

export default App
