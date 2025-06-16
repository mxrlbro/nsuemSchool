
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle, XCircle, BookOpen } from 'lucide-react';

const Learning = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-nsuem-gray flex items-center justify-center px-4 py-12">
          <div className="text-white">Загрузка...</div>
        </div>
      </Layout>
    );
  }
  
  if (!user) {
    return null;
  }

  const answers = [
    { id: 'a', text: 'Это змея', correct: false },
    { id: 'b', text: 'Это язык программирования высокого уровня', correct: true },
    { id: 'c', text: 'Это математическая формула', correct: false },
    { id: 'd', text: 'Это вид спорта', correct: false }
  ];

  const handleSubmit = () => {
    if (!selectedAnswer) {
      toast.error('Пожалуйста, выберите ответ');
      return;
    }

    const correctAnswer = answers.find(answer => answer.correct);
    const userAnswer = answers.find(answer => answer.id === selectedAnswer);
    
    if (userAnswer?.correct) {
      setIsCorrect(true);
      toast.success('Правильно! Python — это язык программирования высокого уровня, который широко используется для разработки веб-приложений, анализа данных, машинного обучения и многого другого.');
    } else {
      setIsCorrect(false);
      toast.error(`Неправильно. Правильный ответ: ${correctAnswer?.text}`);
    }
    
    setHasAnswered(true);
  };

  const resetQuestion = () => {
    setSelectedAnswer('');
    setHasAnswered(false);
    setIsCorrect(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-nsuem-gray flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="glass-card rounded-lg p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="text-blue-400" size={32} />
              <h1 className="text-3xl font-semibold text-white">Обучение</h1>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-6 text-white">Вопрос 1 из 1</h2>
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium mb-4 text-white">Что такое Python?</h3>
                
                <RadioGroup 
                  value={selectedAnswer} 
                  onValueChange={setSelectedAnswer}
                  disabled={hasAnswered}
                  className="space-y-3"
                >
                  {answers.map((answer) => (
                    <div key={answer.id} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={answer.id} 
                        id={answer.id}
                        className="border-gray-400 text-blue-400"
                      />
                      <label 
                        htmlFor={answer.id} 
                        className={`text-white cursor-pointer flex-1 ${
                          hasAnswered && answer.correct 
                            ? 'text-green-400 font-medium' 
                            : hasAnswered && selectedAnswer === answer.id && !answer.correct
                            ? 'text-red-400'
                            : ''
                        }`}
                      >
                        {answer.text}
                        {hasAnswered && answer.correct && (
                          <CheckCircle className="inline ml-2 text-green-400" size={16} />
                        )}
                        {hasAnswered && selectedAnswer === answer.id && !answer.correct && (
                          <XCircle className="inline ml-2 text-red-400" size={16} />
                        )}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex gap-4">
                {!hasAnswered ? (
                  <Button 
                    onClick={handleSubmit}
                    className="nsuem-button-blue"
                    disabled={!selectedAnswer}
                  >
                    Ответить
                  </Button>
                ) : (
                  <Button 
                    onClick={resetQuestion}
                    className="nsuem-button-blue hover:bg-gray-900 text-white"
                  >
                    Попробовать снова
                  </Button>
                )}
                
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-nsuem-orange hover:bg-orange-600 text-white"
                >
                  Вернуться в профиль
                </Button>
              </div>
            </div>

            {hasAnswered && (
              <div className={`mt-6 p-4 rounded-lg ${
                isCorrect 
                  ? 'bg-green-900/20 border border-green-400/30' 
                  : 'bg-red-900/20 border border-red-400/30'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-400" size={20} />
                  )}
                  <span className={`font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? 'Отлично!' : 'Попробуйте еще раз'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Learning;
