
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { db } from '../services/database';
import { toast } from 'sonner';
import PhoneInput from './PhoneInput';

interface AddRequestDialogProps {
  onRequestAdded: () => void;
}

export function AddRequestDialog({ onRequestAdded }: AddRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    
    try {
      await db.addConsultationRequest({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      });
      
      setFormData({
        fullName: '',
        email: '',
        phone: ''
      });
      
      setOpen(false);
      onRequestAdded();
      toast.success('Заявка успешно добавлена');
    } catch (error) {
      console.error('Error adding request:', error);
      toast.error('Ошибка при добавлении заявки');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
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
          Добавить заявку
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-nsuem-gray border border-white/20 text-white max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-white text-center">
            Добавить новую заявку на консультацию
          </DialogTitle>
          <p className="text-white/70 text-sm text-center mt-2">
            Заполните форму для создания новой заявки на консультацию.
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
