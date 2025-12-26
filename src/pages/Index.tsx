import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import UploadSection from "@/components/UploadSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ScalpAI - AI-Powered Hair & Scalp Analysis | Instant Results</title>
        <meta 
          name="description" 
          content="Upload your scalp image and get instant AI-powered analysis. Detect dandruff, hair loss, scalp conditions & receive personalized treatment recommendations." 
        />
        <meta name="keywords" content="scalp analysis, hair health, AI diagnosis, dandruff detection, hair loss, scalp conditions, hair care" />
        <link rel="canonical" href="https://scalpai.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ScalpAI - AI-Powered Hair & Scalp Analysis" />
        <meta property="og:description" content="Get instant AI analysis of your scalp health with personalized treatment recommendations." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "ScalpAI",
            "applicationCategory": "HealthApplication",
            "description": "AI-powered hair and scalp analysis tool",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <HowItWorks />
          <FeaturesSection />
          <UploadSection />
          <PricingSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
