import {Routes,Route} from 'react-router-dom'
import Layout from './Layout'
import Home from './components/HomeElements/Home.jsx'
import Explore from './components/ExploreElements/Explore.jsx'
import AdminLayout from './AdminLayout.jsx'
import Dashboard from './admin/dashboard.jsx'
import AllUsers from './admin/AllUsers.jsx'


function App() {
    return (
        <main className='relative min-h-screen'>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='explore' element={<Explore />} />
            </Route>
            <Route path='/admin' element={<AdminLayout />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='all-users' element={<AllUsers />} />
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
