import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from "@apollo/client"
import { Provider } from 'react-redux'
import SignIn from './Pages/Login/SignIn'
import Signup from './Pages/SignUp/signUp'
import client from './api/client'
import { store } from './redux/store'
import Sidebar from './Components/Sidebar/Sidebar'
import Dashboard from './Components/Dashboard/Dashboard'
import ServiceHistory from './Components/ServiceHistory/ServiceHistory'
import Services from './Components/ServiceStats/ServiceStats'
import WorkerDetails from './Components/WorkerDeatails/WorkerDetails'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import LandingPage from './Pages/LandingPage/landingPage'
import WorkerForm from './Components/WorkerForm/WorkerForm.jsx';
import CustomerForm from './Components/customerForm/CustomerForm.jsx';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path='/signIn' element={<SignIn />} />
            <Route path='/signUp' element={<Signup />} />
            <Route path='/' element={<LandingPage />}></Route>
            



            <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
              <Route path='/customerForm/:id' element={<CustomerForm />}></Route>
              <Route path='/dashboard' element={<Layout><Dashboard /></Layout>} />
              <Route path='/history' element={<Layout><ServiceHistory /></Layout>} />
              <Route path='/services' element={<Layout><Services /></Layout>} />
              <Route path="/workerDetails/:id" element={<WorkerDetails />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["worker"]} />}>
              <Route path='/workerForm/:id' element={<WorkerForm />}></Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  )
}

export default App;
