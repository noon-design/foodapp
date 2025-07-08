import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- MOCK DATA ---
const categories = [
    { name: 'Snacks', icon: '🍔' },
    { name: 'Salads', icon: '🥗' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Drinks', icon: '🥤' },
    { name: 'Other', icon: '🍰' },
];

const foodItems = [
    {
        id: 1,
        name: 'Burger Pack',
        description: 'Beef, cheese, onion, pickle',
        price: '12.99',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop',
        category: 'Snacks'
    },
    {
        id: 2,
        name: 'Sandwich Bowl',
        description: 'Toast, sandwich, with tomato',
        price: '9.50',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2073&auto=format&fit=crop',
        category: 'Snacks'
    },
    {
        id: 3,
        name: 'Supreme Pizza',
        description: 'Mixed toppings, mozzarella',
        price: '15.00',
        image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1935&auto=format&fit=crop',
        category: 'Pizza'
    },
    {
        id: 4,
        name: 'Pepperoni Slice',
        description: 'Classic pepperoni & cheese',
        price: '5.50',
        image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=2076&auto=format&fit=crop',
        category: 'Pizza'
    },
    {
        id: 5,
        name: 'Caesar Salad',
        description: 'Crisp romaine, croutons',
        price: '8.75',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1974&auto=format&fit=crop',
        category: 'Salads'
    },
     {
        id: 6,
        name: 'Greek Salad',
        description: 'Feta, olives, and greens',
        price: '9.25',
        image: 'https://images.unsplash.com/photo-1505253716362-afb74bf60d44?q=80&w=2070&auto=format&fit=crop',
        category: 'Salads'
    },
    {
        id: 7,
        name: 'Coca-Cola',
        description: 'Classic refreshing soda',
        price: '2.50',
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1887&auto=format&fit=crop',
        category: 'Drinks'
    },
    {
        id: 8,
        name: 'Iced Coffee',
        description: 'Chilled and caffeinated',
        price: '4.50',
        image: 'https://images.unsplash.com/photo-1517701550927-4e4b97436b95?q=80&w=1964&auto=format&fit=crop',
        category: 'Drinks'
    },
    {
        id: 9,
        name: 'Cheesecake Slice',
        description: 'Creamy and decadent',
        price: '6.00',
        image: 'https://images.unsplash.com/photo-1542826438-c32144d12596?q=80&w=1887&auto=format&fit=crop',
        category: 'Other'
    },
     {
        id: 10,
        name: 'French Fries',
        description: 'Crispy golden potatoes',
        price: '4.00',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1974&auto=format&fit=crop',
        category: 'Snacks'
    },
];

// --- SVG Icons ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const HeartIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const PlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const MinusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>);


// --- COMPONENTS ---

const SplashScreen = ({ onStart }) => (
    <div className="splash-screen">
        <div className="splash-content">
            <h1>Eat Healthy & Delicious Food</h1>
            <p>Anytime, anywhere.</p>
            <button className="start-button" onClick={onStart}>Let's Start</button>
        </div>
    </div>
);

const FoodCard = ({ item, onAddToCart }) => (
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

const HomeScreen = ({ onAddToCart }) => {
    const [activeCategory, setActiveCategory] = useState(categories[0].name);

    const filteredFoodItems = useMemo(() => 
        foodItems.filter(item => item.category === activeCategory),
        [activeCategory]
    );

    return (
        <div className="content-screen">
            <header className="home-header">
                <div>
                    <h2>Hi, Mark</h2>
                    <p style={{ color: 'var(--grey-medium)' }}>Let's get your food!</p>
                </div>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" alt="Profile" className="profile-pic" />
            </header>

            <div className="search-bar">
                <SearchIcon />
                <input type="text" placeholder="What would you like to eat?" aria-label="Search for food"/>
            </div>
            
            <div className="categories" role="tablist" aria-label="Food categories">
                {categories.map(category => (
                    <div 
                        key={category.name}
                        className={`category-card ${activeCategory === category.name ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category.name)}
                        role="tab"
                        aria-selected={activeCategory === category.name}
                    >
                        <div className="icon">{category.icon}</div>
                        <span>{category.name}</span>
                    </div>
                ))}
            </div>

            <h3 className="section-title">{activeCategory}</h3>
            <div className="food-list">
                {filteredFoodItems.map(item => (
                    <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
                ))}
            </div>
        </div>
    );
};

const CartScreen = ({ cart, onUpdateQuantity, onCheckout }) => {
    const total = useMemo(() =>
        cart.reduce((sum, cartItem) => sum + parseFloat(cartItem.item.price) * cartItem.quantity, 0).toFixed(2),
        [cart]
    );

    if (cart.length === 0) {
        return (
            <div className="placeholder-screen">
                <h1>Your cart is empty</h1>
                <p>Add some delicious food to get started!</p>
            </div>
        );
    }
    
    return (
        <div className="content-screen cart-screen">
            <h1 className="section-title">My Cart</h1>
            <div className="cart-items-list">
                {cart.map(cartItem => (
                    <div key={cartItem.item.id} className="cart-item">
                        <img src={cartItem.item.image} alt={cartItem.item.name} className="cart-item-img" />
                        <div className="cart-item-info">
                            <h3>{cartItem.item.name}</h3>
                            <p>${cartItem.item.price}</p>
                        </div>
                        <div className="quantity-controls">
                            <button onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)} aria-label="Remove one item"><MinusIcon /></button>
                            <span>{cartItem.quantity}</span>
                            <button onClick={() => onUpdateQuantity(cartItem.item.id, Number(cartItem.quantity) + 1)} aria-label="Add one item"><PlusIcon /></button>
                        </div>
                    </div>
                ))}
            </div>
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
                <button className="checkout-button" onClick={onCheckout}>Checkout</button>
            </div>
        </div>
    );
};

const CheckoutScreen = ({ cart, onPlaceOrder }) => {
    const [name, setName] = useState('Mark');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const total = useMemo(() =>
        cart.reduce((sum, cartItem) => sum + parseFloat(cartItem.item.price) * cartItem.quantity, 0).toFixed(2),
        [cart]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && phone && address) {
            onPlaceOrder({ name, phone, address });
        } else {
            alert('Please fill in all details.');
        }
    };

    return (
        <div className="content-screen checkout-screen">
            <h1 className="section-title">Checkout Details</h1>
            <div className="order-summary-checkout">
                <h3>Order Summary</h3>
                 <div className="summary-row total">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>
            <form className="checkout-form" onSubmit={handleSubmit} aria-label="Checkout form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required aria-required="true" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required aria-required="true" placeholder="Enter your phone number"/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Delivery Address</label>
                    <textarea id="address" value={address} onChange={e => setAddress(e.target.value)} required aria-required="true" rows={3} placeholder="Enter your full address"></textarea>
                </div>
                <button type="submit" className="checkout-button">Place Order</button>
            </form>
        </div>
    );
};

const OrderSuccessScreen = ({ onBackToHome }) => (
    <div className="placeholder-screen order-success-screen">
        <div className="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h1>Order Placed!</h1>
        <p>Your food is on its way. Thank you!</p>
        <button className="start-button" onClick={onBackToHome} style={{marginTop: '2rem'}}>Back to Home</button>
    </div>
);


const PlaceholderScreen = ({ title }) => (
    <div className="placeholder-screen">
        <h1>{title}</h1>
    </div>
);

const BottomNav = ({ activePage, onNavigate, cartItemCount }) => (
    <nav className="bottom-nav">
        <button className={`nav-item ${activePage === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')} aria-label="Home" aria-current={activePage === 'home'}><HomeIcon /></button>
        <button className={`nav-item ${activePage === 'orders' ? 'active' : ''}`} onClick={() => onNavigate('orders')} aria-label="Orders" aria-current={activePage === 'orders'}><ListIcon /></button>
        <button className={`nav-fab ${activePage === 'favorites' ? 'active' : ''}`} onClick={() => onNavigate('favorites')} aria-label="Favorites" aria-current={activePage === 'favorites'}><HeartIcon /></button>
        <button className={`nav-item ${activePage === 'profile' ? 'active' : ''}`} onClick={() => onNavigate('profile')} aria-label="Profile" aria-current={activePage === 'profile'}><UserIcon /></button>
        <button className={`nav-item ${activePage === 'cart' ? 'active' : ''}`} onClick={() => onNavigate('cart')} aria-label="Cart" aria-current={activePage === 'cart'}>
            <div className="cart-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </div>
        </button>
    </nav>
);

const App = () => {
    const [page, setPage] = useState('splash');
    const [cart, setCart] = useState([]);

    const handleAddToCart = (itemToAdd) => {
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

    const handleUpdateQuantity = (itemId, newQuantity) => {
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

    const handleCheckout = () => {
        if (cart.length > 0) {
            setPage('checkout');
        }
    };

    const handlePlaceOrder = (orderDetails) => {
        console.log('Order placed:', orderDetails);
        setCart([]); // Clear cart
        setPage('orderSuccess');
    };

    const handleBackToHome = () => {
        setPage('home');
    }
    
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomeScreen onAddToCart={handleAddToCart} />;
            case 'orders':
                return <PlaceholderScreen title="My Orders" />;
            case 'favorites':
                return <PlaceholderScreen title="Favorites" />;
            case 'profile':
                return <PlaceholderScreen title="My Profile" />;
            case 'cart':
                return <CartScreen cart={cart} onUpdateQuantity={handleUpdateQuantity} onCheckout={handleCheckout} />;
            case 'checkout':
                return <CheckoutScreen cart={cart} onPlaceOrder={handlePlaceOrder} />;
            case 'orderSuccess':
                return <OrderSuccessScreen onBackToHome={handleBackToHome} />;
            default:
                return <HomeScreen onAddToCart={handleAddToCart} />;
        }
    };

    if (page === 'splash') {
        return (
             <main className="app-container">
                <SplashScreen onStart={() => setPage('home')} />
             </main>
        );
    }

    const showBottomNav = ['home', 'orders', 'favorites', 'profile', 'cart'].includes(page);

    return (
        <main className="app-container">
            {renderPage()}
            {showBottomNav && <BottomNav activePage={page} onNavigate={setPage} cartItemCount={cartItemCount}/>}
        </main>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);