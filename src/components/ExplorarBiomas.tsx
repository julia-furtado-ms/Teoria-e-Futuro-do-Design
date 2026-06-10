import { useState } from 'react';
import { Saber, BiomeType } from '../types';
import { 
  Filter, CheckCircle, RefreshCw, Users, EyeOff, Lock, BarChart3, ArrowRight, MapPin, AlertCircle,
  Sun, CloudRain, CloudSun
} from 'lucide-react';

interface ExplorarBiomasProps {
  saberes: Saber[];
  selectedBiome: BiomeType | 'Todos';
  setSelectedBiome: (biome: BiomeType | 'Todos') => void;
  selectedCommunity: string;
  setSelectedCommunity: (community: string) => void;
  searchQuery: string;
  onSelectSaber: (id: string) => void;
}

export default function ExplorarBiomas({ 
  saberes, 
  selectedBiome, 
  setSelectedBiome,
  selectedCommunity,
  setSelectedCommunity,
  searchQuery,
  onSelectSaber
}: ExplorarBiomasProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  // Filter local records
  const filteredSaberes = saberes.filter(saber => {
    const matchesBiome = selectedBiome === 'Todos' || saber.biome === selectedBiome;
    const matchesCommunity = selectedCommunity === 'Todas as comunidades' || 
                             saber.community.name === selectedCommunity ||
                             saber.territory.includes(selectedCommunity);
    
    const text = (saber.title + ' ' + saber.summary).toLowerCase();
    const matchesSearch = text.includes(searchQuery.toLowerCase());
    
    return matchesBiome && matchesCommunity && matchesSearch;
  });

  const handleRefresh = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
    }, 1200);
  };

  // Find unique community list for filter dropdown
  const communities = ['Todas as comunidades', 'Mumbuca', 'Kalunga', 'Geraizeiros', 'Xavante'];

  const BIOME_IMAGES: Record<BiomeType | 'Todos', { src: string; alt: string }> = {
    'Todos': {
      src: 'https://live.staticflickr.com/4127/4996295321_aa8dffd797_b.jpg',
      alt: 'Paisagem do Cerrado Brasileiro'
    },
    'Cerrado': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Cerrado_-_panoramio_%284%29.jpg',
      alt: 'Paisagem do Cerrado Brasileiro'
    },
    'Amazônia': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Amaz%C3%B4nia_e_o_Rio_Madeira.JPG',
      alt: 'Floresta Amazônica e Rio Amazonas'
    },
    'Mata Atlântica': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Mata_atlantica_parte_baixa_Itatiaia.jpg',
      alt: 'Mata Atlântica Preservada'
    },
    'Caatinga': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Vegetacao_tipica_da_caatinga_nas_encostas_do_rio.jpg',
      alt: 'Bioma da Caatinga Brasileira Semiarida'
    },
    'Pantanal': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Pantanal_em_Mato_Grosso_Brasil.jpg',
      alt: 'Planície Alagada do Pantanal'
    },
    'Pampa': {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Bioma_pampa.jpg/1920px-Bioma_pampa.jpg?_=20190803015419',
      alt: 'Campos do Pampa Brasileiro'
    }
  };

  const currentImage = BIOME_IMAGES[selectedBiome];

  return (
    <section className="space-y-12">
      {/* Hero / Biome Context Map Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Banner with Landscape details */}
        <div className="lg:col-span-2 relative h-80 rounded-2xl overflow-hidden border border-mineral-gray/20 bg-surface-dim group">
          <img 
            src={currentImage.src} 
            alt={currentImage.alt}
            className="w-full h-full object-cover opacity-90 filter contrast-105 saturate-100 group-hover:scale-102 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-[#141414]/95 border border-[#3E3B37]/65 p-5 rounded-xl shadow-lg backdrop-blur-md max-w-xl">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-cerrado-ochre mb-1.5">
              Explorando Saberes do {selectedBiome === 'Todos' ? 'Todos os Biomas' : selectedBiome}
            </h3>
            <p className="font-sans text-[13px] text-on-surface-variant italic font-medium leading-relaxed">
              {selectedBiome === 'Amazônia' 
                ? '"Onde o dossel abraça o infinito e o rio fertiliza a palavra."'
                : '""Nesses tempos de céus de cinzas e chumbos, nós precisamos de árvores desesperadamente verdes." — Mário Quintana"'}
            </p>
          </div>

          {/* Local Climate Status Indicator */}
          <div className="absolute top-6 right-6 bg-paper-background/95 p-4 rounded-xl shadow-sm border border-mineral-gray/10 backdrop-blur-sm select-none">
            <p className="font-mono text-[9px] font-bold text-mineral-gray mb-1.5 uppercase tracking-widest leading-none">
              CLIMA LOCAL DO TERRITÓRIO
            </p>
            <div className="flex items-center gap-2.5">
              {selectedBiome === 'Amazônia' ? (
                <>
                  <CloudRain className="w-4 h-4 text-[#4a90e2] animate-bounce" />
                  <span className="font-mono text-xs font-bold text-on-surface">
                    Chuvoso, 25°C • UR 88%
                  </span>
                </>
              ) : selectedBiome === 'Cerrado' ? (
                <>
                  <Sun className="w-4 h-4 text-cerrado-ochre" />
                  <span className="font-mono text-xs font-bold text-on-surface">
                    Seco, 29°C • UR 32%
                  </span>
                </>
              ) : (
                <>
                  <CloudSun className="w-4 h-4 text-clay-terracotta" />
                  <span className="font-mono text-xs font-bold text-on-surface">
                    Sazonal, 27°C • Instável
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Unified Lineage Filter column */}
        <div className="bg-surface-container rounded-2xl p-6 border border-mineral-gray/10 flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-[17px] font-bold text-on-surface mb-6 border-b border-mineral-gray/10 pb-3.5 flex items-center gap-2">
              <Filter className="w-4.5 h-4.5 text-primary" />
              Filtros de Linhagem
            </h4>

            <div className="space-y-6">
              {/* Biome selectors */}
              <div>
                <label className="font-mono text-[9px] font-bold text-mineral-gray block mb-2 px-1 uppercase tracking-widest">
                  BIOMA ATIVO
                </label>
                <div className="space-y-2">
                  {(['Cerrado', 'Amazônia', 'Mata Atlântica', 'Caatinga', 'Pantanal', 'Pampa', 'Todos'] as const).map(biome => (
                    <button
                      key={biome}
                      onClick={() => setSelectedBiome(biome)}
                      className={`w-full flex items-center justify-between p-2.5 rounded border transition-all duration-200 ${
                        selectedBiome === biome
                          ? 'bg-surface-container-high border-2 border-cerrado-ochre text-on-surface font-bold shadow-xs'
                          : 'bg-surface-container-low/40 border border-mineral-gray/15 text-on-surface-variant hover:bg-surface-container-high/70 hover:border-mineral-gray/30'
                      }`}
                    >
                      <span className="font-sans text-[14px]">
                        {biome === 'Todos' ? 'Todos os Biomas' : biome}
                      </span>
                      {selectedBiome === biome && (
                        <CheckCircle className="w-4 h-4 text-cerrado-ochre fill-cerrado-ochre/10" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Communities Select */}
              <div>
                <label className="font-mono text-[9px] font-bold text-mineral-gray block mb-2 px-1 uppercase tracking-widest">
                  ETNIAS / COMUNIDADES
                </label>
                <select
                  value={selectedCommunity}
                  onChange={(e) => setSelectedCommunity(e.target.value)}
                  className="w-full bg-paper-background border border-mineral-gray/25 rounded p-2.5 font-sans text-[13.5px] text-on-surface focus:outline-none focus:ring-1 focus:ring-cerrado-ochre focus:border-cerrado-ochre cursor-pointer h-10 leading-none"
                >
                  {communities.map(comm => (
                    <option key={comm} value={comm}>{comm}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isUpdating}
            className="mt-6 w-full bg-primary text-white py-3 px-4 font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-clay-terracotta active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-150"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'ATUALIZANDO...' : 'ATUALIZAR TEIA'}
          </button>
        </div>
      </div>

      {/* Dynamic Bento Style Grid Results */}
      {filteredSaberes.length === 0 ? (
        <div className="text-center p-14 border border-dashed border-mineral-gray/25 rounded-2xl bg-surface-container-low">
          <AlertCircle className="w-10 h-10 text-mineral-gray/60 mx-auto mb-3" />
          <h4 className="font-serif text-lg font-bold">Nenhum saber foi tecido aqui</h4>
          <p className="text-sm text-mineral-gray/70 mt-1">
            Experimente limpar os filtros ou digitar outro termo na barra de busca.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {filteredSaberes.map((saber) => {
            // Asymmetric rendering based on status or type
            if (saber.status === 'RESTRITO') {
              return (
                <div 
                  key={saber.id}
                  className="md:col-span-4 bg-restricted-dark text-white p-6 rounded-2xl flex flex-col justify-end min-h-[320px] relative overflow-hidden border border-white/5 shadow-md"
                >
                  {/* Grain layer */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none paper-texture bg-blend-soft-light"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <span className="font-mono text-[10px] font-bold text-white/50 block tracking-widest uppercase">
                      {saber.restrictedLabel || 'Saber Restrito à Comunidade'}
                    </span>
                    <h4 className="font-serif text-2xl font-bold tracking-tight">
                      {saber.title}
                    </h4>
                    <div className="w-12 h-0.5 bg-cerrado-ochre"></div>
                    <div className="flex gap-2.5 items-start text-white/45 bg-white/5 p-3 rounded border border-white/10">
                      <Lock className="w-5 h-5 text-cerrado-ochre shrink-0 mt-0.5" />
                      <p className="font-sans text-[12.5px] leading-relaxed">
                        {saber.restrictedMessage || 'Acesso permitido apenas via autorização da linhagem local.'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            if (saber.status === 'QUARENTENA') {
              return (
                <div 
                  key={saber.id}
                  onClick={() => onSelectSaber(saber.id)}
                  className="md:col-span-4 bg-surface-container border border-outline/30 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all cursor-pointer border-l-4 border-l-quarantine-amber hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono text-[9px] font-bold text-quarantine-amber tracking-wider uppercase">
                        {saber.type}
                      </span>
                      <EyeOff className="w-4 h-4 text-quarantine-amber/85" />
                    </div>
                    <h4 className="font-serif text-[19px] font-bold text-primary tracking-tight leading-snug mb-2 select-none">
                      {saber.title}
                    </h4>
                    <p className="font-sans text-[13.5px] text-on-surface-variant leading-relaxed line-clamp-4 italic opacity-90 select-none">
                      {saber.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-mineral-gray/10 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-container border border-mineral-gray/20 flex items-center justify-center text-[10px] font-mono font-bold text-clay-terracotta">
                        {saber.id.includes('barbatimao') ? 'TC' : 'MC'}
                      </div>
                      <span className="font-mono text-xs font-semibold text-mineral-gray">
                        {saber.id.includes('barbatimao') ? 'Tiago Cavalcante' : 'Anciã Maria Clara'}
                      </span>
                    </div>
                    <div className="bg-surface-container-low p-2 rounded text-[10px] font-mono font-bold text-mineral-gray/80 flex items-center gap-1.5 justify-center tracking-wide uppercase select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-quarantine-amber animate-pulse"></span>
                      EM VALIDAÇÃO: PENDENTE
                    </div>
                  </div>
                </div>
              );
            }

            // Normal validated cards or Coletivos
            const isPequi = saber.id === 'saber-pequi';
            const isSementes = saber.id === 'saber-sementes';
            const colSpan = isPequi ? 'md:col-span-8' : 'md:col-span-6';

            return (
              <div 
                key={saber.id}
                onClick={() => onSelectSaber(saber.id)}
                className={`${colSpan} group relative bg-surface-container border border-outline/30 p-6 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xs hover:border-cerrado-ochre/50 hover:shadow-md transition-all cursor-pointer hover:-translate-y-0.5`}
              >
                {/* Validation Seal Ribbon Top-Right */}
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-validation-seal text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest">
                      Guardiã
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <span className="font-mono text-[10px] font-bold text-clay-terracotta bg-primary-fixed block px-2.5 py-0.5 rounded-sm w-fit uppercase select-none">
                      {saber.type}
                    </span>
                    <h4 className="font-serif text-[24px] font-bold text-on-surface tracking-tight leading-tight mt-3">
                      {saber.title}
                    </h4>
                  </div>
                  <p className="font-sans text-[14.5px] text-on-surface-variant leading-relaxed line-clamp-3 mb-8">
                    {saber.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-mineral-gray/10 pt-4">
                  <div className="flex items-center gap-2 text-mineral-gray">
                    <Users className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold">
                      {isPequi ? 'Validação: 42 Guardiãs' : `Comunidade: ${saber.community.name}`}
                    </span>
                  </div>
                  <div className="font-mono text-[9px] text-mineral-gray/60 tracking-tight text-right shrink-0 select-all">
                    {saber.hash.substring(0, 16)}...
                  </div>
                </div>
              </div>
            );
          })}

          {/* Persistent Bento Column 4: Metadados de Território Graphic Charts (Screenshot 2 style) */}
          <div className="md:col-span-4 bg-paper-background border border-mineral-gray/20 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] font-bold text-mineral-gray tracking-wider uppercase select-none">
                METADADOS DE TERRITÓRIO
              </span>
              <BarChart3 className="w-4.5 h-4.5 text-mineral-gray/70" />
            </div>

            {/* Custom SVG/HTML Bar graph */}
            <div className="flex-grow flex items-end justify-center py-6 h-28">
              <div className="w-full bg-surface-container-high rounded-xl h-24 overflow-hidden flex items-end gap-1 px-2.5 select-none">
                <div className="w-1/4 h-[35%] bg-cerrado-ochre/40 hover:bg-cerrado-ochre/60 rounded-t transition-all duration-200" title="Altamira"></div>
                <div className="w-1/4 h-[65%] bg-cerrado-ochre/60 hover:bg-cerrado-ochre rounded-t transition-all duration-200" title="Jalapão"></div>
                <div className="w-1/4 h-[90%] bg-cerrado-ochre hover:bg-clay-terracotta rounded-t transition-all duration-200 animate-pulse-slow font-mono text-[9px]" title="Vão de Almas"></div>
                <div className="w-1/4 h-[50%] bg-cerrado-ochre/55 hover:bg-cerrado-ochre/80 rounded-t transition-all duration-200" title="Geraizeiros"></div>
              </div>
            </div>

            <p className="font-mono text-[11.5px] font-semibold text-on-surface-variant text-center opacity-90 select-none">
              Regeneração da vegetação rasteira: <span className="text-secondary font-bold font-sans">+14%</span> (Safra 23/24)
            </p>
          </div>

          {/* Persistent Bento Column 5: Native Sementes selection with tag list */}
          <div className="md:col-span-8 bg-paper-background border border-mineral-gray/20 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <h5 className="font-serif text-lg font-bold text-on-surface leading-tight mb-2 select-none">
                Protocolo de Partilha de Sementes Nativas
              </h5>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed opacity-75">
                Organização solidária de canteiros comunitários e salvaguarda biológica de espécies cruciais para reflorestamento.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 my-5">
              <span className="bg-secondary-container text-on-secondary-container text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                AROEIRA
              </span>
              <span className="bg-secondary-container text-on-secondary-container text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                BURITI
              </span>
              <span className="bg-secondary-container text-on-secondary-container text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                IPÊ-AMARELO
              </span>
              <span className="bg-secondary-container text-on-secondary-container text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                COPAÍBA
              </span>
            </div>

            <button
              onClick={() => onSelectSaber('saber-sementes')}
              className="text-primary font-mono text-xs font-bold flex items-center gap-1.5 hover:underline text-left group w-fit"
            >
              VER LINHAGEM COMPLETA 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
            </button>
          </div>

        </div>
      )}
    </section>
  );
}
