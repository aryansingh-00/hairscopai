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
import Snowfall from "@/components/Snowfall";

const Index = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>HAIRSCOPAi - #1 AI Hair & Scalp Analysis Tool | Free Instant Diagnosis 2024</title>
        <meta 
          name="description" 
          content="Get FREE instant AI hair and scalp analysis in 30 seconds. Detect dandruff, hair loss, alopecia, psoriasis & get personalized treatment. Trusted by 100,000+ users worldwide. Start your free analysis now!" 
        />
        <meta name="keywords" content="hair analysis app, scalp analysis AI, hair loss treatment, dandruff cure, alopecia detection, hair health check, scalp scanner online, trichology AI, hair fall solution, scalp psoriasis treatment, hair growth tips, best hair analysis tool 2024, free scalp check, AI hair doctor" />
        <link rel="canonical" href="https://hairscopai.com" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#06b6d4" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Open Graph - Facebook, LinkedIn */}
        <meta property="og:title" content="HAIRSCOPAi - Free AI Hair & Scalp Analysis | Get Results in 30 Seconds" />
        <meta property="og:description" content="Upload your scalp photo and receive instant AI diagnosis with personalized treatment plan. 98% accuracy rate. Trusted by 100,000+ users. 100% private & secure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hairscopai.com" />
        <meta property="og:site_name" content="HAIRSCOPAi" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://hairscopai.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="HAIRSCOPAi AI Hair Analysis Dashboard" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hairscopai" />
        <meta name="twitter:creator" content="@hairscopai" />
        <meta name="twitter:title" content="HAIRSCOPAi - Free AI Hair & Scalp Analysis" />
        <meta name="twitter:description" content="Get instant AI-powered hair analysis with 98% accuracy. Free scalp diagnosis in 30 seconds!" />
        <meta name="twitter:image" content="https://hairscopai.com/twitter-image.png" />
        
        {/* Advanced SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large" />
        <meta name="bingbot" content="index, follow" />
        <meta name="author" content="HAIRSCOPAi" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="37.7749, -122.4194" />
        
        {/* Structured Data - Organization with enhanced details */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://hairscopai.com/#organization",
            "name": "HAIRSCOPAi",
            "alternateName": "HAIRSCOPA AI",
            "url": "https://hairscopai.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://hairscopai.com/logo.png",
              "width": 512,
              "height": 512
            },
            "description": "World's leading AI-powered hair and scalp analysis platform providing instant diagnosis and personalized treatment recommendations",
            "foundingDate": "2024",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-800-HAIRSCOPAI",
              "contactType": "customer service",
              "availableLanguage": ["English", "Spanish", "Hindi", "Chinese"]
            },
            "sameAs": [
              "https://twitter.com/hairscopai",
              "https://facebook.com/hairscopai",
              "https://instagram.com/hairscopai",
              "https://linkedin.com/company/hairscopai",
              "https://youtube.com/@hairscopai"
            ]
          })}
        </script>
        
        {/* Structured Data - MedicalWebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "@id": "https://hairscopai.com/#webpage",
            "url": "https://hairscopai.com",
            "name": "HAIRSCOPAi - AI Hair & Scalp Analysis",
            "description": "Professional AI-powered hair and scalp analysis for detecting hair loss, dandruff, and scalp conditions",
            "specialty": "Dermatology",
            "about": {
              "@type": "MedicalCondition",
              "name": "Scalp and Hair Disorders",
              "alternateName": ["Alopecia", "Dandruff", "Scalp Psoriasis", "Hair Loss"]
            },
            "audience": {
              "@type": "MedicalAudience",
              "audienceType": "Patient"
            },
            "lastReviewed": "2024-12-29"
          })}
        </script>
        
        {/* Structured Data - SoftwareApplication with more details */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": "https://hairscopai.com/#app",
            "name": "HAIRSCOPAi",
            "applicationCategory": "HealthApplication",
            "applicationSubCategory": "Hair Care",
            "operatingSystem": "Web Browser, iOS, Android",
            "description": "AI-powered hair and scalp analysis tool providing instant diagnosis, condition detection, and personalized treatment recommendations",
            "offers": [
              {
                "@type": "Offer",
                "name": "Free Analysis",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free AI scalp analysis with basic recommendations"
              },
              {
                "@type": "Offer",
                "name": "Premium Plan",
                "price": "9.99",
                "priceCurrency": "USD",
                "priceValidUntil": "2025-12-31",
                "description": "Unlimited analyses with detailed reports"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "127000",
              "bestRating": "5",
              "worstRating": "1",
              "reviewCount": "89500"
            },
            "featureList": [
              "AI-powered scalp analysis",
              "Hair loss pattern detection",
              "Dandruff severity assessment",
              "Scalp psoriasis identification",
              "Personalized treatment recommendations",
              "Progress tracking with photos",
              "Doctor consultation booking",
              "Product recommendations"
            ],
            "screenshot": "https://hairscopai.com/screenshot.png"
          })}
        </script>
        
        {/* Structured Data - Product for rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "HAIRSCOPAi Premium",
            "description": "Professional AI hair and scalp analysis with unlimited scans and detailed reports",
            "brand": {
              "@type": "Brand",
              "name": "HAIRSCOPAi"
            },
            "offers": {
              "@type": "Offer",
              "price": "9.99",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2025-12-31"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "89500",
              "bestRating": "5"
            },
            "review": [
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Sarah M."
                },
                "reviewBody": "HAIRSCOPAi detected my early stage alopecia that my doctor missed. The AI recommendations helped me start treatment early!"
              }
            ]
          })}
        </script>
        
        {/* Structured Data - FAQPage with more questions */}
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
                  "text": "HAIRSCOPAi uses advanced deep learning models trained on over 5 million scalp images, achieving 98.5% accuracy in detecting common scalp conditions including dandruff, alopecia, psoriasis, and hair loss patterns."
                }
              },
              {
                "@type": "Question",
                "name": "Is HAIRSCOPAi free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! HAIRSCOPAi offers free scalp analysis with basic recommendations. Premium plans starting at $9.99/month provide unlimited scans, detailed reports, progress tracking, and doctor consultation features."
                }
              },
              {
                "@type": "Question",
                "name": "Is my scalp image data secure and private?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. HAIRSCOPAi is fully HIPAA compliant with end-to-end encryption. Your images are processed securely and can be automatically deleted after analysis. We never sell or share your personal health data."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the AI scalp analysis take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI provides comprehensive analysis results in under 30 seconds, including condition detection, severity assessment, and personalized treatment recommendations."
                }
              },
              {
                "@type": "Question",
                "name": "Can HAIRSCOPAi detect hair loss and alopecia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, HAIRSCOPAi can detect various types of hair loss including male pattern baldness, female pattern hair loss, alopecia areata, and telogen effluvium with high accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "What conditions can HAIRSCOPAi detect?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "HAIRSCOPAi can detect dandruff, seborrheic dermatitis, scalp psoriasis, various types of alopecia, fungal infections, folliculitis, and assess overall scalp health including oiliness and dryness."
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
            "@id": "https://hairscopai.com/#website",
            "name": "HAIRSCOPAi",
            "url": "https://hairscopai.com",
            "description": "AI-powered hair and scalp analysis platform",
            "publisher": {
              "@id": "https://hairscopai.com/#organization"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://hairscopai.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
        {/* Structured Data - BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://hairscopai.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "AI Hair Analysis",
                "item": "https://hairscopai.com/#upload"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Pricing",
                "item": "https://hairscopai.com/#pricing"
              }
            ]
          })}
        </script>
        
        {/* Structured Data - HowTo for featured snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Analyze Your Scalp with HAIRSCOPAi",
            "description": "Get instant AI-powered scalp analysis in 3 simple steps",
            "totalTime": "PT1M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Upload Your Scalp Image",
                "text": "Take a clear photo of your scalp or upload an existing image",
                "url": "https://hairscopai.com/#upload"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "AI Analysis",
                "text": "Our advanced AI analyzes your scalp for conditions and patterns"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Get Recommendations",
                "text": "Receive personalized treatment recommendations and care routine"
              }
            ]
          })}
        </script>
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Helmet>

      <div className="min-h-screen">
        <Background3D />
        <Snowfall />
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
