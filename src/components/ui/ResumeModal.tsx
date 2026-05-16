import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';
import { useEffect } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

export function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[90svh] bg-bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-bg-tertiary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center border border-accent-gold/20 shadow-[0_0_15px_rgba(201,169,110,0.1)]">
                  <FileText className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-text-primary leading-tight">Curriculum Vitae</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Thanh Hung Phan</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <a 
                  href={resumeUrl}
                  download="Thanh_Hung_Phan_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-text-primary text-bg-primary rounded-xl text-sm font-medium hover:bg-accent-gold hover:text-bg-primary transition-all duration-300 shadow-lg hover:shadow-accent-gold/20 group/btn"
                >
                  <Download className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" /> 
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">Download</span>
                </a>
                <button 
                  onClick={onClose}
                  className="p-2.5 rounded-xl hover:bg-border/50 transition-colors text-text-secondary hover:text-text-primary"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-[#525659] relative overflow-hidden">
              <iframe 
                src={`${resumeUrl}#toolbar=0&view=FitH`} 
                className="w-full h-full border-none"
                title="Resume Preview"
              />
              {/* Fallback/Overlay to handle iframe interaction if needed */}
              <div className="absolute inset-0 pointer-events-none border-t border-border/10" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
