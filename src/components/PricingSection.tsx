import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    description: "Perfect for trying out our AI analysis",
    icon: Sparkles,
    features: [
      "1 scalp scan per month",
      "Basic health score",
      "General recommendations",
      "Email support",
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    description: "Complete hair care solution",
    icon: Crown,
    features: [
      "Unlimited scalp scans",
      "Detailed health reports",
      "Personalized treatment plans",
      "Progress tracking",
      "Product recommendations",
      "Priority support",
      "Before/after comparison",
    ],
    cta: "Get Premium",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Professional",
    price: "$29.99",
    period: "/month",
    description: "For clinics and professionals",
    icon: Crown,
    features: [
      "Everything in Premium",
      "Multiple user profiles",
      "API access",
      "White-label reports",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your hair care journey
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-accent text-accent-foreground text-sm font-medium shadow-soft">
                  Most Popular
                </div>
              )}

              <div className={`
                h-full rounded-3xl p-6 md:p-8 border transition-all duration-300
                ${plan.popular 
                  ? "bg-card shadow-medium border-primary/30" 
                  : "bg-card shadow-card border-border hover:shadow-medium hover:border-primary/20"
                }
              `}>
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`
                    w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center
                    ${plan.popular ? "gradient-primary shadow-soft" : "bg-secondary"}
                  `}>
                    <plan.icon className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`
                        w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                        ${plan.popular ? "gradient-primary" : "bg-primary/10"}
                      `}>
                        <Check className={`w-3 h-3 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={plan.variant}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          ✨ All plans include a 14-day money-back guarantee. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
