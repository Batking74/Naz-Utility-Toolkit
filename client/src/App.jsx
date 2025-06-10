// Importing Modules/Packages
import NavigationComponent from './components/NavigationComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Whenever user goes to another route scroll to the top of the page
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const getBackgroundStyle = (path) => {
  switch (path) {
    case '/': return { backgroundImage: 'linear-gradient(to top, red, black)' };
    case '/PasswordGenerator': return { backgroundColor: '#f9fbfd' };
    case '/DigitalCalculator': return { backgroundImage: 'linear-gradient(to right, red, blue)' };
    default: return { backgroundColor: '#0a0a23' };
  }
};

// Returning Components/JSX
export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname} // use directly
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.4 }}
          style={{
            ...getBackgroundStyle(location.pathname),
            minHeight: '100vh',
          }}
        >
          <NavigationComponent />
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}