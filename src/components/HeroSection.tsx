import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Shield, Zap, Star, Snowflake } from "lucide-react";
import heroImage from "@/assets/hero-scalp-analysis.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI Hair Analysis Technology" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 gradient-hero opacity-95" />
      </div>
      
      {/* Winter decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Icy blue glows */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        
        {/* Frost overlay effect */}
        <div className="absolute inset-0 gradient-frost opacity-50" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Trust Badge - Winter themed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-primary/20 mb-6 frost-blur shadow-frost"
            >
              <Snowflake className="w-4 h-4 text-primary animate-pulse-soft" />
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">Winter Special - 50,000+ Users</span>
            </motion.div>

            {/* Headline - Winter styled */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-foreground">AI-Powered</span>
              <br />
              <span className="text-gradient-winter">Hair & Scalp</span>
              <br />
              <span className="text-foreground">Analysis</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Upload your scalp image and get instant, personalized insights about your hair health with AI-driven recommendations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Upload Image
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl" 
                className="group"
                onClick={() => document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Take Photo
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Results</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Main Card - Frosted glass effect */}
              <div className="relative bg-card/90 frost-blur rounded-3xl shadow-frost p-6 border border-primary/20 overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-32 gradient-primary opacity-10" />
                
                {/* Upload Area */}
                <div className="relative aspect-square rounded-2xl border-2 border-dashed border-primary/30 bg-secondary/50 flex flex-col items-center justify-center p-8 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-soft group-hover:shadow-medium transition-shadow group-hover:scale-105">
                    <Upload className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-foreground font-semibold mb-1">Drop your image here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>

                {/* Analysis Preview */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Hair Health Score</span>
                    <span className="text-sm font-bold text-primary">87%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: "87%" }} />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-card p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Detected</p>
                    <p className="text-sm font-semibold text-foreground">No Issues</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-card p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">AI Analysis</p>
                    <p className="text-sm font-semibold text-foreground">Complete</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
