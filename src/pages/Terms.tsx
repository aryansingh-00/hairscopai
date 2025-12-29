import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - HAIRSCOPAi</title>
        <meta name="description" content="HAIRSCOPAi Terms of Service. Read the terms and conditions for using our AI-powered hair and scalp analysis service." />
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
                <FileText className="w-10 h-10 text-primary" />
                <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
              </div>
              
              <p className="text-muted-foreground mb-8">
                Last updated: December 29, 2024
              </p>

              <div className="glass-card rounded-2xl p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground">
                    By accessing or using HAIRSCOPAi, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                  <p className="text-muted-foreground">
                    HAIRSCOPAi provides AI-powered analysis of scalp and hair images to identify potential conditions and provide personalized care recommendations. Our service is intended for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">3. Medical Disclaimer</h2>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">IMPORTANT:</strong> HAIRSCOPAi is not a medical device and does not provide medical diagnoses. Our AI analysis is for educational and informational purposes only. Always consult a qualified healthcare provider for medical concerns. Do not disregard professional medical advice or delay seeking treatment based on HAIRSCOPAi results.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">4. User Accounts</h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>You must be at least 18 years old to create an account</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You agree to provide accurate and complete information</li>
                    <li>You are responsible for all activities under your account</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">5. Acceptable Use</h2>
                  <p className="text-muted-foreground mb-4">You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Upload images that are not of your own scalp or hair</li>
                    <li>Use the service for any unlawful purpose</li>
                    <li>Attempt to reverse engineer or extract our AI models</li>
                    <li>Share your account with others</li>
                    <li>Upload inappropriate, offensive, or harmful content</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">6. Subscription and Billing</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Free accounts include limited features as described on our pricing page. Premium subscriptions are billed monthly or annually as selected. You may cancel your subscription at any time, with access continuing until the end of your billing period.</p>
                    <p>We offer a 30-day money-back guarantee for first-time Premium subscribers.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
                  <p className="text-muted-foreground">
                    All content, features, and functionality of HAIRSCOPAi, including our AI models, are owned by HAIRSCOPAi and protected by intellectual property laws. You retain ownership of images you upload but grant us a license to process them for providing our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
                  <p className="text-muted-foreground">
                    To the maximum extent permitted by law, HAIRSCOPAi shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service. Our total liability shall not exceed the amount you paid for the service in the past 12 months.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
                  <p className="text-muted-foreground">
                    We may update these Terms from time to time. We will notify you of significant changes via email or through the service. Continued use after changes constitutes acceptance of the new terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">10. Contact</h2>
                  <p className="text-muted-foreground">
                    For questions about these Terms, contact us at legal@hairscopai.com.
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

export default Terms;
