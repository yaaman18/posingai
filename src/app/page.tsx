'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

// ホームページのメインコンポーネント
export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4'>
      <Header />
      <ActionButtons />
    </div>
  )
}

// ヘッダーコンポーネント
function Header() {
  return (
    <motion.h1
      className='mb-8 text-4xl font-bold text-gray-800'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      Choose Your Action
    </motion.h1>
  )
}

// アクションボタンを表示するコンポーネント
function ActionButtons() {
  return (
    <div className='space-x-4'>
      <ActionButton href='/image-to-text' label='Image to Text' />
      <ActionButton href='/text-to-image' label='Text to Image' />
    </div>
  )
}

// 個々のアクションボタンコンポーネント
function ActionButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Button variant='default' className='px-6 py-3 text-lg shadow-lg'>
          {label}
        </Button>
      </motion.div>
    </Link>
  )
}
