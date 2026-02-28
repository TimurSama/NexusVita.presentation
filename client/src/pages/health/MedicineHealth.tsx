import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { 
  Heart, TrendingUp, Target, Calendar, BarChart3,
  Plus, ChevronLeft, Settings, FileText
} from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MedicineHealth() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const userId = user.id.toString();
        const docsResponse = await fetch(`/api/users/${userId}/documents`);
        if (docsResponse.ok) {
          const docsData = await docsResponse.json();
          setDocuments(docsData.documents || []);
        }
      } catch (error) {
        console.error('Error fetching medicine data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container max-w-7xl px-4 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation('/health-center')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <SketchIcon icon="medicine" size={28} className="text-red-500" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Medicine</h1>
                <p className="text-foreground/60">Tests, diagnostics and treatment</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="engraved-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Documents</p>
                  <p className="text-3xl font-bold text-foreground">{documents.length}</p>
                  <p className="text-xs text-foreground/60 mt-1">Medical records</p>
                </div>
                <FileText className="w-12 h-12 text-red-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="engraved-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Tests</p>
                  <p className="text-3xl font-bold text-foreground">--</p>
                  <p className="text-xs text-foreground/60 mt-1">This month</p>
                </div>
                <Heart className="w-12 h-12 text-pink-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="engraved-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Treatment Plans</p>
                  <p className="text-3xl font-bold text-foreground">--</p>
                  <p className="text-xs text-foreground/60 mt-1">Active</p>
                </div>
                <Target className="w-12 h-12 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 engraved-tabs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Medical Overview</CardTitle>
                <CardDescription>Your medical data and indicators</CardDescription>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                  <div className="space-y-3">
                    {documents.slice(0, 5).map((doc, idx) => (
                      <div key={doc.id || idx} className="p-4 rounded-lg border border-border bg-card">
                        <h3 className="font-semibold text-foreground mb-1">{doc.title}</h3>
                        <p className="text-sm text-foreground/60 line-clamp-2">{doc.content}</p>
                        <p className="text-xs text-foreground/40 mt-2">
                          {new Date(doc.created_at).toLocaleDateString('en-US')}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                    <p className="text-foreground/60 mb-4">No medical documents</p>
                    <Button
                      variant="outline"
                      onClick={() => setLocation('/documents')}
                      className="engraved-button-outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Document
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Feature under development</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnosis" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Feature under development</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prevention" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Feature under development</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Settings under development</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
