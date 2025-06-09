import Location from "../assets/location.svg"
import Phone from "../assets/phone.svg"
import Email from "../assets/mail.svg"

export default function Footer() {
    return (
        <footer className="bg-gradient-to-t from-blue-900 via-blue-800 to-blue-700 text-white w-full flex flex-col items-center pt-12 pb-4 px-4 relative mt-10 shadow-inner">
            <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0 mb-8">
                <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-semibold mb-3">Services</h4>
                    <h6 className="text-xs font-semibold cursor-pointer hover:text-blue-200 transition-colors">Employee Management</h6>
                    <h6 className="text-xs font-semibold cursor-pointer hover:text-blue-200 transition-colors">Employee Tracking</h6>
                    <h6 className="text-xs font-semibold cursor-pointer hover:text-blue-200 transition-colors">HirePay</h6>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-semibold mb-3">Support</h4>
                    <h6 className="text-xs font-semibold cursor-pointer hover:text-blue-200 transition-colors">Contact Us</h6>
                    <h6 className="text-xs font-semibold cursor-pointer hover:text-blue-200 transition-colors">Terms & Conditions</h6>
                    <h6 className="text-xs font-semibold cursor-pointer hover:text-blue-200 transition-colors">FAQs</h6>
                    <h6 className="text-xs font-semibold cursor-pointer hover:text-blue-200 transition-colors">Privacy Policy</h6>
                </div>
                <div className="flex flex-col gap-4 bg-white/10 rounded-2xl p-6 shadow-lg">
                    <div className="flex gap-3 items-center">
                        <img src={Email} alt="" className="w-6" />
                        <p className="text-sm font-semibold">info@hireme.com</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <img src={Phone} alt="" className="w-6" />
                        <p className="text-sm font-semibold">333-333-333</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <img src={Location} alt="" className="w-6" />
                        <p className="text-sm font-semibold">Kolkata, India</p>
                    </div>
                </div>
            </div>
            <p className="text-xs text-blue-200 font-semibold mt-4">&copy; All rights are reserved.</p>
        </footer>
    )
}