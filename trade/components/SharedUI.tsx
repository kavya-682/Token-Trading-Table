
import React, { useState, useRef, useEffect, ErrorInfo } from 'react';
import { Info, X, AlertTriangle } from 'lucide-react';

// Explicitly define Prop and State interfaces for the ErrorBoundary
interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Fix: Properly define generic types for React.Component to ensure 'this.state' and 'this.props' are recognized
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fix: Explicitly declare and initialize state on the class
  public state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Column Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-[#0D0E11] border border-red-500/20 rounded-2xl h-full text-center">
          <AlertTriangle className="text-red-500 mb-2" size={32} />
          <h3 className="text-white font-bold text-sm uppercase">Stream Offline</h3>
          <p className="text-gray-500 text-[10px] mt-1">Failed to process token data.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase hover:bg-white/10 transition-colors"
          >
            Reconnect
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className="absolute z-[100] bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] p-2 bg-[#1A1C20] text-white text-[10px] font-medium rounded-md shadow-2xl border border-[#2D303A] pointer-events-none animate-in fade-in slide-in-from-bottom-1 duration-150">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2D303A]"></div>
        </div>
      )}
    </div>
  );
};

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B0C0E] border border-[#1F2128] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-[#1F2128]">
          <h2 className="text-base font-black text-white uppercase tracking-tighter italic">AXIOM <span className="text-blue-500 not-italic">INSIGHT</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
            <X size={18} />
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'danger' | 'warning' | 'info' | 'ghost' }> = ({ children, variant = 'info' }) => {
  const styles = {
    success: 'bg-green-500/10 text-green-500 border-green-500/20',
    danger: 'bg-red-500/10 text-red-500 border-red-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    ghost: 'bg-white/5 text-gray-400 border-white/10',
  };

  return (
    <span className={`px-1.5 py-0.5 text-[9px] font-black uppercase tracking-tighter border rounded-[4px] leading-none ${styles[variant]}`}>
      {children}
    </span>
  );
};

export const SkeletonRow: React.FC = () => (
  <div className="flex items-center justify-between p-4 border-b border-[#1F2128] h-[64px]">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full shimmer" />
      <div className="space-y-1">
        <div className="w-24 h-3 rounded shimmer" />
        <div className="w-16 h-2 rounded shimmer" />
      </div>
    </div>
    <div className="flex gap-4">
      <div className="w-16 h-4 rounded shimmer" />
      <div className="w-8 h-4 rounded shimmer" />
    </div>
  </div>
);
