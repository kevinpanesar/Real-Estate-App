import React, { useEffect, useState } from 'react'
import { Autocomplete } from '../../Components/Autocomplete/Autocomplete';
import '../../Stylesheets/SearchPage.scss';

//Created a SearchPage functional component, which will be the first page of my website.
export function SearchPage() {

    //Declared all my states using hooks
    const [userInput, setUserInput] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [cities, setCities] = useState([]);
    const [cityListings, setCityListings] = useState('');
    const [stateListings, setStateListings] = useState('');
    const [suggestionClicked, setSuggestionClicked] = useState(false);


    //Function for calling Realtor Api through Rapid API
    const getData = async () => {
        let response = await fetch(`https://realtor.p.rapidapi.com/locations/auto-complete?input=${userInput}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "f47832579dmshbd8a9344b7fcbc4p1911d1jsn045b1327ed4c",
                "x-rapidapi-host": "realtor.p.rapidapi.com"
            }
        })

        let jsonResponse = await response.json();
        let cities = jsonResponse.autocomplete;

        //Setting the cities state to the first 6 elements in array returned from the API
        let items = cities.slice(0, 3);
        setCities(items);
    }



    //Using a useEffect hook to call the function, which calls the API whenever userInput state is changed.
    useEffect(() => {
        //Call getData() function only if userInput is not empty, to avoid calling API on initial rendering.
        if (userInput !== '') {
            getData();
        }

    }, [userInput]);



    return (
        <div id="searchBox">
            <p>Property-Finder 1.0</p>
            <div className="searchBoxContainer">
                <h2>Enter name of city</h2>
                <Autocomplete userInput={userInput} cityArray={cities} setUserInput={setUserInput}
                    showOptions={showOptions}
                    setShowOptions={setShowOptions}
                    setCityListings={setCityListings}
                    setStateListings={setStateListings}
                    cityListings={cityListings}
                    stateListings={stateListings}
                    cities={cities}
                    suggestionClicked={suggestionClicked}
                    setSuggestionClicked={setSuggestionClicked} />
            </div>
        </div>
    );
}