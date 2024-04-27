'use client'
import React from 'react'
import Wrapper from '@/components/wrapper/wrapper.jsx'
import { AppProvider } from '@/context/appProvider'

export default function Page() {
  return (
    <AppProvider>
      <Wrapper />
    </AppProvider>
  )
}
