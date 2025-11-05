'use client';

import {
  ResponsiveContainer,
  RadialBarChart,
  PolarAngleAxis,
  RadialBar,
} from 'recharts';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ScoreChartProps {
  score: number;
}

export function ScoreChart({ score }: ScoreChartProps) {
  const [mounted, setMounted] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#2563EB');

  useEffect(() => {
    setMounted(true);
    // Ensure we are getting the computed style on the client
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();
    if (color) {
      setPrimaryColor(`hsl(${color})`);
    }
  }, []);

  const data = [{ name: 'score', value: score }];

  if (!mounted) {
    return (
      <div className="h-[200px] w-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="relative h-[200px] w-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="80%"
          outerRadius="100%"
          barSize={12}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: 'hsl(var(--secondary))' }}
            dataKey="value"
            cornerRadius={6}
            fill={primaryColor}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-headline text-5xl font-bold text-foreground">
          {score}
        </span>
        <span className="text-sm text-muted-foreground">ATS Score</span>
      </div>
    </div>
  );
}
