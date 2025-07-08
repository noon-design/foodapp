
import React from 'react';
import { IonContent, IonButton } from '@ionic/react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  return (
    <div className="splash-screen">
      <IonContent>
        <div className="splash-content">
            <h1>Eat Healthy & Delicious Food</h1>
            <p>Anytime, anywhere.</p>
            <IonButton className="start-button" onClick={onFinish} shape="round" size="large">
                Let's Start
            </IonButton>
        </div>
      </IonContent>
    </div>
  );
};

export default SplashScreen;
