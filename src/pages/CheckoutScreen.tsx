
import React, { useState, useContext, useMemo } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, useIonRouter, IonButtons, IonBackButton, IonIcon } from '@ionic/react';
import { AppContext } from '../App';
import { checkmarkCircleOutline } from 'ionicons/icons';


const OrderSuccessScreen = ({ onBackToHome }: { onBackToHome: () => void }) => (
    <div className="placeholder-screen order-success-screen">
        <div className="success-icon">
             <IonIcon icon={checkmarkCircleOutline} style={{fontSize: '80px'}}/>
        </div>
        <h1>Order Placed!</h1>
        <p>Your food is on its way. Thank you!</p>
        <IonButton className="start-button" onClick={onBackToHome} style={{marginTop: '2rem'}}>Back to Home</IonButton>
    </div>
);


const CheckoutScreen: React.FC = () => {
    const { cart, setCart } = useContext(AppContext);
    const [name, setName] = useState('Mark');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    
    const router = useIonRouter();

    const total = useMemo(() =>
        cart.reduce((sum, cartItem) => sum + parseFloat(cartItem.item.price) * cartItem.quantity, 0).toFixed(2),
        [cart]
    );

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && phone && address) {
            console.log('Order placed:', { name, phone, address, cart });
            setCart([]); // Clear cart
            setOrderPlaced(true);
        } else {
            alert('Please fill in all details.');
        }
    };

    const handleBackToHome = () => {
        router.push('/tabs/home', 'root');
    };

    if (orderPlaced) {
        return (
            <IonPage>
                <IonContent fullscreen>
                    <OrderSuccessScreen onBackToHome={handleBackToHome} />
                </IonContent>
            </IonPage>
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/cart" />
                    </IonButtons>
                    <IonTitle>Checkout Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form onSubmit={handlePlaceOrder}>
                    <div className="order-summary-checkout">
                        <h3>Order Summary</h3>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                    </div>
                    <IonList lines="none">
                        <IonItem className="form-group">
                            <IonLabel position="stacked">Name</IonLabel>
                            <IonInput type="text" value={name} onIonChange={e => setName(e.detail.value!)} required />
                        </IonItem>
                         <IonItem className="form-group">
                            <IonLabel position="stacked">Phone Number</IonLabel>
                            <IonInput type="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)} required placeholder="Enter your phone number" />
                        </IonItem>
                         <IonItem className="form-group">
                            <IonLabel position="stacked">Delivery Address</IonLabel>
                            <IonTextarea value={address} onIonChange={e => setAddress(e.detail.value!)} required rows={3} placeholder="Enter your full address" />
                        </IonItem>
                    </IonList>
                    <IonButton type="submit" expand="block" className="checkout-button">Place Order</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default CheckoutScreen;
