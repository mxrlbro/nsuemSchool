
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import PhoneInput from '@/components/PhoneInput';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const user = await register({
        email: formData.email,
        phone: formData.phone,
        fullName: formData.fullName,
        username: formData.username,
        password: formData.password
      });
      
      if (user) {
        toast.success('Регистрация успешна! Пожалуйста, войдите в систему.');
        // Redirect to login page instead of profile
        navigate('/login', { 
          state: { 
            email: formData.email,
            password: formData.password
          } 
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Произошла ошибка при регистрации');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Добро пожаловать" backLink="/login">
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded text-white text-center">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block">E-mail</label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="text-black"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="username" className="block">Логин</label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className="text-black"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block">Телефон</label>
          <PhoneInput
            value={formData.phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="fullName" className="block">ФИО</label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="text-black"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block">Пароль</label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="pr-10 text-black"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block">Подтвердите пароль</label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="pr-10 text-black"
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
          disabled={isSubmitting}
          className="nsuem-button-primary w-full"
        >
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
        
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="nsuem-button-secondary w-full"
        >
          Вход
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
