import React from 'react';
import { Link } from 'react-router-dom';

interface LegalLinksProps {
  className?: string;
  linkClassName?: string;
}

const LegalLinks: React.FC<LegalLinksProps> = ({ className, linkClassName }) => (
  <div className={className ?? ''}>
    <Link
      to="/privacy-policy"
      className={linkClassName ?? 'text-slate-500 hover:text-white transition-colors'}
    >
      개인정보 처리방침
    </Link>
    <Link
      to="/terms-of-service"
      className={linkClassName ?? 'text-slate-500 hover:text-white transition-colors'}
    >
      이용약관
    </Link>
  </div>
);

export default LegalLinks;
