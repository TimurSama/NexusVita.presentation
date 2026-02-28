import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Star, Calendar, Users, Gift, Share2, 
  Building2, Activity, Heart, Sparkles, Copy, Check
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Centers() {
  const [activeTab, setActiveTab] = useState('all');
  const [referralCopied, setReferralCopied] = useState(false);
  const referralCode = 'ETHOS2025-USER123';

  const centerTypes = [
    { id: 'all', label: 'All' },
    { id: 'gym', label: 'Gyms' },
    { id: 'medical', label: 'Medical' },
    { id: 'spa', label: 'Spa & Wellness' },
    { id: 'yoga', label: 'Yoga Studios' },
    { id: 'pool', label: 'Pools' },
  ];

  const centers = [
    {
      id: '1',
      name: 'Fitness Pro Premium',
      type: 'gym',
      address: 'Lenin Street, 15',
      rating: 4.8,
      reviews: 234,
      distance: '1.2 km',
      image: '',
      services: ['Gym', 'Group Classes', 'Personal Training'],
      price: '$99/month',
      hasMembership: true,
      membershipExpires: '2025-06-15',
    },
    {
      id: '2',
      name: 'Health Medical Center',
      type: 'medical',
      address: 'Peace Ave, 42',
      rating: 4.9,
      reviews: 567,
      distance: '2.5 km',
      image: '',
      services: ['Examinations', 'Consultations', 'Tests'],
      price: 'From $50',
      hasMembership: false,
    },
    {
      id: '3',
      name: 'Spa & Wellness "Relax"',
      type: 'spa',
      address: 'Pushkin Street, 8',
      rating: 4.7,
      reviews: 189,
      distance: '3.1 km',
      image: '',
      services: ['Massage', 'SPA Treatments', 'Sauna'],
      price: 'From $80',
      hasMembership: false,
    },
  ];

  const filteredCenters = activeTab === 'all'
    ? centers
    : centers.filter(c => c.type === activeTab);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://ethoslife.com/ref/${referralCode}`);
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 engraved-text">Centers</h1>
          <p className="text-foreground/60">
            Gyms, medical centers, spas, and other health facilities
          </p>
        </motion.div>

        {/* Referral Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="engraved-card bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg engraved-text mb-1">Referral Program</h3>
                    <p className="text-sm text-foreground/70">
                      Invite a friend and get bonuses!
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 bg-background rounded-lg border border-border">
                    <code className="text-sm font-mono">{referralCode}</code>
                  </div>
                  <Button
                    onClick={handleCopyReferral}
                    variant={referralCopied ? "default" : "outline"}
                    className={referralCopied ? "engraved-button" : "engraved-button-outline"}
                  >
                    {referralCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="engraved-button-outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 space-y-4"
        >
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                placeholder="Search centers..."
                className="pl-10 engraved-input"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48 engraved-input">
                <SelectValue placeholder="Center Type" />
              </SelectTrigger>
              <SelectContent>
                {centerTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            {centerTypes.map((type) => (
              <TabsTrigger key={type.id} value={type.id}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Centers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCenters.map((center, idx) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Card className="engraved-card hover:scale-105 transition-transform h-full flex flex-col">
                <div className="relative">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-foreground/20" />
                  </div>
                  {center.hasMembership && (
                    <Badge className="absolute top-2 right-2 engraved-badge bg-green-500">
                      Membership Active
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="engraved-text">{center.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {center.address} • {center.distance}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{center.rating}</span>
                    <span className="text-sm text-foreground/60">({center.reviews})</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-1">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {center.services.map((service, sIdx) => (
                          <Badge key={sIdx} variant="secondary" className="engraved-badge text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{center.price}</span>
                      {center.hasMembership && (
                        <span className="text-xs text-foreground/60">
                          Until {new Date(center.membershipExpires).toLocaleDateString('en-US')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 engraved-button">
                      <Calendar className="w-4 h-4 mr-2" />
                      {center.hasMembership ? 'Book' : 'Attach Membership'}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="engraved-button-outline">
                          <Users className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Invite a Friend</DialogTitle>
                          <DialogDescription>
                            Send an invitation to a friend for this center
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Friend's Email</Label>
                            <Input placeholder="friend@example.com" className="engraved-input" />
                          </div>
                          <div>
                            <Label>Message (optional)</Label>
                            <Textarea
                              placeholder="Hi! Join me at..."
                              className="engraved-input"
                            />
                          </div>
                          <Button className="w-full engraved-button">
                            <Share2 className="w-4 h-4 mr-2" />
                            Send Invitation
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
