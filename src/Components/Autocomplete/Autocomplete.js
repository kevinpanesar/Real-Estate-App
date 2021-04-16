import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'


//Creating AutoComplete component to give the user suggestions to cities, and provide the parameters in the URL for the next API request.
export function Autocomplete(props) {

    //When user begins to type this function changes state of userInput to what the user has typed. Also sets ShowOptions to true, which shows the list of suggestions.
    const onChange = (e) => {
        props.setUserInput(e.currentTarget.value);
        props.setShowOptions(true);
    };


    //Declared optionList to either equal list of suggestions from API, or show No Option.
    let optionList;
    if (props.showOptions && props.userInput) {
        if (props.cityArray) {
            optionList = props.cityArray.map((value, index) => {
                return <ListGroup.Item key={index} onClick={() => {
                    props.setStateListings(value.state_code);
                    props.setCityListings(value.city);
                    props.setShowOptions(false);
                    props.setUserInput(value.city + ', ' + value.state_code);
                    props.setSuggestionClicked(true);
                }}>{value.city + ', ' + value.state_code}</ListGroup.Item>
            });
        } else {
            optionList = (
                <div className="no-options">
                    <em>No Option!</em>
                </div>
            );
        }
    }


    //React router link to the next component which is ResultsPage. Input and button, and list are styled with Bootstrap.
    return (
        <React.Fragment>
            <div className="search">
                <Form.Control id="autocomplete" autoComplete="off" onChange={onChange}
                    value={props.userInput} size="lg" type="text" placeholder="Select City From Suggestions" />
                <Link to={{
                    pathname: '/' + props.cityListings,
                    state: { from: props.location, cityListings: props.cityListings, stateListings: props.stateListings, userInput: props.userInput, cities: props.cities, dataRecieved: props.dataRecieved }
                }}>
                    <Button variant="primary" size="lg">Search</Button>
                </Link>
            </div>
            <ListGroup variant="flush">
                {optionList}
            </ListGroup>
        </React.Fragment>
    );
}

