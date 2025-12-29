import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - HAIRSCOPAi</title>
        <meta name="description" content="HAIRSCOPAi Privacy Policy. Learn how we collect, use, and protect your personal and health data." />
      </Helmet>

      <div className="min-h-screen">
        <Background3D />
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Shield className="w-10 h-10 text-primary" />
                <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
              </div>
              
              <p className="text-muted-foreground mb-8">
                Last updated: December 29, 2024
              </p>

              <div className="glass-card rounded-2xl p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h2>
                  <p className="text-muted-foreground">
                    HAIRSCOPAi ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered hair and scalp analysis service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p><strong className="text-foreground">Personal Information:</strong> Name, email address, and account credentials when you register.</p>
                    <p><strong className="text-foreground">Health Data:</strong> Scalp images you upload for analysis, analysis results, and any health information you voluntarily provide.</p>
                    <p><strong className="text-foreground">Usage Data:</strong> How you interact with our service, including features used and time spent.</p>
                    <p><strong className="text-foreground">Device Information:</strong> Browser type, operating system, and device identifiers.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide AI-powered scalp analysis and personalized recommendations</li>
                    <li>Improve our AI models and service quality (using anonymized, aggregated data)</li>
                    <li>Communicate with you about your account and service updates</li>
                    <li>Process payments and manage subscriptions</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">4. Data Security</h2>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures including AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our infrastructure is HIPAA compliant, and we conduct regular security audits. Your scalp images are stored in secure, encrypted databases with strict access controls.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">5. Data Retention</h2>
                  <p className="text-muted-foreground">
                    Scalp images are retained for 30 days by default to enable progress tracking. You can delete your images immediately after analysis or enable automatic deletion in your account settings. Account data is retained until you delete your account.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">6. Sharing Your Information</h2>
                  <p className="text-muted-foreground">
                    We do not sell your personal or health data. We may share data with: service providers who assist our operations (under strict confidentiality agreements), healthcare professionals if you use our consultation feature (with your consent), and law enforcement when legally required.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">7. Your Rights</h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Access and download your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and all associated data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request data portability</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">8. Contact Us</h2>
                  <p className="text-muted-foreground">
                    For privacy-related inquiries, contact our Data Protection Officer at privacy@hairscopai.com or write to: HAIRSCOPAi Privacy Team, 123 Tech Street, San Francisco, CA 94105.
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
