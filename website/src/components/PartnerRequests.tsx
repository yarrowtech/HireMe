import RightArrow from "../assets/right-arrow-white.svg"
import Search from "../assets/search.svg"
import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { RequestsContext } from "../context/RequestsContext"
import type { Request } from "../context/RequestsContext"


export default function PartnerRequests() {

    const { requests, fetchRequests } = useContext(RequestsContext)!
    const [partners, setPartners] = useState<Request[]>(requests)


    const search = (e: ChangeEvent) => {
        const searchParam = (e.target as HTMLInputElement).value.toLowerCase()
        const filteredPartners = requests.filter(partner => {
            return partner.CompanyName.toLowerCase().includes(searchParam)
        })
        setPartners(filteredPartners)
    }

    const { userState } = useContext(UserContext)!

    const navigate = useNavigate()

    useEffect(() => {
        setPartners(requests)
    }, [requests])

    useEffect(() => {
        if (!(userState.Company === null && userState.position === "admin"))
            navigate("/")

        fetchRequests()

    }, [])
    

    return (
        <section className="w-full max-w-6xl my-[15vh] mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center justify-between w-full mb-10">
                <h2 className="font-extrabold text-blue-900 text-4xl">All Partner Requests</h2>
                <div className="w-[20%] relative">
                    <input type="text" className="border-2 border-blue-200 w-full h-[5vh] pl-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Search....." onChange={search} />
                    <img src={Search} className="w-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-around gap-6">
                {
                    partners.map((partner, index) => {
                        return <PartnerCard key={index} partnerData={partner}></PartnerCard>
                    })
                }
            </div>
        </section>
    )
}


function PartnerCard({ partnerData }: { partnerData: Request }) {
    return (
        <div className="w-[48%] rounded-2xl flex flex-col p-6 gap-2 bg-white/90 border border-blue-100 shadow-xl cursor-pointer transition-all duration-300 ease-linear hover:scale-105 hover:shadow-2xl">
            <h2 className="font-bold text-3xl col-span-full text-blue-900">{partnerData.CompanyName}</h2>
            
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-blue-800">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    partnerData.Status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    partnerData.Status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {partnerData.Status}
                </span>
            </div>
            
            <Link to={`./${partnerData.id}`} className="w-[40%] self-end px-5 py-3 font-semibold cursor-pointer flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl transition-all duration-300 ease-linear shadow hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
                View Details<img className="fil" src={RightArrow} />
            </Link>
        </div>
    )
}