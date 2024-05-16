import React, { useState } from "react";

const Card = ({ id, email, name, company, deleteUser, editUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newCompanyName, setNewCompanyName] = useState(company);

  const handleDelete = () => {
    deleteUser(id);
  };
  const handleEdit = () => {
    const updatedUserData = {
      name: newName,
      email: newEmail,
      company: {
        name: newCompanyName,
      },
    };
    editUser(id, updatedUserData);
    setIsEditing(false); //  to hide the input fields
  };
  return (
    <div>
      <div class="card shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "20rem" }}>
        <div class="card-body">
          <h5 class="card-title">
            {id}. {name}
          </h5>
          {isEditing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <input
                type="text"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
              />
            </>
          ) : (
            <>
              <p class="card-text">{email}</p>
              <p class="card-text">{company}</p>
            </>
          )}
          {isEditing ? (
             <div className="d-flex justify-content-center gap-3 p-2">
              <button class="btn btn btn-info" onClick={handleEdit}>
                Save
              </button>
              <button
                class="btn btn btn-info"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center gap-3">
              <button
                class="btn btn-info"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button class="btn btn btn-info" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
