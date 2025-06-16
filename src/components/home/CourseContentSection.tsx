
import React from 'react';

interface CourseContentItem {
  title: string;
  description: string;
}

const courseItems: CourseContentItem[] = [
  {
    title: 'Изучение множества языков программирования',
    description: 'Вы можете выбрать необходимый для Вас язык программирования: Python, C++, Swift, Objective-C'
  },
  {
    title: 'Базы данных',
    description: 'Освойте платформу 1С для автоматизации бизнес-процессов, управленческого учета и составления отчетности'
  },
  {
    title: 'Разработка видеоигр',
    description: 'Научитесь создавать захватывающие 2D и 3D игры с помощью мощного игрового движка Unity'
  },
  {
    title: 'Фреймворки Python',
    description: 'Изучите фреймворки Django и FastAPI для создания масштабируемых и высокопроизводительных веб-приложений'
  }
];

const CourseContentSection: React.FC = () => {
  return (
    <section id="course-content" className="py-20 px-8">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-16 text-left">
          <span className="text-nsuem-orange">ЧТО БУДЕТ</span>
          <span className="text-white"> НА КУРСАХ?</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {courseItems.map((item, index) => (
            <div key={index} className="flex flex-col space-y-6">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <div className="border-t border-nsuem-orange w-full"></div>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseContentSection;
