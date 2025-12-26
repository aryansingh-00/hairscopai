import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Image, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis - in production this would call the AI backend
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Your scalp health report is ready. Connect to Lovable Cloud to enable AI analysis.",
      });
    }, 3000);
  };

  return (
    <section id="analyze" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Start Now
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Analyze Your <span className="text-gradient">Scalp</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload a clear image of your scalp for instant AI-powered analysis
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-medium border border-border p-6 md:p-8">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />

            <AnimatePresence mode="wait">
              {!preview ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    aspect-video rounded-2xl border-2 border-dashed cursor-pointer
                    flex flex-col items-center justify-center p-8 transition-all duration-300
                    ${dragActive 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/50"
                    }
                  `}
                >
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-soft">
                    <Upload className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-1">
                    {dragActive ? "Drop your image here" : "Drop your scalp image here"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                  <div className="flex gap-4">
                    <Button variant="secondary" size="sm">
                      <Image className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Preview Image */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={preview}
                      alt="Scalp preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={clearSelection}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </button>
                    
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
                        <p className="text-foreground font-medium">Analyzing your scalp...</p>
                        <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Image className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground truncate max-w-[200px]">
                          {selectedFile?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button onClick={clearSelection} variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={startAnalysis}
                      disabled={isAnalyzing}
                      variant="hero"
                      size="lg"
                      className="flex-1"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Start AI Analysis"
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tips */}
            <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-sm font-medium text-foreground mb-2">📸 Tips for best results:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure good lighting on your scalp</li>
                <li>• Take the photo from 6-8 inches away</li>
                <li>• Part your hair to expose the scalp clearly</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;
