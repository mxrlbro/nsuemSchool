
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: 'Как долго длится обучение на курсах?',
    answer: 'Продолжительность обучения зависит от выбранного курса и может варьироваться от 3 до 12 месяцев. Каждый курс имеет собственную программу и график занятий'
  },
  {
    question: 'Можно ли обучаться в свободном графике?',
    answer: 'Да, наши курсы предусматривают гибкий график обучения. Вы можете изучать материалы и выполнять задания в удобное для вас время, но с соблюдением сроков сдачи проектных работ'
  },
  {
    question: 'Какие гарантии трудоустройства вы предоставляете?',
    answer: 'Мы сотрудничаем с ведущими IT-компаниями и предлагаем лучшим студентам стажировки с возможностью дальнейшего трудоустройства. Также мы проводим карьерные консультации и помогаем с составлением резюме'
  },
  {
    question: 'Как происходит оплата за обучение?',
    answer: 'Оплату можно произвести единовременно за весь курс со скидкой или разбить на ежемесячные платежи. Мы принимаем оплату банковскими картами, через электронные кошельки или банковским переводом'
  }
];

const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 px-8 bg-nsuem-gray">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-nsuem-orange mb-12 text-left">FAQ</h2>
        
        <style>
          {`.faq-trigger:hover { text-decoration: none !important; }`}
        </style>
        
        <Accordion type="single" collapsible className="space-y-6 w-full">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-nsuem-light-gray rounded-lg p-6 hover:bg-nsuem-light-gray/80 transition-colors border-none w-full"
            >
              <AccordionTrigger className="text-xl font-semibold faq-trigger w-full text-left">
                {item.question}
                <svg className="h-5 w-5 shrink-0 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pt-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
