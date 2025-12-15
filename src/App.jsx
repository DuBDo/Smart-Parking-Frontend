import { Navigate, Route, Routes, useLocation } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RentSpace from "./pages/RentSpace";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import AuthSuccess from "./pages/AuthSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import DriverProfile from "./pages/DriverProfile";
import Delete from "./pages/Delete";
import DriverDashboard from "./pages/DriverDashboard";
import Listing from "./pages/Listing";
import Bookings from "./components/driver/Bookings";
import OwnerBookingReceived from "./components/owner/OwnerBookingReceived";
import OwnerBookings from "./components/owner/booking/OwnerBookings";
import SearchPage from "./pages/SearchPage";
import ProceedBooking from "./pages/ProceedBooking";
import ShowParkingLot from "./pages/ShowParkingLot";

function App() {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const hideForSearchPage =
    currentPath.startsWith("/search") ||
    currentPath.startsWith("/lot") ||
    currentPath.startsWith("/proceed-booking");

  return (
    <>
      {!hideForSearchPage && <NavBar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/auth/delete"
          element={
            <ProtectedRoute>
              <Delete />
            </ProtectedRoute>
          }
        />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lot/:id"
          element={
            <ProtectedRoute>
              <ShowParkingLot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/proceed-booking/:id"
          element={
            <ProtectedRoute>
              <ProceedBooking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <DriverProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/bookings-made" element={<Bookings />} />
        <Route
          path="/dashboard/bookings-received"
          element={<OwnerBookings />}
        />

        <Route
          path="/dashboard/listing-onboarding/:name/:post"
          element={
            <ProtectedRoute>
              <Listing />
            </ProtectedRoute>
          }
        />

        <Route path="/dashboard/rent-space" element={<RentSpace />} />
      </Routes>
      {!hideForSearchPage && <Footer />}
    </>
  );
}

export default App;
