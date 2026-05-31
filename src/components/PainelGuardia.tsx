import { Saber, User } from '../types';
import { 
  Hourglass, AlertTriangle, Lock, Map, BookOpen, User as UserIcon, 
  ChevronRight, Fingerprint, ShieldAlert, CheckCircle, Flame
} from 'lucide-react';

interface PainelGuardiaProps {
  saberes: Saber[];
  onStartRitual: (saber: Saber) => void;
  onMediateDispute: (saber: Saber) => void;
  currentUser: User | null;
}

export default function PainelGuardia({ 
  saberes, 
  onStartRitual,
  onMediateDispute,
  currentUser
}: PainelGuardiaProps) {
  
  const isAuthorized = currentUser?.role === 'GUARDIÃ';

  // Pending items
  const pendingSaberes = saberes.filter(s => s.status === 'QUARENTENA');
  const disputeSaberes = saberes.filter(s => s.status === 'DIVERGENCIA');
  
  // Stats counters based on actual state!
  const countValidados = saberes.filter(s => s.status === 'VALIDADO').length + 1100; // Offset base stat
  const countQuarentena = pendingSaberes.length;
  const countSilenciados = 178;
  const countTotal = countValidados + countQuarentena + countSilenciados + disputeSaberes.length;

  const handleStartValidation = (saber: Saber) => {
    if (!isAuthorized) {
      alert('Acesso negado: Apenas Guardiãs autenticadas na Teia podem chancelar novos saberes e iniciar processos de consolidação.');
      return;
    }
    onStartRitual(saber);
  };

  const handleStartDisputeMediation = (saber: Saber) => {
    if (!isAuthorized) {
      alert('Acesso negado: Somente uma Guardiã Ancestral possui a outorga territorial necessária para arbitrar disputas de linhagem.');
      return;
    }
    onMediateDispute(saber);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {!isAuthorized && (
        <div className="lg:col-span-12 p-5 bg-restricted-dark border-l-4 border-conflict-red rounded-r-xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-3.5 items-start md:items-center">
            <Lock className="w-5.5 h-5.5 text-conflict-red shrink-0 animate-pulse mt-0.5 md:mt-0" />
            <div>
              <p className="font-mono text-[10px] font-bold text-conflict-red uppercase tracking-widest leading-none">
                MODO DE LEITURA RESTRITA • ASSINATURA INDISPONÍVEL
              </p>
              <p className="font-sans text-[12px] text-on-surface-variant/90 leading-relaxed mt-1.5">
                Você está visualizando a Quarentena comunitária do conselho. Apenas <strong className="text-cerrado-ochre">Guardiãs Ancestrais</strong> possuem credenciais ativas para chancelar novos relatos e mediar divergências na Teia.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center">
            <span className="font-mono text-[9px] font-bold text-mineral-gray bg-white/5 py-1 px-2.5 rounded border border-white/5 select-none uppercase tracking-wider">
              CONSULTA_GERAL
            </span>
          </div>
        </div>
      )}
      
      {/* Left Column: Quarentena, Alerts and Maps */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Saberes em Quarentena Main Card */}
        <section className="bg-surface-container p-6 rounded-2xl border border-outline/25 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-quarantine-amber/10 p-2.5 rounded-xl">
                <Hourglass className="w-6 h-6 text-quarantine-amber animate-spin-slow" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-on-surface">
                  Saberes em Quarentena
                </h3>
                <p className="font-sans text-xs text-on-surface-variant opacity-85 mt-0.5">
                  Aguardando validação da linhagem comunitária antes da gravação permanente.
                </p>
              </div>
            </div>
            <span className="bg-quarantine-amber/10 text-quarantine-amber text-xs font-mono font-bold px-3 py-1 rounded-full border border-quarantine-amber/25 select-none">
              {pendingSaberes.length} Pendentes
            </span>
          </div>

          <div className="space-y-4">
            
            {/* Dynamic Rendering of Pending Saberes */}
            {pendingSaberes.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-mineral-gray/20 rounded-xl bg-surface-container-lowest flex flex-col justify-center items-center">
                <CheckCircle className="w-8 h-8 text-validation-seal mb-2" />
                <p className="font-serif text-base font-bold text-on-surface">Excelente, tudo validado!</p>
                <p className="text-xs text-mineral-gray/70">As Guardiãs revisaram todas as contribuições recentes.</p>
              </div>
            ) : (
              pendingSaberes.map(saber => (
                <div 
                  key={saber.id}
                  className="group relative bg-surface-bright/40 rounded-xl p-5 border border-mineral-gray/10 hover:border-quarantine-amber/40 transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-stretch">
                    <div className="flex-grow space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-bold text-mineral-gray uppercase tracking-widest bg-surface-container-high px-2 py-0.5 rounded-sm">
                          LINHAGEM: {saber.biome === 'Cerrado' ? 'RAÍZES MEDICINAIS • CERRADO' : 'MEDICINA AMAZÔNICA'}
                        </span>
                        <span className="font-mono text-[9px] font-bold bg-surface-container text-mineral-gray/80 px-2 py-0.5 rounded-sm">
                          AWAITING_VALIDATION
                        </span>
                      </div>
                      <h4 className="font-sans text-[16.5px] font-bold text-primary tracking-tight leading-snug">
                        {saber.title}
                      </h4>
                      <p className="font-sans text-[13.5px] text-on-surface-variant leading-relaxed line-clamp-2 italic mb-2">
                        {saber.summary}
                      </p>
                    </div>

                    <div className="flex flex-col justify-between items-end shrink-0 min-w-[130px] self-stretch text-right">
                      <span className="font-mono text-[9.5px] text-mineral-gray/65 tracking-tight font-medium select-all">
                        Hash: {saber.hash.substring(0, 11)}
                      </span>
                      <button
                        onClick={() => handleStartValidation(saber)}
                        className={`mt-3 w-full py-2 px-3 font-mono text-[10px] font-extrabold uppercase tracking-widest transition-all duration-150 active:scale-97 select-none cursor-pointer flex items-center justify-center gap-1.5 ${
                          isAuthorized 
                            ? 'bg-clay-terracotta hover:bg-primary text-white shadow-sm' 
                            : 'bg-surface-container-high border border-outline/25 text-mineral-gray hover:border-conflict-red/30'
                        }`}
                      >
                        {!isAuthorized && <Lock className="w-3.5 h-3.5 text-conflict-red shrink-0" />}
                        <span>INICIAR VALIDAÇÃO</span>
                      </button>
                    </div>
                  </div>
                  {/* Visual Left Amber Anchor Ribbon */}
                  <div className="absolute left-0 top-4 bottom-4 w-1 bg-quarantine-amber rounded-r"></div>
                </div>
              ))
            )}

            {/* Render Disputes / Divergences */}
            {disputeSaberes.map(saber => (
              <div 
                key={saber.id}
                className="group relative bg-surface-container rounded-xl p-5 border-2 border-conflict-red flex flex-col md:flex-row gap-4 justify-between items-start md:items-stretch shadow-inner"
              >
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-1.5 text-conflict-red">
                    <AlertTriangle className="w-4 h-4 animate-bounce-slow" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                      DIVERGÊNCIA DETECTADA
                    </span>
                  </div>
                  <h4 className="font-sans text-[16.5px] font-bold text-primary tracking-tight leading-snug">
                    {saber.title}
                  </h4>
                  <p className="font-sans text-[13.5px] text-on-surface-variant leading-relaxed opacity-90">
                    {saber.summary}
                  </p>
                </div>

                <div className="flex flex-col justify-between items-end shrink-0 min-w-[130px] self-stretch text-right">
                  <span className="font-mono text-[9.5px] text-mineral-gray/65 tracking-tight font-medium">
                    Hash: {saber.hash.substring(0, 11)}
                  </span>
                  <button
                    onClick={() => handleStartDisputeMediation(saber)}
                    className={`mt-3 w-full py-2 px-3 font-mono text-[10px] font-extrabold uppercase tracking-widest transition-all duration-150 active:scale-97 cursor-pointer flex items-center justify-center gap-1.5 ${
                      isAuthorized 
                        ? 'border border-conflict-red text-conflict-red hover:bg-conflict-red hover:text-white' 
                        : 'bg-surface-container-high border border-outline/25 text-mineral-gray/80 hover:border-conflict-red/30'
                    }`}
                  >
                    {!isAuthorized && <Lock className="w-3.5 h-3.5 text-conflict-red shrink-0" />}
                    <span>MEDIAR DISPUTA</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Community Restricted Area card placeholder */}
            <div className="bg-restricted-dark text-white p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-md select-none relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none paper-texture bg-blend-soft-light"></div>
              <div className="relative z-10 max-w-sm space-y-2 flex flex-col items-center">
                <Lock className="w-8 h-8 text-white/40 shrink-0 mb-1" />
                <span className="font-mono text-[10px] text-white/50 block tracking-widest uppercase font-bold">
                  SABER RESTRITO À COMUNIDADE
                </span>
                <p className="font-sans text-xs text-white/45 leading-relaxed">
                  Apenas Guardiãs de 3º Grau de Iniciação podem visualizar os detalhes de floração desta espécie nascente.
                </p>
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest font-semibold pt-2 block">
                  ESTADO: RESTRITO_PROTOCOLO
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Traceability map card (Rastreabilidade territorial) */}
        <section className="bg-surface-container p-6 rounded-2xl border border-mineral-gray/10 shadow-xs">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-serif text-lg font-bold text-on-surface">
                Rastreabilidade Territorial
              </h3>
              <p className="font-sans text-xs text-on-surface-variant opacity-80">
                Fluxo de contribuições tradicionais recentes monitoradas geograficamente.
              </p>
            </div>
            <Map className="w-5 h-5 text-mineral-gray/70" />
          </div>

          <div className="relative h-64 w-full bg-surface-dim rounded-xl overflow-hidden shadow-inner border border-mineral-gray/15">
            {/* Topographical background rendering */}
            <img 
              className="w-full h-full object-cover opacity-45 mix-blend-multiply grayscale filter brightness-95 contrast-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1hfRqxLqwEYJt1N50guX2dwlutdaeqdgu7VIjugC1uqnnm5zCdPUh4Qzt1gZIJ5PoWm8jy6E_KnzJXRbSdVD61CAE8-aOnO-2G6W16mwAJ-LeAsKbTVIwdfb1c1kXwZheOZ4B3Kpn6kJzOgMJEc1zPvW89fMdYiyqtG827bMgJoUGfCHT-BxsD8ZfB1FfXQz5NDCP7Eb899Jyio8GPXU0TXcsRgw5vIDYZXrvcKiGKiONuUaOg5LqdjCiS8yFqGJaiP1EHNqe7gw"
              alt="Topology Savannah Map"
              referrerPolicy="no-referrer"
            />
            
            {/* Blinking Glowing Activity nodes overlay inside Savannah */}
            <div className="absolute top-1/4 left-1/3 group">
              <span className="absolute -inset-2 rounded-full bg-validation-seal/30 animate-ping"></span>
              <span className="relative w-3.5 h-3.5 bg-validation-seal rounded-full block border-2 border-white cursor-pointer shadow-sm"></span>
              {/* Tooltip on hover */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-restricted-dark text-white p-2 text-[10px] font-mono rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg border border-white/5 pointer-events-none z-20">
                MUMBUCA (Buriti Validado)
              </div>
            </div>

            <div className="absolute bottom-1/3 right-1/4 group">
              <span className="absolute -inset-2 rounded-full bg-quarantine-amber/30 animate-pulse"></span>
              <span className="relative w-3.5 h-3.5 bg-quarantine-amber rounded-full block border-2 border-white cursor-pointer shadow-sm"></span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-restricted-dark text-white p-2 text-[10px] font-mono rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg border border-white/5 pointer-events-none z-20">
                NIQUELÂNDIA (Barbatimão Pendente)
              </div>
            </div>

            <div className="absolute top-[45%] right-1/2 group">
              <span className="absolute -inset-2 rounded-full bg-conflict-red/30 animate-pulse"></span>
              <span className="relative w-3.5 h-3.5 bg-conflict-red rounded-full block border-2 border-white cursor-pointer shadow-sm"></span>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-restricted-dark text-white p-2 text-[10px] font-mono rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg border border-white/5 pointer-events-none z-20">
                SÍTIO ARARAS (Divergência Ativa)
              </div>
            </div>

            {/* Geographical chips tags legends */}
            <div className="absolute bottom-4 left-4 bg-paper-background/95 p-3 rounded-lg border border-mineral-gray/25 backdrop-blur-xs select-none space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-validation-seal"></span>
                <span className="font-mono text-[9px] font-bold text-on-surface uppercase tracking-wide">
                  Aporte Validado (Cavalcante-GO)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-quarantine-amber"></span>
                <span className="font-mono text-[9px] font-bold text-on-surface uppercase tracking-wide">
                  Aporte em Análise (Niquelândia-GO)
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Right Column: Stats, Silence Protocols, and Contributors */}
      <div className="lg:col-span-4 space-y-8">
        
        {/* Status da Governanca (Screenshot 3 card verbatim) */}
        <section className="bg-clay-terracotta text-white p-6 rounded-2xl shadow-xl shadow-clay-terracotta/10 relative overflow-hidden flex flex-col justify-between">
          {/* Decorative grain backdrop */}
          <div className="absolute inset-0 opacity-10 pointer-events-none paper-texture bg-blend-soft-light"></div>
          
          <div className="relative z-10 space-y-6">
            <h3 className="font-mono text-[10.5px] font-bold text-white/70 tracking-widest uppercase border-b border-white/10 pb-2.5">
              STATUS DA GOVERNANÇA
            </h3>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="font-mono text-white/60 text-[10px] font-bold uppercase tracking-wider leading-none">
                  SABERES TOTAIS
                </p>
                <p className="font-serif text-4xl font-bold tracking-tight">
                  {countTotal}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-white/20" />
            </div>

            {/* Progress filled bar scales */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-mono text-[11px] font-bold">
                  <span className="opacity-90">Validados</span>
                  <span>{countValidados}</span>
                </div>
                <div className="w-full h-1.5 bg-white/15 rounded-full select-none overflow-hidden">
                  <div className="h-full bg-validation-seal rounded-full transition-all duration-500 ease-out" style={{ width: `${(countValidados / countTotal) * 100}%` }}></div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-mono text-[11px] font-bold">
                  <span className="opacity-90">Quarentena / Divergência</span>
                  <span>{countQuarentena + disputeSaberes.length}</span>
                </div>
                <div className="w-full h-1.5 bg-white/15 rounded-full select-none overflow-hidden">
                  <div className="h-full bg-quarantine-amber rounded-full transition-all duration-500 ease-out" style={{ width: `${((countQuarentena + disputeSaberes.length) / countTotal) * 100}%` }}></div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-mono text-[11px] font-bold">
                  <span className="opacity-90">Silêncio por Escolha</span>
                  <span>{countSilenciados}</span>
                </div>
                <div className="w-full h-1.5 bg-white/15 rounded-full select-none overflow-hidden">
                  <div className="h-full bg-mineral-gray rounded-full transition-all duration-500 ease-out" style={{ width: `${(countSilenciados / countTotal) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meaningful Silence Description Card */}
        <section className="bg-surface-container-low p-6 rounded-2xl border border-mineral-gray/10 shadow-xs relative overflow-hidden select-none">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-mineral-gray" />
            <h4 className="font-serif text-base font-bold text-on-surface">
              Silêncio com Significado
            </h4>
          </div>

          <p className="font-sans text-xs text-on-surface-variant leading-relaxed italic mb-5 pr-2">
            "Há saberes que a terra guarda para si. O registro <span className="font-mono text-[10px] font-bold text-clay-terracotta bg-surface-container-high px-1 rounded-sm">EMPTY_BY_CHOICE</span> protege a linhagem da exaustão digital."
          </p>

          <div className="p-4 border border-dashed border-outline/30 text-center rounded-lg bg-surface-container-high/50">
            <p className="font-mono text-[11px] text-mineral-gray font-semibold">
              {countSilenciados} Saberes preservados em silêncio protocolar.
            </p>
          </div>
        </section>

        {/* Active Guardians panel (Recent Contributors) */}
        <section className="bg-surface-container p-6 rounded-2xl border border-outline/25 shadow-xs">
          <h3 className="font-mono text-[10px] font-bold text-clay-terracotta uppercase tracking-wider mb-5">
            GUARDIÃS ATIVAS
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-forest-deep flex items-center justify-center text-white text-[10px] font-mono font-bold select-none shadow-sm">
                TC
              </div>
              <div>
                <p className="font-sans text-sm font-semibold tracking-tight text-on-surface">Tiago Canindé</p>
                <p className="font-mono text-[10px] text-mineral-gray/80">Há 12 min • Cavalcante</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cerrado-ochre flex items-center justify-center text-white text-[10px] font-mono font-bold select-none shadow-sm">
                MR
              </div>
              <div>
                <p className="font-sans text-sm font-semibold tracking-tight text-on-surface">Mãe Rita de Cássia</p>
                <p className="font-mono text-[10px] text-mineral-gray/80">Há 2 horas • Quilombo Mesquita</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-mineral-gray flex items-center justify-center text-white text-[10px] font-mono font-bold select-none shadow-sm">
                JB
              </div>
              <div>
                <p className="font-sans text-sm font-semibold tracking-tight text-on-surface">João Bororo</p>
                <p className="font-mono text-[10px] text-mineral-gray/80">Há 5 horas • TI Meruri</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-2 border border-primary/20 hover:bg-primary/5 active:scale-98 transition-all text-primary font-mono text-[10px] font-extrabold uppercase tracking-widest leading-none block text-center rounded-lg select-none">
            Ver Teia Completa
          </button>
        </section>

      </div>

    </div>
  );
}
