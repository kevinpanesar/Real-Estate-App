import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { BrowserRouter as Router, Link } from "react-router-dom";

//Component to display preview of all listings
export function ListingPage(props) {

    //Created a copy of the array from the second API request.
    let data = Array.from(props.posts);

    //Maps the array of listings into divs that link to the third page, which is the details of the listings.
    let listings = data.map((value, index) => {

        //Changing the images from low quality to high quality if image is available, otherwise display image not available.
        let img = value.thumbnail;
        let highResImg
        if (img) {
            highResImg = img.replace('x.jpg', 'od-w1024_h768.jpg');
        }
        else {
            highResImg = 'https://lh3.googleusercontent.com/proxy/O4vnnaN0zxxGnhWOi0k4H2sZTNs4LiHF6Jkn6D-0N7LQLBg75trpvcoP-YoJzPhxrcu3ScWUcUe-75T8gUO3D7hkdI4H-zv62wmG0oGzV7lgKG54PedynZviGND5RQcSrCFRQ50';
        }

        //Declaring variable to hold value of MLS property ID to add to the end of the URL
        let propertyID = value.property_id;

        return <Link key={index}
            //Adding property ID to url, and sending state to third page. Also return div for each listing with a background image of the listing.
            to={{
                pathname: '/:city/' + propertyID,
                state: { from: props.location, listing: { value }, dataRecieved: props.dataRecieved },
            }}>
            <div className="preview"
                style={{
                    backgroundImage: `url(${highResImg})`,
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                    margin: 15,
                    backgroundPosition: 'center'
                }}>
                <div className="listingPreviewText">
                    {value.address.line + ', ' + value.address.postal_code}
                    <br></br>
                    {'$' + props.numberWithCommas(value.price)}
                </div>
            </div>
        </Link>
    });

    //Using bootstrap spinner until listings load
    let loading = (<Spinner animation="border" size="10" />)

    return (
        <div id="listingsContainer">
            {props.dataRecieved ? listings : loading}
        </div>
    );
}
