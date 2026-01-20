import {
  ShieldCheck,
  Users,
  Headset,
  ClipboardList,
  BarChart3
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-cyan-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            IT Incident Service Desk (ISD)
          </h1>
          <p className="mt-5 text-lg text-emerald-100 max-w-4xl mx-auto">
            ISD is a role-based IT incident management system that enables
            organizations to efficiently report, track, resolve, and audit
            technical incidents across teams.
          </p>
        </div>
      </section>

      {/* Core Description */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-emerald-900">
            What is ISD?
          </h2>
          <p className="mt-4 text-emerald-700 text-lg">
            The IT Incident Service Desk (ISD) API powers a centralized platform
            where users can report technical issues, support engineers and team
            leads collaborate on resolutions, and administrators maintain full
            visibility and control through secure access management.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10 mt-16">

          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-emerald-100">
            <ClipboardList className="w-10 h-10 text-emerald-600" />
            <h3 className="mt-4 text-xl font-semibold text-emerald-900">
              Incident Reporting
            </h3>
            <p className="mt-2 text-emerald-700">
              End users can quickly log IT incidents with detailed descriptions,
              priority levels, and attachments for faster diagnosis.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-emerald-100">
            <Headset className="w-10 h-10 text-emerald-600" />
            <h3 className="mt-4 text-xl font-semibold text-emerald-900">
              Collaborative Resolution
            </h3>
            <p className="mt-2 text-emerald-700">
              Support engineers and team leads work together to diagnose issues,
              assign tasks, escalate incidents, and track resolution progress.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-emerald-100">
            <ShieldCheck className="w-10 h-10 text-emerald-600" />
            <h3 className="mt-4 text-xl font-semibold text-emerald-900">
              Role-Based Access Control
            </h3>
            <p className="mt-2 text-emerald-700">
              Secure access controls ensure users, engineers, managers, and
              administrators see only what they are authorized to manage.
            </p>
          </div>

        </div>

        {/* Second Row */}
        <div className="grid md:grid-cols-2 gap-10 mt-10">

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-emerald-100">
            <Users className="w-10 h-10 text-emerald-600" />
            <h3 className="mt-4 text-xl font-semibold text-emerald-900">
              Team & Workflow Management
            </h3>
            <p className="mt-2 text-emerald-700">
              Manage support teams, assign ownership, monitor workloads,
              and ensure SLA compliance across incidents.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-emerald-100">
            <BarChart3 className="w-10 h-10 text-emerald-600" />
            <h3 className="mt-4 text-xl font-semibold text-emerald-900">
              Audit & Management Oversight
            </h3>
            <p className="mt-2 text-emerald-700">
              Administrators and managers gain access to audit logs,
              performance metrics, and incident analytics for informed
              decision-making.
            </p>
          </div>

        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
            Built for Modern IT Operations
          </h2>
          <p className="mt-4 text-emerald-700 text-lg">
            ISD helps IT teams reduce downtime, improve response times,
            and maintain accountability through a structured, secure,
            and scalable incident management workflow.
          </p>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
