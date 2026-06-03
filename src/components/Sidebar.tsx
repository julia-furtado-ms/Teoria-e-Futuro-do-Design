import { Compass, Network, ShieldAlert, BookOpen, LogOut, LogIn, Home } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  activeTab: 'home' | 'biomas' | 'linhagem' | 'guardia' | 'contribuicao';
  setActiveTab: (tab: 'home' | 'biomas' | 'linhagem' | 'guardia' | 'contribuicao') => void;
  pendingCount: number;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, pendingCount, currentUser, onOpenAuth, onLogout }: SidebarProps) {
  return (
    <nav className="fixed top-0 left-0 bottom-0 w-64 bg-paper-background border-r border-mineral-gray/20 flex flex-col py-8 z-50 transition-colors duration-300">
      {/* Brand Header */}
      <div className="px-6 mb-12">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-clay-terracotta leading-none">
          Teia <span className="font-normal tracking-wide text-2xl block text-mineral-gray mt-1">de Saberes</span>
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-mineral-gray/60 mt-2 font-bold select-none">
          Governança Comunitária
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow flex flex-col gap-1.5 px-3">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group text-left ${
            activeTab === 'home'
              ? 'bg-surface-container-low text-primary border-l-4 border-primary font-bold'
              : 'text-on-surface-variant hover:bg-surface-container-low/60 hover:text-primary'
          }`}
        >
          <Home className={`w-5 h-5 transition-colors ${
            activeTab === 'home' ? 'text-primary' : 'text-mineral-gray/70 group-hover:text-primary'
          }`} />
          <span className="font-sans text-[15px]">Página Inicial</span>
        </button>

        <button
          onClick={() => setActiveTab('biomas')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group text-left ${
            activeTab === 'biomas'
              ? 'bg-surface-container-low text-primary border-l-4 border-primary font-bold'
              : 'text-on-surface-variant hover:bg-surface-container-low/60 hover:text-primary'
          }`}
        >
          <Compass className={`w-5 h-5 transition-colors ${
            activeTab === 'biomas' ? 'text-primary' : 'text-mineral-gray/70 group-hover:text-primary'
          }`} />
          <span className="font-sans text-[15px]">Explorar Biomas</span>
        </button>

        <button
          onClick={() => setActiveTab('linhagem')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group text-left ${
            activeTab === 'linhagem'
              ? 'bg-surface-container-low text-primary border-l-4 border-primary font-bold'
              : 'text-on-surface-variant hover:bg-surface-container-low/60 hover:text-primary'
          }`}
        >
          <Network className={`w-5 h-5 transition-colors ${
            activeTab === 'linhagem' ? 'text-primary' : 'text-mineral-gray/70 group-hover:text-primary'
          }`} />
          <span className="font-sans text-[15px]">Linhagem de Saberes</span>
        </button>

        {currentUser?.role === 'GUARDIÃ' && (
          <button
            onClick={() => setActiveTab('guardia')}
            className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group text-left ${
              activeTab === 'guardia'
                ? 'bg-surface-container-low text-primary border-l-4 border-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-low/60 hover:text-primary'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <ShieldAlert className={`w-5 h-5 transition-colors ${
                activeTab === 'guardia' ? 'text-primary' : 'text-mineral-gray/70 group-hover:text-primary'
              }`} />
              <span className="font-sans text-[15px]">Painel da Guardiã</span>
            </div>
            {pendingCount > 0 && (
              <span className="bg-quarantine-amber text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ring-2 ring-white animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>
        )}

        <button
          onClick={() => setActiveTab('contribuicao')}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group text-left ${
            activeTab === 'contribuicao'
              ? 'bg-surface-container-low text-primary border-l-4 border-primary font-bold'
              : 'text-on-surface-variant hover:bg-surface-container-low/60 hover:text-primary'
          }`}
        >
          <BookOpen className={`w-5 h-5 transition-colors ${
            activeTab === 'contribuicao' ? 'text-primary' : 'text-mineral-gray/70 group-hover:text-primary'
          }`} />
          <span className="font-sans text-[15px]">Contribuição de Saberes</span>
        </button>
      </div>

      {/* Guardian Profile Footer Card */}
      <div className="mt-auto px-4 z-50">
        {currentUser ? (
          <div className="p-4 bg-surface-container rounded-xl border border-mineral-gray/10 flex flex-col gap-3 relative group">
            <div className="flex items-center gap-3 select-none">
              <div className="w-10 h-10 rounded-full bg-cerrado-ochre/20 overflow-hidden border border-cerrado-ochre/30 flex items-center justify-center font-bold text-clay-terracotta text-sm shrink-0 uppercase">
                <span>{currentUser.username[0]}</span>
              </div>
              <div className="overflow-hidden flex-1">
                <p className="font-mono text-[9px] uppercase tracking-wider text-cerrado-ochre font-semibold leading-none mb-1">
                  {currentUser.role}
                </p>
                <p className="font-sans font-bold text-xs tracking-tight text-on-surface truncate leading-tight">
                  {currentUser.username}
                </p>
                <p className="font-mono text-[9px] text-mineral-gray/70 truncate mt-0.5">
                  {currentUser.communityName} • {currentUser.biome}
                </p>
              </div>
            </div>
            
            {/* Action Buttons for Logged In */}
            <div className="flex gap-2 pt-2 border-t border-outline/10">
              <button
                onClick={onOpenAuth}
                id="switch-account-button"
                className="flex-1 font-mono text-[9px] font-bold uppercase tracking-wider py-1.5 px-2 bg-surface-container-high hover:bg-surface-container-highest border border-outline/25 rounded hover:text-cerrado-ochre transition-all text-center cursor-pointer"
              >
                Trocar Perfil
              </button>
              <button
                onClick={onLogout}
                id="logout-button"
                title="Sair da Sessão"
                className="font-mono text-[9px] font-bold uppercase py-1.5 px-2.5 bg-conflict-red/10 hover:bg-conflict-red/20 text-conflict-red rounded transition-all flex items-center justify-center cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-surface-container-high/40 rounded-xl border border-dashed border-outline/25 flex flex-col gap-3 select-none">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider text-mineral-gray font-semibold leading-none mb-1">
                ACESSO RESTRITO
              </p>
              <p className="font-sans text-xs text-on-surface-variant font-medium leading-normal">
                Faça login para assinar e validar a Rede de Saberes.
              </p>
            </div>
            <button
              onClick={onOpenAuth}
              id="sidebar-login-button"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-clay-terracotta hover:bg-clay-terracotta/95 text-white rounded-lg text-xs font-semibold shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Entrar / Cadastrar</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
