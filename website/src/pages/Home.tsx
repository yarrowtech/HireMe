import { Link } from "react-router-dom";
import Subscription from "../components/Subscription";
import { FaLinkedin, FaInstagram, FaFacebook, FaCheckCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-gradient-to-br from-blue-200/40 to-blue-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-blue-100/30 to-blue-400/10 rounded-full blur-2xl -z-10" />
      <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-blue-300/20 blur-xl -z-10" />
      <div className="absolute bottom-1/3 right-20 w-24 h-24 rounded-full bg-blue-400/15 blur-xl -z-10" />

      {/* Hero Section */}
      <div className="relative w-full min-h-[110vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('/home_intro_bg.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/20" />
        </div>

        {/* Content container */}
        <div className="relative z-10 top-10 w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 flex flex-col items-center gap-8 border border-blue-100/50 max-w-5xl mx-auto transform transition-all hover:shadow-3xl hover:scale-[1.005] duration-500">
              {/* Headline */}
              <div className="text-center space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-blue-900 leading-tight">
                  <span className="block">Revolutionizing Workforce</span>
                  <span className="block bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                    Management Solutions
                  </span>
                </h1>
                <p className="text-lg md:text-xl font-medium text-blue-800/90 max-w-3xl mx-auto leading-relaxed">
                  A comprehensive HR ecosystem designed to streamline operations for partner companies while empowering employees with stability and growth opportunities.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                <Link 
                  to="/be-a-partner" 
                  className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-center rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform-gpu focus:outline-none focus:ring-4 focus:ring-blue-400/50 min-w-[200px]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link 
                  to="#plans" 
                  className="relative overflow-hidden group bg-white border-2 border-blue-400 px-8 py-4 text-center rounded-xl font-bold text-blue-700 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] transform-gpu focus:outline-none focus:ring-4 focus:ring-blue-400/30 min-w-[200px] hover:bg-blue-50/70"
                >
                  <span className="flex items-center justify-center gap-2">
                    View Plans <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>

              {/* Additional decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-blue-400/20 blur-xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-blue-600/10 blur-xl" />
            </div>
          </div>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block animate-bounce">
          <div className="w-8 h-14 rounded-3xl border-4 border-blue-500/70 flex justify-center p-1">
            <div className="w-2 h-2 rounded-full bg-blue-500/90 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="w-full flex justify-center px-4 sm:px-6 my-16">
        <div className="w-full max-w-4xl bg-white/95 rounded-2xl shadow-lg border border-blue-100 px-8 py-12 flex flex-col items-center gap-6 relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.005] duration-300">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 rounded-t-2xl" />
          <h2 className="text-2xl md:text-4xl font-extrabold text-blue-900 mb-2 tracking-tight text-center">
            Welcome to <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Hire Me</span>
          </h2>
          <p className="text-blue-700 text-lg md:text-xl font-semibold text-center max-w-2xl">
            Where companies build better teams and employees find greater stability through innovative HR solutions.
          </p>
          <div className="w-full flex flex-col items-center">
            <p className="text-blue-900/90 text-base md:text-lg font-medium text-center max-w-3xl leading-relaxed">
              Hire Me transforms traditional human resource operations into a smart, seamless digital experience. Our web-based platform helps partner organizations manage employee data efficiently, streamline HR tasks, and maintain transparency at every organizational level.
            </p>
            <p className="text-blue-900/90 text-base md:text-lg font-medium text-center max-w-3xl leading-relaxed mt-4">
              Whether you're a growing startup or an established enterprise, Hire Me provides scalable workforce management tools tailored to your business needs, all while ensuring employee satisfaction and retention.
            </p>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 rounded-b-2xl" />
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="w-[95vw] max-w-6xl mx-auto my-16 grid grid-cols-1 md:grid-cols-[45%_auto] bg-white/95 rounded-3xl p-8 gap-8 shadow-xl border border-blue-100 items-center transition-all hover:shadow-2xl hover:scale-[1.005] duration-300">
        <div className="relative overflow-hidden rounded-2xl shadow-lg h-full min-h-[300px]">
          <img 
            src="/about.png" 
            alt="About Hire Me" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-blue-700/10" />
        </div>
        <div className="py-4">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-6 tracking-tight relative inline-block">
            About Us
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full" />
          </h2>
          <p className="text-blue-900/90 text-base font-medium leading-relaxed mb-4">
            At Hire Me, we're reimagining HR for the modern workforce. Our mission is to bridge the gap between organizational efficiency and employee satisfaction through innovative digital solutions.
          </p>
          <p className="text-blue-900/90 text-base font-medium leading-relaxed mb-6">
            We serve a diverse ecosystem of stakeholders with our comprehensive platform:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900 font-medium">Partner companies seeking HR efficiency</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900 font-medium">HR professionals needing better tools</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900 font-medium">Administrators requiring oversight</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900 font-medium">Employees wanting stability</span>
            </li>
          </ul>
          <p className="text-blue-900/90 text-base font-medium leading-relaxed">
            Our platform combines simplicity with powerful features, creating a digital bridge between operational efficiency and workforce empowerment through intuitive design and transparent processes.
          </p>
        </div>
      </div>

      {/* Section Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent my-12" />

      {/* Vision Section */}
      <div id="vision" className="w-[95vw] max-w-6xl mx-auto my-16 p-8 sm:p-10 flex flex-col items-center gap-10 bg-white/95 rounded-3xl shadow-xl border border-blue-100 transition-all hover:shadow-2xl hover:scale-[1.005] duration-300">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-4 tracking-tight">
            Our <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Vision</span>
          </h2>
          <p className="text-blue-900/90 text-lg font-medium">
            We envision a future where HR management is seamless, transparent, and empowering for all stakeholders involved in the employment ecosystem.
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VisionCard 
            icon={<FaCheckCircle className="text-blue-500 text-3xl" />} 
            title="Centralized Workforce Management" 
            desc="A single intuitive dashboard to oversee your entire workforce with real-time data and analytics." 
          />
          <VisionCard 
            icon={<FaCheckCircle className="text-blue-500 text-3xl" />} 
            title="Scalable HR Infrastructure" 
            desc="Modular solutions that grow with your company, from startup to enterprise scale." 
          />
          <VisionCard 
            icon={<FaCheckCircle className="text-blue-500 text-3xl" />} 
            title="Transparent Operations" 
            desc="Clear visibility into HR processes for both administrators and employees." 
          />
          <VisionCard 
            icon={<FaCheckCircle className="text-blue-500 text-3xl" />} 
            title="Employment Continuity" 
            desc="Tools to help workers maintain stable employment relationships." 
          />
          <VisionCard 
            icon={<FaCheckCircle className="text-blue-500 text-3xl" />} 
            title="Digital Transformation" 
            desc="Modern digital workflows replacing outdated paper-based processes." 
          />
          <VisionCard 
            icon={<FaCheckCircle className="text-blue-500 text-3xl" />} 
            title="Subscription Flexibility" 
            desc="Cost-effective plans with transparent pricing and no hidden fees." 
          />
        </div>
      </div>

      {/* Section Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent my-12" />

      {/* Services Section */}
      <div id="services" className="w-[95vw] max-w-6xl mx-auto my-16 bg-white/95 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col items-center gap-6 border border-blue-100 transition-all hover:shadow-2xl hover:scale-[1.005] duration-300">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-4 tracking-tight">
            Our <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-blue-900/90 text-lg font-medium">
            Comprehensive HR solutions designed to meet the diverse needs of modern organizations and their workforce.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <ServiceCard 
            title="Partnership Management" 
            description="Companies can apply and get verified as official Hire Me partners through our rigorous approval process, ensuring system integrity and quality standards." 
          />
          <ServiceCard 
            title="Subscription Access" 
            description="Flexible subscription plans with transparent pricing to unlock full platform functionality based on your organization's needs." 
          />
          <ServiceCard 
            title="HR Dashboard" 
            description="Comprehensive employee management with real-time tracking, advanced search, document uploads, and status monitoring." 
          />
          <ServiceCard 
            title="Admin Control Panel" 
            description="Centralized oversight for reviewing applications, monitoring platform usage, and tracking key workforce metrics." 
          />
          <ServiceCard 
            title="Employment Records" 
            description="Secure, centralized storage for all employee data including work history, performance metrics, and company associations." 
          />
          <ServiceCard 
            title="Analytics & Reporting" 
            description="Powerful insights into workforce trends, productivity metrics, and HR operational efficiency." 
          />
        </div>
      </div>

      {/* Plans Section */}
      <div id="plans" className="w-[95vw] max-w-6xl mx-auto my-16 bg-white/95 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col items-center gap-8 border border-blue-100 transition-all hover:shadow-2xl hover:scale-[1.005] duration-300">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-4 tracking-tight">
            Choose Your <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Plan</span>
          </h2>
          <p className="text-blue-900/90 text-lg font-medium">
            Flexible pricing options designed to meet the needs of organizations of all sizes.
          </p>
        </div>
        <div className="w-full overflow-hidden rounded-xl shadow-lg border border-blue-200">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-bold text-blue-800 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-left text-lg font-bold text-blue-800 uppercase tracking-wider">Features</th>
                <th className="px-6 py-4 text-left text-lg font-bold text-blue-800 uppercase tracking-wider">Ideal For</th>
                <th className="px-6 py-4 text-left text-lg font-bold text-blue-800 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-lg font-bold text-blue-800 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-200">
              <PlanRow 
                plan="Starter" 
                features={["Up to 25 employees", "1 HR login", "Basic reports", "Email support"]} 
                ideal="Small teams & startups" 
                price="₹999/month" 
              />
              <PlanRow 
                plan="Professional" 
                features={["Up to 100 employees", "3 HR logins", "Advanced analytics", "Priority support"]} 
                ideal="Growing businesses" 
                price="₹9,999/month" 
              />
              <PlanRow 
                plan="Enterprise" 
                features={["Unlimited employees", "Custom HR roles", "Admin dashboard", "API access", "Dedicated manager"]} 
                ideal="Large organizations" 
                price="Custom Pricing" 
              />
            </tbody>
          </table>
        </div>
        <p className="text-blue-900/80 text-sm mt-2">
          All plans include secure access, 24/7 availability, and regular platform updates. Volume discounts available.
        </p>
      </div>

      {/* Contact Section */}
      <div id="contact" className="w-[95vw] max-w-6xl mx-auto my-16 bg-white/95 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col items-center gap-8 border border-blue-100 transition-all hover:shadow-2xl hover:scale-[1.005] duration-300">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-4 tracking-tight">
            Get In <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-blue-900/90 text-lg font-medium">
            We'd love to hear from you. Reach out for inquiries, support, or partnership opportunities.
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContactCard 
            icon={<FaMapMarkerAlt className="text-blue-500 text-2xl" />} 
            title="Our Location" 
            detail="Hire Me HQ, Sector 5, Salt Lake, Kolkata - 700091" 
          />
          <ContactCard 
            icon={<FaEnvelope className="text-blue-500 text-2xl" />} 
            title="Email Us" 
            detail="info@hiremeplatform.com\nsupport@hiremeplatform.com" 
          />
          <ContactCard 
            icon={<FaPhoneAlt className="text-blue-500 text-2xl" />} 
            title="Call Us" 
            detail="+91 90000 12345\nMon - Sat, 10:00 AM - 7:00 PM" 
          />
        </div>
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="flex gap-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-700 transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors duration-300">
              <FaFacebook size={24} />
            </a>
          </div>
          <Link 
            to="/contact" 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
          >
            Contact Support <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Partners Section */}
      <div id="partners" className="w-[95vw] max-w-6xl mx-auto my-16 bg-white/95 rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-100 transition-all hover:shadow-2xl hover:scale-[1.005] duration-300">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 tracking-tight text-center">
          Trusted By <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Industry Leaders</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
          <PartnerLogo src="/swiggy.png" alt="Swiggy" />
          <PartnerLogo src="/zepto.png" alt="Zepto" />
          <PartnerLogo src="/dunzo.jpg" alt="Dunzo" />
          <PartnerLogo src="/zomato.png" alt="Zomato" />
        </div>
      </div>
    </section>
  );
}

function VisionCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow border border-blue-100 hover:shadow-lg transition-all duration-300 h-full">
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div>
        <h4 className="text-xl font-bold text-blue-800 mb-2">{title}</h4>
        <p className="text-blue-900/90 text-base">{desc}</p>
      </div>
    </div>
  );
}

function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 h-full">
      <h3 className="text-xl font-bold text-blue-800 mb-3">{title}</h3>
      <p className="text-blue-900/90">{description}</p>
    </div>
  );
}

function PlanRow({ plan, features, ideal, price }: { plan: string; features: string[]; ideal: string; price: string }) {
  return (
    <tr className="hover:bg-blue-50/50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-bold text-blue-800 text-lg">{plan}</span>
      </td>
      <td className="px-6 py-4">
        <ul className="list-disc list-inside space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-blue-900/90">{feature}</li>
          ))}
        </ul>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-blue-900/90">{ideal}</td>
      <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-700">{price}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link 
          to="/signup" 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
        >
          Select
        </Link>
      </td>
    </tr>
  );
}

function ContactCard({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-blue-800">{title}</h3>
      </div>
      <p className="text-blue-900/90 whitespace-pre-line">{detail}</p>
    </div>
  );
}

function PartnerLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 flex items-center justify-center h-28">
      <img 
        src={src} 
        alt={alt} 
        className="max-h-16 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-500" 
      />
    </div>
  );
}