import React, { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ListingForm from '../components/ListingForm';
import Listings from '../components/Listings';
import Pagination from '../components/Pagination';


function Home(){

    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [listingsPerPage, setListingsPerPage] = useState(3);
    const [active, setActive] = useState(1);

    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing)

    function visitPage(page) {
        setCurrentPage(page);
        setActive(page);
    }

    function previousNumber(){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1);
            setActive(currentPage - 1)
        }
    }
    function nextNumber(){
        //(Math.ceil(7.004));
        // Expected output: 8
        // returns a the equal (if its 7.00) or the greater consecutive integer (if its 7.004, return 8)
        // So, with a pagination of 3 listings per page, if we have 21 listings, we will have 7 pages. But if we have 22, we will have 7 pages of 3 listings, and 1 page of 1 listing = 8 pages in total. 
        if(currentPage !== Math.ceil(listings.length / 3)){
            setCurrentPage(currentPage + 1);
            setActive(currentPage + 1)
        }
    }
    return(
        <HelmetProvider>
            <main className="home">
            <Helmet>
                <title>Open House | Home</title>
                <meta
                name='description'
                content="Open House homepage"
                />
            </Helmet>
            <section className="home__form">
                <ListingForm setListings={setListings} />
            </section>
            <section className="home__listings">
                <Listings listings={currentListings}/>
            </section>
            <section className="home__pagination">
                <div className="row">
                    {
                        listings.length !== 0 ? (
                            <Pagination
                            itemsPerPage={listingsPerPage}
                            count={listings.length}
                            visitPAge={visitPage}
                            previous={previousNumber}
                            next={nextNumber}
                            active={active}
                            setActive={setActive}
                            />
                        ) : null
                    }
                </div>
            </section>
            </main>
        </HelmetProvider>
    )
}
export default Home;