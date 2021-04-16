import React from 'react';
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//Function to filter the listings.
export function FilterResults(props) {

    //Creates the option values for the drop downs minPrice, and maxPrice.
    let Price = [];
    let increment = 100000;
    for (let i = 0; i < 15; i++) {
        if (increment >= 1000000) {
            increment = increment + 400000;
        }
        increment = increment + 100000;
        Price.push(increment);
    }

    //Creating array of values for the filtering drop downs
    let minSqft = [1000, 2000, 3000, 4000, 5000, 7500, 10000];
    let maxSqft = [2000, 3000, 4000, 5000, 7500, 10000, 15000];
    let minBedrooms = [1, 2, 3, 4, 5, 6, 7, 8];
    let minBathrooms = [1, 2, 3, 4, 5, 6, 7, 8];

    //Returns all the drop downs with mapped values from their corresponding arrays.
    return (
        <div id="filterResults">
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} id="filterButton" variant="outline-primary" eventKey="0">
                            Filter Results
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Form className="filterResultsContainer">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <div className="filterItem">
                                    <Form.Label>Min Price</Form.Label>
                                    <Form.Control as="select" onChange={({ target }) => props.setMinPrice(target.value)} custom>
                                        <option>Any Min Price</option>
                                        {Price.map((value, index) => <option key={index} value={value}>{'$' + props.numberFormat(value)}</option>)}
                                    </Form.Control>
                                </div>

                                <div className="filterItem">
                                    <Form.Label>Max Price</Form.Label>
                                    <Form.Control onChange={({ target }) => props.setMaxPrice(target.value)} as="select" custom>
                                        <option>Any Max Price</option>
                                        {Price.map((value, index) => <option key={index} value={value}>{'$' + props.numberFormat(value)}</option>)}
                                    </Form.Control>
                                </div>
                                <div className="filterItem">
                                    <Form.Label>Sort By</Form.Label>
                                    <Form.Control as="select" onChange={({ target }) => props.setSort(target.value)} custom>
                                        <option>Sort</option>
                                        <option value='relevance'>Relevance</option>
                                        <option value='price_low'>Low Price</option>
                                        <option value='price_high'>High Price</option>
                                        <option value='photos'>Most Photos</option>
                                        <option value='sqft_high'>High Sqft</option>
                                    </Form.Control>
                                </div>

                                <div className="filterItem">
                                    <Form.Label>House Min Sqft</Form.Label>
                                    <Form.Control as="select" onChange={({ target }) => props.setMinSqft(target.value)} custom>
                                        <option>Min Sqft</option>
                                        {minSqft.map((value, index) => <option key={index} value={value}>{props.numberFormat(value) + 'Sqft'}</option>)}
                                    </Form.Control>
                                </div>

                                <div className="filterItem">
                                    <Form.Label>House Max Sqft</Form.Label>
                                    <Form.Control as="select" onChange={({ target }) => props.setMaxSqft(target.value)} custom>
                                        <option>Max Sqft</option>
                                        {maxSqft.map((value, index) => <option key={index} value={value}>{props.numberFormat(value) + 'Sqft'}</option>)}
                                    </Form.Control>
                                </div>

                                <div className="filterItem">
                                    <Form.Label>Min Bedrooms</Form.Label>
                                    <Form.Control as="select" onChange={({ target }) => props.setMinBedrooms(target.value)} custom>
                                        <option>Min Beds</option>
                                        {minBedrooms.map((value, index) => <option key={index} value={value}>{props.numberFormat(value)}</option>)}
                                    </Form.Control>
                                </div>
                                <div className="filterItem">
                                    <Form.Label>Min Bathrooms</Form.Label>
                                    <Form.Control as="select" onChange={({ target }) => props.setMinBathrooms(target.value)} custom>
                                        <option>Min Bathrooms</option>
                                        {minBathrooms.map((value, index) => <option key={index} value={value}>{props.numberFormat(value)}</option>)}
                                    </Form.Control>
                                </div>
                                <div className="filterItem">
                                    <Form.Label>Property Type</Form.Label>
                                    <Form.Control as="select" onChange={({ target }) => props.setPropertyType(target.value)} custom>
                                        <option>Type</option>
                                        <option value='single_family'>Single Family</option>
                                        <option value='multi_family'>Multi Family</option>
                                        <option value='condo'>Condominium</option>
                                        <option value='mobile'>Mobile Home</option>
                                        <option value='land'>Land</option>
                                        <option value='farm'>Farm</option>
                                        <option value='other'>Other</option>
                                    </Form.Control>
                                </div>
                            </Form.Group>
                        </Form>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}