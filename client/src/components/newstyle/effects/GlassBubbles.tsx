import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  phase: number;
}

export function GlassBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize bubbles
    const initBubbles = () => {
      const bubbles: Bubble[] = [];
      const bubbleCount = 25;
      
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 6 + 2,
          speedY: Math.random() * 0.3 + 0.1,
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.3 + 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
      
      bubblesRef.current = bubbles;
    };

    const drawBubble = (bubble: Bubble) => {
      const gradient = ctx.createRadialGradient(
        bubble.x - bubble.size * 0.3,
        bubble.y - bubble.size * 0.3,
        0,
        bubble.x,
        bubble.y,
        bubble.size
      );
      
      gradient.addColorStop(0, `rgba(200, 220, 240, ${bubble.opacity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(180, 200, 220, ${bubble.opacity * 0.4})`);
      gradient.addColorStop(1, `rgba(160, 180, 200, ${bubble.opacity * 0.1})`);
      
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Highlight
      ctx.beginPath();
      ctx.arc(
        bubble.x - bubble.size * 0.3,
        bubble.y - bubble.size * 0.3,
        bubble.size * 0.25,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.6})`;
      ctx.fill();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bubblesRef.current.forEach((bubble) => {
        // Update position
        bubble.y -= bubble.speedY;
        bubble.x += Math.sin(time * 0.001 + bubble.phase) * 0.3 + bubble.speedX;
        
        // Reset if out of bounds
        if (bubble.y < -bubble.size * 2) {
          bubble.y = canvas.height + bubble.size * 2;
          bubble.x = Math.random() * canvas.width;
        }
        
        // Wrap horizontally
        if (bubble.x < -bubble.size) bubble.x = canvas.width + bubble.size;
        if (bubble.x > canvas.width + bubble.size) bubble.x = -bubble.size;
        
        drawBubble(bubble);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    initBubbles();
    animationRef.current = requestAnimationFrame(animate);
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.7 }}
    />
  );
}
