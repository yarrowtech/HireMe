import { useState, type ChangeEvent, useEffect, useContext } from "react"
import Search from "../assets/search.svg"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import RightArrow from "../assets/right-arrow.svg"
import { Link } from "react-router-dom"


export type Employee = {
    id: string
    fullname: string
    dob: string
    mobileNo: string
    emailId: string
    pic: string | undefined
}

const allEmployees: Employee[] = [
    {
        id: "ae41hcahfq24awfh",
        fullname: "Atanu Ghosh",
        dob: "01/01/2001",
        mobileNo: "1234567890",
        emailId: "example@gmail.com",
        pic: undefined
    },
    {
        id: "ae41hcahfq24awfh",
        fullname: "Amit Saha",
        dob: "01/01/2001",
        mobileNo: "1234567890",
        emailId: "example@gmail.com",
        pic: undefined
    },
    {
        id: "ae41hcahfq24awfh",
        fullname: "Tarun Saha",
        dob: "01/01/2001",
        mobileNo: "1234567890",
        emailId: "example@gmail.com",
        pic: undefined
    },
    {
        id: "ae41hcahfq24awfh",
        fullname: "Shruti Ghosh",
        dob: "01/01/2001",
        mobileNo: "1234567890",
        emailId: "example@gmail.com",
        pic: undefined
    }
]



export default function AllEmployees() {
    const [employees, setEmployees] = useState<Employee[]>(allEmployees)
    const search = (e: ChangeEvent) => {
        const param = (e.target as HTMLInputElement).value.toLowerCase()
        const filteredEmployees = allEmployees.filter(employee => {
            return employee.fullname.toLowerCase().includes(param)
        })
        setEmployees(filteredEmployees)
    }


    const { userState } = useContext(UserContext)!
    const navigate = useNavigate()

    useEffect(() => {
        if (userState.Company === null || userState.position === "admin" || userState.position === "employee")
            navigate("/")
    }, [])

    return (
        <section className="w-full max-w-6xl my-[15vh] mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center justify-between w-full mb-10">
                <h2 className="font-extrabold text-blue-900 text-4xl">All Employees</h2>
                <div className="w-[20%] relative">
                    <input type="text" className="border-2 border-blue-200 w-full h-[5vh] pl-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Search....." onChange={search} />
                    <img src={Search} className="w-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-around gap-6">
                {
                    employees.map((employee, index) => {
                        return <EmployeeCard key={index} employeeData={employee}></EmployeeCard>
                    })
                }
            </div>
        </section>
    )
}

export function EmployeeCard({ employeeData }: { employeeData: Employee }) {
    return (
        <Link to={`/employees/employee/${employeeData.id}`} className="w-[48%] rounded-2xl p-6 bg-white/90 border border-blue-100 shadow-xl flex items-center gap-4 cursor-pointer transition-all duration-300 ease-linear hover:scale-105 hover:shadow-2xl">
            <img src={employeeData.pic} className="w-14 aspect-square rounded-full border-2 border-blue-200 bg-blue-100" />
            <h2 className="font-bold text-xl text-blue-900">{employeeData.fullname}</h2>
            <img src={RightArrow} className="ml-auto" />
        </Link>
    )
}

