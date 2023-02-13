import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Listings from './pages/Listings'
import ListingDetails from './pages/ListingDetails'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './components/NotFound'
import './sass/main.scss';

function App() {
  return (
    <Router>
      <Layout wft={true}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/listings" element={<Listings />} />
          <Route exact path="/listings/:id" element={<ListingDetails />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;