'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { useRouter } from 'next/navigation'

export function Card() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/ice-cream')
  }

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Ice Cream Survey</h2>
      <p className="text-gray-600">Click below to share your favorite ice cream flavor!</p>
      <RadixButton onClick={handleClick}>Go to Form</RadixButton>
    </div>
  )
}

// Radix-style Button using Slot (optional but composable)
function RadixButton({
  children,
  asChild = false,
  className = '',
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
