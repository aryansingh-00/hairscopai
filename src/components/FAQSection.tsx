import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate is the AI scalp analysis?",
    answer: "Our AI has been trained on over 5 million scalp images and achieves 94% accuracy in detecting common scalp conditions. However, please note this is not a medical diagnosis and should be used for informational purposes only.",
  },
  {
    question: "Is my data and images secure?",
    answer: "Absolutely. We use bank-level encryption for all data transfers. Your images are analyzed in real-time and automatically deleted from our servers within 24 hours. We never share or sell your personal data.",
  },
  {
    question: "What conditions can ScalpAI detect?",
    answer: "Our AI can identify over 20 scalp conditions including dandruff, dryness, oiliness, hair thinning, bald patches, scalp redness, fungal infections, and overall hair health metrics.",
  },
  {
    question: "Can I use this instead of seeing a dermatologist?",
    answer: "ScalpAI is designed to help you understand your scalp health and is not a replacement for professional medical advice. For serious concerns, we always recommend consulting with a qualified dermatologist.",
  },
  {
    question: "How often should I scan my scalp?",
    answer: "We recommend weekly scans to track progress and monitor changes. With our Premium plan, you get unlimited scans and can see your improvement over time with our tracking dashboard.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes! We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied with our service, contact our support team for a full refund.",
  },
  {
    question: "What image quality do I need?",
    answer: "For best results, use a smartphone camera in good lighting. The image should be clear, well-lit, and taken from about 6-8 inches away with your scalp clearly visible through parted hair.",
  },
  {
    question: "Can I use ScalpAI on mobile devices?",
    answer: "Yes! ScalpAI works seamlessly on all devices - desktop, tablet, and mobile. You can take photos directly using your device's camera or upload existing images.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border px-6 shadow-card data-[state=open]:shadow-medium transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="#contact" className="text-primary font-medium hover:underline">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
