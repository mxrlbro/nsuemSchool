
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NewAdminLayout } from '../components/NewAdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Upload, Image, FileText, Settings } from 'lucide-react';

const EditContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [heroTitle, setHeroTitle] = useState('Обучение трейдингу с нуля до профессионала');
  const [heroSubtitle, setHeroSubtitle] = useState('Изучите основы трейдинга и начните зарабатывать на финансовых рынках уже через 30 дней');

  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user?.isAdmin) {
    return null;
  }

  const handleSave = () => {
    // Здесь будет логика сохранения контента
    console.log('Сохранение контента...');
  };

  return (
    <NewAdminLayout title="Редактирование контента">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Управление контентом</h2>
          <Button onClick={handleSave} className="bg-nsuem-orange hover:bg-orange-600">
            <Save size={16} className="mr-2" />
            Сохранить изменения
          </Button>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="hero" className="data-[state=active]:bg-white">
              Главная секция
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-white">
              Курсы
            </TabsTrigger>
            <TabsTrigger value="mentors" className="data-[state=active]:bg-white">
              Менторы
            </TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-white">
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card className="bg-nsuem-gray border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText size={20} />
                  Главная секция
                </CardTitle>
                <CardDescription className="text-white/70">
                  Редактирование контента главной страницы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Заголовок
                  </label>
                  <Input
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Подзаголовок
                  </label>
                  <Textarea
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="bg-white/5 border-white/10 text-white min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Фоновое изображение
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="URL изображения"
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button variant="outline" className="border-white/20 hover:bg-white/5">
                      <Upload size={16} className="mr-2" />
                      Загрузить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card className="bg-nsuem-gray border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings size={20} />
                  Курсы
                </CardTitle>
                <CardDescription className="text-white/70">
                  Управление информацией о курсах
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-white/70 text-center py-8">
                  Раздел в разработке...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentors" className="space-y-6">
            <Card className="bg-nsuem-gray border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Image size={20} />
                  Менторы
                </CardTitle>
                <CardDescription className="text-white/70">
                  Управление информацией о менторах
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-white/70 text-center py-8">
                  Раздел в разработке...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card className="bg-nsuem-gray border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText size={20} />
                  FAQ
                </CardTitle>
                <CardDescription className="text-white/70">
                  Управление часто задаваемыми вопросами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-white/70 text-center py-8">
                  Раздел в разработке...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NewAdminLayout>
  );
};

export default EditContent;
