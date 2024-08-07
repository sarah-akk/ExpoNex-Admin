
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/util/CompaniesHttp.js
export const fetchCompanyDetails = async (id, authToken) => {
    try {
      const response = await fetch(`https://exponex.omranalsamkari.site/api/v1/admin/company/get/${id}`, {
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
      console.error('Error fetching company details:', error);
      throw error;
    }
  };
  

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchDocument = async (docId, token) => {
    const response = await fetch(`https://exponex.omranalsamkari.site/api/v1/admin/document/download/${docId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/pdf'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob(); 
  };
  

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateCompanyStatus = async (companyId, token) => {
    const response = await fetch(`https://exponex.omranalsamkari.site/api/v1/admin/company/change-state`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        approval: 1,
        company_id: companyId,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  