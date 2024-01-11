import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";

function HomePage() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getHello() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/get-user");

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();

        console.log("DATA: ", data);

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    getHello();
  }, []);

  return (
    <div>
      <Slider />
      <h1>{user.username}</h1>
    </div>
  );
}

export default HomePage;
