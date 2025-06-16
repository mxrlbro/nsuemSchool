
import React from 'react';
import ConsultationForm from './ConsultationForm';

const ConsultationSection: React.FC = () => {
  return (
    <section id="consultation" className="py-20 px-8 bg-nsuem-gray">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-nsuem-orange">КОНСУЛЬТАЦИЯ</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12">
              Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время, 
              чтобы ответить на все ваши вопросы о курсах и процессе обучения
            </p>
          </div>
          
          <div className="flex-1">
            <div className="bg-nsuem-dark/50 p-10 rounded-xl">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
