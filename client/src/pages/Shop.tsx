import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Star, Heart, Package, ShoppingBag, Shirt, Pill, Apple } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Apple },
    { id: 'equipment', label: 'Equipment', icon: Package },
    { id: 'accessories', label: 'Accessories', icon: ShoppingBag },
    { id: 'clothing', label: 'Clothing', icon: Shirt },
    { id: 'supplements', label: 'Supplements', icon: Pill },
  ];

  const products = [
    {
      id: '1',
      name: 'Organic Protein Bars',
      category: 'products',
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.8,
      reviews: 156,
      image: '',
      partner: false,
      badge: 'Bestseller',
    },
    {
      id: '2',
      name: 'Adjustable Dumbbells 2x20kg',
      category: 'equipment',
      price: 149.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      image: '',
      partner: true,
      partnerName: 'SportStore',
      badge: null,
    },
    {
      id: '3',
      name: 'EthosLife Pro Fitness Bracelet',
      category: 'accessories',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviews: 234,
      image: '',
      partner: false,
      badge: 'New',
    },
    {
      id: '4',
      name: 'Premium Sports T-Shirt',
      category: 'clothing',
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.6,
      reviews: 112,
      image: '',
      partner: false,
      badge: null,
    },
    {
      id: '5',
      name: 'Vitamin D3 + K2 Complex',
      category: 'supplements',
      price: 34.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 278,
      image: '',
      partner: true,
      partnerName: 'HealthSupplements',
      badge: 'Recommended',
    },
    {
      id: '6',
      name: 'Premium Yoga Mat',
      category: 'equipment',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviews: 145,
      image: '',
      partner: false,
      badge: null,
    },
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 engraved-text">Shop</h1>
          <p className="text-foreground/60">
            Products, equipment, accessories, and supplements for a healthy lifestyle
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <Input
              placeholder="Search products..."
              className="pl-10 engraved-input"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                  <cat.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{cat.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <Card className="engraved-card hover:scale-105 transition-transform cursor-pointer h-full flex flex-col">
                <div className="relative">
                  <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                    <Package className="w-24 h-24 text-foreground/20" />
                  </div>
                  {product.badge && (
                    <Badge className="absolute top-2 right-2 engraved-badge bg-primary">
                      {product.badge}
                    </Badge>
                  )}
                  {product.partner && (
                    <Badge variant="outline" className="absolute top-2 left-2 engraved-badge">
                      Partner: {product.partnerName}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="engraved-text text-lg">{product.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                    <span className="text-sm text-foreground/60">({product.reviews})</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-foreground/60 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button className="w-full engraved-button">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
