import React from 'react'
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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

  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #ababa0;
  }
`;
const DetailedReports = () => {
    const {state} = useLocation();
    const data = state.userData
  
    return (
      <ReportsContainer>
        <ReportsTable>
          <thead>
            <ReportsTableRow>
              <ReportsTh>Date</ReportsTh>
              <ReportsTh>Label</ReportsTh>
              <ReportsTh>Exit</ReportsTh>
            </ReportsTableRow>
          </thead>
          <tbody>
            {data &&
              data.map((occurrence, index) => (
                <ReportsTableRow key={index}>
                  <ReportsTd>{occurrence.toc}</ReportsTd>
                  <ReportsTd>{occurrence.confidence}</ReportsTd>
                  <ReportsTd>{occurrence.prediction}</ReportsTd>
                </ReportsTableRow>
              ))}
          </tbody>
        </ReportsTable>
      </ReportsContainer>
    );
}

export default DetailedReports