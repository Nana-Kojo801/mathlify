import { motion } from 'framer-motion'
import Logo from '/logo.svg'

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <motion.img
        src={Logo}
        alt="Mathlify Logo"
        className="h-20 w-20 mb-4"
        animate={{
          y: [0, -20, 0, -10, 0],
          scale: [1, 1.2, 1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.h2
        className="text-2xl font-bold text-primary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Mathlify
      </motion.h2>
    </div>
  )
}

export default LoadingScreen
