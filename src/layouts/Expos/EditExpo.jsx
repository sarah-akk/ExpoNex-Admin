import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateExpoDetails } from '../../util/ExposHttp';
import './EditExpo.css';
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAuth } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';

const EditExpo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [originalExpo, setOriginalExpo] = useState(location.state?.expoDetails.data || {});
    const [expo, setExpo] = useState({ ...originalExpo });
    const [loading, setLoading] = useState(false);

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

    const getUpdatedFields = () => {
        const updatedFields = {};
        Object.keys(expo).forEach(key => {
            if (expo[key] !== originalExpo[key]) {
                updatedFields[key] = expo[key];
            }
        });
        return updatedFields;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading
        try {
            const changes = getUpdatedFields();
            if (Object.keys(changes).length > 0) {
                await updateExpoDetails(user.accessToken, originalExpo.id, changes);
                navigate('/dashboard/Activity');
            } else {
                console.log('No changes detected.');
            }
        } catch (error) {
            console.error('Failed to update expo details:', error);
        } finally {
            setLoading(false);  // Stop loading
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
                                name="title"
                                value={expo.title || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Start Date:
                            <input
                                type="date"
                                name="start_at"
                                value={expo.start_at || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            End Date:
                            <input
                                type="date"
                                name="end_at"
                                value={expo.end_at || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Location:
                            <input
                                type="text"
                                name="location"
                                value={expo.location || ''}
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
                                value={expo.ticket_in_place || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket in Virtual Price:
                            <input
                                type="number"
                                name="ticket_in_virtual_price"
                                value={expo.ticket_in_virtual_price || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket Prime:
                            <input
                                type="number"
                                name="ticket_prime"
                                value={expo.ticket_prime || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Ticket Prime Price:
                            <input
                                type="number"
                                name="ticket_prime_price"
                                value={expo.ticket_prime_price || ''}
                                onChange={handleChange}
                                className="form-input" />
                        </label>
                        <label className="form-label">
                            Description:
                            <textarea
                                name="description"
                                value={expo.description || ''}
                                onChange={handleChange}
                                className="form-textarea" />
                        </label>

                        <div className="button-group">
                            <button type="submit" className="nextButton" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                            </button>
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
