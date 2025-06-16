
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { User } from '@/services/database';

interface PasswordChangeFormProps {
  user: User;
  updateProfile: (user: User) => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ user, updateProfile }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsChangingPassword(true);
    
    try {
      if (passwordData.currentPassword !== user.password) {
        toast.error('Текущий пароль неверен');
        setIsChangingPassword(false);
        return;
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error('Новый пароль и подтверждение не совпадают');
        setIsChangingPassword(false);
        return;
      }
      
      updateProfile({
        ...user,
        password: passwordData.newPassword,
      });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      toast.success('Пароль успешно изменен');
    } catch (error) {
      console.error('Password change error:', error);
      toast.error('Ошибка при изменении пароля');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6 text-center">Смена пароля</h2>
      
      <form onSubmit={handlePasswordSubmit} className="space-y-6 mb-8">
        <div className="space-y-2">
          <label htmlFor="currentPassword" className="block">Текущий пароль</label>
          <div className="relative">
            <Input
              id="currentPassword"
              name="currentPassword"
              type={showCurrentPassword ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="newPassword" className="block">Новый пароль</label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block">Подтвердите новый пароль</label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isChangingPassword}
          className="nsuem-button-primary w-full"
        >
          {isChangingPassword ? 'Изменение...' : 'Изменить пароль'}
        </button>
      </form>
    </>
  );
};

export default PasswordChangeForm;
