import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAdmobContext } from "../../Admocontext";
import AdMobEditForm from "./AdMobEditForm";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NextImage from '../Images/NextImage/next.png'; 
import PrvImage from '../Images/PrvImage/prv.png'; 

import "./Admob.css";

const Admobview = () => {
  const { admobData, setAdmobData, deleteAdmobData } = useAdmobContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    fetchData(selectedDate);
  };

  const handleView = (data) => {
    if (!data || !data.profilePic) {
      return;
    }

    setShowTable(false);
    setFullScreen(true);
    const images = admobData.map((item) => ({
      id: item._id,
      imageSrc: `http://35.184.241.89:3000/uploads/${item.profilePic}`,
      date: item.date,
      accountName: item.accountName,
    }));

    setCarouselImages(images);
    const selectedIndex = admobData.findIndex((item) => item._id === data._id);
    setSelectedIndex(selectedIndex);
    setSelectedData({});
  };

  const handleDelete = async (index, id) => {
    try {
      await axios.delete(`http://35.184.241.89:3000/admob/${id}`);
      deleteAdmobData(index);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowEditForm(true);
    setShowTable(false);
  };

  const handleEditClose = () => {
    setEditingIndex(null);
    setShowEditForm(false);
    setShowTable(true);
  };

  const handleUpdate = (updatedData) => {
    const updatedAdmobData = [...admobData];
    updatedAdmobData[editingIndex] = updatedData;
    setAdmobData(updatedAdmobData);
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowTable(false);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setShowTable(true);
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-PK",
      options
    );
    return formattedDate;
  };

  const fetchData = async (formattedDate) => {
    try {
      const apiUrl = "http://35.184.241.89:3000/admob";
      const response = await axios.get(apiUrl);

      let filteredData = response.data;

      if (formattedDate) {
        filteredData = filteredData.filter(
          (data) => new Date(data.date).toLocaleDateString("en-PK") === formattedDate
        );
      }

      const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAdmobData(sortedData);
    } catch (error) {
      console.error(error);
      setError("No Internet!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchData(selectedDate ? new Date(selectedDate).toLocaleDateString("en-PK") : null);
  }, [setAdmobData, selectedDate]);

  return (
    <div>
      <div className="header">
        <h1>Admob View</h1>
      </div>
      {loading && <CircularProgress />}
      {error && <p style={{ fontWeight: "bold", color: "red" }}>{error}</p>}
      {!loading && !error && (
        <div>
          {selectedData && (
            <div className="selected">
              <br />
              <span className="line"></span>
              <span className="account-name-span">{selectedData.accountName}</span>
              {selectedData.profilePic && (
                <img
                  src={`http://35.184.241.89:3000/uploads/${selectedData.profilePic}`}
                  alt="Selected"
                  style={{ width: "100%", height: "auto", marginTop: "10px" }}
                  onClick={() => {
                    setSelectedData(null);
                    setShowTable(true);
                  }}
                />
              )}
            </div>
          )}
          {showEditForm && (
            <AdMobEditForm
              selectedAdMob={admobData[editingIndex]}
              onClose={handleEditClose}
              onUpdate={handleUpdate}
            />
          )}

          {showTable && (
            <div className="bank-view-container">
              <div className="bank-view-content">
                <label htmlFor="date" className="custom-label"></label>
                <div className="date-filter">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="custom-date-input"
                  />
                </div>
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Account Name</th>
                      <th>AdMob</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admobData.map((data, index) => (
                      <tr key={index}>
                        <td>{formatDate(data.date)}</td>
                        <td>{data.accountName}</td>
                        <td>
                          {data.profilePic && (
                            <img
                              src={`http://35.184.241.89:3000/uploads/${data.profilePic}`}
                              alt="Profile"
                              style={{
                                width: "50px",
                                height: "50px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                openImageModal(
                                  `http://35.184.241.89:3000/uploads/${data.profilePic}`
                                )
                              }
                            />
                          )}
                        </td>
                        <td className="button-container">
                          <button onClick={() => handleEdit(index)}>
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button onClick={() => handleDelete(index, data._id)}>
                            <i className="fas fa-trash"></i> Delete
                          </button>
                          <button onClick={() => handleView(data)}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {carouselImages.length > 0 && (
            <div className={`image-modal-container ${fullScreen ? "full-screen" : ""}`}>
              <div className="modal-content">
                <div className="close-icon" onClick={closeImageModal}>
                  &times;
                </div>
                <Carousel
                  showArrows={true}
                  showThumbs={false}
                  selectedItem={selectedIndex}
                  onChange={(index) => setSelectedIndex(index)}
                  renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                      <button
                        type="button"
                        onClick={onClickHandler}
                        title={label}
                        className="custom-arrow prev-arrow"
                      >
                        <img src={PrvImage} 
                        alt="Previous" 
                        style={{ width: "50px", height: "50px" }}
                        />
                      </button>
                    )
                  }
                  renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                      <button
                        type="button"
                        onClick={onClickHandler}
                        title={label}
                        className="custom-arrow next-arrow"
                      >
                        <img
                          src={NextImage}
                          alt="Next"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </button>
                    )
                  }
                >
                  {carouselImages.map((image) => (
                    <div key={image.id} className="carousel-item">
                      <div className="carousel-top-info">
                        <div className="selected-data">
                          <span className="line"></span>
                          <span className="date-span">{image.date}</span>
                          <br />
                          <span className="account-name-span">{image.accountName}</span>
                        </div>
                      </div>
                      <img
                        src={image.imageSrc}
                        alt="Full Size"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admobview;
