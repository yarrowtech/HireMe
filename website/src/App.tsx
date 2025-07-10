import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Footer from "./components/Footer";
import BecomePartner from "./pages/BecomePartner";
import PartnerRequests from "./pages/PartnerRequests";
import Employee from "./pages/Employee";
import ProfileDashboard from "./pages/ProfileDashboard";
import AllPartners from "./pages/AllPartners";
import RequestDetails from "./pages/RequestDetails";
import RequestContextLayout from "./context/RequestsContext";
import PartnerContextLayout from "./context/PartnerContext";
import AdminLogin from "./pages/AdminLogin";
import { ToastContainer, Bounce } from "react-toastify";
import PartnerDetails from "./pages/PartnerDetails";

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/be-a-partner" element={<BecomePartner />} />
          <Route element={<RequestContextLayout />}>
            <Route path="/partner-requests" element={<PartnerRequests />} />
            <Route path="/partner-requests/:id" element={<RequestDetails />} />
          </Route>
          <Route element={<PartnerContextLayout />}>
            <Route path="/partners" element={<AllPartners />} />
            <Route path="/partner/details/:id" element={<PartnerDetails />} />
            <Route path="/manage-account" element={<ProfileDashboard />} />
          </Route>
          <Route path="/employees/employee/:id" element={<Employee />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default App;
