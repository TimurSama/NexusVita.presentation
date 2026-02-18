import { useEffect, useRef } from 'react';

export function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBlueprint();
    };

    const drawBlueprint = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Grid lines
      ctx.strokeStyle = 'rgba(180, 190, 200, 0.08)';
      ctx.lineWidth = 1;
      
      const gridSize = 60;
      
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Diagonal accent lines (very subtle)
      ctx.strokeStyle = 'rgba(180, 190, 200, 0.04)';
      for (let i = -canvas.height; i < canvas.width; i += gridSize * 3) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + canvas.height, canvas.height);
        ctx.stroke();
      }
      
      // Small cross markers at intersections
      ctx.strokeStyle = 'rgba(180, 190, 200, 0.12)';
      ctx.lineWidth = 1;
      const crossSize = 4;
      
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          // Only draw some crosses for variation
          if ((x + y) % (gridSize * 3) === 0) {
            ctx.beginPath();
            ctx.moveTo(x - crossSize/2, y);
            ctx.lineTo(x + crossSize/2, y);
            ctx.moveTo(x, y - crossSize/2);
            ctx.lineTo(x, y + crossSize/2);
            ctx.stroke();
          }
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);
    
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
