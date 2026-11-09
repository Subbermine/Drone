import React from 'react';
import { motion } from 'framer-motion';

interface TextEffectProps {
  children: string;
  className?: string;
  delay?: number;
  per?: 'word' | 'char';
  as?: keyof JSX.IntrinsicElements;
}

export const TextEffect: React.FC<TextEffectProps> = ({
  children,
  className = '',
  delay = 0,
  per = 'word',
  as: Component = 'span',
}) => {
  const words = children.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: per === 'word' ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 150,
      },
    },
  };

  const MotionComponent = motion(Component as any);

  if (per === 'word') {
    return (
      <MotionComponent
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`inline-block ${className}`}
      >
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            variants={childVariants}
            className="inline-block mr-[0.25em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  // Character level
  const characters = children.split('');
  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`inline-block ${className}`}
    >
      {characters.map((char, idx) => (
        <motion.span
          key={idx}
          variants={childVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

