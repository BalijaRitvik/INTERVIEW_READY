//import {SignInButton,SignOutButton,SignedIn,SignedOut,UserButton,useUser} from '@clerk/clerk-react';
import {useUser} from "@clerk/clerk-react"
import SyncUser from "./SyncUser";
import {Route,Routes, Navigate } from "react-router-dom"
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from './pages/ProblmsPage';
import ProblemPage from './pages/ProblemPage';
import SessionPage from './pages/SessionPage';



function App() {
  const {isSignedIn,isLoaded}=useUser();
  //this will get rid of flickering effect
  if(!isLoaded) return null;


  return (
    <>
      {isSignedIn && <SyncUser />}
      <Routes>
        <Route path="/" element={!isSignedIn?<HomePage />:<Navigate to={"/dashboard"}/>} />
        <Route path="/dashboard" element={isSignedIn ?<DashboardPage/> :<Navigate to={"/"}/>}/>

        <Route path="/problems" element={isSignedIn ?<ProblemsPage/>:<Navigate to={"/"}/>}/>
        <Route path="/problem/:id" element={isSignedIn ?<ProblemPage/>:<Navigate to={"/"}/>}/>
        <Route path="/session/:id" element={isSignedIn ?<SessionPage/>:<Navigate to={"/"}/>}/>
      </Routes>
      <Toaster/>
    </>
  );
}

export default App

