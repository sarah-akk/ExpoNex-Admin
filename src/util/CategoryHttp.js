import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchCategories = async (authToken) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/admin/category/get', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { data: [] };
    }
};

// Update the useCategories hook
export const useCategories = (token) => {
    return useQuery({
        queryKey: ['categories', token],
        queryFn: () => fetchCategories(token),
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteCategory = async (authToken, id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/category/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'category_id': id, '_method': 'DELETE' }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
        },
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const addCategory = async (authToken, category) => {
    console.log(category)
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/category/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: category.title,
                description: category.description,
                _method: 'PUT'
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error add category:', error);
        throw error;
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateCategory = async (authToken, category) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/category/update`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _method: 'PATCH',
                category_id: category.id,
                name: category.title,
                description: category.description,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};


