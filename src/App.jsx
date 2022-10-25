import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProfile } from './utilities/profile';
import { useJsonQuery } from './utilities/fetch';
import { useDbData } from "./utilities/firebase.js"
import TermPage from './components/termPage';
import EditForm from './components/editForm'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const queryClient = new QueryClient();

const Main = () => {
  const [data, error] = useDbData("/");
  const [profile, profileLoading, profileError] = useProfile();
  
  if(error)      return <h1>Error loading the course list: {`${error}`}</h1>;
  if(!data)      return <h1>Failed to find the course list</h1>;

  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TermPage profile={profile} title={data.title} courses={data.courses} />} />
        <Route path="/edit/:id" element={<EditForm courses={data.courses} />} />
      </Routes>
		</BrowserRouter>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Main />
    </QueryClientProvider>
  );
};

export default App;
