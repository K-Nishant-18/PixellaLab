import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// UI Interactions
import SmoothScroll from './components/UI/SmoothScroll';
import CustomCursor from './components/UI/CustomCursor';
import Loader from './components/UI/Loader';

// Lazy Load with artificial delay for branding moment
const lazyLoad = (importFunc) => {
    return React.lazy(() => {
        return Promise.all([
            importFunc(),
            new Promise(resolve => setTimeout(resolve, 1000)) // 2s minimum load time
        ]).then(([module]) => module);
    });
};

const Home = lazyLoad(() => import('./pages/Home'));
const Services = lazyLoad(() => import('./pages/Services'));
const Contact = lazyLoad(() => import('./pages/Contact'));
const Portfolio = lazyLoad(() => import('./pages/Portfolio'));
const About = lazyLoad(() => import('./pages/About'));
const HowItWorks = lazyLoad(() => import('./pages/HowItWorks'));
const Privacy = lazyLoad(() => import('./pages/Privacy'));
const Terms = lazyLoad(() => import('./pages/Terms'));
const QRGenerator = lazyLoad(() => import('./pages/Tools/QRGenerator'));

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/tools/qr-generator" element={<QRGenerator />} />
            </Routes>
        </AnimatePresence>
    );
};

const AppContent = () => {
    return (
        <SmoothScroll>
            <div className="flex flex-col min-h-screen bg-bg-primary cursor-none"> {/* Hide default cursor */}
                <CustomCursor />
                <ScrollToTop />
                <Navbar />
                <main className="flex-grow">
                    <Suspense fallback={<Loader />}>
                        <AnimatedRoutes />
                    </Suspense>
                </main>
                <Footer />
            </div>
        </SmoothScroll>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
