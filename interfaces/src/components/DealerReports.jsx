import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
// import toast






const ReportsContainer = styled.div`
  width: 80%;
  margin: 20px auto;
`;

const ReportsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const ReportsTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  background-color: #f2f2f2; /* Set the background color for th */
`;

const ReportsTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const ReportsTableRow = styled.tr`
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #ababa0;
  }
`;


const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `;
const DealerReports = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const data = state.data
  console.log(data)
  const handleRowClick = async (regno)=>{
    const params = {registrationNo:regno}
    const response = await axios.get('http://localhost:5000/manu/detailed',{params})
    if(response.data.notfound){
      toast.error('Cannot retrieve data currently. Try again later')
    }
    else{
      navigate('/detailedReports',{replace:true,state:{data:response.data.detailedReports,registrationNo:regno}})
    }
  }

  return (
    <ReportsContainer>
      <ReportsTable>
        <thead>
          <ReportsTableRow>
            <ReportsTh>Vehicle No</ReportsTh>
            <ReportsTh>Mobile No</ReportsTh>
            <ReportsTh>No.of Occurrences</ReportsTh>
          </ReportsTableRow>
        </thead>
        <tbody>
          {data.map((occurrence) => (
            <ReportsTableRow key={occurrence.id} onClick={()=>handleRowClick(occurrence.registrationNo)}>
              <ReportsTd>{occurrence.registrationNo}</ReportsTd>
              <ReportsTd>{occurrence.mobileNo}</ReportsTd>
              <ReportsTd>{occurrence.occurances}</ReportsTd>
            </ReportsTableRow>
          ))}
        </tbody>
      </ReportsTable>
      <ToastContainer />

    </ReportsContainer>
  );
};

export default DealerReports;
