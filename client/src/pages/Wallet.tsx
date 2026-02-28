import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Wallet as WalletIcon,
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
  RefreshCw,
  Send,
  QrCode,
  Copy,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TokenBalance {
  balance: number;
  total_earned: number;
  total_spent: number;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  created_at: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function Wallet() {
  const [, setLocation] = useLocation();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [balance, setBalance] = useState<TokenBalance>({
    balance: 0,
    total_earned: 0,
    total_spent: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    if (token) {
      loadWalletData();
    }
  }, [token]);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      
      const res = await fetch('/api/payments/tokens/balance', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setBalance({
          balance: data.balance || 0,
          total_earned: data.total_earned || 0,
          total_spent: data.total_spent || 0,
        });
        setTransactions(data.transactions || []);
      }

      // Get referral code
      const userRes = await fetch('/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        setReferralCode(userData.user.referral_code || '');
      }
    } catch (error) {
      console.error('Wallet load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!sendAmount || !recipient) {
      toast({
        title: "Error",
        description: "Please specify amount and recipient",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch('/api/payments/tokens/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(sendAmount),
          recipient_username: recipient,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Transfer failed');
      }

      toast({
        title: "Success",
        description: `Sent ${sendAmount} UNITY`,
      });

      setSendAmount("");
      setRecipient("");
      loadWalletData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const copyReferralCode = () => {
    const url = `${window.location.origin}/register?ref=${referralCode}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied",
      description: "Referral link copied to clipboard",
    });
  };

  const getTransactionIcon = (type: string, description: string) => {
    if (description.includes('referral') || description.includes('referral')) {
      return <Gift className="w-5 h-5 text-purple-500" />;
    }
    if (type === 'credit') {
      return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
    }
    return <ArrowUpRight className="w-5 h-5 text-red-500" />;
  };

  const getTransactionStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Sign in to view your wallet</p>
          <Button onClick={() => setLocation("/login")}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Your Balance</p>
              <h1 className="text-3xl font-bold">{balance.balance.toLocaleString()} UNITY</h1>
              <p className="text-white/80 text-sm">≈ ${(balance.balance * 0.1176).toFixed(2)} USD</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <WalletIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">+{balance.total_earned.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">Total Received</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-red-600">-{balance.total_spent.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">Total Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-3 gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Send className="w-6 h-6" />
                  <span className="text-sm">Send</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send UNITY</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Recipient (username)</Label>
                    <Input
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <Label>Amount (UNITY)</Label>
                    <Input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      placeholder="100"
                      min={1}
                    />
                  </div>
                  <Button onClick={handleSend} className="w-full">
                    Send
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => setLocation('/pricing')}
            >
              <RefreshCw className="w-6 h-6" />
              <span className="text-sm">Buy</span>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <QrCode className="w-6 h-6" />
                  <span className="text-sm">QR Code</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Your QR Code</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center py-4">
                  <div className="w-48 h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500 mt-4">Scan to transfer</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Referral Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5" />
                    <span className="font-semibold">Referral Program</span>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    Invite friends and get 20% from their first purchase
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="bg-white/20 px-3 py-1.5 rounded-lg text-sm">
                      {referralCode || 'Loading...'}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={copyReferralCode}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">+500</p>
                  <p className="text-sm text-white/80">UNITY per friend</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Transaction History</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="in">Incoming</TabsTrigger>
                <TabsTrigger value="out">Outgoing</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-3">
              {transactions.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <RefreshCw className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p className="text-slate-500">No transactions yet</p>
                    <p className="text-sm text-slate-400 mt-1">
                      Start using UNITY to pay for subscriptions
                    </p>
                  </CardContent>
                </Card>
              ) : (
                transactions.map((tx) => (
                  <Card key={tx.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                            {getTransactionIcon(tx.type, tx.description)}
                          </div>
                          <div>
                            <p className="font-medium">{tx.description}</p>
                            <p className="text-xs text-slate-500">
                              {new Date(tx.created_at).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.type === 'credit' ? '+' : '-'}{tx.amount} UNITY
                          </p>
                          <div className="flex items-center justify-end gap-1">
                            {getTransactionStatusIcon(tx.status)}
                            <span className="text-xs text-slate-400 capitalize">{tx.status}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="in" className="space-y-3">
              {transactions
                .filter((tx) => tx.type === 'credit')
                .map((tx) => (
                  <Card key={tx.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            {getTransactionIcon(tx.type, tx.description)}
                          </div>
                          <div>
                            <p className="font-medium">{tx.description}</p>
                            <p className="text-xs text-slate-500">
                              {new Date(tx.created_at).toLocaleDateString('en-US')}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-green-600">+{tx.amount} UNITY</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="out" className="space-y-3">
              {transactions
                .filter((tx) => tx.type === 'debit')
                .map((tx) => (
                  <Card key={tx.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">{tx.description}</p>
                            <p className="text-xs text-slate-500">
                              {new Date(tx.created_at).toLocaleDateString('en-US')}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-red-600">-{tx.amount} UNITY</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <WalletIcon className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">About Unity Token</p>
                  <p className="text-xs text-slate-500 mt-1">
                    1 UNITY = $0.1176 USD (1 USD = 8.5 UNITY). Pay with tokens and get a 15% discount.
                  </p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto mt-2"
                    onClick={() => setLocation('/tokenomics')}
                  >
                    Learn More <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
