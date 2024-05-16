import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import AddUserCard from "./components/AddUserCard";

function App() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  };

  //add User function
  const addUser = async (name, email, company) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        company: {
          name: company,
        },
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          console.error("Failed to add user:", response.statusText);
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUser((users) => [...users, data]);
      })
      .catch((err) => {
        console.log("Error adding user:", err);
      });
  };

  // delete user
  const deleteUser = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          console.error("Failed to delete user:", response.statusText);
          return;
        } else {
          setUser(users.filter((user) => user.id !== id));
        }
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
  };

  // Edit User function
  const editUser = async (id, updatedUserData) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedUserData),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      if (response.status !== 200) {
        console.error("Failed to edit user:", response.statusText);
        return;
      }

      const updatedUser = await response.json();
      setUser(users.map((user) => (user.id === id ? updatedUser : user)));
    } catch (err) {
      console.error("Error editing user:", err);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>User Management Dashboard</h1>
      </div>

      <div>
        <AddUserCard addUser={addUser} />
      </div>
      <br />
      <div className="d-flex flex-wrap gap-5 p-3 justify-content-center">
        {users.map((user) => (
          <>
            <Card
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              company={user.company.name}
              deleteUser={deleteUser}
              editUser={editUser}
            />
            <br />
          </>
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="1" tabindex="-1">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="2">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="3">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="4">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="5">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
