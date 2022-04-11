import { useState } from "react";
export function useToken() {
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
  return user;
}
