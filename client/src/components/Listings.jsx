import React from "react";
import Card from "./Card";

function Listings({ listings }) {
  const getListings = () => {
    let listingsOnPage = [];
    let results = [];

    listings.map((listing, index) => {
      return listingsOnPage.push(
        <Card
          key={index}
          title={listing.title}
          address={listing.address}
          city={listing.city}
          state={listing.state}
          price={listing.price}
          sale_type={listing.sale_type}
          home_type={listing.home_type}
          bedrooms={listing.bedrooms}
          bathrooms={listing.bathrooms}
          sqft={listing.sqft}
          photo_main={listing.photo_main}
          slug={listing.slug}
        />
      );
    });

    for (let i = 0; i < listings.length; i += 3) {
      results.push(
        <div className="row">
          <div className="col-1-of-3">{listingsOnPage[i]}</div>

          <div className="col-1-of-3">
            {listingsOnPage[i + 1] ? listingsOnPage[i + 1] : null}
          </div>

          <div className="col-1-of-3">
            {listingsOnPage[i + 2] ? listingsOnPage[i + 2] : null}
          </div>
        </div>
      );
    }

    return results;
  };
  return (
    <div className="listings">
      Listings here
      {getListings()}
    </div>
  );
}
export default Listings;
