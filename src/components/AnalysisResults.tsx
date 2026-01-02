import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Activity, 
  AlertCircle, 
  Lightbulb, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  Droplets,
  Leaf,
  Pill,
  Heart,
  Download,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface Condition {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
}

interface Cause {
  category: string;
  description: string;
}

interface Recommendation {
  type: string;
  title: string;
  description: string;
}

interface HairCareRoutine {
  daily: string[];
  weekly: string[];
  monthly: string[];
}

interface DosAndDonts {
  dos: string[];
  donts: string[];
}

interface AnalysisResultsProps {
  healthScore: number;
  conditions: Condition[];
  causes: Cause[];
  recommendations: Recommendation[];
  hairCareRoutine: HairCareRoutine;
  dosAndDonts: DosAndDonts;
  overallAssessment: string;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'mild':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'moderate':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'severe':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getRecommendationIcon = (type: string) => {
  switch (type) {
    case 'home_remedy':
      return Leaf;
    case 'product':
      return Droplets;
    case 'medical':
      return Pill;
    case 'lifestyle':
      return Heart;
    default:
      return Lightbulb;
  }
};

const AnalysisResults = ({
  healthScore,
  conditions,
  causes,
  recommendations,
  hairCareRoutine,
  dosAndDonts,
  overallAssessment,
}: AnalysisResultsProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getScoreColor = () => {
    if (healthScore >= 80) return 'text-green-600';
    if (healthScore >= 60) return 'text-yellow-600';
    if (healthScore >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreGradient = () => {
    if (healthScore >= 80) return 'from-green-500 to-emerald-400';
    if (healthScore >= 60) return 'from-yellow-500 to-amber-400';
    if (healthScore >= 40) return 'from-orange-500 to-amber-500';
    return 'from-red-500 to-rose-400';
  };

  const downloadPDF = async () => {
    if (!contentRef.current) return;
    
    setIsGenerating(true);
    toast.info('Generating PDF...', { duration: 2000 });

    try {
      const element = contentRef.current;
      
      // Create canvas from the content
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`scalp-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Download Button - Fixed at top */}
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={downloadPDF}
          disabled={isGenerating}
          className="gap-2"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
      </div>

      {/* Content to be captured for PDF */}
      <div ref={contentRef} className="space-y-6 bg-background p-4 rounded-2xl">
        {/* Health Score Card */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Hair Health Score</h3>
              <p className="text-sm text-muted-foreground">Based on AI analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className={`text-5xl font-extrabold ${getScoreColor()}`}>
              {healthScore}%
            </div>
            <div className="flex-1">
              <div className="h-4 bg-secondary rounded-full overflow-hidden">
                <div
                  style={{ width: `${healthScore}%` }}
                  className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient()}`}
                />
              </div>
            </div>
          </div>

          <p className="mt-4 text-muted-foreground">{overallAssessment}</p>
        </div>

        {/* Detected Conditions */}
        {conditions.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-lg text-foreground">Detected Conditions</h3>
            </div>
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSeverityColor(condition.severity)}`}>
                    {condition.severity}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{condition.name}</p>
                    <p className="text-sm text-muted-foreground">{condition.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Possible Causes */}
        {causes.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-foreground">Possible Causes</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {causes.map((cause, index) => (
                <div key={index} className="p-3 rounded-xl bg-secondary/50">
                  <span className="text-xs font-medium text-primary uppercase">{cause.category}</span>
                  <p className="text-sm text-foreground mt-1">{cause.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-lg text-foreground">Recommendations</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, index) => {
                const Icon = getRecommendationIcon(rec.type);
                return (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{rec.title}</p>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Hair Care Routine */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-foreground">Hair Care Routine</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <h4 className="font-medium text-green-700 mb-2">Daily</h4>
              <ul className="space-y-1">
                {hairCareRoutine.daily.map((item, i) => (
                  <li key={i} className="text-sm text-green-600">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <h4 className="font-medium text-blue-700 mb-2">Weekly</h4>
              <ul className="space-y-1">
                {hairCareRoutine.weekly.map((item, i) => (
                  <li key={i} className="text-sm text-blue-600">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
              <h4 className="font-medium text-purple-700 mb-2">Monthly</h4>
              <ul className="space-y-1">
                {hairCareRoutine.monthly.map((item, i) => (
                  <li key={i} className="text-sm text-purple-600">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-lg text-foreground">Do's</h3>
            </div>
            <ul className="space-y-2">
              {dosAndDonts.dos.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-lg text-foreground">Don'ts</h3>
            </div>
            <ul className="space-y-2">
              {dosAndDonts.donts.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            ⚠️ <strong>Disclaimer:</strong> This analysis is for informational purposes only and is not a substitute for professional medical advice. 
            Please consult a dermatologist for proper diagnosis and treatment.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResults;