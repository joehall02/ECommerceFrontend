import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import "./AdminUsers.css";
import { getAllUsers, deleteGuestUsers } from "../../../api/user";
import Pagination from "../../Pagination/Pagination";
import Error from "../../Error/Error";
import DialogBox from "../../DialogBox/DialogBox";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteGuests, setDeleteGuests] = useState(false);

  // Handle deleting guest users
  const handleDeleteGuests = () => {
    setDeleteGuests(true);
  };

  // Confirm deleting guest users
  const confirmDelete = async () => {
    if (deleteGuests) {
      setButtonDisabled(true);

      const response = await deleteGuestUsers();

      if (response.success) {
        setDeleteError("");
        fetchUsers();
        setButtonDisabled(false);
      } else {
        setDeleteError(response.message);
        setButtonDisabled(false);
      }

      setDeleteGuests(false); // Reset the delete guests state
    }
  };

  // Cancel deleting guest users
  const cancelDelete = () => {
    setDeleteGuests(false);
  };

  // Use useCallback to memoize the function and prevent unnecessary re-renders
  const fetchUsers = useCallback(async () => {
    setLoading(true);

    const response = await getAllUsers(currentPage);

    if (response.success) {
      setError("");
      setUsers(response.response.users);
      setTotalPages(response.response.total_pages);
      setCurrentPage(response.response.current_page);
      setTotalUsers(response.response.total_users);
    } else {
      setError(response.message);
    }

    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="admin-users" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container flex-grow-1 d-flex flex-column my-5 py-5 min-vh-100">
        <div className="d-flex justify-content-between mt-3">
          <h2 className="fw-bold">Users</h2>

          <button className="btn btn-dark px-4 rounded-0 fw-bold my-auto" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => handleDeleteGuests()} disabled={buttonDisabled}>
            Delete Guest Users
          </button>
        </div>

        {users.length > 0 && <small>{totalUsers} Users Total</small>}

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : error ? (
          <Error message={error} setError={setError} />
        ) : users.length > 0 ? (
          // Users table
          <div className="d-flex mt-5">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="w-5">
                    #
                  </th>
                  <th scope="col" className="w-15">
                    Name
                  </th>
                  <th scope="col" className="w-15">
                    Email
                  </th>
                  <th scope="col" className="w-15">
                    Role
                  </th>
                  <th scope="col" className="w-35 text-end actions-header">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <th scope="row" className="w-5">
                      {user.id}
                    </th>
                    <td className="w-15">{user.full_name}</td>
                    <td className="w-15">{user.email}</td>
                    <td className="w-15">{user.role}</td>
                    <td className="w-35 text-end">
                      <Link to={`/admin/users/user-details/${user.id}`} className="btn btn-dark rounded-0 btn-sm me-2">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users found</p>
        )}

        {/* Pagination */}
        {users.length > 0 && (
          <div className="mt-auto">
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        )}

        {/* Delete error message */}
        {deleteError && <Error message={deleteError} setError={setDeleteError} />}

        {/* Dialog box */}
        <DialogBox title="Confirm Deletion" message="Are you sure you want to delete all guest users older than 7 days old?" onCancel={cancelDelete} onConfirm={confirmDelete} />
      </div>
    </section>
  );
};

export default AdminUsers;
