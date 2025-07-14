import Search from "../assets/search.svg"
import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { UserContext } from "../context/UserContext"
import { Link, useNavigate } from "react-router-dom"
import RightArrow from "../assets/right-arrow.svg"
import { PartnersContext } from "../context/PartnerContext"

type Company = {
    id: number
    CompanyName: string
}

export default function AllPartners() {

    const { allPartners, fetchPartnerList } = useContext(PartnersContext)!
    const [companies, setCompanies] = useState<Company[]>([])


    const search = (e: ChangeEvent) => {
        const param = (e.target as HTMLInputElement).value.toLowerCase()
        if (!allPartners) return
        const filteredCompanies = allPartners.filter(company => {
            return company.CompanyName.toLowerCase().includes(param)
        })
        setCompanies(filteredCompanies)
    }

    const {userState} = useContext(UserContext)!

    const navigate = useNavigate()

    useEffect(() => {
        if (!(userState.Company === null && userState.position === "superadmin"))
            navigate("/")
        fetchPartnerList()
    }, [])

    useEffect(() => {
        setCompanies(allPartners || [])
    }, [allPartners])

    return (
        <section className="w-full max-w-6xl min-h-[55vh] my-[15vh] mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center justify-between w-full mb-10">
                <h2 className="font-extrabold text-blue-900 text-4xl">All Partners</h2>
                <div className="w-[20%] relative">
                    <input type="text" className="border-2 border-blue-200 w-full h-[5vh] pl-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Search....." onChange={search} />
                    <img src={Search} className="w-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-around gap-6">
                {
                    companies?.length === 0 ? "No partners available": companies.map((company, index) => {
                        return <CompanyCard key={index} companyData={company}></CompanyCard>
                    })
                }
            </div>
        </section>
    )
}


function CompanyCard({ companyData }: { companyData: Company }) {
    return (
        <Link to={`/partner/details/${companyData.id}`} className="w-[48%] rounded-2xl p-6 bg-white/90 border border-blue-100 shadow-xl flex items-center gap-4 cursor-pointer transition-all duration-300 ease-linear hover:scale-105 hover:shadow-2xl">
            <h2 className="font-bold text-xl text-blue-900">{companyData.CompanyName}</h2>
            <img src={RightArrow} className="ml-auto" />
        </Link>
    )
}