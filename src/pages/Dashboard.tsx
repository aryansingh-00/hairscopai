import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, TrendingUp, TrendingDown, Minus, ChevronRight, Activity } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import AnalysisResults from "@/components/AnalysisResults";

interface ScalpScan {
  id: string;
  created_at: string;
  health_score: number | null;
  image_url: string | null;
  conditions: Array<{ name: string; severity: 'mild' | 'moderate' | 'severe'; description: string }>;
  causes: Array<{ category: string; description: string }>;
  recommendations: Array<{ type: string; title: string; description: string }>;
  hair_care_routine: { daily: string[]; weekly: string[]; monthly: string[] };
  dos_and_donts: { dos: string[]; donts: string[] };
}

const ScanImage = ({ imagePath, className, alt }: { imagePath: string; className?: string; alt: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      const { data, error } = await supabase.storage.from('scalp-images').createSignedUrl(imagePath, 3600);
      if (!error && data) {
        setImageUrl(data.signedUrl);
      }
    };
    loadImage();
  }, [imagePath]);

  if (!imageUrl) {
    return <div className={`${className} bg-muted animate-pulse`} />;
  }

  return <img src={imageUrl} alt={alt} className={className} />;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [scans, setScans] = useState<ScalpScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScan, setSelectedScan] = useState<ScalpScan | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchScans();
    }
  }, [user]);

  const fetchScans = async () => {
    try {
      const { data, error } = await supabase
        .from('scalp_scans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedScans = (data || []).map(scan => ({
        ...scan,
        conditions: (scan.conditions as any) || [],
        causes: (scan.causes as any) || [],
        recommendations: (scan.recommendations as any) || [],
        hair_care_routine: (scan.hair_care_routine as any) || { daily: [], weekly: [], monthly: [] },
        dos_and_donts: (scan.dos_and_donts as any) || { dos: [], donts: [] },
      }));

      setScans(formattedScans);
    } catch (error) {
      console.error('Error fetching scans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTrend = (currentIndex: number) => {
    if (currentIndex >= scans.length - 1) return null;
    const current = scans[currentIndex].health_score;
    const previous = scans[currentIndex + 1].health_score;
    if (!current || !previous) return null;
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'same';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Scan History - ScalpAI</title>
        <meta name="description" content="View your scalp analysis history and track your hair health improvement over time." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Scan History</h1>
                <p className="text-sm text-muted-foreground">{scans.length} scans</p>
              </div>
            </div>
            <Button variant="hero" onClick={() => navigate('/#analyze')}>
              New Scan
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {selectedScan ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Button variant="ghost" onClick={() => setSelectedScan(null)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to History
              </Button>

              <div className="flex flex-col md:flex-row gap-6">
                {selectedScan.image_url && (
                  <div className="w-full md:w-1/3">
                    <ScanImage
                      imagePath={selectedScan.image_url}
                      alt="Scalp scan"
                      className="w-full rounded-2xl object-cover aspect-square"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">{formatDate(selectedScan.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-bold text-gradient">{selectedScan.health_score}%</span>
                    <span className="text-muted-foreground">Health Score</span>
                  </div>
                </div>
              </div>

              <AnalysisResults
                healthScore={selectedScan.health_score || 0}
                conditions={selectedScan.conditions}
                causes={selectedScan.causes}
                recommendations={selectedScan.recommendations}
                hairCareRoutine={selectedScan.hair_care_routine}
                dosAndDonts={selectedScan.dos_and_donts}
                overallAssessment=""
              />
            </motion.div>
          ) : (
            <>
              {/* Stats Overview */}
              {scans.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                >
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Latest Score</span>
                    </div>
                    <p className={`text-3xl font-bold ${getScoreColor(scans[0]?.health_score)}`}>
                      {scans[0]?.health_score || 0}%
                    </p>
                  </Card>
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Best Score</span>
                    </div>
                    <p className="text-3xl font-bold text-green-500">
                      {Math.max(...scans.map(s => s.health_score || 0))}%
                    </p>
                  </Card>
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Total Scans</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{scans.length}</p>
                  </Card>
                </motion.div>
              )}

              {/* Scan List */}
              {scans.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                    <Activity className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">No Scans Yet</h2>
                  <p className="text-muted-foreground mb-6">Start your first scalp analysis to track your hair health</p>
                  <Button variant="hero" onClick={() => navigate('/#analyze')}>
                    Start Your First Scan
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground mb-4">All Scans</h2>
                  {scans.map((scan, index) => {
                    const trend = getTrend(index);
                    return (
                      <motion.div
                        key={scan.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card
                          className="p-4 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedScan(scan)}
                        >
                          <div className="flex items-center gap-4">
                            {scan.image_url ? (
                              <ScanImage
                                imagePath={scan.image_url}
                                alt="Scan preview"
                                className="w-16 h-16 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                                <Activity className="w-6 h-6 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-2xl font-bold ${getScoreColor(scan.health_score)}`}>
                                  {scan.health_score}%
                                </span>
                                {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                                {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                                {trend === 'same' && <Minus className="w-4 h-4 text-muted-foreground" />}
                              </div>
                              <p className="text-sm text-muted-foreground">{formatDate(scan.created_at)}</p>
                              {scan.conditions.length > 0 && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {scan.conditions.length} condition{scan.conditions.length > 1 ? 's' : ''} detected
                                </p>
                              )}
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;