
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';

interface HeroSectionProps {
  title?: string;
  content?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title = "Онлайн-школа для подготовки профессионалов в сфере IT", 
  content = "Все онлайн-школы говорят о высоком качестве\nМы так не говорим, за нас это сделают наши студенты"
}) => {
  const scrollToConsultation = () => {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-nsuem-dark/0 to-nsuem-dark pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl text-center z-10 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {title}
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 whitespace-pre-line">
          {content}
        </p>

        <Button 
          onClick={scrollToConsultation}
          className="bg-nsuem-orange hover:bg-nsuem-orange/90 text-white font-medium text-lg px-8 py-6 h-auto rounded-md"
        >
          Записаться на консультацию
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
