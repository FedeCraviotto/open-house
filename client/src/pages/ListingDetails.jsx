import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function ListingDetails() {
  const [listing, setListing] = useState({});
  const [realtor, setRealtor] = useState({});
  const [price, setPrice] = useState(0);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const slug = path;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API}listings/${slug}`, config)
      .then((response) => {
        setListing(response.data);
        setPrice(numberWithCommas(response.data.price));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [path]);

  useEffect(() => {
    const id = listing.realtor;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (id) {
      axios
        .get(`${process.env.REACT_APP_API}realtors/${id}`, config)
        .then((response) => {
          setRealtor(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [listing.realtor]);

  const displayInteriorImages = () => {
    let images = [];
    images.push(
      <div key={1} className="row">
        <div className="col-1-of-3">
          {listing.image_1 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_1}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
        <div className="col-1-of-3">
          {listing.image_2 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_2}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
        <div className="col-1-of-3">
          {listing.image_3 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_3}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
      </div>
    );

    images.push(
      <div key={2} className="row">
        <div className="col-1-of-3">
          {listing.image_4 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_4}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
        <div className="col-1-of-3">
          {listing.image_5 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_5}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
        <div className="col-1-of-3">
          {listing.image_6 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_6}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
      </div>
    );

    images.push(
      <div key={3} className="row">
        <div className="col-1-of-3">
          {listing.image_7 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_7}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
        <div className="col-1-of-3">
          {listing.image_8 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_8}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
        <div className="col-1-of-3">
          {listing.image_9 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_9}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
      </div>
    );

    images.push(
      <div key={4} className="row">
        <div className="col-1-of-3">
          {listing.image_10 ? (
            <div className="listingdetail__display">
              <img
                src={listing.image_10}
                alt=""
                className="listingdetail__display__image"
              />
            </div>
          ) : null}
        </div>
      </div>
    );

    return images;
  };

  return (
    <HelmetProvider>
      <div className="listingdetail">
        <Helmet>
          <title>Open House | Details</title>
          <meta name="description" content="Open House - Listing Details" />
        </Helmet>
        <div className="listingdetail__header">
            <h1 className="listingdetail__title">{listing.title}</h1>
            <p className="listingdetail__location">{listing.city}, {listing.state} {listing.zipcode}</p>
        </div>

        <div className="row">
            <div className="listingdetail__breadcrumb">
                <Link className="listingdetail__breadcrumb__link" to='/'>
                    Home
                </Link> / {listing.title}
            </div>
        </div>

        <div className="row">
            <div className="col-3-of-4">
                <div className="listingdetaill__display">
                    <img className="listingdetail__display__image" src={listing.main_image} alt="" />
                </div>
            </div>
                <div className="col-1-of-4">
                    <div className="listingdetail__display">
                        <img className="listingdetail__display__image" src={realtor.photo} alt="" />
                    </div>
                    <h3 className="listingdetail__realtor">{realtor.name}</h3>
                    <p className="listingdetail__contact">{realtor.phone}</p>
                    <p className="listingdetail__contact">{realtor.email}</p>
                    <p className="listingdetail__about">{realtor.description}</p>
                </div>
        </div>

        <div className="row">
            <div className="col-1-of-2">
                <ul className="listingdetail__list">
                    <li className="listingdetail__list__item">Home Type: {listing.home_type}</li>
                    <li className="listingdetail__list__item">Price: ${price}</li>
                    <li className="listingdetail__list__item">Bedrooms: {listing.bedrooms}</li>
                    <li className="listingdetail__list__item">Bathrooms {listing.bathrooms}</li>
                    <li className="listingdetail__list__item">Square Feet: {listing.sqft}</li>
                </ul>
            </div>
            <div className="col-1-of-2">
            <ul className="listingdetail__list">
                    <li className="listingdetail__list__item">Sale Type: {listing.sale_type}</li>
                    <li className="listingdetail__list__item">Address: {listing.address}</li>
                    <li className="listingdetail__list__item">City {listing.city}</li>
                    <li className="listingdetail__list__item">State {listing.state}</li>
                    <li className="listingdetail__list__item">Zipcode {listing.zipcode}</li>
                </ul>
            </div>
        </div>

        <div className="row">
            <p className="listingdetail__description">{listing.description}</p>
        </div>
        {displayInteriorImages()}
      </div>
    </HelmetProvider>
  );
}
export default ListingDetails;
