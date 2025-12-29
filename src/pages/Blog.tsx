import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const posts = [
    {
      title: "Understanding Male Pattern Baldness: Causes & Solutions",
      excerpt: "Learn about the science behind androgenetic alopecia, its genetic factors, and the most effective treatment options available today.",
      date: "Dec 28, 2024",
      readTime: "8 min read",
      category: "Hair Loss",
      image: "🧬",
    },
    {
      title: "The Ultimate Guide to Dandruff: Types, Causes & Treatments",
      excerpt: "Discover the different types of dandruff, what causes them, and evidence-based treatments to achieve a flake-free scalp.",
      date: "Dec 25, 2024",
      readTime: "6 min read",
      category: "Scalp Health",
      image: "❄️",
    },
    {
      title: "How AI is Revolutionizing Dermatology and Trichology",
      excerpt: "Explore how artificial intelligence is transforming the way we diagnose and treat hair and scalp conditions.",
      date: "Dec 22, 2024",
      readTime: "5 min read",
      category: "Technology",
      image: "🤖",
    },
    {
      title: "10 Foods That Promote Healthy Hair Growth",
      excerpt: "Nutrition plays a crucial role in hair health. Learn which foods are packed with the vitamins and minerals your hair needs.",
      date: "Dec 20, 2024",
      readTime: "4 min read",
      category: "Nutrition",
      image: "🥗",
    },
    {
      title: "Scalp Psoriasis vs Seborrheic Dermatitis: Key Differences",
      excerpt: "These two conditions often look similar but require different treatments. Learn how to tell them apart.",
      date: "Dec 18, 2024",
      readTime: "7 min read",
      category: "Conditions",
      image: "🔍",
    },
    {
      title: "The Science Behind Hair Growth Cycles",
      excerpt: "Understanding the anagen, catagen, and telogen phases can help you better care for your hair and identify problems early.",
      date: "Dec 15, 2024",
      readTime: "6 min read",
      category: "Education",
      image: "📊",
    },
  ];

  const categories = ["All", "Hair Loss", "Scalp Health", "Technology", "Nutrition", "Conditions", "Education"];

  return (
    <>
      <Helmet>
        <title>HAIRSCOPAi Blog - Hair & Scalp Health Tips</title>
        <meta name="description" content="Expert articles on hair loss, dandruff, scalp conditions, and the latest in AI-powered hair care technology." />
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
                HAIRSCOPAi <span className="text-primary">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Expert insights on hair health, scalp care, and the latest in AI-powered diagnostics.
              </p>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 justify-center mb-12"
            >
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </motion.div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="glass-card rounded-xl overflow-hidden group cursor-pointer"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl">
                    {post.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
