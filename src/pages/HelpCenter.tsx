import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { motion } from "framer-motion";
import { Search, HelpCircle, Camera, CreditCard, Shield, User, Settings, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  const categories = [
    {
      icon: Camera,
      title: "Getting Started",
      articles: [
        { q: "How do I take a good scalp photo?", a: "For best results, use natural lighting and take the photo from 6-8 inches away. Part your hair to expose the scalp area you want to analyze. Ensure the image is in focus and well-lit." },
        { q: "What conditions can HAIRSCOPAi detect?", a: "HAIRSCOPAi can detect dandruff, seborrheic dermatitis, scalp psoriasis, various types of alopecia (hair loss), fungal infections, folliculitis, and assess overall scalp health including oiliness and dryness." },
        { q: "How accurate is the AI analysis?", a: "Our AI has been validated in clinical trials with 98% accuracy for common scalp conditions. However, it's designed as a screening tool and not a replacement for professional medical diagnosis." },
      ],
    },
    {
      icon: User,
      title: "Account & Profile",
      articles: [
        { q: "How do I create an account?", a: "Click 'Get Started' on the homepage and sign up with your email or Google account. You'll receive a verification email to confirm your account." },
        { q: "Can I change my email address?", a: "Yes, go to Settings > Account > Email to update your email address. You'll need to verify the new email before the change takes effect." },
        { q: "How do I delete my account?", a: "You can delete your account in Settings > Account > Delete Account. This will permanently remove all your data including scan history." },
      ],
    },
    {
      icon: CreditCard,
      title: "Billing & Subscriptions",
      articles: [
        { q: "What's included in the free plan?", a: "The free plan includes 1 AI scalp analysis per month with basic recommendations. Upgrade to Premium for unlimited scans and detailed reports." },
        { q: "How do I upgrade to Premium?", a: "Go to Settings > Subscription > Upgrade. You can choose between monthly ($9.99/mo) or annual ($79.99/yr) billing." },
        { q: "What's your refund policy?", a: "We offer a 30-day money-back guarantee. If you're not satisfied, contact support@hairscopai.com for a full refund." },
        { q: "How do I cancel my subscription?", a: "Go to Settings > Subscription > Cancel. You'll continue to have access until the end of your billing period." },
      ],
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      articles: [
        { q: "Is my scalp image data secure?", a: "Yes, all images are encrypted using AES-256 encryption both in transit and at rest. We are fully HIPAA compliant and never share your health data." },
        { q: "How long are my images stored?", a: "Images are stored for 30 days by default to allow progress tracking. You can delete them immediately after analysis or enable auto-delete in Settings." },
        { q: "Who can see my analysis results?", a: "Only you can see your results. If you use the doctor consultation feature, results are shared only with the consulting physician." },
      ],
    },
    {
      icon: Settings,
      title: "Technical Issues",
      articles: [
        { q: "The analysis is taking too long", a: "Analysis typically takes 30 seconds. If it's taking longer, check your internet connection. Try refreshing the page or uploading the image again." },
        { q: "My image keeps getting rejected", a: "Images must be clear, well-lit, and show the scalp area. Avoid blurry photos or images where hair covers the scalp completely." },
        { q: "The app isn't loading properly", a: "Try clearing your browser cache or using a different browser. HAIRSCOPAi works best on Chrome, Safari, or Firefox." },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Help Center - HAIRSCOPAi Support</title>
        <meta name="description" content="Find answers to common questions about HAIRSCOPAi. Get help with account setup, billing, privacy, and technical issues." />
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
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-primary">Help</span> Center
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Find answers to common questions and learn how to get the most out of HAIRSCOPAi.
              </p>
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search for help..."
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <div className="space-y-8">
              {categories.map((category, catIndex) => (
                <motion.section
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + catIndex * 0.05 }}
                  className="glass-card rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {category.articles.map((article, artIndex) => (
                      <AccordionItem key={artIndex} value={`${catIndex}-${artIndex}`}>
                        <AccordionTrigger className="text-left text-foreground hover:text-primary">
                          {article.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {article.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.section>
              ))}
            </div>

            {/* Still need help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12 glass-card rounded-2xl p-8"
            >
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-4">
                Our support team is available 24/7 to assist you.
              </p>
              <a href="/contact" className="text-primary font-medium hover:underline">
                Contact Support →
              </a>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HelpCenter;
