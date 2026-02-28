import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Search, Filter, Activity, Users, ShoppingBag, 
  TreePine, Calendar, Navigation, Layers
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Map() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [mapType, setMapType] = useState<'activity' | 'rest' | 'groups' | 'shops'>('activity');

  const locationTypes = [
    { id: 'all', label: 'All', icon: Layers },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'rest', label: 'Rest', icon: TreePine },
    { id: 'groups', label: 'Group Classes', icon: Users },
    { id: 'shops', label: 'Shops', icon: ShoppingBag },
  ];

  const locations = [
    {
      id: '1',
      name: 'Victory Park',
      type: 'activity',
      category: 'Running Track',
      address: 'Park Street, 1',
      distance: '0.8 km',
      coordinates: { lat: 55.7558, lng: 37.6173 },
      features: ['Running Track', 'Sports Ground', 'Parking'],
      rating: 4.7,
      participants: 12,
      nextEvent: '2025-02-16T08:00',
    },
    {
      id: '2',
      name: 'Lake Square',
      type: 'rest',
      category: 'Nature Rest',
      address: 'Peace Ave, 15',
      distance: '1.5 km',
      coordinates: { lat: 55.7500, lng: 37.6000 },
      features: ['Lake', 'Gazebos', 'Playground'],
      rating: 4.9,
      participants: null,
      nextEvent: null,
    },
    {
      id: '3',
      name: 'Yoga in the Park',
      type: 'groups',
      category: 'Group Class',
      address: 'Central Park',
      distance: '2.1 km',
      coordinates: { lat: 55.7600, lng: 37.6200 },
      features: ['Yoga', 'Meditation', 'Outdoor'],
      rating: 4.8,
      participants: 8,
      nextEvent: '2025-02-16T09:00',
    },
    {
      id: '4',
      name: 'Healthy Food Store',
      type: 'shops',
      category: 'Products',
      address: 'Green Street, 42',
      distance: '0.5 km',
      coordinates: { lat: 55.7400, lng: 37.6100 },
      features: ['Organic', 'Supplements', 'Delivery'],
      rating: 4.6,
      participants: null,
      nextEvent: null,
    },
  ];

  const filteredLocations = activeFilter === 'all'
    ? locations
    : locations.filter(l => l.type === activeFilter);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 engraved-text">Map</h1>
          <p className="text-foreground/60">
            Find places for activity, rest, group classes, and shops
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                placeholder="Search locations..."
                className="pl-10 engraved-input"
              />
            </div>
            <Select value={activeFilter} onValueChange={setActiveFilter}>
              <SelectTrigger className="w-48 engraved-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locationTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center gap-2">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="engraved-button-outline">
              <Navigation className="w-4 h-4 mr-2" />
              My Location
            </Button>
          </div>
        </motion.div>

        {/* Map View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Tabs value={mapType} onValueChange={(v) => setMapType(v as any)}>
            <TabsList>
              <TabsTrigger value="activity">
                <Activity className="w-4 h-4 mr-2" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="rest">
                <TreePine className="w-4 h-4 mr-2" />
                Rest
              </TabsTrigger>
              <TabsTrigger value="groups">
                <Users className="w-4 h-4 mr-2" />
                Group Classes
              </TabsTrigger>
              <TabsTrigger value="shops">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shops
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="engraved-card h-[600px]">
              <CardContent className="p-0 h-full relative">
                {/* Placeholder for map - in real app would use Google Maps or similar */}
                <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                    <p className="text-foreground/60 mb-2">Interactive Map</p>
                    <p className="text-sm text-foreground/40">
                      Google Maps / Yandex Maps integration
                    </p>
                  </div>
                  {/* Mock markers */}
                  {filteredLocations.map((location, idx) => (
                    <div
                      key={location.id}
                      className="absolute"
                      style={{
                        left: `${20 + idx * 25}%`,
                        top: `${30 + idx * 15}%`,
                      }}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-primary rounded-full border-2 border-background shadow-lg flex items-center justify-center cursor-pointer hover:scale-125 transition-transform">
                          <MapPin className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-background rounded border border-border shadow-lg text-xs font-semibold whitespace-nowrap">
                          {location.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Locations List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Nearby Locations</CardTitle>
                <CardDescription>{filteredLocations.length} found</CardDescription>
              </CardHeader>
            </Card>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {filteredLocations.map((location, idx) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <Card className="engraved-card hover:scale-105 transition-transform cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="engraved-text text-lg">{location.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <MapPin className="w-4 h-4" />
                            {location.address} • {location.distance}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="engraved-badge">
                          {location.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {location.features.map((feature, fIdx) => (
                            <Badge key={fIdx} variant="secondary" className="engraved-badge text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">★ {location.rating}</span>
                            {location.participants !== null && (
                              <span className="text-foreground/60 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {location.participants}
                              </span>
                            )}
                          </div>
                        </div>
                        {location.nextEvent && (
                          <div className="flex items-center gap-2 text-sm text-foreground/70">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Next event: {new Date(location.nextEvent).toLocaleString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        )}
                        <Button className="w-full engraved-button" size="sm">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
