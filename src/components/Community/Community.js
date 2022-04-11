import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useToken } from "../../hooks/useToken";

const Community = () => {
  const token = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/sign-in", { replace: true });
  }, [navigate, token]);

  return <div></div>;
};

export default Community;
