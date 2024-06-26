import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateVenue.css';

const CreateVenue = () => {
    const [cities, setCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState('');
    const [venueName, setVenueName] = useState('');
    const [numberOfScreens, setNumberOfScreens] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [message, setMessage] = useState('');

    // Fetch cities from the backend when component mounts
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cities');
                setCities(response.data); // Assuming the backend returns an array of cities
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);

    const handleCreateVenue = async () => {
        try {
            const response = await axios.post('http://localhost:8080/venues', {
                cityId: selectedCityId,
                venueName,
                numberOfScreens: parseInt(numberOfScreens),
                address,
                contactNumber
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to create venue');
        }
    };

    return (
        <div className="venue-page-container">
            <h3 className='h3-css'>Book My Cinema</h3>
        <div className="create-venue-container">
            <h2>Create New Venue</h2>
            <label htmlFor="city">Select City:</label>
            <select id="city" value={selectedCityId} onChange={(e) => setSelectedCityId(e.target.value)}>
                <option value="">Select a city</option>
                {cities.map(city => (
                    <option key={city._id} value={city._id}>{city.city_name}</option>
                ))}
            </select>
            <label htmlFor="venueName">Venue Name:</label>
            <input type="text" id="venueName" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
            <label htmlFor="numberOfScreens">Number of Screens:</label>
            <input type="number" id="numberOfScreens" value={numberOfScreens} onChange={(e) => setNumberOfScreens(parseInt(e.target.value))} />
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <label htmlFor="contactNumber">Contact Number:</label>
            <input type="text" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            <button onClick={handleCreateVenue}>Create Venue</button>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default CreateVenue;
