import { Header } from '@/widgets/header';
import '../globals.css';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/sidebar/ui/Sidebar';

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <Header />
            <main>{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
