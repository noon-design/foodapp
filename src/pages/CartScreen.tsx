
import React, { useContext, useMemo } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonThumbnail, IonLabel, IonButton, useIonRouter, IonIcon } from '@ionic/react';
import { AppContext, CartItem } from '../App';
import { add, remove } from 'ionicons/icons';

const PlaceholderScreen = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="placeholder-screen">
        <h1>{title}</h1>
        <p>{subtitle}</p>
    </div>
);


const CartScreen: React.FC = () => {
    const { cart, setCart } = useContext(AppContext);
    const router = useIonRouter();

    const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            setCart(prevCart => prevCart.filter(cartItem => cartItem.item.id !== itemId));
        } else {
            setCart(prevCart => prevCart.map(cartItem =>
                cartItem.item.id === itemId
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
            ));
        }
    };

    const total = useMemo(() =>
        cart.reduce((sum, cartItem) => sum + parseFloat(cartItem.item.price) * cartItem.quantity, 0).toFixed(2),
        [cart]
    );

    const handleCheckout = () => {
        if (cart.length > 0) {
            router.push('/tabs/checkout');
        }
    };

    if (cart.length === 0) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>My Cart</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <PlaceholderScreen title="Your cart is empty" subtitle="Add some delicious food to get started!" />
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Cart</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList lines="none" className="cart-items-list">
                    {cart.map((cartItem: CartItem) => (
                        <IonItem key={cartItem.item.id} className="cart-item">
                            <IonThumbnail slot="start">
                                <img src={cartItem.item.image} alt={cartItem.item.name} className="cart-item-img" />
                            </IonThumbnail>
                            <IonLabel>
                                <h3>{cartItem.item.name}</h3>
                                <p>${cartItem.item.price}</p>
                            </IonLabel>
                            <div className="quantity-controls" slot="end">
                                <IonButton fill="clear" size="small" onClick={() => handleUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)} aria-label="Remove one item">
                                    <IonIcon slot="icon-only" icon={remove} />
                                </IonButton>
                                <span>{cartItem.quantity}</span>
                                <IonButton fill="clear" size="small" onClick={() => handleUpdateQuantity(cartItem.item.id, Number(cartItem.quantity) + 1)} aria-label="Add one item">
                                     <IonIcon slot="icon-only" icon={add} />
                                </IonButton>
                            </div>
                        </IonItem>
                    ))}
                </IonList>

                <div className="cart-summary">
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${total}</span>
                    </div>
                    <div className="summary-row">
                        <span>Delivery</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <IonButton expand="block" className="checkout-button" onClick={handleCheckout}>Checkout</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default CartScreen;
