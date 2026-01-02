import { motion } from 'framer-motion';
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
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
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

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      let yPos = 20;
      const leftMargin = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const contentWidth = pageWidth - 40;

      // Title
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Scalp Health Analysis Report', leftMargin, yPos);
      yPos += 15;

      // Date
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(128, 128, 128);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`, leftMargin, yPos);
      yPos += 15;

      // Health Score
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Health Score', leftMargin, yPos);
      yPos += 8;
      doc.setFontSize(32);
      const scoreColor = healthScore >= 80 ? [34, 197, 94] : healthScore >= 60 ? [234, 179, 8] : healthScore >= 40 ? [249, 115, 22] : [239, 68, 68];
      doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      doc.text(`${healthScore}%`, leftMargin, yPos);
      yPos += 10;

      // Overall Assessment
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const assessmentLines = doc.splitTextToSize(overallAssessment, contentWidth);
      doc.text(assessmentLines, leftMargin, yPos);
      yPos += assessmentLines.length * 6 + 10;

      // Detected Conditions
      if (conditions.length > 0) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Detected Conditions', leftMargin, yPos);
        yPos += 8;

        conditions.forEach((condition) => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(`• ${condition.name} (${condition.severity})`, leftMargin, yPos);
          yPos += 5;
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 100, 100);
          const descLines = doc.splitTextToSize(condition.description, contentWidth - 10);
          doc.text(descLines, leftMargin + 5, yPos);
          yPos += descLines.length * 5 + 5;
        });
        yPos += 5;
      }

      // Possible Causes
      if (causes.length > 0) {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Possible Causes', leftMargin, yPos);
        yPos += 8;

        causes.forEach((cause) => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(`• ${cause.category}`, leftMargin, yPos);
          yPos += 5;
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 100, 100);
          const descLines = doc.splitTextToSize(cause.description, contentWidth - 10);
          doc.text(descLines, leftMargin + 5, yPos);
          yPos += descLines.length * 5 + 5;
        });
        yPos += 5;
      }

      // Recommendations
      if (recommendations.length > 0) {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Recommendations', leftMargin, yPos);
        yPos += 8;

        recommendations.forEach((rec) => {
          if (yPos > 260) {
            doc.addPage();
            yPos = 20;
          }
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(`• ${rec.title} (${rec.type.replace('_', ' ')})`, leftMargin, yPos);
          yPos += 5;
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 100, 100);
          const descLines = doc.splitTextToSize(rec.description, contentWidth - 10);
          doc.text(descLines, leftMargin + 5, yPos);
          yPos += descLines.length * 5 + 5;
        });
        yPos += 5;
      }

      // Hair Care Routine
      if (yPos > 200) {
        doc.addPage();
        yPos = 20;
      }
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Hair Care Routine', leftMargin, yPos);
      yPos += 10;

      // Daily
      doc.setFontSize(12);
      doc.setTextColor(34, 197, 94);
      doc.text('Daily:', leftMargin, yPos);
      yPos += 6;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      hairCareRoutine.daily.forEach((item) => {
        const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
        doc.text(lines, leftMargin + 5, yPos);
        yPos += lines.length * 5;
      });
      yPos += 5;

      // Weekly
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(59, 130, 246);
      doc.text('Weekly:', leftMargin, yPos);
      yPos += 6;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      hairCareRoutine.weekly.forEach((item) => {
        const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
        doc.text(lines, leftMargin + 5, yPos);
        yPos += lines.length * 5;
      });
      yPos += 5;

      // Monthly
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(168, 85, 247);
      doc.text('Monthly:', leftMargin, yPos);
      yPos += 6;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      hairCareRoutine.monthly.forEach((item) => {
        const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
        doc.text(lines, leftMargin + 5, yPos);
        yPos += lines.length * 5;
      });
      yPos += 10;

      // Do's and Don'ts
      if (yPos > 200) {
        doc.addPage();
        yPos = 20;
      }
      
      // Do's
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 197, 94);
      doc.text("Do's", leftMargin, yPos);
      yPos += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      dosAndDonts.dos.forEach((item) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const lines = doc.splitTextToSize(`✓ ${item}`, contentWidth - 5);
        doc.text(lines, leftMargin + 5, yPos);
        yPos += lines.length * 5;
      });
      yPos += 8;

      // Don'ts
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(239, 68, 68);
      doc.text("Don'ts", leftMargin, yPos);
      yPos += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      dosAndDonts.donts.forEach((item) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const lines = doc.splitTextToSize(`✗ ${item}`, contentWidth - 5);
        doc.text(lines, leftMargin + 5, yPos);
        yPos += lines.length * 5;
      });

      // Disclaimer
      doc.addPage();
      yPos = 20;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(128, 128, 128);
      const disclaimer = 'Disclaimer: This analysis is for informational purposes only and is not a substitute for professional medical advice. Please consult a dermatologist for proper diagnosis and treatment.';
      const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
      doc.text(disclaimerLines, leftMargin, yPos);

      // Save the PDF
      doc.save(`scalp-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Health Score Card */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Hair Health Score</h3>
              <p className="text-sm text-muted-foreground">Based on AI analysis</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadPDF}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
        
        <div className="flex items-center gap-6">
          <div className={`text-5xl font-extrabold ${getScoreColor()}`}>
            {healthScore}%
          </div>
          <div className="flex-1">
            <div className="h-4 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${healthScore}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
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
    </motion.div>
  );
};

export default AnalysisResults;
