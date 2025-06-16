
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { db } from '../services/database';
import { toast } from 'sonner';
import PhoneInput from './PhoneInput';

interface AddUserDialogProps {
  onUserAdded: () => void;
}

export function AddUserDialog({ onUserAdded }: AddUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    isAdmin: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.username || !formData.password) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setLoading(true);
    
    try {
      await db.addUser({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        password: formData.password,
        isAdmin: formData.isAdmin
      });
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        isAdmin: false
      });
      
      setOpen(false);
      onUserAdded();
      toast.success('Пользователь успешно добавлен');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Ошибка при добавлении пользователя');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-nsuem-orange hover:bg-orange-600 text-white">
          <Plus size={16} className="mr-2" />
          Добавить пользователя
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-nsuem-gray border border-white/20 text-white max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-white text-center">
            Добавить нового пользователя
          </DialogTitle>
          <p className="text-white/70 text-sm text-center mt-2">
            Заполните форму для создания нового пользователя в системе.
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white/90">ФИО</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="bg-transparent border border-white/30 text-white placeholder-white/50 focus:border-nsuem-orange"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-transparent border border-white/30 text-white placeholder-white/50 focus:border-nsuem-orange"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white/90">Телефон</Label>
            <PhoneInput
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              className="bg-transparent border border-white/30 text-white placeholder-white/50 focus:border-nsuem-orange"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-white/90">Логин</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="bg-transparent border border-white/30 text-white placeholder-white/50 focus:border-nsuem-orange"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="bg-transparent border border-white/30 text-white placeholder-white/50 focus:border-nsuem-orange"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAdmin"
              checked={formData.isAdmin}
              onChange={(e) => handleInputChange('isAdmin', e.target.checked)}
              className="w-4 h-4 rounded border border-white/30 bg-transparent"
            />
            <Label htmlFor="isAdmin" className="text-white/90">Администратор</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-white/30 hover:bg-white/5 text-white"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-nsuem-orange hover:bg-orange-600 text-white"
            >
              {loading ? 'Добавление...' : 'Добавить'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
