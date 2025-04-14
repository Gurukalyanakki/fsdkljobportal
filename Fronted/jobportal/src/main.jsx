import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Projecthomepage from './components/projecthomepage.jsx'
import Dashboard from './components/Dashboard.jsx'
import MenuBar from './components/MenuBar.jsx'
import JobSearch from './components/JobSearch.jsx'
import JobPosting from './components/JobPosting.jsx'
import Profile from './components/Profile.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Projecthomepage/>}/>
      <Route path='/dashboard'element={<Dashboard/>}></Route>
      <Route path='MenuBar'element={<MenuBar/>}></Route>
      <Route path='/JobSearch'element={<JobSearch/>}></Route>
      <Route path='/JobPosting'element={<JobPosting/>}></Route>
      <Route path='/Profile'element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
