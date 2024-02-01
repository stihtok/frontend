import React from 'react';
import { motion } from 'framer-motion';
import './MainApp.css';

const Animation = ({ children }) => {
  return (
    <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        exit={{ opacity:0 }}
        transition={{ transition: "ease-in", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default Animation;