
import React, { useState, useMemo, useContext } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonAvatar, IonInput } from '@ionic/react';
import { AppContext, FoodItem } from '../App';
import { searchOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const categories = [
    { name: 'Snacks', icon: '🍔' }, { name: 'Salads', icon: '🥗' }, { name: 'Pizza', icon: '🍕' },
    { name: 'Drinks', icon: '🥤' }, { name: 'Other', icon: '🍰' },
];

const foodItems: FoodItem[] = [
    { id: 1, name: 'Burger Pack', description: 'Beef, cheese, onion, pickle', price: '12.99', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop', category: 'Snacks' },
    { id: 2, name: 'Sandwich Bowl', description: 'Toast, sandwich, with tomato', price: '9.50', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2073&auto=format&fit=crop', category: 'Snacks' },
    { id: 3, name: 'Supreme Pizza', description: 'Mixed toppings, mozzarella', price: '15.00', image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1935&auto=format&fit=crop', category: 'Pizza' },
    { id: 4, name: 'Pepperoni Slice', description: 'Classic pepperoni & cheese', price: '5.50', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=2076&auto=format&fit=crop', category: 'Pizza' },
    { id: 5, name: 'Caesar Salad', description: 'Crisp romaine, croutons', price: '8.75', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1974&auto=format&fit=crop', category: 'Salads' },
    { id: 6, name: 'Greek Salad', description: 'Feta, olives, and greens', price: '9.25', image: 'https://images.unsplash.com/photo-1505253716362-afb74bf60d44?q=80&w=2070&auto=format&fit=crop', category: 'Salads' },
    { id: 7, name: 'Coca-Cola', description: 'Classic refreshing soda', price: '2.50', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1887&auto=format&fit=crop', category: 'Drinks' },
    { id: 8, name: 'Iced Coffee', description: 'Chilled and caffeinated', price: '4.50', image: 'https://images.unsplash.com/photo-1517701550927-4e4b97436b95?q=80&w=1964&auto=format&fit=crop', category: 'Drinks' },
    { id: 9, name: 'Cheesecake Slice', description: 'Creamy and decadent', price: '6.00', image: 'https://images.unsplash.com/photo-1542826438-c32144d12596?q=80&w=1887&auto=format&fit=crop', category: 'Other' },
    { id: 10, name: 'French Fries', description: 'Crispy golden potatoes', price: '4.00', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1974&auto=format&fit=crop', category: 'Snacks' },
];

const FoodCard = ({ item, onAddToCart }: { item: FoodItem, onAddToCart: (item: FoodItem) => void }) => (
    <div className="food-card" aria-label={`Food item: ${item.name}`}>
        <img src={item.image} alt={item.name} className="food-card-img" />
        <div className="food-card-info">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="food-card-details">
                <span className="food-card-price">${item.price}</span>
                <button className="add-to-cart-btn" onClick={() => onAddToCart(item)} aria-label={`Add ${item.name} to cart`}>+</button>
            </div>
        </div>
    </div>
);

const HomeScreen: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0].name);
    const { addToCart } = useContext(AppContext);

    const filteredFoodItems = useMemo(() =>
        foodItems.filter(item => item.category === activeCategory),
        [activeCategory]
    );

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <div className="home-header">
                        <div>
                            <h2>Hi, Mark</h2>
                            <p style={{ color: 'var(--grey-medium)' }}>Let's get your food!</p>
                        </div>
                        <IonButtons slot="end">
                            <IonAvatar className="profile-pic">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" alt="Profile" />
                            </IonAvatar>
                        </IonButtons>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <div className="search-bar">
                    <IonIcon icon={searchOutline} />
                    <IonInput type="text" placeholder="What would you like to eat?" aria-label="Search for food" />
                </div>

                <div className="categories" role="tablist" aria-label="Food categories">
                    {categories.map(category => (
                        <div key={category.name} className={`category-card ${activeCategory === category.name ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.name)} role="tab" aria-selected={activeCategory === category.name}>
                            <div className="icon">{category.icon}</div>
                            <span>{category.name}</span>
                        </div>
                    ))}
                </div>

                <h3 className="section-title">{activeCategory}</h3>
                <div className="food-list">
                    {filteredFoodItems.map(item => (
                        <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
                    ))}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default HomeScreen;
