
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import ProfileForm from '../components/profile/ProfileForm';
import PasswordChangeForm from '../components/profile/PasswordChangeForm';
import ProfileActions from '../components/profile/ProfileActions';

const Profile = () => {
  const { user, loading, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen py-12 px-4 bg-nsuem-gray flex items-center justify-center">
          <div className="text-white">Загрузка...</div>
        </div>
      </Layout>
    );
  }
  
  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 bg-nsuem-gray">
        <div className="container mx-auto max-w-md">
          <div className="glass-card border-0 bg-[#2D2D2D] rounded-lg p-8 animate-fade-in">
            <h1 className="text-2xl font-semibold mb-8 text-center">Личный кабинет</h1>
            
            <ProfileForm 
              user={user}
              updateProfile={updateProfile}
            />
            
            <PasswordChangeForm
              user={user}
              updateProfile={updateProfile}
            />
            
            <ProfileActions 
              logout={logout}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
