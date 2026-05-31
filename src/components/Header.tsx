import { Search, Bell, Settings, Layers, Star } from 'lucide-react';

interface HeaderProps {
  title: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  legitimacyRate?: number;
}

export default function Header({ 
  title, 
  searchQuery, 
  setSearchQuery, 
  activeTab,
  legitimacyRate = 94 
}: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-64 h-20 bg-paper-background/95 backdrop-blur-md border-b border-mineral-gray/10 flex justify-between items-center px-10 z-40 transition-colors duration-300">
      {/* Title Context */}
      <div className="flex items-center gap-3">
        <Layers className="w-5.5 h-5.5 text-clay-terracotta" />
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-primary">
          {title}
        </h2>
      </div>

      {/* Action / Search Area */}
      <div className="flex items-center gap-6">
        {/* Search Input */}
        <div className="relative w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar na Teia..."
            className="w-full bg-surface-container rounded-full py-2 px-10 border-none text-sm text-on-surface-variant focus:ring-2 focus:ring-cerrado-ochre placeholder-on-surface-variant/50 focus:outline-none transition-all duration-200"
          />
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/70" />
        </div>

        {/* Right Operations */}
        <div className="flex items-center gap-1.5 text-on-surface-variant/75">
          <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant hover:text-primary transition-colors duration-200 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-conflict-red"></span>
          </button>
          
          <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant hover:text-primary transition-colors duration-200">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Optional Situational Consensus Widget (Screenshot 3 style) */}
        {activeTab === 'guardia' && (
          <div className="flex flex-col items-end border-l border-mineral-gray/20 pl-6 select-none">
            <span className="font-mono text-[9px] font-bold text-clay-terracotta tracking-widest leading-none mb-1">
              CONSENSO ATUAL
            </span>
            <span className="font-mono text-xs font-bold text-validation-seal flex items-center gap-1.5 leading-none">
              <span className="w-2 h-2 rounded-full bg-validation-seal animate-pulse"></span>
              {legitimacyRate}% Legitimado
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
