import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { motion } from "framer-motion";
import { Users, Target, Heart, Award, Globe, Lightbulb } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      bio: "Former dermatologist with 15+ years of experience. PhD in AI-assisted diagnostics from Stanford.",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "Ex-Google AI researcher. Led computer vision teams at major tech companies for 10 years.",
    },
    {
      name: "Dr. Priya Sharma",
      role: "Chief Medical Officer",
      bio: "Board-certified trichologist with expertise in scalp disorders and hair restoration.",
    },
    {
      name: "James Wilson",
      role: "Head of Product",
      bio: "Product leader with experience at healthcare startups. Passionate about accessible health tech.",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Accuracy First",
      description: "We invest heavily in AI training to ensure 98%+ diagnostic accuracy.",
    },
    {
      icon: Heart,
      title: "User Privacy",
      description: "Your health data is encrypted and never shared. HIPAA compliant.",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Making professional hair analysis accessible to everyone, everywhere.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously improving our AI with the latest research and technology.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About HAIRSCOPAi - Our Mission & Team</title>
        <meta name="description" content="Learn about HAIRSCOPAi's mission to democratize hair health through AI. Meet our team of doctors, researchers, and engineers." />
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
                About <span className="text-primary">HAIRSCOPAi</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're on a mission to make professional hair and scalp analysis accessible to everyone through the power of artificial intelligence.
              </p>
            </motion.div>

            {/* Story */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-20"
            >
              <div className="glass-card rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8 text-primary" />
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    HAIRSCOPAi was founded in 2024 with a simple yet powerful vision: to democratize access to professional hair and scalp analysis. Our founder, Dr. Sarah Chen, witnessed firsthand how many patients delayed seeking help for scalp conditions due to limited access to specialists or embarrassment.
                  </p>
                  <p>
                    Combining her medical expertise with cutting-edge AI technology, she assembled a team of world-class researchers, engineers, and healthcare professionals. Together, we built an AI system trained on over 5 million scalp images, capable of detecting conditions with 98% accuracy.
                  </p>
                  <p>
                    Today, HAIRSCOPAi serves over 100,000 users worldwide, helping them understand their scalp health and take proactive steps toward healthier hair. We're proud to be at the forefront of AI-powered healthcare innovation.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Values */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="glass-card rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Team */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                Meet Our Team
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, index) => (
                  <div key={index} className="glass-card rounded-xl p-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-center">{member.name}</h3>
                    <p className="text-sm text-primary text-center mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground text-center">{member.bio}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
