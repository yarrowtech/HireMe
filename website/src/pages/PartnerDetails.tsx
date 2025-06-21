import { useState, useEffect, useContext } from 'react';
import { SideBar, CheckPartnerDetails, SubscriptionPlanContainer, PaymentPanel, ManagerCreationPanel, EmployeesPanel } from '../components/AccountDetails';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function PartnerDetails() {
    const [panelType, setPanelType] = useState<"account" | "plan" | "payment" | "manager" | "employees">("account")
    const { userState } = useContext(UserContext)!
    const navigate = useNavigate()
    const isAdminWithCompany = false
    useEffect(() => {
        if (userState.position === "guest" || userState.position === "employee")
            navigate("/")
    }, [])
    return (
        <section className="flex flex-col md:grid md:grid-cols-[18rem_auto] min-h-screen mt-[12vh] bg-gradient-to-br from-blue-50 to-blue-100">
            <SideBar panelType={panelType} setPanelType={setPanelType} isAdminWithCompany={isAdminWithCompany} showManagerPanel={isAdminWithCompany} showEmployeesPanel={isAdminWithCompany} />
            <main className="flex flex-col items-center w-full p-4">
                {panelType === "account" && <CheckPartnerDetails />}
                {panelType === "plan" && <SubscriptionPlanContainer />}
                {panelType === "payment" && isAdminWithCompany && <PaymentPanel />}
                {panelType === "manager" && isAdminWithCompany && <ManagerCreationPanel />}
                {panelType === "employees" && isAdminWithCompany && <EmployeesPanel />}
            </main>
        </section>
    )
}