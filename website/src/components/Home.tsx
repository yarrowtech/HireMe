import { Link } from "react-router-dom";
import Subscription from "./Subscription";

export default function Home() {
  return (
    <section className="top-0 left-0 flex flex-col items-center gap-10 w-full min-h-screen box-border bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Hero Section */}
      <div className="w-full h-[90vh] flex relative overflow-hidden">
        <div className="w-full h-full absolute bg-[url('/home_intro_bg.png')] bg-cover bg-center opacity-80" />
        <div className="self-end w-full md:w-1/2 h-4/6 p-10 flex flex-col justify-around z-10 m-8">
          <div className="bg-white/80 rounded-xl p-8 shadow-2xl">
            <h2 className="text-5xl md:text-7xl font-extrabold drop-shadow mb-4 text-blue-900">Welcome</h2>
            <p className="text-base md:text-lg font-semibold self-end mb-6 text-right text-blue-900">Lorem ipsum dolor sit, amet consectetur adipisicing elit. A consequuntur vel eligendi ea aliquam minima, qui repellendus corporis nesciunt deleniti blanditiis iure ratione voluptas ut?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, dolorem aperiam blanditiis at perferendis recusandae.</p>
            <Link to="/be-a-partner" className="bg-gradient-to-r from-blue-500 to-blue-400 p-4 text-center rounded-xl font-bold w-full md:w-1/2 cursor-pointer transition-all duration-300 ease-linear hover:bg-white hover:text-white shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounce-slow">Become a Partner</Link>
          </div>
        </div>
      </div>
      {/* About Us Section */}
      <div id="about" className="w-[90vw] max-w-6xl mx-auto my-[10vh] grid grid-cols-1 md:grid-cols-[45%_auto] grid-rows-[auto_auto] bg-white/70 backdrop-blur-lg rounded-3xl p-8 gap-10 shadow-2xl">
        <h2 className="col-span-full text-center text-blue-900 font-extrabold text-4xl md:text-5xl mb-2 tracking-tight">About Us</h2>
        <img src="/about.png" alt="About" className="rounded-2xl shadow-lg object-cover w-full h-full max-h-[350px]" />
        <p className="text-blue-900 text-base font-semibold text-justify leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae omnis nesciunt architecto animi dignissimos consequatur. Facere eligendi et provident molestias quas delectus quae enim tempore laboriosam soluta ducimus itaque nobis perspiciatis eveniet consectetur architecto consequatur, magnam voluptatum cum porro? Repudiandae, illo enim laborum quia neque repellendus saepe corrupti ipsam quae delectus iste culpa ullam magnam natus sequi? Officia, iure beatae! Voluptatibus ex, quos quisquam illum a atque saepe odio velit porro cupiditate adipisci nobis accusantium officiis vero amet sint eveniet! Labore cupiditate obcaecati in? Consectetur ipsam, similique architecto reiciendis, fugiat beatae laudantium tempora, error repellat impedit distinctio facere quam sapiente.</p>
      </div>
      {/* Vision Section */}
      <div id="vision" className="w-[90vw] max-w-6xl mx-auto my-[10vh] p-8 flex flex-col items-center gap-10">
        <h2 className="col-span-full text-center font-extrabold text-blue-900 text-4xl md:text-5xl mb-2 tracking-tight">Our Vision</h2>
        <div className="w-full flex flex-col gap-8">
          {/* Vision Card 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white/80 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-transform">
            <img src="/management.jpg" alt="Employee Management" className="w-full md:w-[20vw] max-w-xs aspect-auto rounded-xl shadow-md" />
            <div>
              <h4 className="text-2xl font-bold my-2 text-blue-800">Employee Management</h4>
              <p className="text-blue-900">A platform for organizations to seamlessly manage employees with little efforts and also a platform to monitor their performance.</p>
            </div>
          </div>
          {/* Vision Card 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 bg-white/80 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-transform">
            <img src="/perks.png" alt="Perks & Bonuses" className="w-full md:w-[20vw] max-w-xs aspect-auto rounded-xl shadow-md" />
            <div>
              <h4 className="text-2xl font-bold my-2 text-blue-800">Perks & Bonuses</h4>
              <p className="text-blue-900">Perks and bonuses are based on performance. Minimum bonus of 8.33% of the wages of the employee with maximum of Rs1600 is payable to employee (The payment of Bonus Act 1965).</p>
            </div>
          </div>
          {/* Vision Card 3 */}
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white/80 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-transform">
            <img src="/trust.png" alt="Build Trust" className="w-full md:w-[20vw] max-w-xs aspect-auto rounded-xl shadow-md" />
            <div>
              <h4 className="text-2xl font-bold my-2 text-blue-800">Build Trust</h4>
              <p className="text-blue-900">Aim is to become the best social network platform for developing the credibility of the business. Want to build the process smooth and uninterrupted by providing required workforce on time.</p>
            </div>
          </div>
          {/* Vision Card 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 bg-white/80 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-transform">
            <img src="/income.png" alt="Steady Income" className="w-full md:w-[20vw] max-w-xs aspect-auto rounded-xl shadow-md" />
            <div>
              <h4 className="text-2xl font-bold my-2 text-blue-800">Steady Income</h4>
              <p className="text-blue-900">Get a steady income, scope for a better pay. As an Independent Contractor, the individual files quarterly estimates based on last year's tax return or current year's estimated income. As an employee, all tax payments are withheld and filed by the employer.</p>
            </div>
          </div>
        </div>
      </div>
      <Subscription />
      {/* Partners Section */}
      <div id="partners" className="w-[90vw] max-w-6xl mx-auto my-[10vh] grid grid-cols-2 md:grid-cols-4 grid-rows-[10%_auto] bg-white/70 backdrop-blur-lg rounded-3xl p-8 gap-10 shadow-2xl">
        <h2 className="col-span-full text-center font-extrabold text-blue-900 text-4xl md:text-5xl mb-2 tracking-tight">Our Partners</h2>
        <img src="/swiggy.png" alt="Swiggy" className="w-full max-w-[12vw] aspect-auto self-center rounded-xl shadow-md bg-white/80 p-4 hover:scale-105 transition-transform" />
        <img src="/zepto.png" alt="Zepto" className="w-full max-w-[12vw] aspect-auto self-center rounded-xl shadow-md bg-white/80 p-4 hover:scale-105 transition-transform" />
        <img src="/dunzo.jpg" alt="Dunzo" className="w-full max-w-[12vw] aspect-auto self-center rounded-xl shadow-md bg-white/80 p-4 hover:scale-105 transition-transform" />
        <img src="/zomato.png" alt="Zomato" className="w-full max-w-[12vw] aspect-auto self-center rounded-xl shadow-md bg-white/80 p-4 hover:scale-105 transition-transform" />
      </div>
    </section>
  )
}
