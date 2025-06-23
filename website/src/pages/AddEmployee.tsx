import { UserContext } from "../context/UserContext"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddEmployee() {

    const { userState } = useContext(UserContext)!
    const [subFormState, setSubFormState] = useState<"details" | "job">("details")
    const employeePicUploader = useRef<HTMLInputElement>(null)
    const employeePic = useRef<HTMLImageElement>(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (userState.companyName === null || userState.position === "admin" || userState.position === "employee")
            navigate("/")
    }, [])

    return (
        <form className="mx-auto my-[15vh] w-full max-w-3xl flex flex-col items-center bg-white/90 rounded-3xl shadow-2xl p-10 border border-blue-100">
            <h2 className="text-3xl font-extrabold text-blue-900 mb-6 tracking-tight">Add Employee</h2>
            <div className="w-full flex items-center gap-5">
                <button
                    type="button"
                    onClick={() => setSubFormState("details")}
                    className={`p-3 border-2 border-blue-300 border-b-0 rounded-t-xl text-sm font-bold cursor-pointer transition-all duration-300 ${subFormState === "details" ? "bg-blue-500 text-white" : "bg-white text-blue-900 hover:bg-blue-100"}`}
                >
                    Personal Details
                </button>
                <button
                    type="button"
                    onClick={() => setSubFormState("job")}
                    className={`p-3 border-2 border-blue-300 border-b-0 rounded-t-xl text-sm font-bold cursor-pointer transition-all duration-300 ${subFormState === "job" ? "bg-blue-500 text-white" : "bg-white text-blue-900 hover:bg-blue-100"}`}
                >
                    Job Specifications
                </button>
            </div>
            <div className="w-full border-t-2 border-blue-200 p-5 bg-white/80 rounded-b-2xl">
                {subFormState === "details" ? (
                    <div className="w-full grid grid-cols-3 gap-5">
                        <input type="text" name="firstname" placeholder="Enter firstname" className="p-2 pl-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400" />
                        <input type="text" name="middlename" placeholder="Enter middlename" className="p-2 pl-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400" />
                        <input type="text" name="lastname" placeholder="Enter lastname" className="p-2 pl-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400" />
                        <div className="flex col-span-full w-1/2 gap-2">
                            <label htmlFor="" className="text-blue-900 font-semibold">Enter Date of Birth:</label>
                            <input type="date" name="dob" placeholder="Enter date of birth" className="rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <input type="text" name="mobileNo" placeholder="Enter mobile no" className="p-2 pl-3 rounded-lg border-2 border-blue-200 col-span-full w-[30%] focus:ring-2 focus:ring-blue-400" />
                        <input type="text" name="emailId" placeholder="Enter email address" className="p-2 pl-3 rounded-lg border-2 border-blue-200 col-span-full w-1/2 focus:ring-2 focus:ring-blue-400" />
                        <textarea name="address" placeholder="Enter address" className="p-2 pl-3 rounded-lg border-2 border-blue-200 resize-none col-span-full w-[70%] focus:ring-2 focus:ring-blue-400" />
                        <div className="flex items-center gap-3">
                            <input type="file" name="" id="" className="hidden" ref={employeePicUploader} onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onload = (event) => {
                                        employeePic.current!.src = event.target?.result as string
                                        employeePic.current!.style.display = "block"
                                    }
                                    reader.readAsDataURL(file)
                                }
                            }} />
                            <button type="button" className="p-3 bg-blue-500 rounded-lg text-white text-xs font-bold cursor-pointer hover:bg-blue-600 transition-all duration-300" onClick={() => employeePicUploader.current!.click()}>Upload Photo</button>
                            <img src="" alt="" ref={employeePic} className="w-40 aspect-square border-0 hidden" />
                        </div>
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-2 gap-5">
                        <input type="text" name="post" placeholder="Enter job post name" className="p-2 pl-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400" />
                        <select name="postCategory" id="" className="pl-2 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400">
                            <option value="" hidden>Select Post Category</option>
                            <option value="">Domestic Help</option>
                            <option value="">Sales/Support</option>
                            <option value="">Work on Hire</option>
                        </select>
                        <div className="col-span-full flex items-center gap-5">
                            <input type="number" name="amount" placeholder="Enter payable amount" className="p-2 pl-3 rounded-lg border-2 border-blue-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button :appearance-none [-moz-appearance:textfield] focus:ring-2 focus:ring-blue-400" />
                            <select name="" id="" className="p-2 rounded-lg border-2 border-blue-200 h-full focus:ring-2 focus:ring-blue-400">
                                <option value="">Monthly</option>
                                <option value="">Hourly</option>
                                <option value="">Weekly</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
            <button type="submit" className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg self-end font-bold text-sm text-white cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">Submit</button>
        </form>
    )
}
