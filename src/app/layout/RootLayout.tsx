import '../globals.css';
import { AppSidebar } from '@/widgets/sidebar/ui/Sidebar';
import { ReactQueryProvider } from '../provider/ReactQueryProvider';
import { outfit, pretendard } from '../font';
import { Toaster } from '@/shared/ui/toaster';
import { Suspense } from 'react';

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${outfit.variable}`}>
      <body className="font-pretendard antialiased">
        <Toaster />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

export function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="group/layout">
      <Suspense fallback={<div className="w-64 border-r bg-white" />}>
        <AppSidebar />
      </Suspense>
      <main className="ml-64 flex-1 overflow-y-auto px-10 py-12 text-slate-900 transition-all duration-300 ease-in-out group-has-[aside.w-20]/layout:ml-20 selection:bg-emerald-100">
        {children}
      </main>
    </div>
  );
}

export function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
