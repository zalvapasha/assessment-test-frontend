import React from "react";
import "./style.css";

const ViewModal = ({ toggleModal, user }) => {
  if (!user) return null;

  return (
    <div className="container">
      <div className="form-box">
        <div className="form-content">
          <h1>View User</h1>
          <p>
            <strong>Nama:</strong> {user.nama}
          </p>
          <p>
            <strong>Alamat:</strong> {user.alamat}
          </p>
          <p>
            <strong>Jenis Kelamin:</strong> {user.jenis_kelamin}
          </p>
          <p>
            <strong>Tanggal Lahir:</strong> {user.tanggal_lahir}
          </p>
          <p>
            <strong>Tanggal Input:</strong> {user.tanggal_input}
          </p>
          <button onClick={toggleModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
