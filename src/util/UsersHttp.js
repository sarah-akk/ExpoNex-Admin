

export const fetchUsers = async (token) => {

    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/admin/user/get',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const deleteUser = async (userId, accessToken) => {

    const formData = new FormData();

    formData.append('_method', 'DELETE');
    formData.append(' user_id', userId);

    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/admin/user/delete',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'user_id': userId, '_method': 'DELETE' }),
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};