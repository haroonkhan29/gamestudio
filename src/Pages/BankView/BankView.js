import React, { useEffect, useState } from "react";
import {CircularProgress} from "@mui/material";
import { useBankContext } from "../../BankContext";
import "./bankView.css";
import unitedBankLogo from "./images/ubl.png";
import albLogo from "./images/alb.png";
import baLogo from "./images/alf.png";
import askLogo from "./images/ask.png";
import albbLogo from "./images/Albb.png";
import bobLogo from "./images/Bop.png";
import balLogo from "./images/bil.png";
import HbLLogo from "./images/Hbl (2).png";
import BkLogo from "./images/Bok.png";
import DbLogo from "./images/db (2).png";
import FbLogo from "./images/Fb.png";
import HbLogo from "./images/Hb.jpg";
import jsLogo from "./images/js.png";
import McbLogo from "./images/mcb.png";
import MeezanLogo from "./images/meezan.jpeg";
import NbLogo from "./images/Nb.png";
import stdLogo from "./images/std.png";
import sobLogo from "./images/sob.png";
const BankView = () => {
  const { bankDetails, setBankDetails } = useBankContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const recordsPerPage = 9;

  const bankImages = {
    'United Bank Limited': unitedBankLogo,
    'Allied Bank Limited': albLogo,
    'Bank Alfalah': baLogo,
    'Askari Bank': askLogo,
    'Al Baraka Bank': albbLogo,
    'Bank of Punjab': bobLogo,
    'Bank Alfalah Limited': balLogo,
    'Bank AL Habib Limited': HbLLogo,
    'Bank of Khyber': BkLogo,
    'Dubai Islamic Bank': DbLogo,
    'Faysal Bank Limited': FbLogo,
    'Habib Bank Limited':HbLogo,
    'JS Bank Limited': jsLogo,
    'MCB Bank Limited': McbLogo,
    'Meezan Bank Limited': MeezanLogo,
    'National Bank of Pakistan': NbLogo,
    'Standard Chartered Bank': stdLogo,
    'Soneri Bank': sobLogo,
  };
  useEffect(() => {
    const fetchBankDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/bank");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBankDetails(data);
      } catch (error) {
        setError("No Internet!");
        } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, [currentPage, setBankDetails]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = bankDetails.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(bankDetails.length / recordsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleEditRecord = (index) => {
    console.log(`Edit record at index ${index}`);
  };

  const handleDeleteRecord = async (index) => {
    const recordToDelete = bankDetails[indexOfFirstRecord + index];

    try {
      const response = await fetch(`http://localhost:8080/bank/${recordToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedBankDetails = bankDetails.filter((_, i) => i !== indexOfFirstRecord + index);
      setBankDetails(updatedBankDetails);
    } catch (error) {
      console.error('Error deleting bank record:', error.message);
    }
  };


  return (
    <div>
      <div className="header">
        <h1>Bank View</h1>
      </div>
      {loading && <CircularProgress />}
      {error && <p style={{fontWeight: "bold",color: "red" }}>{error}</p>}
      {!loading && !error && (
      <div className="bank-view-container">
        <div className="bank-view-content">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Bank</th>
                <th>Account Number</th>
                <th>Account Title</th>
                <th>Bank Address</th>
                <th>Card</th>
                <th>Expiry Date</th>
                <th>CVV</th>
                <th>Google Account</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((detail, index) => (
                <tr key={index}>
                   <td>
                    {bankImages[detail.bank] && (
                      <img
                        src={bankImages[detail.bank]}
                        alt={`${detail.bank} Logo`}
                        className="bank-logo1"
                      />
                    )}
                    {detail.bank}
                  </td>
                  <td>{detail.accountNumber}</td>
                  <td>{detail.accountTitle}</td>
                  <td>{detail.bankAddress}</td>
                  <td>{detail.card}</td>
                  <td>{detail.expiryDate}</td>
                  <td>{detail.cvv}</td>
                  <td>{detail.google}</td>
                  <td className="button-container">
                  <button onClick={() => handleDeleteRecord(index)}>
                 <i className="fas fa-trash-alt" style={{ color: 'white' }}></i> Delete
                 </button>
                 </td>

                </tr>
              ))}
            </tbody>
          </table>

  <div className="pagination">
  <button onClick={handlePreviousPage} disabled={currentPage === 1}>
    <i className="fas fa-chevron-left"></i>
  </button>
  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
    (pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => setCurrentPage(pageNumber)}
        style={{
          color: currentPage === pageNumber ? 'white' : '',
          backgroundColor:
            currentPage === pageNumber ? '#3498db' : 'transparent',
        }}
      >
        {pageNumber}
      </button>
    )
  )}
  <button onClick={handleNextPage} disabled={currentPage === totalPages}>
    <i className="fas fa-chevron-right"></i>
  </button>
</div>
</div>
</div>

   )}
    </div>
                      
  );
};

export default BankView;
