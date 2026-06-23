import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout({ title, subtitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-mercure-surface">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-w-0 max-w-full overflow-x-hidden lg:pl-72">
        <Header
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="min-w-0 max-w-full overflow-x-hidden p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
