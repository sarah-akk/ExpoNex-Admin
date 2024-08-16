export const fetchProducts = async (token) => {
    const response = await fetch('https://exponex.omranalsamkari.site/api/v1/admin/product/get',
        {
            headers: {

                'Authorization': `Bearer ${token}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteProduct = async (productId, accessToken) => {
    const response = await fetch('https://exponex.omranalsamkari.site/api/v1/admin/product/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ 'product_id': productId, '_method': 'DELETE' }),
    });

    if (!response.ok) {
        throw new Error('Error deleting product');
    }

    return productId;
};