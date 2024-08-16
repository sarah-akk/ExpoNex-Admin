import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, deleteProduct } from '../../util/ProductsHttp';
import { useAuth } from "../../context/AuthContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import CircularProgress from '@mui/material/CircularProgress';
import './Orders.css';
import { AiOutlineLeft, AiOutlineRight, AiOutlineDelete } from 'react-icons/ai';

const Orders = () => {
    const [loadingImage, setLoadingImage] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { data, isLoading, isError } =
        useQuery({
            queryKey: ['Products', user.accessToken],
            queryFn: () => fetchProducts(user.accessToken)
        });

    const mutation = useMutation({
        mutationFn: (productId) => deleteProduct(productId, user.accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries(['Products', user.accessToken]);
            setShowModal(false);
        },
        onError: () => {
            setShowModal(false);
        }
    });

    const handleDelete = (productId) => {
        setDeleteProductId(productId);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (deleteProductId) {
            mutation.mutate(deleteProductId);
        }
    };


    if (isLoading) return <div><CircularProgress /> Loading...</div>;
    if (isError) return <div>Error fetching products</div>;



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


    if (isLoading) return <div><CircularProgress /> Loading...</div>;
    if (isError) return <div>Error fetching products</div>;

    return (
        <>
            <SearchBar />
            <div className='ExposBG'>
                <h1 className="title">All Products:</h1>
                <div className="orders-container">
                    {data.length === 0 ? (
                        <div>No products available</div>
                    ) : (
                        <div className="products-grid">
                            {data.data.map(product => {
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
                                {mutation.isLoading ? <CircularProgress size={24} /> : 'Yes, Delete'}
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
