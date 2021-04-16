import React, { useState, useEffect, useLocation } from 'react';
import '../../Stylesheets/ResultsPage.scss';
import { FilterResults } from '../../Components/FilterResults/FilterResults';
import { ListingPage } from '../ListingPage/ListingPage';
import { Pagination } from '../../Components/Pagination/Pagination';
import { useHistory, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

//ResultsPage component which is the second page of the application, which previews all the listings, and allows user to filter the results.
export function ResultsPage(props) {

    //Declaring all states with useState hook
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sort, setSort] = useState('price_high');
    const [dataRecieved, setDataRecieved] = useState(false);
    const [minSqft, setMinSqft] = useState(null);
    const [maxSqft, setMaxSqft] = useState(null);
    const [minBedrooms, setMinBedrooms] = useState(null);
    const [minBathrooms, setMinBathrooms] = useState(null);
    const [propertyType, setPropertyType] = useState(null);
    const [postsPerPage, setPostsPerAge] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);

    //Creating history variable from useHistory hook to go back and forth between pages.
    let history = useHistory();

    //Function used to format numbers with commas for every 3 digits.
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    //Function to call API to get array of listings
    const getListings = async () => {
        //Used previous API call to get cityListings, and stateListings.
        let response = await fetch(`https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=${props.location.state.cityListings}&limit=200&offset=0&state_code=${props.location.state.stateListings}&sort=${sort}&price_max=${maxPrice}&price_min=${minPrice}&sqft_min=${minSqft}&sqft_max=${maxSqft}&beds_min=${minBedrooms}&baths_min=${minBathrooms}&prop_type=${propertyType}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "f47832579dmshbd8a9344b7fcbc4p1911d1jsn045b1327ed4c",
                "x-rapidapi-host": "realtor.p.rapidapi.com"
            }
        });
        let jsonResponse = await response.json();
        let listings = jsonResponse.properties;
        //Setting state to the recieved array of listings from the API, and setting dataRecieved to true.
        setPosts(listings);
        setDataRecieved(true);

    }



    //useEffect hook to call API again if user wants to fitler results through FilterResults Component, or if userInput state is changed from previous change.
    useEffect(() => {
        if (props.location.state.cityListings && props.location.state.stateListings) {
            getListings();
        }
    }, [props.location.state.userInput, minPrice, maxPrice, sort, minSqft, maxSqft, minBathrooms, minBedrooms, propertyType]);

    //For pagination of the listings.
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);



    //Returns three differennt components, FilterResuls for filtering results, ListingPage to display preview of listings, Pagination to paginate to seperate listings into seperate pages.
    return (
        <div className="resultsPage">
            <p>Property-Finder 1.0</p>
            <div id="listingPage">
                <FilterResults setSort={setSort} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} numberFormat={numberWithCommas} setMinSqft={setMinSqft} setPropertyType={setPropertyType} setMaxSqft={setMaxSqft} setMinBedrooms={setMinBedrooms} setMinBathrooms={setMinBathrooms} />
                <ListingPage userInput={props.location.state.userInput} posts={currentPosts} cities={props.location.state.cities} numberWithCommas={numberWithCommas} dataRecieved={dataRecieved} />
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
            </div>
            <Button id="goBack" onClick={() => history.goBack()} variant="primary" > Back </Button>
        </div>

    );
}