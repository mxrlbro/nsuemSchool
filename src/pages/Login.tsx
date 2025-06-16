
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ErrorDialog from '@/components/ErrorDialog';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email and password from location state if coming from register page
  const locationState = location.state as { email?: string; password?: string } | null;
  
  const [loginIdentifier, setLoginIdentifier] = useState(locationState?.email || '');
  const [password, setPassword] = useState(locationState?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Add dialog state
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-login if credentials are provided from registration
  useEffect(() => {
    const autoLogin = async () => {
      if (locationState?.email && locationState?.password) {
        try {
          const user = await login(locationState.email, locationState.password);
          if (user) {
            if (user.isAdmin) {
              navigate('/admin');
            } else {
              navigate('/profile');
            }
          }
        } catch (error) {
          console.error('Auto-login error:', error);
          // Don't show error for auto-login failure
        }
      }
    };
    
    if (locationState?.email && locationState?.password) {
      autoLogin();
    }
  }, [locationState, login, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await login(loginIdentifier, password);
      if (user) {
        if (user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        // Show error dialog instead of error message
        setErrorMessage('Такого пользователя не существует');
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Произошла ошибка при входе');
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={`transition-all duration-300 ${showErrorDialog ? 'blur-sm' : ''}`}>
        <AuthLayout title="Добро пожаловать" backLink="/">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded text-white text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="loginIdentifier" className="block">E-mail или логин</label>
              <Input
                id="loginIdentifier"
                type="text"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                required
                className="text-black"
                placeholder="Введите email или логин"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block">Пароль</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 text-black"
                  placeholder="Введите пароль"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {/* Подсказка: используйте admin / nsuemadmin54 для входа как администратор */}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="nsuem-button-primary w-full"
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </button>
            
            <Link
              to="/register"
              className="nsuem-button-secondary w-full block text-center"
            >
              Регистрация
            </Link>
          </form>
        </AuthLayout>
      </div>
      
      <ErrorDialog
        message={errorMessage}
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />
    </>
  );
};

export default Login;
