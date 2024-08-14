import React, { useRef, useEffect } from "react";
import "./style.css";
import { validateInput } from "../utils/validateInput";
import useUpdateUser from "../hooks/useUpdateUser";
import { getCurrentDate } from "../utils/getCurrentDate";

const UpdateModal = ({ toggleModal, userData }) => {
  const userNameRef = useRef(null);
  const userAddressRef = useRef(null);
  const userGenderRefPria = useRef(null);
  const userGenderRefWanita = useRef(null);
  const userDateRef = useRef(null);

  const { updateUser, loading, error } = useUpdateUser();

  useEffect(() => {
    if (userData) {
      userNameRef.current.value = userData.nama;
      userAddressRef.current.value = userData.alamat;

      const [day, month, year] = userData.tanggal_lahir.split("-");
      const formattedDate = `${year}-${month}-${day}`;
      userDateRef.current.value = formattedDate;

      if (userData.jenis_kelamin === "Pria") {
        userGenderRefPria.current.checked = true;
      } else if (userData.jenis_kelamin === "Wanita") {
        userGenderRefWanita.current.checked = true;
      }
    }
  }, [userData]);

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
      userGenderRefPria.current.checked ? "Pria" : "Wanita",
      formattedDate
    );

    if (validationMessage) {
      alert(validationMessage);
    } else {
      const updatedData = {
        nama: userNameRef.current.value,
        alamat: userAddressRef.current.value,
        jenis_kelamin: userGenderRefPria.current.checked ? "Pria" : "Wanita",
        tanggal_lahir: formattedDate,
        tanggal_input: getCurrentDate(),
      };

      const success = await updateUser(userData.id, updatedData);
      if (success) {
        alert("User updated successfully");
        window.location.reload();
        toggleModal();
      } else {
        alert(`Failed to update user: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit}>
        <div className="form-content">
          <h1>Update User</h1>
          <label>Nama</label>
          <input ref={userNameRef} />

          <label>Alamat</label>
          <input ref={userAddressRef} />

          <label>Jenis Kelamin</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="Pria"
              ref={userGenderRefPria} // Attach ref for Pria
            />
            <label>Pria</label>
            <input
              type="radio"
              name="gender"
              value="Wanita"
              ref={userGenderRefWanita} // Attach ref for Wanita
            />
            <label>Wanita</label>
          </div>

          <label>Tanggal Lahir</label>
          <input type="date" ref={userDateRef} />

          <div className="end-button-container">
            <button type="button" onClick={toggleModal}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;
