import { Outlet } from 'react-router-dom';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Profile />
        <Outlet />
      </main>
    </div>
  )
}

export default App
