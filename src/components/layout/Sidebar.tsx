import React from 'react';
import { LayoutDashboard, FileText, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '#' },
  { name: 'Posts', icon: FileText, href: '#', current: true },
  { name: 'Settings', icon: Settings, href: '#' },
];

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-gray-900 h-screen">
      <div className="flex items-center justify-center h-16 px-4">
        <h1 className="text-xl font-bold text-white">Blog Admin</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              item.current
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
}