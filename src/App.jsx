import './App.css'
import Check from './componets/Check'
import Homepage from './componets/Homepage'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Startpage from './componets/Startpage'
import Login from './componets/Login'
import Signup from './componets/Signup'
import Homescreen from './admin/Homescreen'
import Addvenue from './admin/Addvenue'
import Selectedvenue from './componets/Selectedvenue'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Homepage />}path="/home"></Route>
          <Route element={<Check />} path="/check"></Route>
          <Route element={<Startpage />} path="/"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Signup />} path="/signup"></Route>
          <Route element={<Homescreen />} path="/admin"></Route>
          <Route element={<Addvenue />} path="/addvenue"></Route>
          <Route element={<Selectedvenue />} path="/selectedvenue"></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
