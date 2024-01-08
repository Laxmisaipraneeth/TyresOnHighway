import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Head, InputLabel } from '../commonstyles';
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

const convertToIST = (utcDateString) => {
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Date(utcDateString).toLocaleString('en-IN', options);
};

const Reports = () => {
  const { state } = useLocation();
  const data = state.data;
  const user = state.user;

  return (
    <>
      <Head>Your reports</Head>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <InputLabel style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#000000',
          margin: '10px 0',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          Registration No: {user}
        </InputLabel>
      </div>

      <ReportsContainer>
        <ReportsTable>
          <thead>
            <ReportsTableRow>
              <ReportsTh>Date</ReportsTh>
              <ReportsTh>Confidence</ReportsTh>
              <ReportsTh>Prediction</ReportsTh>
              <ReportsTh>Exit</ReportsTh>
            </ReportsTableRow>
          </thead>
          <tbody>
            {data &&
              data.map((occurrence, index) => (
                <ReportsTableRow key={index}>
                  <ReportsTd>{convertToIST(occurrence.toc)}</ReportsTd>
                  <ReportsTd>{occurrence.confidence}</ReportsTd>
                  <ReportsTd>{occurrence.prediction}</ReportsTd>
                  <ReportsTd>{occurrence.exit}</ReportsTd>
                </ReportsTableRow>
              ))}
          </tbody>
        </ReportsTable>
      </ReportsContainer>
    </>
  );
};

export default Reports;
