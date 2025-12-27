import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Image, X, Loader2, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import AnalysisResults from "./AnalysisResults";

interface AnalysisResult {
  healthScore: number;
  conditions: Array<{ name: string; severity: 'mild' | 'moderate' | 'severe'; description: string }>;
  causes: Array<{ category: string; description: string }>;
  recommendations: Array<{ type: string; title: string; description: string }>;
  hairCareRoutine: { daily: string[]; weekly: string[]; monthly: string[] };
  dosAndDonts: { dos: string[]; donts: string[] };
  overallAssessment: string;
}

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

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

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to upload and analyze your scalp images.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

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

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setAnalysisResult(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to upload and analyze your scalp images.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to upload and analyze your scalp images.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    fileInputRef.current?.click();
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const startAnalysis = async () => {
    if (!preview || !user || !selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Upload image to storage first
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('scalp-images')
        .upload(fileName, selectedFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Failed to upload image');
      }

      // Analyze the image
      const { data, error } = await supabase.functions.invoke('analyze-scalp', {
        body: { imageBase64: preview },
      });

      if (error) {
        console.error('Analysis error:', error);
        throw new Error(error.message || 'Failed to analyze image');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysisResult(data);

      // Save scan to database with image URL
      const { error: saveError } = await supabase
        .from('scalp_scans')
        .insert({
          user_id: user.id,
          health_score: data.healthScore,
          conditions: data.conditions,
          recommendations: data.recommendations,
          causes: data.causes,
          hair_care_routine: data.hairCareRoutine,
          dos_and_donts: data.dosAndDonts,
          image_url: fileName,
        });

      if (saveError) {
        console.error('Failed to save scan:', saveError);
      }

      toast({
        title: "Analysis Complete!",
        description: `Your scalp health score is ${data.healthScore}%.`,
      });

    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
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
              capture="environment"
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
                  onClick={handleUploadClick}
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
                  
                  {!user ? (
                    <Button variant="hero" size="lg" onClick={(e) => { e.stopPropagation(); navigate('/auth'); }}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In to Upload
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        <Image className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                  )}
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
                  {!analysisResult && (
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
                  )}

                  {/* Analysis Results */}
                  {analysisResult && (
                    <AnalysisResults
                      healthScore={analysisResult.healthScore}
                      conditions={analysisResult.conditions}
                      causes={analysisResult.causes}
                      recommendations={analysisResult.recommendations}
                      hairCareRoutine={analysisResult.hairCareRoutine}
                      dosAndDonts={analysisResult.dosAndDonts}
                      overallAssessment={analysisResult.overallAssessment}
                    />
                  )}

                  {/* New Scan Button */}
                  {analysisResult && (
                    <Button
                      onClick={clearSelection}
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      Start New Analysis
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tips */}
            {!analysisResult && (
              <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm font-medium text-foreground mb-2">📸 Tips for best results:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ensure good lighting on your scalp</li>
                  <li>• Take the photo from 6-8 inches away</li>
                  <li>• Part your hair to expose the scalp clearly</li>
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;
