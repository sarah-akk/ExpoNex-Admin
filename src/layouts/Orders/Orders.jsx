import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { AiOutlineLeft, AiOutlineRight, AiOutlineDelete } from 'react-icons/ai';
import './Orders.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import laptop from "../../assets/images/laptop.jpeg"
import phone from "../../assets/images/phone.jpg"
import lego from "../../assets/images/lego.jpeg"
import lego2 from "../../assets/images/lego2.jpg"
import cheps from "../../assets/images/cheps.jpeg"
import shoe from "../../assets/images/shoe.jpg"
import shirt from "../../assets/images/shirt.webp"
import artPiece from "../../assets/images/artPiece.jpg"

const Orders = () => {
    const [loadingImage, setLoadingImage] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const staticData = [
        {
            id: 1,
            title: 'Art Piece',
            price: 100,
            company: { name: 'Company A' },
            pictures: [artPiece, 'https://via.placeholder.com/150/0000FF'],
        },
        {
            id: 2,
            title: 'nike shoes',
            price: 200,
            company: { name: 'Company B' },
            pictures: [shoe, 'https://via.placeholder.com/150/FF0000'],
        },
        {
            id: 3,
            title: 'modern laptop',
            price: 300,
            company: { name: 'Company C' },
            pictures: [laptop, 'https://via.placeholder.com/150/00FF00'],
        },
        {
            id: 4,
            title: 'Lego',
            price: 300,
            company: { name: 'Company C' },
            pictures: [lego, 'https://via.placeholder.com/150/00FF00'],
        },
        {
            id: 5,
            title: 'cheps',
            price: 300,
            company: { name: 'Company C' },
            pictures: [cheps, 'https://via.placeholder.com/150/00FF00'],
        },
        {
            id: 6,
            title: 'shirt',
            price: 300,
            company: { name: 'Company C' },
            pictures: [shirt, 'https://via.placeholder.com/150/00FF00'],
        },
        {
            id: 7,
            title: 'Anime lego',
            price: 300,
            company: { name: 'Company C' },
            pictures: [lego2, 'https://via.placeholder.com/150/00FF00'],
        },

        {
            id: 8,
            title: 'modern phone',
            price: 300,
            company: { name: 'Company C' },
            pictures: [phone, 'https://via.placeholder.com/150/00FF00'],
        },

    ];

    const handleDelete = (productId) => {
        setDeleteProductId(productId);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (deleteProductId) {
            console.log(`Deleted product with id: ${deleteProductId}`);
            setShowModal(false);
        }
    };

    const handleImageLoad = (productId) => {
        setLoadingImage(null);
    };

    const handleImageError = (productId) => {
        setLoadingImage(productId);
    };

    const handleNextImage = (productId, imagesLength) => {
        setCurrentImageIndex(prevIndex => ({
            ...prevIndex,
            [productId]: (prevIndex[productId] ?? 0 + 1) % imagesLength,
        }));
    };

    const handlePrevImage = (productId, imagesLength) => {
        setCurrentImageIndex(prevIndex => ({
            ...prevIndex,
            [productId]: (prevIndex[productId] ?? 0 - 1 + imagesLength) % imagesLength,
        }));
    };

    return (
        <>
            <SearchBar />

            <div className='ExposBG'>
                <h1 className="title">All Products:</h1>
                <div className="orders-container">
                    {staticData.length === 0 ? (
                        <div>No products available</div>
                    ) : (
                        <div className="products-grid">
                            {staticData.map(product => {
                                const currentImageIdx = currentImageIndex[product.id] ?? 0;
                                const imagesLength = product.pictures.length;
                                const isLoading = loadingImage === product.id;
                                return (
                                    <div key={product.id} className="product-card">
                                        <div className="product-images">
                                            <div className="image-container">
                                                {isLoading && (
                                                    <div className="spinner-overlay">
                                                        <CircularProgress />
                                                    </div>
                                                )}
                                                <img
                                                    src={product.pictures[currentImageIdx]}
                                                    alt={`${product.title} ${currentImageIdx}`}
                                                    className={`main-image ${isLoading ? 'hidden' : ''}`}
                                                    onLoad={() => handleImageLoad(product.id)}
                                                    onError={() => handleImageError(product.id)}
                                                />
                                                {imagesLength > 1 && (
                                                    <>
                                                        <button
                                                            className="arrow-button left-arrow"
                                                            onClick={() => handlePrevImage(product.id, imagesLength)}
                                                        >
                                                            <AiOutlineLeft size={24} />
                                                        </button>
                                                        <button
                                                            className="arrow-button right-arrow"
                                                            onClick={() => handleNextImage(product.id, imagesLength)}
                                                        >
                                                            <AiOutlineRight size={24} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h5 className="product-title">{product.title}</h5>
                                            <p className="product-price">Price: ${product.price}</p>
                                            <p className="product-company">Company: {product.company.name}</p>
                                        </div>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <AiOutlineDelete size={24} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-actions">
                            <button onClick={confirmDelete} className="confirm-button">
                                Confirm Delete
                            </button>
                            <button onClick={() => setShowModal(false)} className="cancel-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Orders;
