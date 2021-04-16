import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { ControlledCarousel } from '../Carousel/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';
import Figure from 'react-bootstrap/Figure';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import '../../Stylesheets/ListingPage.scss';

//Component is the third page, and displays the listings with all pictures and details.
export function Results(props) {

    //Declaring state to store pictures of the listing, and a boolean to show if pictures have been recieved.
    const [pictures, setPictures] = useState([]);
    const [picturesRecieved, setPicturesRecieved] = useState(false);

    //Declaring history variable from useHistory hook to go back and forth between pages.
    let history = useHistory();

    //Declare variable to store data object from 2nd API call
    let value
    if (props.location.state.dataRecieved) {
        value = props.location.state.listing.value;
    }

    //function used to format numbers with commas. Could not send functions through React router Link which is why I had to create this function twice.
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //function to get third API call which gets the information and pictures of the listing.
    const getPictures = async () => {
        if (value.property_id) {
            let response = await fetch(`https://realtor.p.rapidapi.com/properties/v2/detail?property_id=${value.property_id}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "f47832579dmshbd8a9344b7fcbc4p1911d1jsn045b1327ed4c",
                    "x-rapidapi-host": "realtor.p.rapidapi.com"
                }
            })
            let jsonResponse = await response.json();
            let pictures = jsonResponse.properties;
            //Set pictures state to the array of pictures and set picturesRecieved to true.
            setPictures(pictures[0]);
            setPicturesRecieved(true);
        }
    }

    const handleClick = () => {
        window.location.assign(pictures.virtual_tour.href);
    }

    //useEffect to call getPictures function to get pictures of the listings
    useEffect(() => {
        if (value.property_id) {
            getPictures();
        }
    }, [value.property_id]);



    //if virtual tour link is available from API then set virtualTour variable to button with link to virtual tour of listing..
    let virtualTour;
    if (pictures.virtual_tour) {
        virtualTour = (
            <Button id="virtualTour" variant="primary" size="lg" block onClick={handleClick}>
                Virtual Tour
            </Button>);
    }
    else {
        virtualTour = null;
    }


    //if picturesRecieved state is true, then set description variable to listing info.
    let description
    if (picturesRecieved) {
        //These variables were not always available from API so this checks to see if the data is available before assigning it to the variables.
        let lowRes;
        let highRes;
        let lotSize;
        let taxHistory;
        let buildingSize;
        let beds;
        let baths;
        let garage;
        let year_built;
        let stories;

        if (pictures.garage) {
            garage = pictures.garage;
        }

        if (pictures.year_built) {
            year_built = pictures.year_built;
        }

        if (pictures.stories) {
            stories = pictures.stories;
        }

        if (pictures.baths) {
            baths = pictures.baths;
        }

        if (pictures.beds) {
            beds = pictures.beds;
        }

        if (pictures.building_size) {
            buildingSize = numberWithCommas(pictures.building_size.size) + ' Sqft';
        }

        if (pictures.agents[0].photo) {
            lowRes = pictures.agents[0].photo.href;
            highRes = lowRes.replace('x.jpg', 'od-w1024_h768.jpg');
        }

        if (pictures.lot_size) {
            lotSize = numberWithCommas(pictures.lot_size.size);
        }

        if (pictures.tax_history[0]) {
            taxHistory = '$' + numberWithCommas(pictures.tax_history[0].tax);

        }



        //The description variable returns the entire page of information of the selected listing. Contains following Bootstrap components: Carousel, ListGroup, Figure, Card, Button.
        description = (<div>
            <p id="Logo">Property-Finder 1.0</p>
            <h1>{value.address.line}</h1>
            <h2>{value.address.postal_code + ', ' + value.address.city + ' ,' + value.address.state}</h2>
            <h3>{'$' + numberWithCommas(value.price)}</h3>
            <div className="bodyContainer">
                <ControlledCarousel pictures={pictures} picturesRecieved={picturesRecieved} />
                <Figure>
                    <Figure.Caption>
                        {pictures.description}
                    </Figure.Caption>
                </Figure>
                {virtualTour}
                <Table striped bordered hover>
                    <thead id='tableHeader'>
                        <tr>
                            <th colSpan="2">Property Overview</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bedrooms</td>
                            <td className="secondCol">{beds}</td>

                        </tr>
                        <tr>
                            <td>Bathrooms</td>
                            <td className="secondCol">{baths}</td>

                        </tr>
                        <tr>
                            <td>House Size</td>
                            <td className="secondCol">{buildingSize}</td>
                        </tr>
                        <tr>
                            <td>Lot Size</td>
                            <td className="secondCol">{lotSize}</td>

                        </tr>
                        <tr>
                            <td>Garages</td>
                            <td className="secondCol">{garage}</td>

                        </tr>
                        <tr>
                            <td>Year Built</td>
                            <td className="secondCol">{year_built}</td>
                        </tr>
                        <tr>
                            <td>Stories</td>
                            <td className="secondCol">{stories}</td>

                        </tr>
                        <tr>
                            <td>Property Tax</td>
                            <td className="secondCol">{taxHistory}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Card.Header as="h5">Listing Agent</Card.Header>
            <Card id="Card">

                <Card.Body>
                    <Card.Title>{pictures.branding.listing_agent.details.name}</Card.Title>
                    <Card.Img variant="top" src={highRes} width="30px" id="cardImg" />
                    <Card.Text>
                        {pictures.agents[0].email}
                    </Card.Text>
                    <Card.Text>
                        {pictures.branding.listing_agent.details.phone}
                    </Card.Text>
                    <Button variant="primary" onClick={() => {
                        window.location.assign(pictures.agents[0].href);
                    }}>Agent Website</Button>
                </Card.Body>
                <Card.Body>
                    <Card.Title>{pictures.broker.name}</Card.Title>
                    <Card.Img variant="top" src={pictures.branding.listing_office.details.photo} width="30px" id="cardImg" />
                    <Card.Text>
                        {pictures.branding.listing_office.details.phone}
                    </Card.Text>
                    <Card.Text>
                        {pictures.branding.listing_agent.details.phone}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Button id="backButton" onClick={() => history.goBack()}>Back</Button>
        </div>);
    }

    //Uses Bootsrap spinner until data is recieved from API
    let loading = (<Spinner animation="border" id="spinner" size="10" />)



    //Returns Spinner from bootstrap if picturesRecieved is false.
    return (
        <div className="result">
            { picturesRecieved ? description : loading}
        </div>
    )
}