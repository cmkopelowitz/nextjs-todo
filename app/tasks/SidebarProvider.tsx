"use client"
import React, { createContext } from 'react'

interface SidebarContextProps {
  sidebarVisible: boolean;
  currentList: string;
}
export const SidebarContext = createContext<SidebarContextProps|null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
  }) => {
  
  const initialValue = {
    sidebarVisible: false,
    currentList: 'My Day'
  }
  return (
    <SidebarContext.Provider value={initialValue}>{ children}</SidebarContext.Provider>
  )
}

