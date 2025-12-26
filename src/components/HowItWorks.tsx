import { motion } from "framer-motion";
import { Upload, Cpu, FileText, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Image",
    description: "Take a clear photo of your scalp or upload an existing image. Our system accepts all common formats.",
    color: "primary",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our advanced AI examines your scalp for 20+ conditions including dandruff, dryness, thinning, and more.",
    color: "accent",
  },
  {
    icon: FileText,
    title: "Get Your Report",
    description: "Receive a detailed health report with personalized treatment recommendations and care routines.",
    color: "primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get your personalized hair health analysis in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                {/* Step Number & Icon */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-2xl ${step.color === "accent" ? "gradient-accent" : "gradient-primary"} flex items-center justify-center shadow-medium`}>
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-foreground">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden mt-6">
                    <ArrowRight className="w-6 h-6 text-primary/40 rotate-90" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
