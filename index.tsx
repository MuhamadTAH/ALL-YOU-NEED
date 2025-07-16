import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

type Page = 'home' | 'pricing' | 'login' | 'signup' | 'dashboard' | 'privacy' | 'terms' | 'checkout';
type Plan = { name: string; price: string; period: string; };

const Header = ({ setPage, isLoggedIn, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const handleNav = (page: Page) => {
        setPage(page);
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="container">
                <nav className="header-nav">
                    <div className="logo" onClick={() => handleNav('home')}>SubScribe</div>
                    <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        &#9776;
                    </button>
                    <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        <a href="#" onClick={() => handleNav('home')}>Home</a>
                        <a href="#" onClick={() => handleNav('pricing')}>Pricing</a>
                        {isLoggedIn ? (
                            <>
                                <a href="#" onClick={() => handleNav('dashboard')}>Dashboard</a>
                                <button onClick={onLogout}>Log Out</button>
                            </>
                        ) : (
                            <>
                                <a href="#" onClick={() => handleNav('login')}>Log In</a>
                                <a href="#" className="nav-cta" onClick={() => handleNav('signup')}>Sign Up</a>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

const HomePage = ({ setPage }) => (
    <>
        <section className="hero">
            <div className="container">
                <h1>The Future of Subscriptions is Here</h1>
                <p>Unlock premium content, exclusive features, and an ad-free experience. Join thousands of satisfied users today.</p>
                <a href="#" onClick={() => setPage('pricing')} className="cta-button">Get Started</a>
            </div>
        </section>
        <section className="benefits">
            <div className="container">
                <h2 className="page-title">Why SubScribe?</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <h3>Exclusive Content</h3>
                        <p>Get access to a library of content not available anywhere else.</p>
                    </div>
                    <div className="benefit-card">
                        <h3>Ad-Free Experience</h3>
                        <p>Enjoy our service without any interruptions or annoying ads.</p>
                    </div>
                    <div className="benefit-card">
                        <h3>Cancel Anytime</h3>
                        <p>No commitments. You can easily manage or cancel your plan online.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
);

const PricingPage = ({ setPage, onSubscribe }) => {
    const [isYearly, setIsYearly] = useState(false);
    
    const plans = {
        basic: { name: 'Basic', price: isYearly ? '96' : '10', period: isYearly ? 'year' : 'mo' },
        pro: { name: 'Pro', price: isYearly ? '192' : '20', period: isYearly ? 'year' : 'mo' },
        enterprise: { name: 'Enterprise', price: isYearly ? '480' : '50', period: isYearly ? 'year' : 'mo' }
    };

    return (
        <main className="container">
            <h1 className="page-title">Choose Your Plan</h1>
            <div className="pricing-toggle">
                <span>Monthly</span>
                <label className="toggle-switch">
                    <input type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
                    <span className="slider"></span>
                </label>
                <span>Yearly (Save 20%)</span>
            </div>
            <div className="pricing-grid">
                <div className="pricing-card">
                    <h3>Basic</h3>
                    <p className="price">${plans.basic.price}<span className="period">/{plans.basic.period}</span></p>
                    <ul className="features">
                        <li>Access to standard content</li>
                        <li>Watch on one device</li>
                        <li>Email support</li>
                    </ul>
                    <button className="subscribe-button" onClick={() => onSubscribe(plans.basic)}>Subscribe</button>
                </div>
                <div className="pricing-card popular">
                    <div className="popular-badge">Most Popular</div>
                    <h3>Pro</h3>
                    <p className="price">${plans.pro.price}<span className="period">/{plans.pro.period}</span></p>
                    <ul className="features">
                        <li>Access to all content</li>
                        <li>Watch on two devices</li>
                        <li>Priority email support</li>
                        <li>Offline access</li>
                    </ul>
                    <button className="subscribe-button" onClick={() => onSubscribe(plans.pro)}>Subscribe</button>
                </div>
                <div className="pricing-card">
                    <h3>Enterprise</h3>
                    <p className="price">${plans.enterprise.price}<span className="period">/{plans.enterprise.period}</span></p>
                    <ul className="features">
                        <li>Access for your whole team</li>
                        <li>Watch on unlimited devices</li>
                        <li>24/7 dedicated support</li>
                        <li>Custom integrations</li>
                    </ul>
                    <button className="subscribe-button" onClick={() => onSubscribe(plans.enterprise)}>Subscribe</button>
                </div>
            </div>
        </main>
    );
};

const AuthForm = ({ isLogin, setPage, onAuth }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onAuth();
    };

    return (
        <main>
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" id="confirm-password" required />
                        </div>
                    )}
                    <button type="submit" className="auth-button">
                        {isLogin ? 'Log In' : 'Create Account'}
                    </button>
                    <div className="auth-switch">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setPage(isLogin ? 'signup' : 'login')}>
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

const CheckoutPage = ({ plan, onConfirmPayment }: { plan: Plan; onConfirmPayment: () => void; }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd process payment here.
        // For this demo, we'll just confirm and log in.
        onConfirmPayment();
    };

    return (
        <main className="container">
            <h1 className="page-title">Checkout</h1>
            <div className="checkout-layout">
                <div className="checkout-form-container">
                    <h3>Payment Details</h3>
                    <p>Complete your purchase by providing your payment details.</p>
                    <form className="payment-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="cardholder-name">Cardholder Name</label>
                            <input type="text" id="cardholder-name" required placeholder="John Smith" />
                        </div>
                         <div className="form-group">
                            <label htmlFor="card-number">Card Number</label>
                            <input type="text" id="card-number" required placeholder="1234 5678 9101 1121" pattern="\d{4} \d{4} \d{4} \d{4}" title="Card number should be 16 digits."/>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expiry-date">Expiry Date</label>
                                <input type="text" id="expiry-date" required placeholder="MM / YY" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvc">CVC</label>
                                <input type="text" id="cvc" required placeholder="123" />
                            </div>
                        </div>
                         <button type="submit" className="auth-button" style={{marginTop: '1rem'}}>
                            Confirm Payment
                        </button>
                    </form>
                </div>
                <aside className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="order-item">
                        <span>{plan.name} Plan</span>
                        <span>${plan.price}/{plan.period}</span>
                    </div>
                    <div className="order-total">
                        <strong>Total</strong>
                        <strong>${plan.price}</strong>
                    </div>
                     <div className="secure-info">
                        <p>✓ Secure payment with SSL Encryption</p>
                    </div>
                </aside>
            </div>
        </main>
    );
};


const DashboardPage = () => (
    <main>
        <div className="dashboard-container">
            <h2>Welcome Back!</h2>
            <div className="dashboard-section">
                <h3>Your Subscription</h3>
                <p><strong>Current Plan:</strong> Pro - Yearly</p>
                <p><strong>Next Billing Date:</strong> January 1, 2025</p>
                <button className="subscribe-button" style={{ marginTop: '1rem', width: 'auto' }}>Manage Subscription</button>
            </div>
            <div className="dashboard-section">
                <h3>Account Details</h3>
                <p><strong>Email:</strong> user@example.com</p>
                <button className="subscribe-button" style={{ marginTop: '1rem', width: 'auto' }}>Edit Profile</button>
            </div>
        </div>
    </main>
);

const StaticPage = ({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) => (
    <main>
        <div className="static-page-container">
            <h2>{title}</h2>
            {children}
        </div>
    </main>
);

const PrivacyPolicyPage = () => (
    <StaticPage title="Privacy Policy">
        <p><em>Last Updated: [Date]</em></p>
        <p>This is a placeholder for your Privacy Policy. It's important to be transparent with your users about what data you collect, how you use it, and with whom you share it.</p>
        <p>A comprehensive privacy policy should include information about:</p>
        <ul>
            <li>The types of personal information you collect (e.g., name, email, payment information, usage data).</li>
            <li>How and why you collect this information.</li>
            <li>How you use the collected information (e.g., to provide the service, for billing, for marketing).</li>
            <li>Your legal basis for processing data.</li>
            <li>Any third-party services you use that may also collect user data (e.g., Stripe, Google Analytics).</li>
            <li>Your data retention policies.</li>
            <li>The rights of users regarding their data (e.g., right to access, correct, or delete their data).</li>
            <li>How users can exercise their rights.</li>
            <li>Your contact information for privacy-related inquiries.</li>
        </ul>
        <p>Please consult with a legal professional to draft a policy that is compliant with regulations like GDPR, CCPA, etc., and is tailored to your specific business practices.</p>
    </StaticPage>
);

const TermsOfServicePage = () => (
    <StaticPage title="Terms of Service">
        <p><em>Last Updated: [Date]</em></p>
        <p>This is a placeholder for your Terms of Service (ToS) agreement. This document is a legal agreement between you and your users, outlining the rules and responsibilities for both parties.</p>
        <p>Key sections to include in a ToS are:</p>
        <ul>
            <li><strong>Introduction:</strong> Acceptance of terms.</li>
            <li><strong>User Accounts:</strong> Responsibilities regarding account creation and security.</li>
            <li><strong>Subscription Plans & Payments:</strong> Details on billing cycles, recurring payments, refunds, and cancellation policies.</li>
            <li><strong>Content and Usage Rules:</strong> What users can and cannot do on your service. Prohibited activities.</li>
            <li><strong>Intellectual Property:</strong> Ownership of your content and brand.</li>
            <li><strong>Termination:</strong> Conditions under which you or the user can terminate the account.</li>
            <li><strong>Disclaimers and Limitation of Liability:</strong> Limiting your legal liability for the service.</li>
            <li><strong>Governing Law:</strong> The jurisdiction that governs the agreement.</li>
            <li><strong>Changes to Terms:</strong> Your right to modify the terms and how you will notify users.</li>
        </ul>
        <p>It is highly recommended to have a lawyer draft or review your Terms of Service to ensure it is legally sound and protects your business.</p>
    </StaticPage>
);


const Footer = ({ setPage }) => (
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} SubScribe. All Rights Reserved.</p>
                <div className="footer-links">
                    <a href="#" onClick={() => setPage('privacy')}>Privacy Policy</a>
                    <a href="#" onClick={() => setPage('terms')}>Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
);

const App = () => {
    const [page, setPage] = useState<Page>('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setPage('dashboard');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setPage('home');
    };
    
    const handleSubscribe = (plan: Plan) => {
        setSelectedPlan(plan);
        setPage('checkout');
    };


    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage setPage={setPage} />;
            case 'pricing':
                return <PricingPage setPage={setPage} onSubscribe={handleSubscribe} />;
            case 'login':
                return <AuthForm isLogin={true} setPage={setPage} onAuth={handleLogin} />;
            case 'signup':
                return <AuthForm isLogin={false} setPage={setPage} onAuth={handleLogin} />;
            case 'checkout':
                return selectedPlan ? 
                    <CheckoutPage plan={selectedPlan} onConfirmPayment={handleLogin} /> : 
                    <PricingPage setPage={setPage} onSubscribe={handleSubscribe} />;
            case 'dashboard':
                return isLoggedIn ? <DashboardPage /> : <AuthForm isLogin={true} setPage={setPage} onAuth={handleLogin} />;
            case 'privacy':
                return <PrivacyPolicyPage />;
            case 'terms':
                return <TermsOfServicePage />;
            default:
                return <HomePage setPage={setPage} />;
        }
    };
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="app-container">
            <Header setPage={setPage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            {renderPage()}
            <Footer setPage={setPage} />
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
