import Search from "../assets/search.svg"
import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { UserContext } from "../context/UserContext"
import { Link, useNavigate } from "react-router-dom"
import RightArrow from "../assets/right-arrow.svg"

type Company = {
    companyName: string
    mobileNo: string
    emailId: string
    address: string
}

export default function Companies() {

    const allCompanyRequests: Company[] = [
        {
            companyName: "XYZ company",
            mobileNo: "+91 1234567890",
            emailId: "abcafdafafd@gmail.com",
            address: "kolkata, india, 700144"
        },
        {
            companyName: "ABC company",
            mobileNo: "+91 1234567890",
            emailId: "abcafdafafd@gmail.com",
            address: "kolkata, india, 700144"
        },
        {
            companyName: "ABD company",
            mobileNo: "+91 1234567890",
            emailId: "abcafdafafd@gmail.com",
            address: "kolkata, india, 700144"
        },
        {
            companyName: "YZX company",
            mobileNo: "+91 1234567890",
            emailId: "abcafdafafd@gmail.com",
            address: "kolkata, india, 700144"
        }
    ]

    const [companies, setCompanies] = useState<Company[]>(allCompanyRequests)

    const search = (e: ChangeEvent) => {
        const param = (e.target as HTMLInputElement).value.toLowerCase()
        const filteredCompanies = allCompanyRequests.filter(company => {
            return company.companyName.toLowerCase().includes(param)
        })
        setCompanies(filteredCompanies)
    }

    const {userState} = useContext(UserContext)!

    const navigate = useNavigate()

    useEffect(() => {
        console.log(userState.Company, userState.position)
        if (!(userState.Company === null && userState.position === "admin" ))
            navigate("/")
    }, [])

    return (
        <section className="w-[85vw] my-[15vh] mx-auto flex flex-col items-center gap-5">
            <div className="flex items-center justify-between w-full mb-10">
                <h2 className="font-bold text-4xl">All Company Requests</h2>
                <div className="w-[20%] relative">
                    <input type="text" className="border-2 border-[#4d5464] w-full h-[5vh] pl-2 rounded-lg" placeholder="Search....." onChange={search} />
                    <img src={Search} className="w-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-white" />
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-around gap-5">

                {
                    companies.map((company, index) => {
                        return <CompanyCard key={index} companyData={company}></CompanyCard>
                    })
                }
            </div>
        </section>
    )
}


function CompanyCard({ companyData }: { companyData: Company }) {
    return (
        <Link to="/employees" className="w-[48%] rounded-xl p-5 bg-[#bddaffde] shadow-lg shadow-[#000000ba] flex items-center gap-2 cursor-pointer transition-all duration-300 ease-linear hover:scale-105">
            <h2 className="font-bold text-xl">{companyData.companyName}</h2>
            <img src={RightArrow} className="ml-auto" />
        </Link>
    )
}