
import React, { useContext } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonBadge } from '@ionic/react';
import { home, personCircle, cart as cartIcon } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CartScreen from './CartScreen';
import CheckoutScreen from './CheckoutScreen';
import { AppContext } from '../App';

const TabScreens: React.FC = () => {
    const { cart } = useContext(AppContext);
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/home" />
                <Route path="/tabs/home" component={HomeScreen} exact={true} />
                <Route path="/tabs/profile" component={ProfileScreen} exact={true} />
                <Route path="/tabs/cart" component={CartScreen} exact={true} />
                <Route path="/tabs/checkout" component={CheckoutScreen} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/tabs/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="cart" href="/tabs/cart">
                    <IonIcon icon={cartIcon} />
                    <IonLabel>Cart</IonLabel>
                    {cartItemCount > 0 && <IonBadge color="danger">{cartItemCount}</IonBadge>}
                </IonTabButton>
                <IonTabButton tab="profile" href="/tabs/profile">
                    <IonIcon icon={personCircle} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default TabScreens;