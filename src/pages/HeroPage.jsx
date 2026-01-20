import { ArrowRight, ShieldCheck, Headset } from "lucide-react";
import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <section className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 text-sm font-semibold tracking-wide">
            IT INCIDENT SERVICE DESK
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Resolve IT Incidents <br />
            <span className="text-amber-300">
              Faster & Smarter
            </span>
          </h1>

          <p className="mt-6 text-lg text-emerald-100 max-w-xl">
            A role-based incident management platform where users report
            issues, engineers collaborate on resolutions, and management
            gains full operational visibility.
          </p>

          <div className="mt-10 flex gap-6 flex-wrap">
            <Link
              to="/login"
              className="flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Get Started <ArrowRight size={18} />
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 rounded-xl border border-white/40 hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Highlights */}
        <div className="space-y-6">

          <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl flex gap-4 shadow-lg">
            <ShieldCheck className="w-9 h-9 text-amber-300" />
            <div>
              <h3 className="font-semibold text-lg">
                Secure Role-Based Access
              </h3>
              <p className="text-emerald-100 text-sm">
                Controlled access for users, engineers, leads, and admins.
              </p>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl flex gap-4 shadow-lg">
            <Headset className="w-9 h-9 text-amber-300" />
            <div>
              <h3 className="font-semibold text-lg">
                Faster Incident Resolution
              </h3>
              <p className="text-emerald-100 text-sm">
                Collaborative workflows reduce downtime and delays.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroPage;
