import React, { useRef } from "react";
import "./style.css";
import { validateInput } from "../utils/validateInput";
import useAddUser from "../hooks/useAddUser";

const AddModal = ({ toggleModal }) => {
  const userNameRef = useRef(null);
  const userAddressRef = useRef(null);
  const userGenderRef = useRef(null);
  const userDateRef = useRef(null);

  const { addUser, loading, error } = useAddUser();

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = formatDate(userDateRef.current.value);

    const validationMessage = validateInput(
      userNameRef.current.value,
      userAddressRef.current.value,
      userGenderRef.current.value,
      formattedDate
    );

    if (validationMessage) {
      alert(validationMessage);
    } else {
      const userData = {
        nama: userNameRef.current.value,
        alamat: userAddressRef.current.value,
        jenis_kelamin: userGenderRef.current.value,
        tanggal_lahir: formattedDate,
      };

      const success = await addUser(userData);
      if (success) {
        alert("User added successfully");
        toggleModal();
        window.location.reload();
      } else {
        alert(`Failed to add user: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit}>
        <div className="form-content">
          <h1>Tambah User</h1>
          <label>Nama</label>
          <input ref={userNameRef} />

          <label>Alamat</label>
          <input ref={userAddressRef} />

          <label>Jenis Kelamin</label>
          <div className="input-radio">
            <input
              type="radio"
              name="gender"
              value="Pria"
              ref={userGenderRef}
            />
            <label>Pria</label>
            <input
              type="radio"
              name="gender"
              value="Wanita"
              ref={userGenderRef}
            />
            <label>Wanita</label>
          </div>

          <label>Tanggal Lahir</label>
          <input type="date" ref={userDateRef} />

          <div className="end-button-container">
            <button
              type="button"
              className="btn secondary"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button type="submit" className="btn primary" disabled={loading}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
