import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateExpoDetails } from '../../util/ExposHttp';
import './EditExpo.css';
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAuth } from "../../context/AuthContext";

const EditExpo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [expo, setExpo] = useState(location.state?.expoDetails || {});

    useEffect(() => {
        if (!location.state?.expoDetails) {
            navigate('/dashboard/Activity');
        }
    }, [location.state, navigate]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setExpo((prevExpo) => ({ ...prevExpo, [name]: files[0] }));
        } else {
            setExpo((prevExpo) => ({ ...prevExpo, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateExpoDetails(user.accessToken, expo.id, expo);
            navigate('/dashboard/Activity');
        } catch (error) {
            console.error('Failed to update expo details:', error);
        }
    };

    return (
        <>
            <SearchBar />
            <div className='ExposBG'>
                <div className="edit-expo-form-container">
                    <h2>Edit Expo</h2>
                    <form onSubmit={handleSubmit} className="edit-expo-form">
                        <label className="form-label">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={expo.data.title || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Start Date:
                            <input
                                type="date"
                                name="start_at"
                                value={expo.data.start_at || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            End Date:
                            <input
                                type="date"
                                name="end_at"
                                value={expo.data.end_at || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Location:
                            <input
                                type="text"
                                name="location"
                                value={expo.data.location || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Coordinates:
                            <input
                                type="text"
                                name="coordinates"
                                value={expo.data.coordinates || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Profile Picture:
                            <input
                                type="file"
                                name="profile_picture"
                                accept="image/*"
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket in Place:
                            <input
                                type="number"
                                name="ticket_in_place"
                                value={expo.data.ticket_in_place || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket in Virtual Price:
                            <input
                                type="number"
                                name="ticket_in_virtual_price"
                                value={expo.data.ticket_in_virtual_price || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket Prime:
                            <input
                                type="number"
                                name="ticket_prime"
                                value={expo.data.ticket_prime || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket Prime Price:
                            <input
                                type="number"
                                name="ticket_prime_price"
                                value={expo.data.ticket_prime_price || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Description:
                            <textarea
                                name="description"
                                value={expo.data.description || ''}
                                onChange={handleChange}
                                className="form-textarea" />
                        </label>
                        <label className="form-label">
                            Ticket Barcode:
                            <input
                                type="text"
                                name="ticket_barcode"
                                value={expo.data.ticket_barcode || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket Title:
                            <input
                                type="text"
                                name="ticket_title"
                                value={expo.data.ticket_title || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket Description:
                            <textarea
                                name="ticket_description"
                                value={expo.data.ticket_description || ''}
                                onChange={handleChange}
                                className="form-textarea" />
                        </label>
                        <label className="form-label">
                            Ticket Side Type:
                            <input
                                type="text"
                                name="ticket_side_type"
                                value={expo.data.ticket_side_type || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket Main Type:
                            <input
                                type="text"
                                name="ticket_main_type"
                                value={expo.data.ticket_main_type || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket Side Style:
                            <input
                                type="text"
                                name="ticket_side_style"
                                value={expo.data.ticket_side_style || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket Main Style:
                            <input
                                type="text"
                                name="ticket_main_style"
                                value={expo.data.ticket_main_style || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <div className="button-group">
                            <button type="submit" className="nextButton">Save Changes</button>
                            <button type="button" className="nextButton"
                                onClick={() => navigate('/dashboard/Activity')}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditExpo;
