
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileActionsProps {
  logout: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ logout }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Вы успешно вышли из аккаунта');
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <button
        type="button"
        onClick={() => navigate('/learning')}
        className="flex items-center justify-center gap-2 nsuem-button-blue w-full"
      >
        <BookOpen size={20} />
        Начать обучение
      </button>

      {user?.isAdmin && (
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="flex items-center justify-center gap-2 nsuem-button-primary w-full"
        >
          <Settings size={20} />
          Панель администратора
        </button>
      )}
      
      <button
        type="button"
        onClick={() => navigate('/')}
        className="nsuem-button-secondary w-full"
      >
        На главную
      </button>
      
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 nsuem-button-danger w-full"
      >
        <LogOut size={20} />
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default ProfileActions;
