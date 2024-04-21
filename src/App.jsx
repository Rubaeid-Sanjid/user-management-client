import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    const users = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const newUsers = [...user, data]
        setUser(newUsers);
        e.target.reset();
      });
  };

  

  return (
    <>
      <h1>User mangement client</h1>
      <form onSubmit={handleUser}>
        <input type="text" name="name" placeholder="name" />
        <br />
        <input type="email" name="email" placeholder="email" />
        <br />
        <input type="submit" value={"Add user"} />
      </form>
      <h2>{user.length}</h2>

      {
        user.map(userData => <h3 key={userData.id}>{userData.id} : {userData.name} : {userData.email}</h3>)
      }
    </>
  );
}

export default App;
