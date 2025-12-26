import { motion } from "framer-motion";
import { 
  Brain, 
  Shield, 
  Zap, 
  Heart, 
  Clock, 
  Sparkles,
  Lock,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Detection",
    description: "Powered by deep learning models trained on millions of scalp images for accurate diagnosis.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your images are encrypted and automatically deleted after analysis. We never share your data.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get comprehensive analysis results in under 30 seconds with detailed explanations.",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Receive customized treatment plans based on your specific scalp conditions and hair type.",
  },
  {
    icon: Clock,
    title: "Track Progress",
    description: "Monitor your hair health journey with before/after comparisons and improvement metrics.",
  },
  {
    icon: Sparkles,
    title: "Expert Recommendations",
    description: "Get product suggestions and home remedies curated by dermatology experts.",
  },
  {
    icon: Lock,
    title: "GDPR Compliant",
    description: "Full compliance with international privacy regulations for your peace of mind.",
  },
  {
    icon: TrendingUp,
    title: "Health Scoring",
    description: "Understand your overall hair health with our proprietary scoring system.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Advanced technology meets personalized care for your hair health
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-soft group-hover:shadow-medium transition-shadow">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
