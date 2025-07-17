import {Routes,Route} from 'react-router-dom'
import Layout from './Layout'
import Home from './components/HomeElements/Home.jsx'
import Explore from './components/ExploreElements/Explore.jsx'

function App() {
    return (
        <main className='relative min-h-screen'>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='/explore' element={<Explore />} />
            </Route>
        </Routes>
        </main>
    )
}

export default App
