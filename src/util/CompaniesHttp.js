
export const fetchPending = async (authToken) => {
    console.log(authToken);
  try {
    const response = await fetch('https://exponex.omranalsamkari.site/api/v1/admin/company/get/pending', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return { data: [] };  
  }
};


export const fetchCompanies  = async (authToken) => {
    console.log(authToken);
  try {
    const response = await fetch('https://exponex.omranalsamkari.site/api/v1/admin/company/get', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return { data: [] };  
  }
};

