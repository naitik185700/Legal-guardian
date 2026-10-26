import React from 'react';
import { UtilityBar } from '@/components/layout/UtilityBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <UtilityBar />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
