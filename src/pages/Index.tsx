
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import { db } from '../services/database';

// Import all the section components
import HeroSection from '../components/home/HeroSection';
import ForWhomSection from '../components/home/ForWhomSection';
import CourseContentSection from '../components/home/CourseContentSection';
import LearningProcessSection from '../components/home/LearningProcessSection';
import ConsultationSection from '../components/home/ConsultationSection';
import MentorsSection from '../components/home/MentorsSection';
import FaqSection from '../components/home/FaqSection';

const Index = () => {
  // Fetch site content
  const { data: siteContent } = useQuery({
    queryKey: ['siteContent'],
    queryFn: () => db.getSiteContent(),
  });

  const heroContent = siteContent?.find(content => content.section === 'hero');

  return (
    <Layout>
      <HeroSection 
        title={heroContent?.title} 
        content={heroContent?.content}
      />
      <ForWhomSection />
      <CourseContentSection />
      <LearningProcessSection />
      <MentorsSection />
      <ConsultationSection />
      <FaqSection />
    </Layout>
  );
};

export default Index;
