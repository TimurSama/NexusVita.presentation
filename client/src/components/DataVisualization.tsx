import { motion } from 'framer-motion';

interface DataVisualizationProps {
  data: Array<{ label: string; value: number; color: string }>;
  title?: string;
}

export function DataVisualization({ data, title }: DataVisualizationProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-6">
      {title && <h3 className="text-xl font-bold text-foreground">{title}</h3>}
      <div className="space-y-4">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
              <span className="text-sm font-bold text-primary">{item.value}%</span>
            </div>
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / maxValue) * 100}%` }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.2, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
