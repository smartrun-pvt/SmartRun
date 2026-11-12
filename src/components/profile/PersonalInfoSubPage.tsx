import React from 'react';
import { PersonalInfoPage } from '../PersonalInfoPage';
import { UserProfile } from '../../types';

interface PersonalInfoSubPageProps {
  userProfile: UserProfile | null;
  onProfileUpdated: (updated: UserProfile) => void;
  onBack: () => void;
}

export const PersonalInfoSubPage: React.FC<PersonalInfoSubPageProps> = ({
  userProfile,
  onProfileUpdated,
  onBack
}) => {
  return (
    <PersonalInfoPage
      initialPhone={userProfile?.phone || ''}
      initialName={userProfile?.name || ''}
      initialEmail={userProfile?.email || ''}
      initialDob={userProfile?.dob || ''}
      isPhoneVerified={userProfile?.phoneVerified ?? true}
      onSuccess={(phone, name, email) => {
        if (userProfile) {
          onProfileUpdated({
            ...userProfile,
            phone,
            name,
            email: email || userProfile.email
          });
        }
        onBack();
      }}
      onBack={onBack}
    />
  );
};
