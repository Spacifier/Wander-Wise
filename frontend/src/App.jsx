import {Routes,Route} from 'react-router-dom';
import Layout from './Layout';
import Home from './HomeElements/Home.jsx';
import Explore from './components/ExploreElements/Explore.jsx';
import AdminLayout from './AdminLayout.jsx';
import Dashboard from "./admin/Dashboard.jsx";
import AllUsers from './admin/AllUsers.jsx';
import SignIn from './root/SignIn.jsx';
import ProtectedRoute from './root/ProtecteRoute.jsx';
import AdminRoute from './root/AdminRoute.jsx';
import CreateTrips from './admin/CreateTrip.jsx';
import Trips from './admin/trips.jsx';
import TripDetails from './admin/TripDetails.jsx';


function App() {
    return (
        <main className='relative min-h-screen'>
        <Routes>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/' element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='explore' element={<ProtectedRoute> <Explore /> </ProtectedRoute>} />
            </Route>
            <Route path='/admin' element={<AdminRoute> <AdminLayout /> </AdminRoute>}>
                <Route path='dashboard' element={<AdminRoute> <Dashboard /> </AdminRoute>} />
                <Route path='all-users' element={<AdminRoute> <AllUsers /> </AdminRoute>} />
                <Route path='trips' element={<AdminRoute> <Trips/> </AdminRoute>} />
                <Route path='trips/create' element={<AdminRoute> <CreateTrips/> </AdminRoute>} />
                <Route path='trips/:tripId' element={<AdminRoute> <TripDetails/> </AdminRoute>} />
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
