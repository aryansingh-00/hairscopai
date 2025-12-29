import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Heart, Zap, Users, Coffee, Plane, GraduationCap, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const openings = [
    {
      title: "Senior Machine Learning Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Lead the development of our AI models for scalp analysis. Experience with computer vision and medical imaging required.",
    },
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain our web platform using React, TypeScript, and Node.js. Experience with healthcare apps is a plus.",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote / New York",
      type: "Full-time",
      description: "Design intuitive user experiences for our AI-powered health platform. Strong portfolio required.",
    },
    {
      title: "Medical Advisor (Dermatology)",
      department: "Medical",
      location: "Remote",
      type: "Part-time",
      description: "Provide clinical guidance for our AI development. MD with dermatology or trichology specialization required.",
    },
    {
      title: "Customer Success Manager",
      department: "Operations",
      location: "Remote",
      type: "Full-time",
      description: "Help our users get the most out of HAIRSCOPAi. Experience in health tech customer success preferred.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote / Los Angeles",
      type: "Full-time",
      description: "Lead our growth marketing efforts. Experience with health/wellness brands and digital marketing required.",
    },
  ];

  const benefits = [
    { icon: Heart, title: "Health Insurance", description: "Comprehensive medical, dental, and vision coverage" },
    { icon: Plane, title: "Unlimited PTO", description: "Take the time you need to recharge" },
    { icon: Coffee, title: "Remote First", description: "Work from anywhere in the world" },
    { icon: GraduationCap, title: "Learning Budget", description: "$2,000/year for courses and conferences" },
    { icon: DollarSign, title: "Equity Package", description: "Share in our success with stock options" },
    { icon: Users, title: "Team Retreats", description: "Quarterly in-person gatherings" },
  ];

  return (
    <>
      <Helmet>
        <title>Careers at HAIRSCOPAi - Join Our Team</title>
        <meta name="description" content="Join HAIRSCOPAi and help revolutionize hair health with AI. View open positions in engineering, design, marketing, and more." />
      </Helmet>

      <div className="min-h-screen">
        <Background3D />
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Join the <span className="text-primary">HAIRSCOPAi</span> Team
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Help us revolutionize hair health through AI. We're building something amazing and we want you to be part of it.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Why Work With Us?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="glass-card rounded-xl p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Open Positions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
                <Briefcase className="w-8 h-8 text-primary" />
                Open Positions
              </h2>
              <div className="space-y-4">
                {openings.map((job, index) => (
                  <div key={index} className="glass-card rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{job.description}</p>
                      </div>
                      <Button className="shrink-0">Apply Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-16 glass-card rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-foreground mb-4">Don't see a role that fits?</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented people. Send us your resume and tell us how you'd like to contribute.
              </p>
              <Button variant="outline" size="lg">
                Send General Application
              </Button>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Careers;
