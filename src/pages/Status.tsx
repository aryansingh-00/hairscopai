import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { motion } from "framer-motion";
import { CheckCircle, Activity, Server, Database, Brain, Globe } from "lucide-react";

const Status = () => {
  const services = [
    { name: "Web Application", status: "operational", icon: Globe, uptime: "99.99%" },
    { name: "AI Analysis Engine", status: "operational", icon: Brain, uptime: "99.95%" },
    { name: "User Authentication", status: "operational", icon: Server, uptime: "99.99%" },
    { name: "Database", status: "operational", icon: Database, uptime: "99.99%" },
    { name: "Image Processing", status: "operational", icon: Activity, uptime: "99.97%" },
  ];

  const incidents = [
    {
      date: "Dec 15, 2024",
      title: "Scheduled Maintenance Completed",
      description: "Successfully upgraded AI analysis engine to v3.2. No service interruption.",
      status: "resolved",
    },
    {
      date: "Dec 1, 2024",
      title: "Brief API Latency",
      description: "Experienced 2-minute delay in analysis results due to high traffic. Resolved by auto-scaling.",
      status: "resolved",
    },
  ];

  return (
    <>
      <Helmet>
        <title>System Status - HAIRSCOPAi</title>
        <meta name="description" content="Check the current operational status of HAIRSCOPAi services including AI analysis, authentication, and database." />
      </Helmet>

      <div className="min-h-screen">
        <Background3D />
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 mb-6">
                <CheckCircle className="w-5 h-5" />
                All Systems Operational
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                System <span className="text-primary">Status</span>
              </h1>
              <p className="text-muted-foreground">
                Real-time status of HAIRSCOPAi services
              </p>
            </motion.div>

            {/* Services */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Services</h2>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="glass-card rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <service.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{service.uptime} uptime</span>
                      <div className="flex items-center gap-2 text-green-400">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-sm font-medium">Operational</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Uptime */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">90-Day Uptime</h2>
              <div className="glass-card rounded-xl p-6">
                <div className="flex gap-1">
                  {[...Array(90)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-8 rounded-sm ${
                        i === 45 ? 'bg-yellow-500/50' : 'bg-green-500/50'
                      }`}
                      title={`Day ${90 - i}`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                  <span>90 days ago</span>
                  <span>Today</span>
                </div>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-foreground">99.98%</span>
                  <span className="text-muted-foreground ml-2">overall uptime</span>
                </div>
              </div>
            </motion.section>

            {/* Incidents */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Recent Incidents</h2>
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <div key={index} className="glass-card rounded-xl p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{incident.title}</h3>
                      <span className="text-xs text-muted-foreground">{incident.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Resolved
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Subscribe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12 glass-card rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">Subscribe to Updates</h3>
              <p className="text-muted-foreground mb-4">
                Get notified about scheduled maintenance and incidents.
              </p>
              <a href="/contact" className="text-primary font-medium hover:underline">
                Subscribe via Email →
              </a>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Status;
