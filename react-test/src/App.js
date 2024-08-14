import React, { useState } from "react";
import "./App.css";
import AddModal from "./add-edit-modal/AddModal";
import UpdateModal from "./add-edit-modal/UpdateModal";
import ViewModal from "./add-edit-modal/ViewModal";
import useGetUser from "./hooks/useGetUser";
import useDeleteUser from "./hooks/useDeleteUser";

import { MdOutlinePageview } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { users, loading, error } = useGetUser();
  const {
    deleteUser,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteUser();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleUpdateModal = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(!showUpdateModal);
  };

  const toggleViewModal = (user) => {
    setSelectedUser(user);
    setShowViewModal(!showViewModal);
  };

  const handleDelete = async (id) => {
    const success = await deleteUser(id);
    if (success) {
      alert("User deleted successfully");
      window.location.reload();
    } else {
      alert(`Failed to delete user: ${deleteError.message}`);
    }
  };

  const isLoading = loading || deleteLoading;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <main>
        {isLoading && (
          <div className="loading-spinner">
            <AiOutlineLoading3Quarters className="icon-loading" size={40} />
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Jenis Kelamin</th>
              <th>Tanggal Lahir</th>
              <th>Tanggal Input</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.nama}</td>
                <td>{user.alamat}</td>
                <td>{user.jenis_kelamin}</td>
                <td>{user.tanggal_lahir}</td>
                <td>{user.tanggal_input}</td>
                <td className="allbtn-aksi">
                  <MdDeleteOutline
                    className="btn btn-delete"
                    onClick={() => handleDelete(user.id)}
                    disabled={deleteLoading}
                    size={30}
                  />

                  <TiEdit
                    className="btn btn-edit"
                    onClick={() => toggleUpdateModal(user)}
                    size={30}
                  />

                  <MdOutlinePageview
                    className="btn btn-view"
                    onClick={() => toggleViewModal(user)}
                    size={30}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn-add" onClick={toggleModal}>
          Tambah User
        </button>
      </main>

      {showModal && <AddModal toggleModal={toggleModal} />}
      {showUpdateModal && (
        <UpdateModal toggleModal={toggleUpdateModal} userData={selectedUser} />
      )}
      {showViewModal && (
        <ViewModal toggleModal={toggleViewModal} user={selectedUser} />
      )}
    </div>
  );
}

export default App;
