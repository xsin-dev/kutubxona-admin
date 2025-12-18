import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import PrivateRequset from "./components/privateRequest/PrivateRequset";
import Login from "./pages/login/Login";
import Books from "./pages/Books/Books";
import Libraries from "./pages/Libraries/Libraries";
import BookDetail from "./pages/books/BookDetail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRequset />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/libraries" element={<Libraries />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
