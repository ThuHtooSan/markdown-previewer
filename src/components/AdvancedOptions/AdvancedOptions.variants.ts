import { Variants } from 'framer-motion';

export const advancedOptionsContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};

export const advancedOptionsVariants: Variants = {
  hidden: {
    scale: 1.2,
  },
  visible: {
    scale: 1,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};
