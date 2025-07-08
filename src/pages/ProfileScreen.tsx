
import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonSpinner, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { GoogleGenAI } from "@google/genai";
import { locationOutline, callOutline, timeOutline } from 'ionicons/icons';

const ProfileScreen: React.FC = () => {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDescription = async () => {
            if (!process.env.API_KEY) {
                setError("API key is not configured.");
                setLoading(false);
                setDescription("Welcome to The Golden Spoon! We pride ourselves on offering a delightful culinary experience with the freshest ingredients and a passion for flavor. Our menu is a mix of classic comfort foods and innovative dishes, ensuring there's something for everyone to enjoy.");
                return;
            }

            try {
                setLoading(true);
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: "Generate a short, welcoming, and enticing restaurant description for a fictional restaurant called 'The Golden Spoon'. Focus on fresh ingredients and a mix of classic and modern dishes. Keep it under 80 words.",
                });
                setDescription(response.text);
            } catch (err) {
                console.error("Error fetching description:", err);
                setError("Could not load restaurant description.");
                setDescription("Welcome to The Golden Spoon! A place where culinary traditions meet modern innovation. Enjoy our finest dishes, crafted with love and the freshest ingredients.");
            } finally {
                setLoading(false);
            }
        };

        fetchDescription();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>About Us</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="profile-header">
                    <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop" alt="Restaurant interior" />
                </div>
                <div className="ion-padding profile-content">
                    <h1 className="restaurant-title">The Golden Spoon</h1>
                    
                    <div className="description-box">
                        {loading && <div className="spinner-container"><IonSpinner name="crescent" /></div>}
                        {error && <p className="error-message">{error}</p>}
                        {description && <p>{description}</p>}
                    </div>

                    <IonList lines="none" className="info-list">
                        <IonItem>
                            <IonIcon icon={locationOutline} slot="start" color="primary" />
                            <IonLabel>
                                <h2>Address</h2>
                                <p>123 Culinary Lane, Foodie City, 45678</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={callOutline} slot="start" color="primary" />
                            <IonLabel>
                                <h2>Phone</h2>
                                <p>(555) 123-4567</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={timeOutline} slot="start" color="primary" />
                            <IonLabel>
                                <h2>Hours</h2>
                                <p>Mon - Sun: 11:00 AM - 10:00 PM</p>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ProfileScreen;
