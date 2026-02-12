import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Globe, Link2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SketchIcon from './SketchIcon';

export interface Setting {
  id: string;
  label: string;
  description?: string;
  type: 'switch' | 'select' | 'input' | 'number' | 'text';
  value: any;
  options?: { label: string; value: string }[];
  category?: string;
  icon?: string;
}

interface SettingsPanelProps {
  title: string;
  settings: Setting[];
  onSave: (settings: Record<string, any>) => void;
  categories?: string[];
}

export function SettingsPanel({ title, settings, onSave, categories }: SettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState<Record<string, any>>(
    settings.reduce((acc, setting) => {
      acc[setting.id] = setting.value;
      return acc;
    }, {} as Record<string, any>)
  );

  const handleSettingChange = (id: string, value: any) => {
    setLocalSettings((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    onSave(localSettings);
  };

  const groupedSettings = categories
    ? categories.reduce((acc, category) => {
        acc[category] = settings.filter((s) => s.category === category);
        return acc;
      }, {} as Record<string, Setting[]>)
    : { 'Общие': settings };

  const renderSetting = (setting: Setting) => {
    switch (setting.type) {
      case 'switch':
        return (
          <div key={setting.id} className="flex items-center justify-between p-4 premium-card">
            <div className="flex items-center gap-3">
              {setting.icon && (
                <SketchIcon icon={setting.icon as any} size={20} className="text-primary" />
              )}
              <div>
                <Label className="font-medium">{setting.label}</Label>
                {setting.description && (
                  <p className="text-sm text-foreground/60 mt-1">{setting.description}</p>
                )}
              </div>
            </div>
            <Switch
              checked={localSettings[setting.id] || false}
              onCheckedChange={(checked) => handleSettingChange(setting.id, checked)}
            />
          </div>
        );

      case 'select':
        return (
          <div key={setting.id} className="space-y-2">
            <div className="flex items-center gap-2">
              {setting.icon && (
                <SketchIcon icon={setting.icon as any} size={18} className="text-primary" />
              )}
              <Label>{setting.label}</Label>
            </div>
            {setting.description && (
              <p className="text-sm text-foreground/60">{setting.description}</p>
            )}
            <Select
              value={localSettings[setting.id]?.toString() || ''}
              onValueChange={(value) => handleSettingChange(setting.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите..." />
              </SelectTrigger>
              <SelectContent>
                {setting.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'input':
      case 'text':
        return (
          <div key={setting.id} className="space-y-2">
            <div className="flex items-center gap-2">
              {setting.icon && (
                <SketchIcon icon={setting.icon as any} size={18} className="text-primary" />
              )}
              <Label>{setting.label}</Label>
            </div>
            {setting.description && (
              <p className="text-sm text-foreground/60">{setting.description}</p>
            )}
            <Input
              type={setting.type === 'number' ? 'number' : 'text'}
              value={localSettings[setting.id] || ''}
              onChange={(e) =>
                handleSettingChange(
                  setting.id,
                  setting.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
                )
              }
              placeholder={setting.description}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-foreground/60">Настройте параметры модуля под свои потребности</p>
      </div>

      {categories && categories.length > 1 ? (
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4 mt-6">
              {groupedSettings[category]?.map((setting) => renderSetting(setting))}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="space-y-4">
          {settings.map((setting) => renderSetting(setting))}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-border">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Сохранить настройки
        </Button>
      </div>
    </div>
  );
}
