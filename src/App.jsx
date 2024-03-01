import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";

import Users from "./pages/Users";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

import Cookies from "js-cookie";
import { useEffect } from "react";
import AllTeamsCabin from "./pages/AllTeamsCabin";
import AllPlayersCabin from "./pages/AllPlayersCabin";
import BoughtPlayerCabin from "./pages/BoughtPlayerCabin";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});
function generateUniqueId() {
  // Example: Generate a random string
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
function App() {
  useEffect(() => {
    // Check if the user has a cookie
    let userId = Cookies.get("userId");

    // If the user doesn't have a cookie, generate a unique identifier
    if (!userId) {
      userId = generateUniqueId(); // You need to implement this function
      Cookies.set("userId", userId, { expires: 365 }); // Set the cookie to expire in 365 days
    }
    console.log("User ID:", userId);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="teams" element={<AllTeamsCabin />} />
              <Route path="players" element={<AllPlayersCabin />} />
              <Route
                path="boughtPlayersByUser1"
                element={<BoughtPlayerCabin userNo="1" />}
              />
              <Route
                path="boughtPlayersByUser2"
                element={<BoughtPlayerCabin userNo="2" />}
              />
              <Route
                path="boughtPlayersByUser3"
                element={<BoughtPlayerCabin userNo="3" />}
              />
              <Route
                path="boughtPlayersByUser4"
                element={<BoughtPlayerCabin userNo="4" />}
              />
              <Route
                path="boughtPlayersByUser5"
                element={<BoughtPlayerCabin userNo="5" />}
              />
              <Route
                path="boughtPlayersByUser6"
                element={<BoughtPlayerCabin userNo="6" />}
              />
              <Route
                path="boughtPlayersByUser7"
                element={<BoughtPlayerCabin userNo="7" />}
              />
              <Route
                path="boughtPlayersByUser8"
                element={<BoughtPlayerCabin userNo="8" />}
              />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
