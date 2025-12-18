import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Profile from "./pages/profile/Profile";
import PrivateRequset from "./components/privateRequest/PrivateRequset";
import Login from "./pages/login/Login";
import Libraries from "./pages/library/Libraries";
import BookDetail from "./pages/book/BookDetail";
import Books from "./pages/book/Books";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRequset />}>
        <Route path="/" element={<Layout />}>
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/libraries" element={<Libraries />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
