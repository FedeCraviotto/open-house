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
    has_photos: "1+",
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
    has_photos,
    days_listed,
    open_house,
  } = formData;

  const { loading, setLoading } = useState(false);

  const updateFormData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API}listings/search`, {
        sale_type,
        price,
        bedrooms,
        bathrooms,
        sqft,
        home_type,
        keywords,
        has_photos,
        days_listed,
        open_house,
      })
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
              <option value="">For Sale</option>
              <option value="">For Rent</option>
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
              <option value="">1000+</option>
              <option value="">1200+</option>
              <option value="">1500+</option>
              <option value="">2000+</option>
              <option value="">Any</option>
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
              <option value="">$0+</option>
              <option value="">$200.000+</option>
              <option value="">$400.000+</option>
              <option value="">$600.000+</option>
              <option value="">$800.000+</option>
              <option value="">$1.000.000+</option>
              <option value="">$1.200.000+</option>
              <option value="">$1.500.000+</option>
              <option value="">Any</option>
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
              value={days_listed}
            >
              <option value="">1 or less</option>
              <option value="">2 or less</option>
              <option value="">5 or less</option>
              <option value="">10 or less</option>
              <option value="">20 or less</option>
              <option value="">Any</option>
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
              <option value="">0+</option>
              <option value="">1+</option>
              <option value="">2+</option>
              <option value="">3+</option>
              <option value="">4+</option>
              <option value="">5+</option>
            </select>
          </div>

          <div className="listingform__section">
            <label htmlFor="has_photos" className="listingform__label">
              Has Photos
            </label>
            <select
              name="has_photos"
              id="has_photos"
              className="listingform__select"
              onChange={updateFormData}
              value={has_photos}
            >
              <option value="">1+</option>
              <option value="">3+</option>
              <option value="">5+</option>
              <option value="">10+</option>
              <option value="">15+</option>
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
              <option value="">House</option>
              <option value="">Townhouse</option>
              <option value="">Condo</option>
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
              <option value="">0+</option>
              <option value="">1+</option>
              <option value="">2+</option>
              <option value="">3+</option>
              <option value="">4+</option>
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
                    <button className="listingform__button listingform__button--primary">Save</button>
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


   

