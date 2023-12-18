import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout.tsx'
import Homepage from './components/Homepage.tsx'
import User from './components/User.tsx'
import Owner from './components/Owner.tsx'
import AppointmentForm from './components/AppointmentForm.tsx'
import Confirmation from './components/Confirmation.tsx'
import UserDashboard from './components/UserDashboard.tsx'
import OwnerDashboard from './components/OwnerDashboard.tsx'

export const routes = createRoutesFromElements(
  
  <Route path="/" element={<AppLayout />}>
    <Route index element={<Homepage />} />
    <Route path="user" element={<User />} />
    <Route path="user/dashboard" element={<UserDashboard />} />
    <Route path="owner" element={<Owner />} />
    <Route path="owner/dashboard" element={<OwnerDashboard />} />
    <Route path="form/:day/:date" element={<AppointmentForm />} />
    <Route path="form/confirmation" element={<Confirmation />} />
  </Route>
)
