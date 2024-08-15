

export const fetchUsers = async (token) => {


    try {
        const response = await fetch('https://exponex.omranalsamkari.site/api/v1/admin/user/get',
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
