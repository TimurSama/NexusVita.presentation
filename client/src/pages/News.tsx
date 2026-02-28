import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { Heart, MessageCircle, Share2, BookOpen, Activity, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface NewsPost {
  id: number;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  type: 'post' | 'achievement' | 'article' | 'tip';
}

export default function News() {
  const { user } = useUser();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load news feed with scientific research and platform updates
    const loadNews = () => {
      const newsFeed: NewsPost[] = [
        // Platform News - Investment
        {
          id: 1,
          author: {
            id: 0,
            name: 'EthosLife Team',
            avatar: '/logo.png',
          },
          content: `🚀 Investment Opportunity: Join the future health ecosystem!

We are opening an investment round for the development of the EthosLife platform. Your investments will help us:
• Launch a full-featured alpha version
• Develop an AI health assistant
• Open the first physical health centers
• Create tokenomics and DAO

Minimum investment: $1,000
Expected return: 300% over 3 years

Contact us: invest@ethoslife.io`,
          likes: 128,
          comments: 45,
          shares: 67,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          type: 'article',
        },
        // Platform News - Alpha Release
        {
          id: 2,
          author: {
            id: 0,
            name: 'EthosLife Team',
            avatar: '/logo.png',
          },
          content: `🎉 Coming Soon: EthosLife Alpha Release!

What will be in the first version:
✅ 7 health directions with trackers
✅ AI assistant for personal recommendations
✅ Health social network
✅ Telegram integration
✅ ELT token and reward system
✅ Specialist database and online consultations

Release date: March 2026
Join the waitlist!`,
          likes: 256,
          comments: 89,
          shares: 134,
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          type: 'article',
        },
        // Scientific Research - Movement
        {
          id: 3,
          author: {
            id: 0,
            name: 'Science Department',
            avatar: '/logo.png',
          },
          content: `📊 Research: 10,000 steps per day reduces mortality risk by 50%

New research from Journal of American Medical Association (2025):
• 78,000 participants, 7 years of observation
• 10,000+ steps = 52% reduction in heart disease risk
• Even 4,000 steps provide significant effect
• Walking speed matters more than quantity

Conclusion: Start with an achievable number of steps and gradually increase the pace.

#Movement #Health #Research`,
          likes: 89,
          comments: 23,
          shares: 45,
          createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          type: 'article',
        },
        // Scientific Research - Sleep
        {
          id: 4,
          author: {
            id: 0,
            name: 'Science Department',
            avatar: '/logo.png',
          },
          content: `😴 Sleep and Brain: 7-8 hours is optimal for cognitive function

Nature Aging research (2025):
• People with 7-8 hours of sleep show better memory test results
• Sleep deprivation (<6h) accelerates brain aging by 2-3 years
• Oversleeping (>9h) is associated with cognitive decline
• Consistency matters more than duration

Tip: Go to bed and wake up at the same time even on weekends.

#Sleep #Brain #Research`,
          likes: 156,
          comments: 34,
          shares: 78,
          createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          type: 'article',
        },
        // Scientific Research - Nutrition
        {
          id: 5,
          author: {
            id: 0,
            name: 'Science Department',
            avatar: '/logo.png',
          },
          content: `🥗 Mediterranean Diet Reduces Depression Risk by 33%

Meta-analysis of 45 studies (2025):
• 12,000 participants from 8 countries
• Fish, nuts, olive oil, vegetables — key products
• Effect noticeable after just 3 months
• Connection through gut microbiome

Simple steps:
1. Replace butter with olive oil
2. Add a handful of nuts per day
3. Eat fish 2 times a week

#Nutrition #Psychology #Research`,
          likes: 112,
          comments: 28,
          shares: 56,
          createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
          type: 'article',
        },
        // Scientific Research - Psychology
        {
          id: 6,
          author: {
            id: 0,
            name: 'Science Department',
            avatar: '/logo.png',
          },
          content: `🧘 Meditation Changes Brain Structure in 8 Weeks

Harvard Medical School research (2025):
• MRI before and after 8-week meditation course
• Increased gray matter in hippocampus (memory)
• Reduced amygdala activity (anxiety)
• Effect lasts 6+ months

Just 10-15 minutes per day:
• Mindful breathing
• Body scan
• Loving-kindness meditation

#Psychology #Meditation #Brain`,
          likes: 203,
          comments: 56,
          shares: 112,
          createdAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
          type: 'article',
        },
        // Scientific Research - Medicine
        {
          id: 7,
          author: {
            id: 0,
            name: 'Science Department',
            avatar: '/logo.png',
          },
          content: `🩺 Early Detection: 5 Tests to Take Annually

WHO and American Cardiologists recommendations (2025):

1. Complete blood count — anemia, inflammation
2. Lipid profile — cholesterol (starting at age 20)
3. Glycated hemoglobin — prediabetes
4. Vitamin D — 80% of population is deficient
5. TSH — thyroid gland

💡 Tip: Schedule a "health day" — get all tests in one visit.

#Medicine #Prevention #Health`,
          likes: 178,
          comments: 41,
          shares: 89,
          createdAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
          type: 'article',
        },
        // Scientific Research - Social Health
        {
          id: 8,
          author: {
            id: 0,
            name: 'Science Department',
            avatar: '/logo.png',
          },
          content: `👥 Loneliness is More Dangerous Than Smoking: +45% Mortality Risk

Largest PNAS research study (2025):
• 580,000 participants, 15 years
• Social isolation = risk equivalent to 15 cigarettes per day
• Quality of connections matters more than quantity
• Even online communication provides protective effect

Conclusions:
• Maintain 3-5 close relationships
• Communicate regularly (at least once every 2 weeks)
• Join communities of interest

#SocialHealth #Communication #Research`,
          likes: 245,
          comments: 67,
          shares: 156,
          createdAt: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
          type: 'article',
        },
      ];
      
      setPosts(newsFeed);
      setLoading(false);
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container max-w-full px-4 py-6 md:py-8 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">News</h1>
          <p className="text-foreground/60">
            Activity feed and updates
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <Card className="engraved-card">
            <CardContent className="py-12 text-center">
              <BookOpen className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Feed is empty
              </h3>
              <p className="text-foreground/60 mb-4">
                News from friends, achievements, and useful articles will appear here
              </p>
              <Button
                variant="outline"
                className="engraved-button-outline"
                onClick={() => window.location.href = '/social/friends'}
              >
                Find Friends
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="engraved-card"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {post.author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{post.author.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {new Date(post.createdAt).toLocaleDateString('en-US')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4 whitespace-pre-line">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center gap-4 text-foreground/60">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      {post.shares}
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
