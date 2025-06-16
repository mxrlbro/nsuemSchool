
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  backLink?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, backLink }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nsuem-gray px-4 py-12">
      <div className="glass-card border-0 bg-[#2D2D2D] rounded-lg p-8 w-full max-w-md animate-fade-in">
        {backLink && (
          <Link to={backLink} className="flex items-center text-white/60 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            <span>Назад</span>
          </Link>
        )}
        
        <h1 className="text-2xl font-semibold mb-8 text-center">{title}</h1>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
