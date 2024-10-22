import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function AnimatedButton() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.8 }}
      whileHover={{ scale: 1.05, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Button className='rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition-colors duration-300 hover:bg-blue-600'>
        綺麗なボタン
      </Button>
    </motion.div>
  )
}
