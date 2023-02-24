import React, { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";

function ListingForm(props) {
  const [formData, setFormData] = useState({
    sale_type: "For Sale",
    price: "$0+",
    bedrooms: "0+",
    home_type: "House",
    bathrooms: "0+",
    sqft: "1000+",
    days_listed: "1 or less",
    has_images: "1+",
    open_house: "false",
    keywords: "",
  });

  const {
    sale_type,
    price,
    bedrooms,
    bathrooms,
    sqft,
    home_type,
    keywords,
    has_images,
    days_listed,
    open_house,
  } = formData;

  const [loading, setLoading] = useState(false);

  const updateFormData = (e) => {
    if (e.target.name === 'open_house') {
      setFormData({ ...formData, [e.target.name]: (e.target.checked).toString() })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API}listings/search`, {
        sale_type,
        price,
        bedrooms,
        home_type,
        bathrooms,
        sqft,
        days_listed,
        has_images,
        open_house,
        keywords,
      }, config)
      .then((res) => {
        setLoading(false);
        props.setListings(res.data);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setLoading(false);
        window.scrollTo(0, 0);
      });
  };

  return (
    <form className="listingform" onSubmit={submitForm}>
      <div className="row">
        <div className="col-1-of-6">
          <div className="listingform__section">
            <label htmlFor="sale_type" className="listingform__label">
              Sale or Rent
            </label>
            <select
              name="sale_type"
              id="sale_type"
              className="listingform__select"
              onChange={updateFormData}
              value={sale_type}
            >
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
          </div>

          <div className="listingform__section">
            <label htmlFor="sqft" className="listingform__label">
              Square Feet
            </label>
            <select
              name="sqft"
              id="sqft"
              className="listingform__select"
              onChange={updateFormData}
              value={sqft}
            >
              <option>1000+</option>
              <option>1200+</option>
              <option>1500+</option>
              <option>2000+</option>
              <option>Any</option>
            </select>
          </div>
        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label htmlFor="price" className="listingform__label">
              Minimum price
            </label>
            <select
              name="price"
              id="price"
              className="listingform__select"
              onChange={updateFormData}
              value={price}
            >
              <option>$0+</option>
              <option>$200.000+</option>
              <option>$400.000+</option>
              <option>$600.000+</option>
              <option>$800.000+</option>
              <option>$1.000.000+</option>
              <option>$1.200.000+</option>
              <option>$1.500.000+</option>
              <option>Any</option>
            </select>
          </div>

          <div className="listingform__section">
            <label htmlFor="days_listed" className="listingform__label">
              Days Listed
            </label>
            <select
              name="days_listed"
              id="days_listed"
              className="listingform__select"
              onChange={updateFormData}
              
            >
              <option>1 or less</option>
              <option>2 or less</option>
              <option>5 or less</option>
              <option>10 or less</option>
              <option>20 or less</option>
              <option>Any</option>
            </select>
          </div>
        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label htmlFor="bedrooms" className="listingform__label">
              Bedrooms
            </label>
            <select
              name="bedrooms"
              id="bedrooms"
              className="listingform__select"
              onChange={updateFormData}
              value={bedrooms}
            >
              <option>0+</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
            </select>
          </div>

          <div className="listingform__section">
            <label htmlFor="has_images" className="listingform__label">
              Has Images
            </label>
            <select
              name="has_images"
              id="has_images"
              className="listingform__select"
              onChange={updateFormData}
              value={has_images}
            >
              <option>1+</option>
              <option>3+</option>
              <option>5+</option>
              <option>10+</option>
              <option>15+</option>
            </select>
          </div>
        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label htmlFor="home_type" className="listingform__label">
              Home Type
            </label>
            <select
              name="home_type"
              id="home_type"
              className="listingform__select"
              onChange={updateFormData}
              value={home_type}
            >
              <option>House</option>
              <option>Townhouse</option>
              <option>Condo</option>
            </select>
          </div>

          <div className="listingform__section">
            <label htmlFor="keywords" className="listingform__label">
              Keywords
            </label>
            <input
              className="listingform__input"
              type="text"
              name="keywords"
              onChange={updateFormData}
              value={keywords}
            />
          </div>
        </div>

        <div className="col-1-of-6">
          <div className="listingform__section">
            <label htmlFor="bathrooms" className="listingform__label">
              Bathrooms
            </label>
            <select
              name="bathrooms"
              id="bathrooms"
              className="listingform__select"
              onChange={updateFormData}
              value={bathrooms}
            >
              <option>0+</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
          </div>

          <div className="listingform__altsection">
            <label htmlFor="open_house" className="listingform__label">
              Open houses 
            </label>
            <input
              className="listingform__checkbox"
              type="checkbox"
              id="open_house"
              name="open_house"
              onChange={updateFormData}
              value={open_house}
            />
          </div>
        </div>

        <div className="col-1-of-6">
            {
                loading ? (
                    <div className="listingform__loader">
                        <Oval 
                        color='#424242'
                        width={50}
                        height={50}
                        /> 
                    </div>
                ) : (
                    <button className="listingform__button listingform__button--primary">Get</button>
                )
            }
        </div>
      </div>
    </form>
  );
}

ListingForm.propTypes = {
    setListings: PropTypes.func.isRequired
}
export default ListingForm;


   

