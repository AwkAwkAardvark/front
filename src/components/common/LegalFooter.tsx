import React from 'react';
import LegalLinks from './LegalLinks';

const LegalFooter: React.FC = () => (
  <footer className="border-t border-white/10 py-8 mt-16">
    <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.3em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <span>© 2026 SENTINEL. All rights reserved.</span>
      <LegalLinks className="flex gap-6" />
    </div>
  </footer>
);

export default LegalFooter;
