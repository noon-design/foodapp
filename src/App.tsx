
import React, { useState } from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import SplashScreen from './components/SplashScreen';
import TabScreens from './pages/TabScreens';

setupIonicReact({
  mode: 'ios' // or 'md' for Material Design
});

export interface CartItem {
    item: FoodItem;
    quantity: number;
}
export interface FoodItem {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
}

export const AppContext = React.createContext<{
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    addToCart: (itemToAdd: FoodItem) => void;
}>({
    cart: [],
    setCart: () => {},
    addToCart: () => {},
});

const App: React.FC = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (itemToAdd: FoodItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.item.id === itemToAdd.id);
            if (existingItem) {
                return prevCart.map(cartItem => 
                    cartItem.item.id === itemToAdd.id 
                        ? { ...cartItem, quantity: Number(cartItem.quantity) + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { item: itemToAdd, quantity: 1 }];
            }
        });
    };

    if (showSplash) {
        return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }

    return (
        <AppContext.Provider value={{ cart, setCart, addToCart }}>
            <IonApp>
                <IonReactRouter>
                    <Route path="/tabs" render={() => <TabScreens />} />
                    <Route exact path="/">
                        <Redirect to="/tabs/home" />
                    </Route>
                </IonReactRouter>
            </IonApp>
        </AppContext.Provider>
    );
};

export default App;
