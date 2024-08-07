import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchCompanyDetails, fetchDocument, updateCompanyStatus } from '../../util/CompaniesHttp';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from '../../context/AuthContext';
import './CompanyDetails.css'; 
import SearchBar from '../../components/SearchBar/SearchBar';
import upload from "../../assets/icons/upload.svg";

const CompanyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch company details
  const { data: company, isLoading, isError } = useQuery(
    ['companyDetails', id],
    () => fetchCompanyDetails(id, user.accessToken),
    {
      staleTime: 60000, // Cache data for 60 seconds
      retry: 1 // Retry once on failure
    }
  );

  // Mutation for updating company status
  const mutation = useMutation(
    () => updateCompanyStatus(id, user.accessToken),
    {
      onSuccess: () => {
        // Invalidate and refetch company details on success
        queryClient.invalidateQueries(['companyDetails', id]);
      }
    }
  );

  const handleDocumentDownload = async (docId) => {
    try {
      const response = await fetchDocument(docId, user.accessToken);
      const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `document_${docId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const handleStatusChange = () => {
    mutation.mutate();
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <p>Error loading company details.</p>;
  }

  return (
    <>
      <SearchBar />
      <div className="company-details-container">
        <h1>{company?.data.companyname}</h1>
        <p><strong>Name:</strong> {company?.data.name}</p>
        <p><strong>Description:</strong> {company?.data.description}</p>
        <p><strong>Owner:</strong> {company?.data.owner.name} ({company?.data.owner.username})</p>
        <p className={`status ${company?.data.is_verified ? 'verified' : 'unverified'}`}>
          <strong>Status:</strong> {company?.data.is_verified ? 'Verified' : 'Not Verified'}
        </p>
        <button 
          className={`status-change-button ${mutation.isSuccess ? 'success' : mutation.isError ? 'error' : ''}`}
          onClick={handleStatusChange}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Updating...' : 'Change Status'}
        </button>
        <div className="documents-section">
          <h2>Documents</h2>
          {company?.data.documents_ids.length > 0 ? (
            <ul>
              {company?.data.documents_ids.map((docId) => (
                <li key={docId}>
                  <button 
                    onClick={() => handleDocumentDownload(docId)}
                    disabled={false} // Assuming downloading is not a separate async state here
                  >
                    Document 
                  </button>
                  <img src={upload} alt="Upload Icon" className="upload-icon" />
                </li>
              ))}
            </ul>
          ) : (
            <p>No documents available.</p>
          )}
          {mutation.isLoading && (
            <Box display="flex" justifyContent="center" alignItems="center" marginTop="20px">
              <CircularProgress />
            </Box>
          )}
          {mutation.isError && <p>Error updating status.</p>}
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
