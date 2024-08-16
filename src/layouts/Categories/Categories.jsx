import React, { useState, useEffect } from 'react';
import { useCategories, deleteCategory, addCategory, updateCategory } from '../../util/CategoryHttp';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './Categories.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from "../../context/AuthContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Categories = () => {
    const { user } = useAuth();
    const { data, isLoading, isError, refetch } = useCategories(user.accessToken);

    const [categories, setCategories] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ title: '', description: '' });
    const [editCategory, setEditCategory] = useState(null);

    useEffect(() => {
        if (data) {
            setCategories(data.data);
        }
    }, [data]);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await deleteCategory(user.accessToken, id);
            setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
            toast.success('Category deleted successfully');
        } catch (error) {
            toast.error('Error deleting category');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleAddCategory = async () => {
        try {
            await addCategory(user.accessToken, newCategory);
            await refetch();
            setNewCategory({ title: '', description: '' });
            setOpenAddModal(false);
            toast.success('Category added successfully');
        } catch (error) {
            toast.error('Error adding category');
        }
    };

    const handleEditCategory = async () => {
        if (editCategory) {
            try {
                await updateCategory(user.accessToken, {
                    ...editCategory,
                    _method: 'PATCH',
                });
                await refetch();
                setEditCategory(null);
                setOpenEditModal(false);
                toast.success('Category updated successfully');
            } catch (error) {
                toast.error('Error updating category');
            }
        }
    };

    const openEditModalHandler = (category) => {
        setEditCategory(category);
        setOpenEditModal(true);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return <div className="error">An error occurred while fetching categories.</div>;
    }

    return (
        <>
            <SearchBar />
            <div className='ExposBG'>
                <div className="categories-container">
                    <div className="header">
                        <h1 className="title">Categories :</h1>
                        <button
                            className='nextButton'
                            startIcon={<FaPlus />}
                            onClick={() => setOpenAddModal(true)}
                        >
                            Add Category
                        </button>
                    </div>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <div key={category.id} className="category-card">
                                <div className="category-header">
                                    <h2 className="category-title">{category.title}</h2>
                                    <div className="actions">
                                        <Button
                                            className="action-button edit"
                                            onClick={() => openEditModalHandler(category)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            className="action-button delete"
                                            onClick={() => handleDelete(category.id)}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? <CircularProgress size={24} /> : <FaTrashAlt />}
                                        </Button>
                                    </div>
                                </div>
                                <p className="category-description">{category.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Category Modal */}
            <Modal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                aria-labelledby="add-category-modal"
                aria-describedby="add-category-form"
            >
                <div className="modal-content">
                    <h2>Add New Category</h2>
                    <TextField
                        label="Title"
                        fullWidth
                        margin="normal"
                        value={newCategory.title}
                        onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                    <div className="modal-actions">
                        <button
                            className='nextButton'
                            onClick={handleAddCategory}
                        >
                            Add Category
                        </button>
                        <button
                            variant="outlined"
                            onClick={() => setOpenAddModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Category Modal */}
            <Modal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                aria-labelledby="edit-category-modal"
                aria-describedby="edit-category-form"
            >
                <div className="modal-content">
                    <h2>Edit Category</h2>
                    <TextField
                        label="Title"
                        fullWidth
                        margin="normal"
                        value={editCategory?.title || ''}
                        onChange={(e) => setEditCategory({ ...editCategory, title: e.target.value })}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={editCategory?.description || ''}
                        onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
                    />
                    <div className="modal-actions">
                        <button
                            className='nextButton'
                            onClick={handleEditCategory}
                        >
                            Update Category
                        </button>
                        <button
                            variant="outlined"
                            onClick={() => setOpenEditModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Categories;
