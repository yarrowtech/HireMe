import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Footer from "./components/Footer";
import BecomePartner from "./components/BecomePartner";
import PartnerRequests from "./components/PartnerRequests";
import AllEmployees from "./components/AllEmployees";
import AddEmployee from "./components/AddEmployee";
import Employee from "./components/Employee";
import AccountManagement from "./components/AccountManagement";
import Partners from "./components/Partners";
import RequestDetails from "./components/RequestDetails";
import RequestContextLayout from "./context/RequestsContext";
import PartnerContextLayout from "./context/PartnerContext";
import AdminLogin from "./components/AdminLogin";
import { ToastContainer, Bounce } from "react-toastify";

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
            <Route path="/partners" element={<Partners />} />
          </Route>
          <Route path="/employees" element={<AllEmployees />} />
          <Route path="/employees/employee/:id" element={<Employee />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/manage-account" element={<AccountManagement />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default App;
