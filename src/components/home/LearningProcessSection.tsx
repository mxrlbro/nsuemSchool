
import React from 'react';

interface LearningStepProps {
  step: number;
  title: string;
  description: string;
}

const learningSteps: LearningStepProps[] = [
  {
    step: 1,
    title: 'Регистрация и оплата',
    description: 'Выберите нужный курс, зарегистрируйтесь и оплатите обучение удобным способом.'
  },
  {
    step: 2,
    title: 'Знакомство с платформой',
    description: 'Получите доступ к образовательной платформе и изучите ее функционал.'
  },
  {
    step: 3,
    title: 'Изучение материалов',
    description: 'Изучайте теоретические материалы, видеоуроки и дополнительную литературу.'
  },
  {
    step: 4,
    title: 'Выполнение заданий',
    description: 'Выполняйте практические задания и проекты, получайте обратную связь.'
  },
  {
    step: 5,
    title: 'Работа с ментором',
    description: 'Общайтесь с ментором, задавайте вопросы и получайте профессиональные советы.'
  },
  {
    step: 6,
    title: 'Защита проекта',
    description: 'Защитите свой итоговый проект и получите сертификат о прохождении курса.'
  }
];

const LearningProcessSection: React.FC = () => {
  return (
    <section id="learning-process" className="py-20 px-8 bg-nsuem-gray">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-12 text-left">КАК БУДЕТ ПРОХОДИТЬ <span className="text-nsuem-orange">ОБУЧЕНИЕ</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {learningSteps.map((step) => (
            <div key={step.step} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-nsuem-orange flex items-center justify-center text-xl font-bold mb-6">
                {step.step}
              </div>
              
              <h3 className="text-xl font-semibold mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningProcessSection;
