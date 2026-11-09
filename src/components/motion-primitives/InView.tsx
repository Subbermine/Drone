import React, { useRef } from 'react';
import { motion, useInView, Variant } from 'framer-motion';

interface InViewProps {
  children: React.ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: any;
  viewOptions?: Parameters<typeof useInView>[1];
  className?: string;
}

const defaultVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export const InView: React.FC<InViewProps> = ({
  children,
  variants = defaultVariants,
  transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  viewOptions = { once: true, margin: '-50px' },
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

