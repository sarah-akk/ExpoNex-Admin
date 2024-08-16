// apiService.js

export const CreateExpo = async (token, ExpoData) => {

    console.log(token)
    const formData = new FormData();

    formData.append('name', ExpoData.name || '');
    formData.append('location', ExpoData.location || '');
    formData.append('description', ExpoData.description || '');
    formData.append('end_at', ExpoData.end_at || '');
    formData.append('start_at', ExpoData.start_at || '');
    formData.append('expo_size', ExpoData.expo_size || '');
    formData.append('block_size', ExpoData.block_size || '');
    formData.append('theme', ExpoData.theme || '');
    formData.append('ticket_in_place', ExpoData.ticket_in_place || '');
    formData.append('ticket_in_place_price', ExpoData.ticket_in_place_price || '');
    formData.append('ticket_in_virtual_price', ExpoData.ticket_in_virtual_price || '');
    formData.append('investor_id', ExpoData.investor_id || '');
    formData.append('width', ExpoData.width || '');
    formData.append('height', ExpoData.height || '');

    formData.append('ticket_prime', ExpoData.ticket_prime || '');
    formData.append('ticket_prime_price', ExpoData.ticket_prime_price || '');
    formData.append('ticket_main_style', ExpoData.ticket_main_style || '');
    formData.append('ticket_main_type', ExpoData.ticket_main_type || '');
    formData.append('ticket_side_type', ExpoData.ticket_side_type || '');
    formData.append('ticket_title', ExpoData.ticket_title || '');
    formData.append('ticket_description', ExpoData.ticket_description || '');
    formData.append('ticket_barcode', ExpoData.ticket_barcode || '');

    formData.append('_method', 'PUT' || '');

    if (ExpoData.profile_picture) {
        formData.append('profile_picture', ExpoData.profile_picture);
    }
    if (ExpoData.ticket_side_style) {
        formData.append('ticket_side_style', ExpoData.ticket_side_style);
    }

    if (ExpoData.documents && ExpoData.documents.length > 0) {
        ExpoData.documents.forEach((file, index) => {
            formData.append(`documents[${index}]`, file);
        });
    }

    formData.append('coordinates', ExpoData.coordinates || '');
    formData.append('map', ExpoData.map || '');



    const printFormData = (formData) => {
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    };

    printFormData(formData);

    try {
        const response = await fetch('https://exponex.omranalsamkari.site/api/v1/admin/exhibition/create', {
            method: 'POST',

            headers: {

                'Authorization': `Bearer ${token}`,
            },

            body: formData,
        });

        console.log(formData)
        if (!response.ok) {
            console.log("1111111111111111111");
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error submitting ticket data:', error);
        throw error;
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchExpos = async (token) => {
    const response = await fetch('https://exponex.omranalsamkari.site/api/v1/admin/exhibition/get',
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchExpoDetails = async (token, id) => {
    const response = await fetch(`https://exponex.omranalsamkari.site/api/v1/admin/exhibition/get/${id}`,
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateExpoDetails = async (token, id, expoData) => {
    const formData = new FormData();

    Object.keys(expoData).forEach(key => {
        if (expoData[key]) {
            formData.append(key, expoData[key]);
        }
    });


    formData.append('_method', 'PATCH');
    formData.append('exhibition_id', id);

    const printFormData = (formData) => {
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    };

    printFormData(formData);


    const response = await fetch(`https://exponex.omranalsamkari.site/api/v1/admin/exhibition/update`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/api/expoApi.js

export const updateExpoStatus = async (token, exhibitionId, status) => {
    console.log(token)
    console.log(exhibitionId)
    console.log(status)

    const formData = new FormData();

    formData.append('_method', 'PATCH' || '');
    formData.append('exhibition_id', exhibitionId || '');
    formData.append('status', status || '');

    const response = await fetch(`https://exponex.omranalsamkari.site/api/v1/admin/exhibition/change-state`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to update expo status');
    }
    return response.json();
};


