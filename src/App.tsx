import { useState, useEffect } from 'react';
import { Saber, BiomeType, SaberStatus, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { fetchSaberes, createSaber, updateSaber } from './lib/supabase';
import ExplorarBiomas from './components/ExplorarBiomas';
import LinhagemSaberes from './components/LinhagemSaberes';
import PainelGuardia from './components/PainelGuardia';
import RitualContribuicao from './components/RitualContribuicao';
import RitualModal from './components/RitualModal';
import AuthModal from './components/AuthModal';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import { ShieldCheck, Sparkles, Database, Plus, CheckCircle, ShieldAlert } from 'lucide-react';

const DEFAULT_USER: User = {
  id: 'user-jovina',
  username: 'Dona Jovina',
  email: 'jovina@teia.org',
  communityName: 'Vão de Almas',
  role: 'GUARDIÃ',
  biome: 'Cerrado',
  territory: 'Cavalcante, GO',
};

export default function App() {
  // Current logged in User auth
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('teia_currentUser');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved current user:', e);
      }
    }
    return DEFAULT_USER; // Default to Dona Jovina on first boot
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Database State loaded from Supabase
  const [saberes, setSaberes] = useState<Saber[]>([]);
  const [isLoadingSaberes, setIsLoadingSaberes] = useState(true);
  const [saberesError, setSaberesError] = useState<string | null>(null);

  // Navigation and Filter States
  const [activeTab, setActiveTab] = useState<'home' | 'biomas' | 'linhagem' | 'guardia' | 'contribuicao'>('home');
  const [selectedSaberId, setSelectedSaberId] = useState<string | null>(null);
  const [selectedBiomeFilter, setSelectedBiomeFilter] = useState<BiomeType | 'Todos'>('Todos');
  const [selectedCommunityFilter, setSelectedCommunityFilter] = useState<string>('Todas as comunidades');
  const [searchQuery, setSearchQuery] = useState('');

  // Active validation modal subject
  const [activeValidationSaber, setActiveValidationSaber] = useState<Saber | null>(null);

  // Custom live alerts/toasts
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Fetch saberes from Supabase on first load
  useEffect(() => {
    async function loadSaberes() {
      setIsLoadingSaberes(true);
      setSaberesError(null);

      const { data, error } = await fetchSaberes();
      if (error) {
        console.error('Failed to load saberes from Supabase:', error);
        setSaberesError(error.message);
      }

      if (data) {
        setSaberes(data);
      }
      setIsLoadingSaberes(false);
    }

    loadSaberes();
  }, []);

  // Persist current user to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('teia_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('teia_currentUser');
    }
  }, [currentUser]);

  // Toast effect timeout
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Redirect contributor if on guardian page
  // Ensure only Guardiãs can access the guardian panel
  useEffect(() => {
    if (activeTab === 'guardia' && currentUser?.role !== 'GUARDIÃ') {
      setActiveTab('biomas');
    }
  }, [currentUser, activeTab]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    setToast({
      message: `Bem-vinda de volta, ${user.username}! Identidade autenticada sob a chancela da comunidade ${user.communityName}.`,
      type: 'success'
    });
  };

  const handleRegisterSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    setToast({
      message: `Identidade gravada com sucesso! Bem-vinda, ${user.username} do território ${user.territory}.`,
      type: 'success'
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToast({
      message: 'Sua assinatura ancestral foi suspensa temporariamente. Modos de consulta aberta reativados.',
      type: 'info'
    });
  };

  // Form Contribution Action
  const handleNewSaberContributed = async (newSaberData: Partial<Saber>) => {
    const freshSaber: Saber = {
      id: `saber-${Date.now()}`,
      title: newSaberData.title || 'Saber Sem Título',
      summary: newSaberData.summary || 'Resumo do saber tradicional.',
      saberCentralText: newSaberData.saberCentralText || 'Relato integral do saber tradicional colhido.',
      type: newSaberData.type || 'GALHO: RELATO INDIVIDUAL',
      status: (newSaberData.status as SaberStatus) || 'QUARENTENA',
      biome: newSaberData.biome || 'Cerrado',
      community: newSaberData.community || { name: 'Comunidade Geral' },
      territory: newSaberData.territory || 'Goiás, GO',
      coordinates: newSaberData.coordinates || '15° S, 47° W',
      hash: newSaberData.hash || `sha256:${Math.random().toString(16).slice(2, 18)}`,
      createdAt: new Date().toISOString(),
      relations: newSaberData.relations || [],
      validation: undefined,
      questions: newSaberData.questions,
      relatedLinks: newSaberData.relatedLinks,
      rawMaterials: newSaberData.rawMaterials
    };

    const { data, error } = await createSaber(freshSaber);
    if (error || !data) {
      console.error('Failed to create saber in Supabase:', error);
      setToast({
        message: 'Erro ao salvar o novo saber. Tente novamente mais tarde.',
        type: 'info'
      });
      return;
    }

    setSaberes([data, ...saberes]);
    
    if (currentUser?.role === 'GUARDIÃ') {
      setActiveTab('guardia');
    } else {
      setActiveTab('home');
    }
    setToast({
      message: 'Novo saber registrado com sucesso! O relato foi encaminhado para a Quarentena comunitária do Painel da Guardiã.',
      type: 'success'
    });
  };

  // Saber Validation Action (Ritual de Validação Completo)
  const handleSaberValidated = async (
    saberId: string, 
    validatorName: string, 
    restrictedOption: 'sigilo' | 'publico'
  ) => {
    const saberToUpdate = saberes.find((s) => s.id === saberId);
    if (!saberToUpdate) {
      setToast({
        message: 'Saber não encontrado para validação.',
        type: 'info'
      });
      return;
    }

    const finalStatus: SaberStatus = restrictedOption === 'sigilo' ? 'RESTRITO' : 'VALIDADO';
    const updatedSaber: Saber = {
      ...saberToUpdate,
      status: finalStatus,
      type: restrictedOption === 'sigilo' ? 'SABER RESTRITO' as const : 'SABER TRADICIONAL' as const,
      restrictedLevel: restrictedOption === 'sigilo' ? 'Guardiãs de 3º Grau' : undefined,
      restrictedLabel: restrictedOption === 'sigilo' ? 'Saber Restrito à Comunidade' : undefined,
      restrictedMessage: restrictedOption === 'sigilo' ? 'Apenas Guardiãs de 3º Grau de Iniciação podem visualizar os ritos de floração e salvaguarda desta espécie nascente.' : undefined,
      validation: {
        validatorName,
        validatorId: `0x${Math.random().toString(16).substring(2, 6).toUpperCase()}${Math.random().toString(16).substring(2, 6).toUpperCase()}...FF${Math.floor(Math.random() * 90 + 10)}`,
        date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
        lunarMatch: saberId.includes('barbatimao') ? 'Minguante (98% match)' : undefined,
        reason: 'Saber legitimado por transmissão oral e testagem territorial validada.',
        blockHeight: `18,${Math.floor(Math.random() * 800 + 400).toString().padEnd(3, '0')},${Math.floor(Math.random() * 800 + 100).toString().padEnd(3, '0')}`
      }
    };

    const { data, error } = await updateSaber(saberId, updatedSaber);
    if (error || !data) {
      console.error('Failed to update saber in Supabase:', error);
      setToast({
        message: 'Erro ao atualizar o saber. Tente novamente mais tarde.',
        type: 'info'
      });
      return;
    }

    setSaberes(saberes.map((s) => (s.id === saberId ? data : s)));
    setToast({
      message: `Consenso estabelecido! O saber foi legitimado por "${validatorName}" e gravado permanentemente na linhagem como ${restrictedOption === 'sigilo' ? 'RESTRITO' : 'SABER TRADICIONAL'}.`,
      type: 'success'
    });
  };

  // Conflict mediation callback
  const handleMediateDispute = (saber: Saber) => {
    alert(`Mediação de Conflitos Iniciada para: "${saber.title}"\n\nO Protocolo Raiz assevera a reanálise coletiva da marcação temporal de aceiros tradicionais. O conflito está em processo de arbitragem amigável.`);
  };

  // Selecting a saber to view its full lineage
  const handleSelectSaberLineage = (saberId: string | null) => {
    setSelectedSaberId(saberId);
    setActiveTab('linhagem');
  };

  // Determine standard title header based on tab
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Página Inicial';
      case 'biomas':
        return selectedBiomeFilter === 'Todos' ? 'Território Cerrado' : `Território ${selectedBiomeFilter}`;
      case 'linhagem':
        return 'Linhagem de Saberes';
      case 'guardia':
        return 'Painel da Guardiã';
      case 'contribuicao':
        return 'Contribuição de Saberes';
      default:
        return 'Teia de Saberes';
    }
  };

  const pendingCount = saberes.filter(s => s.status === 'QUARENTENA').length;

  return (
    <div className="min-h-screen bg-paper-background text-on-surface antialiased transition-colors duration-300">
      
      {/* Sidebar Navigation Left Layer */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Auto-scroll to top on tab switch
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        pendingCount={pendingCount}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area Side-Aligned */}
      <div className="ml-64 flex flex-col justify-between min-h-screen">
        
        {/* Dynamic header tracker */}
        <Header 
          title={getHeaderTitle()} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
        />

        {/* Dynamic screen views viewport with layout animations */}
        <main className="p-10 pt-30 max-w-7xl mx-auto w-full flex-grow">
          {isLoadingSaberes ? (
            <div className="text-center p-14 border border-dashed border-mineral-gray/25 rounded-2xl bg-surface-container-low">
              <div className="font-serif text-xl font-bold mb-3">Carregando registros reais...</div>
              <p className="text-sm text-mineral-gray/70">
                Conectando ao Supabase para buscar os saberes atuais do território.
              </p>
            </div>
          ) : saberesError ? (
            <div className="text-center p-14 border border-dashed border-rose-400/40 rounded-2xl bg-rose-50">
              <div className="font-serif text-xl font-bold text-rose-600 mb-3">Erro ao carregar dados</div>
              <p className="text-sm text-rose-700/90">
                {saberesError}
              </p>
            </div>
          ) : (
            <>
              {/* If there's an active search query, show search results globally */}
              {searchQuery.trim().length > 0 ? (
                <SearchResults 
                  saberes={saberes}
                  query={searchQuery}
                  onSelectSaber={(id) => {
                    setSelectedSaberId(id);
                    setActiveTab('linhagem');
                    setSearchQuery('');
                  }}
                  onClear={() => setSearchQuery('')}
                />
              ) : (
                <>
                  {activeTab === 'home' && (
                    <Home 
                      setActiveTab={setActiveTab} 
                      setSelectedBiome={setSelectedBiomeFilter} 
                    />
                  )}

                  {activeTab === 'biomas' && (
                    <ExplorarBiomas 
                      saberes={saberes} 
                      selectedBiome={selectedBiomeFilter} 
                      setSelectedBiome={setSelectedBiomeFilter}
                      selectedCommunity={selectedCommunityFilter}
                      setSelectedCommunity={setSelectedCommunityFilter}
                      searchQuery={searchQuery}
                      onSelectSaber={handleSelectSaberLineage}
                    />
                  )}

                  {activeTab === 'linhagem' && (
                    <LinhagemSaberes 
                      saberes={saberes} 
                      selectedSaberId={selectedSaberId}
                      onSelectSaber={setSelectedSaberId}
                    />
                  )}

                  {activeTab === 'guardia' && (
                    <PainelGuardia 
                      saberes={saberes} 
                      onStartRitual={(saber) => setActiveValidationSaber(saber)}
                      onMediateDispute={handleMediateDispute}
                      currentUser={currentUser}
                    />
                  )}

                  {activeTab === 'contribuicao' && (
                    <RitualContribuicao 
                      onSubmit={handleNewSaberContributed}
                      currentUser={currentUser}
                    />
                  )}
                </>
              )}
            </>
          )}
        </main>

        {/* Cohesive Footer Block */}
        <footer className="bg-surface-container/60 dark:bg-restricted-dark border-t border-mineral-gray/20 py-8 px-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 select-none font-mono text-xs">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="font-bold text-[10px] tracking-widest text-clay-terracotta">
                PROTOCOLO RAIZ
              </span>
              <p className="text-mineral-gray font-medium text-[11px]">
                Comunidades Fundadoras • Rastreabilidade Ancestral e Autenticação de Biomas via Protocolo Raiz
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-on-surface-variant font-medium text-[12px]">
              <a 
                href="#credits" 
                onClick={(e) => { e.preventDefault(); alert('Visualização dos créditos de transmissão oral e histórico dos anciãos colaboradores da Teia.'); }}
                className="hover:text-primary transition-colors duration-150 underline decoration-dotted"
              >
                Créditos de Linhagem
              </a>
              <a 
                href="#terms" 
                onClick={(e) => { e.preventDefault(); alert('Estes termos protegem os direitos de propriedade intelectual indígena e a salvaguarda de recursos biológicos.'); }}
                className="hover:text-primary transition-colors duration-150 underline decoration-dotted"
              >
                Termos de Uso Comunitário
              </a>
              <a 
                href="#privacy" 
                onClick={(e) => { e.preventDefault(); alert('Registros e mapas confidenciais são blindados contra rastreabilidade comercial e salvaguardados por diretrizes comunitárias.'); }}
                className="hover:text-primary transition-colors duration-150 underline decoration-dotted"
              >
                Privacidade de Dados Restritos
              </a>
            </div>

            <div className="text-mineral-gray/50 text-[9px] uppercase tracking-widest text-right leading-none shrink-0 font-bold select-all">
              HASH: 8D4D3BCED7AE8E1463D33
            </div>
          </div>
        </footer>

      </div>

      {/* Floating Interactive Action Buttons Overlay (Matches Screen 2 Style) */}
      {activeTab !== 'contribuicao' && (
        <button
          onClick={() => setActiveTab('contribuicao')}
          className="fixed bottom-10 right-10 w-14 h-14 bg-clay-terracotta text-white rounded-full shadow-xl flex items-center justify-center hover:scale-108 active:scale-95 transition-all duration-150 group z-50 cursor-pointer"
          title="Nova Contribuição de Saber"
        >
          <Plus className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
          
          {/* Tooltip on hover */}
          <div className="absolute right-18 bg-restricted-dark text-white font-mono text-[10px] font-bold tracking-wider px-3.5 py-2 rounded-lg whitespace-nowrap shadow-md border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none select-none uppercase">
            ENVIAR NOVO SABER
          </div>
        </button>
      )}

      {/* Active Validation Modal Overlay Trigger */}
      {activeValidationSaber && (
        <RitualModal 
          saber={activeValidationSaber}
          onClose={() => setActiveValidationSaber(null)}
          onValidate={handleSaberValidated}
        />
      )}

      {/* Toast Alert Notifiers */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 bg-[#1A1A1A] text-[#F9F7F2] max-w-md px-5 py-4 border-l-4 border-[#3D6B40] shadow-xl rounded-r-lg flex gap-3.5 items-start animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle className="w-5.5 h-5.5 text-validation-seal shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-mono text-[10px] font-bold text-cerrado-ochre uppercase tracking-wider leading-none">
              ALERTAS DA REDE DE SABERES
            </p>
            <p className="font-sans text-[13px] leading-relaxed opacity-90 pr-2 select-all">
              {toast.message}
            </p>
          </div>
        </div>
      )}

      {/* Auth Modal Modal Trigger Overlay */}
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

    </div>
  );
}
