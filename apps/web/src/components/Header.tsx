'use client'
import { useState } from "react";
import Cart from "./cart/Cart";

export const Header = () => {
  const [user, setUser] = useState(true)
  return (
    <div>
      <h1>Header</h1>


      
      {user ? (
        <Cart />
      ) : (
        null
      )}
    </div>
  );
};
