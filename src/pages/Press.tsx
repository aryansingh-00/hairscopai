import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { motion } from "framer-motion";
import { Newspaper, Download, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Press = () => {
  const pressReleases = [
    {
      title: "HAIRSCOPAi Reaches 100,000 Users Milestone",
      date: "December 2024",
      excerpt: "AI-powered hair analysis platform celebrates rapid growth, helping users worldwide understand their scalp health.",
    },
    {
      title: "HAIRSCOPAi Launches Premium Features with Doctor Consultation",
      date: "November 2024",
      excerpt: "New premium tier connects users with board-certified dermatologists for personalized treatment plans.",
    },
    {
      title: "HAIRSCOPAi Achieves 98% Accuracy in Clinical Trial",
      date: "October 2024",
      excerpt: "Independent clinical study validates AI's diagnostic accuracy for common scalp conditions.",
    },
    {
      title: "HAIRSCOPAi Secures $5M Seed Funding",
      date: "August 2024",
      excerpt: "Investment led by leading healthcare VC to expand AI capabilities and global reach.",
    },
  ];

  const mediaFeatures = [
    { outlet: "TechCrunch", title: "The AI Dermatologist in Your Pocket" },
    { outlet: "Forbes", title: "How HAIRSCOPAi is Democratizing Hair Health" },
    { outlet: "Wired", title: "AI-Powered Scalp Analysis: The Future of Hair Care" },
    { outlet: "The Verge", title: "HAIRSCOPAi Brings Trichology to Your Smartphone" },
  ];

  const stats = [
    { value: "100K+", label: "Active Users" },
    { value: "5M+", label: "Scans Performed" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "150+", label: "Countries Served" },
  ];

  return (
    <>
      <Helmet>
        <title>Press - HAIRSCOPAi News & Media</title>
        <meta name="description" content="HAIRSCOPAi press releases, media coverage, and company news. Download our press kit and brand assets." />
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
                <span className="text-primary">HAIRSCOPAi</span> in the News
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Press releases, media coverage, and resources for journalists.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass-card rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Press Releases */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                <Newspaper className="w-8 h-8 text-primary" />
                Press Releases
              </h2>
              <div className="space-y-4">
                {pressReleases.map((release, index) => (
                  <div key={index} className="glass-card rounded-xl p-6 cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-primary font-medium">{release.date}</span>
                        <h3 className="font-semibold text-foreground text-lg mt-1">{release.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{release.excerpt}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="shrink-0">
                        Read More <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Media Coverage */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">Media Coverage</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {mediaFeatures.map((feature, index) => (
                  <div key={index} className="glass-card rounded-xl p-6 flex items-center justify-between">
                    <div>
                      <span className="text-primary font-semibold">{feature.outlet}</span>
                      <p className="text-sm text-muted-foreground mt-1">{feature.title}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Press Kit & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="glass-card rounded-2xl p-8 text-center">
                <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Press Kit</h3>
                <p className="text-muted-foreground mb-6">
                  Download logos, brand guidelines, product screenshots, and executive photos.
                </p>
                <Button>Download Press Kit</Button>
              </div>
              <div className="glass-card rounded-2xl p-8 text-center">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Media Inquiries</h3>
                <p className="text-muted-foreground mb-6">
                  For press inquiries, interviews, or partnership opportunities.
                </p>
                <Button variant="outline">press@hairscopai.com</Button>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Press;
