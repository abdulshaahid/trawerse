"use client";

import React, { createContext, useCallback, useContext, useRef, useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseContextType {
  mousePosition: MousePosition;
  isTouch: boolean;
  subscribe: (id: string, callback: (pos: MousePosition) => void) => () => void;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  
  const subscribersRef = useRef<Map<string, (pos: MousePosition) => void>>(new Map());
  const rafId = useRef<number | null>(null);
  const lastUpdate = useRef(0);
  
  const updateSubscribers = useCallback((pos: MousePosition) => {
    subscribersRef.current.forEach((callback) => callback(pos));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastUpdate.current < 16) return; // 60fps throttle
    
    lastUpdate.current = now;
    const pos = { x: e.clientX, y: e.clientY };
    
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setMousePosition(pos);
      updateSubscribers(pos);
    });
  }, [updateSubscribers]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const pos = { x: touch.clientX, y: touch.clientY };
      
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setMousePosition(pos);
        updateSubscribers(pos);
      });
    }
  }, [updateSubscribers]);

  const handleTouchStart = useCallback(() => {
    setIsTouch(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Reset position off-screen after touch ends
    setTimeout(() => {
      const pos = { x: -1000, y: -1000 };
      setMousePosition(pos);
      updateSubscribers(pos);
    }, 100);
  }, [updateSubscribers]);

  const subscribe = useCallback((id: string, callback: (pos: MousePosition) => void) => {
    subscribersRef.current.set(id, callback);
    return () => {
      subscribersRef.current.delete(id);
    };
  }, []);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);

    // Add passive listeners for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    if (isTouchDevice) {
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (isTouchDevice) {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, handleTouchMove, handleTouchStart, handleTouchEnd]);

  return (
    <MouseContext.Provider value={{ mousePosition, isTouch, subscribe }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMousePosition(id: string) {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error('useMousePosition must be used within MouseProvider');
  }
  
  const [position, setPosition] = useState(context.mousePosition);
  
  useEffect(() => {
    return context.subscribe(id, setPosition);
  }, [context, id]);
  
  return { position, isTouch: context.isTouch };
}
