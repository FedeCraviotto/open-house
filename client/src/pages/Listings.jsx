import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import Card from '../components/Card';
import Pagination from '../components/Pagination';

function Listings(){
    const [listings, setListings] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);

    useEffect(()=> {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}listings/?page=1`);
                setListings(response.data.results);
                setCount(response.data.count);
                setPrevious(response.data.previous);
                setNext(response.data.next);
                
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const displayListings = () => {
        let display = [];
        let results = [];

        listings.map((listing, index) => {
            return display.push(
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
                photo_main={listing.main_image}
                slug={listing.slug}
                />
            )
        })

        for(let i = 0; i < listings.length; i +=3 ) {
            results.push(
                <div key={i} className="row">
                    <div className="col-1-of-3">
                        {display[i]}
                    </div>
                    <div className="col-1-of-3">
                        {display[i+1] ? display[i+1] : null}
                    </div>
                    <div className="col-1-of-3">
                        {display[i+2] ? display[i+2] : null}
                    </div>
                </div>
            )
        }

        return results;
    };

    const visitPage = (page) => {
        axios.get(`${process.env.REACT_APP_API}listings/?page=${page}`)
        .then(response => {
            setListings(response.data.results);
            setActive(page);
            setPrevious(response.data.previous);
            setNext(response.data.next);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const previousNumber = () => {
        if(previous)
        axios.get(previous)
        .then(response => {
            setListings(response.data.results);
            setPrevious(response.data.previous);
            setNext(response.data.next);
            if (previous) setActive(active-1);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const nextNumber = () => {
        if(next)
        axios.get(next)
        .then(response => {
            setListings(response.data.results);
            setPrevious(response.data.previous);
            setNext(response.data.next);
            if (next) setActive(active+1);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <HelmetProvider>
        <main className="listings">
        <Helmet>
          <title>Open House | Listings</title>
          <meta name="description" content="Open House - Listings" />
        </Helmet>
            <section className="listings__listings">
                {displayListings()}
            </section>
            <section className="listings__pagination">
                <div className="row">
                    <Pagination
                    itemsPerPage={3}
                    count={count}
                    visitPage={visitPage}
                    previous={previousNumber}
                    next={nextNumber}
                    active={active}
                    setActive={setActive}
                    />
                </div>
            </section>
        </main>
        </HelmetProvider>
    )
}
export default Listings;