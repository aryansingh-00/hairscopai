import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import UploadSection from "@/components/UploadSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>HAIRSCOPAi - AI-Powered Hair & Scalp Analysis | Instant Diagnosis</title>
        <meta 
          name="description" 
          content="Get instant AI hair and scalp analysis. Detect dandruff, hair loss, scalp conditions and receive personalized treatment recommendations in 30 seconds. Free analysis available." 
        />
        <meta name="keywords" content="hair analysis, scalp analysis, AI hair diagnosis, dandruff detection, hair loss treatment, scalp health, trichology, hair care AI, scalp scanner, hair health check" />
        <link rel="canonical" href="https://hairscopai.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="HAIRSCOPAi - AI Hair & Scalp Analysis | Get Instant Results" />
        <meta property="og:description" content="Upload your scalp image and receive instant AI-powered analysis with personalized treatment recommendations. Trusted by 50,000+ users." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hairscopai.com" />
        <meta property="og:site_name" content="HAIRSCOPAi" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HAIRSCOPAi - AI Hair & Scalp Analysis" />
        <meta name="twitter:description" content="Get instant AI-powered hair and scalp analysis with personalized treatment recommendations." />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="HAIRSCOPAi" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "HAIRSCOPAi",
            "url": "https://hairscopai.com",
            "logo": "https://hairscopai.com/logo.png",
            "description": "AI-powered hair and scalp analysis platform",
            "sameAs": []
          })}
        </script>
        
        {/* Structured Data - SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "HAIRSCOPAi",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web Browser",
            "description": "AI-powered hair and scalp analysis tool for instant diagnosis and personalized treatment recommendations",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Free scalp analysis"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "50000",
              "bestRating": "5",
              "worstRating": "1"
            },
            "featureList": [
              "AI-powered scalp analysis",
              "Hair loss detection",
              "Dandruff identification",
              "Personalized treatment recommendations",
              "Progress tracking"
            ]
          })}
        </script>
        
        {/* Structured Data - FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How accurate is HAIRSCOPAi's AI analysis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "HAIRSCOPAi uses advanced machine learning models trained on millions of scalp images, achieving 98% accuracy in detecting common scalp conditions."
                }
              },
              {
                "@type": "Question",
                "name": "Is my scalp image data secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, HAIRSCOPAi is HIPAA compliant. Your images are encrypted and can be automatically deleted after analysis. We never share your data."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the analysis take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI provides comprehensive analysis results in under 30 seconds."
                }
              }
            ]
          })}
        </script>
        
        {/* Structured Data - WebSite with SearchAction */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "HAIRSCOPAi",
            "url": "https://hairscopai.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://hairscopai.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Background3D />
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
