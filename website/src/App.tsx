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
import Subscription from "./components/Subscription";
import Partners from "./components/Partners";
import RequestDetails from "./components/RequestDetails";
import RequestsLayout from "./context/RequestsContext";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/be-a-partner" element={<BecomePartner />} />
          <Route element={<RequestsLayout />}>
            <Route path="/partner-requests" element={<PartnerRequests />} />
            <Route path="/partner-requests/:id" element={<RequestDetails />} />
          </Route>
          <Route path="/partners" element={<Partners />} />
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
