import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useReadUser from "../features/authentication/useReadUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  min-block-size: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load the authenticated user
  const { data: user, status, error } = useReadUser();
  const isAuthenticated = user?.role === "authenticated";

  // 2. if no authenticated user, redirect to login page
  useEffect(() => {
    if (status !== "pending" && !isAuthenticated) navigate("/login");
  }, [status, isAuthenticated, navigate]);

  // 3. while loading, show a spinner
  switch (status) {
    case "pending":
      return (
        <FullPage>
          <Spinner />
        </FullPage>
      );
    case "error":
      return <p>Error: {error.message}</p>;
  }

  // 4. if have authenticated user, render app
  return children;
}
