
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Settings, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  Home
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-nsuem-dark text-white">
      <header className="py-6 px-8 flex items-center justify-between border-b border-white/10">
        <button 
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        
        <Link to="/" className="flex items-center gap-2">
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.15 18.7667L21.4167 0.5L39.6833 18.7667L21.4167 37.0333L3.15 18.7667Z" fill="white"/>
            <path d="M17.7167 18.7667L36.0167 0.5L17.7167 0.5L17.7167 18.7667Z" fill="white"/>
            <path d="M3.15 18.7667L21.4167 37.0334L21.4167 18.7667L3.15 18.7667Z" fill="white"/>
          </svg>
          <div className="text-xl font-bold">NSUEM</div>
        </Link>
        
        <h1 className="text-xl font-medium hidden md:block">{title}</h1>
        
        <div className="flex items-center gap-4">
          <button 
            className="text-white/70 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>
      
      <div className="flex flex-grow">
        {/* Mobile Sidebar */}
        <aside className={`
          fixed inset-0 z-50 w-full bg-nsuem-dark transform transition-transform duration-300 ease-in-out md:hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex justify-end p-4">
            <button 
              className="text-white/70 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="p-6 space-y-8">
            <Link 
              to="/"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-all"
              onClick={() => setSidebarOpen(false)}
            >
              <Home size={20} />
              <span>На главную</span>
            </Link>
            
            <Link 
              to="/admin"
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-all ${isActive('/admin') ? 'bg-white/10 text-nsuem-orange' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Users size={20} />
              <span>Пользователи</span>
            </Link>
            
            <Link 
              to="/admin/consultations"
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-all ${isActive('/admin/consultations') ? 'bg-white/10 text-nsuem-orange' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <MessageSquare size={20} />
              <span>Заявки</span>
            </Link>
            
            <Link 
              to="/admin/content"
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-all ${isActive('/admin/content') ? 'bg-white/10 text-nsuem-orange' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Settings size={20} />
              <span>Контент</span>
            </Link>
          </nav>
        </aside>
        
        {/* Desktop Sidebar */}
        <aside className="w-64 border-r border-white/10 pt-8 hidden md:block">
          <nav className="p-6 space-y-8">
            <Link 
              to="/"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-all"
            >
              <Home size={20} />
              <span>На главную</span>
            </Link>
            
            <Link 
              to="/admin"
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-all ${isActive('/admin') ? 'bg-white/10 text-nsuem-orange' : ''}`}
            >
              <Users size={20} />
              <span>Пользователи</span>
            </Link>
            
            <Link 
              to="/admin/consultations"
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-all ${isActive('/admin/consultations') ? 'bg-white/10 text-nsuem-orange' : ''}`}
            >
              <MessageSquare size={20} />
              <span>Заявки</span>
            </Link>
            
            <Link 
              to="/admin/content"
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-all ${isActive('/admin/content') ? 'bg-white/10 text-nsuem-orange' : ''}`}
            >
              <Settings size={20} />
              <span>Контент</span>
            </Link>
          </nav>
        </aside>
        
        <main className="flex-grow p-8">
          <h1 className="text-2xl font-medium mb-8 md:hidden">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
