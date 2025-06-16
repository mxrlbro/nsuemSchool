
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';

interface NewAdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function NewAdminLayout({ children, title }: NewAdminLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-nsuem-gray text-white">
        <AdminSidebar />
        <SidebarInset className="flex-1 bg-nsuem-gray">
          <header className="flex h-16 items-center justify-between px-6 border-b border-white/10 bg-nsuem-gray">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-white/70 hover:text-white" />
              <h1 className="text-xl font-medium">{title}</h1>
            </div>
          </header>
          <main className="p-6 bg-nsuem-gray min-h-screen">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
