import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./hocs/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./components/NotFound";
import "./sass/main.scss";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  function OnlyLoggedUserRoute({ children }) {
    if (!isAuthenticated && !loading) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/listings" element={<Listings />} />
          <Route
            exact
            path="/listings/:id"
            element={
              <OnlyLoggedUserRoute>
                <ListingDetails />
              </OnlyLoggedUserRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
