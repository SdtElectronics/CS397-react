import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import TermPage from './components/termPage';
import EditForm from './components/editForm'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const queryClient = new QueryClient();

const Main = () => {
  const [data, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if(error)      return <h1>Error loading the course list: {`${error}`}</h1>;
  if(isLoading)  return <h1>Loading...</h1>;
  if(!data)      return <h1>Failed to find the course list</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TermPage title={data.title} courses={data.courses} />} />
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
