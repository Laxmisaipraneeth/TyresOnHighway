import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
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
  const data = state.data
  console.log(data)


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
            <ReportsTableRow key={occurrence.id}>
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
