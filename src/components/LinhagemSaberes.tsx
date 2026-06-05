import { Saber } from '../types';
import { 
  CheckCircle, MapPin, AlertCircle, Quote, ShieldCheck, 
  Calendar, Award, Database, RefreshCw, ChevronDown, Link
} from 'lucide-react';

interface LinhagemSaberesProps {
  saberes: Saber[];
  selectedSaberId: string | null;
  onSelectSaber: (id: string | null) => void;
}

export default function LinhagemSaberes({ 
  saberes, 
  selectedSaberId, 
  onSelectSaber 
}: LinhagemSaberesProps) {
  // We prioritize the buriti saber if none selected, or search for validated records
  const validatedSaberes = saberes.filter(s => s.status === 'VALIDADO');
  const activeSaberId = selectedSaberId || 'saber-buriti';
  const saber = validatedSaberes.find(s => s.id === activeSaberId) || validatedSaberes[0] || saberes[0];

  if (!saber) {
    return (
      <div className="text-center py-20 bg-surface-container border border-outline/20 rounded-2xl">
        <AlertCircle className="w-12 h-12 text-conflict-red mx-auto mb-4" />
        <p className="text-on-surface-variant font-medium">Nenhum saber validado disponível para linhagem.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      
      {/* Selector Tool to switch lineage trees */}
      <div className="bg-surface-container rounded-2xl p-4 border border-mineral-gray/10 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-clay-terracotta" />
          <span className="font-mono text-[11px] font-bold text-mineral-gray uppercase tracking-wider">
            Navegar por Cátedras da Teia
          </span>
        </div>
        <div className="relative w-full sm:w-80">
          <select
            value={saber.id}
            onChange={(e) => onSelectSaber(e.target.value)}
            className="w-full bg-surface-container-high border border-outline/30 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface font-semibold h-10 cursor-pointer appearance-none"
          >
            {validatedSaberes.map(s => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.biome})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4.5 h-4.5 absolute right-3 top-1/2 -translate-y-1/2 text-mineral-gray/75 pointer-events-none" />
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-surface-container p-8 rounded-2xl border border-outline/20 shadow-xs relative">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <span className="font-mono text-[10px] font-bold bg-secondary-container text-on-secondary-container px-3.5 py-1 rounded-full uppercase tracking-widest">
            {saber.type}
          </span>
          <div className="flex items-center gap-2 bg-validation-seal/10 text-validation-seal px-4 py-2 rounded-xl border border-validation-seal/20">
            <CheckCircle className="w-4 h-4 fill-validation-seal/15 animate-pulse-slow" />
            <span className="font-mono text-xs font-bold leading-none">Consenso Comunitário Atingido</span>
          </div>
        </div>

        <h1 className="font-serif text-[42px] leading-tight font-bold text-on-surface mb-4 tracking-tight">
          {saber.title}
        </h1>
        <p className="font-sans text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          {saber.summary}
        </p>
      </section>

      {/* Rhizomatic Lineage Flow Graph (Verbatim from Buriti Timeline) */}
      <div className="relative pl-10">
        
        {/* Absolute Vertical Tree Line connected coordinates */}
        <div className="absolute left-3.5 top-0 bottom-0 w-[2.5px] bg-mineral-gray/25 rounded-full"></div>

        {/* 1. A RAIZ (ORIGEM) */}
        <section className="relative mb-14">
          {/* Node marker */}
          <div className="absolute -left-[37px] top-1.5 w-5 h-5 rounded-full bg-clay-terracotta border-4 border-paper-background ring-2 ring-clay-terracotta/30 transition-transform hover:scale-115"></div>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[11px] font-bold text-clay-terracotta uppercase tracking-[0.12em]">
              A RAIZ (ORIGEM)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Community card */}
            <div className="p-6 bg-surface-container border border-outline/20 rounded-2xl shadow-xs">
              <p className="font-mono text-[9px] font-bold text-mineral-gray mb-1.5 uppercase tracking-wider">COMUNIDADE</p>
              <h3 className="font-serif text-[22px] font-bold text-primary mb-3">
                {saber.community.name}
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                {saber.community.description || 'Comunidade guardiã guardando a integridade das linhagens locais.'}
              </p>
            </div>

            {/* Territory geography card */}
            <div className="p-6 bg-surface-container border border-outline/20 rounded-2xl overflow-hidden relative shadow-xs">
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale select-none filter contrast-110 saturate-50" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkfzskAs0euZxIzwf9A6VWKGYq7KGU7e6b3UoCN3pm-qBRHRV7ZK22BjMzwi7DBxxPsGFuM14gc91AeWObq5RawULWy-kr9zjK9jwkGrYR0ALyhi3pxmtLsuJWXbDU04UoE4BZTZKcko7e6Ptsf9nU7E_3s2gCUac-oYpiM2KJdAyn9MU4HEPe0dF9CgLhyUGYfw8MbQ2nrGFRRrk5IOnvCmBJvpGrgU6q38akh9VQ8MgkXeA1V9x3WvdB8N8wk_nMyn82V0SGcXo"
                alt="Jalapão Drone Backdrop"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10">
                <p className="font-mono text-[9px] font-bold text-mineral-gray mb-1.5 uppercase tracking-wider">TERRITÓRIO</p>
                <h3 className="font-serif text-[22px] font-bold text-primary mb-3">
                  {saber.territory}
                </h3>
                <div className="flex items-center gap-1.5 text-primary font-mono text-[11.5px] font-bold">
                  <MapPin className="w-4 h-4 text-clay-terracotta" />
                  <span>{saber.coordinates}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. O TRONCO (SABER CENTRAL) */}
        <section className="relative mb-14">
          {/* Node marker */}
          <div className="absolute -left-[37px] top-1.5 w-5 h-5 rounded-full bg-mineral-gray border-4 border-paper-background ring-2 ring-mineral-gray/30 transition-transform hover:scale-115"></div>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[11px] font-bold text-mineral-gray uppercase tracking-[0.12em]">
              O TRONCO (SABER CENTRAL)
            </span>
          </div>

          <div className="p-8 border rounded-2xl bg-surface-container-low border-mineral-gray/10 shadow-xs relative">
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
              
              <div className="flex-1 space-y-5">
                <h3 className="font-serif text-[24px] font-semibold text-on-surface">
                  {saber.id === 'saber-buriti' ? 'O Ciclo da Minguante' : 'Manejo e Regência de Colheita'}
                </h3>
                
                <p className="font-sans text-[15.5px] text-on-surface leading-relaxed">
                  {saber.saberCentralText || saber.summary}
                </p>

                {saber.quote && (
                  <div className="bg-surface-container border-l-4 border-cerrado-ochre p-4 italic text-sm text-on-surface-variant flex gap-3 rounded-r-lg relative overflow-hidden">
                    <Quote className="w-6 h-6 text-cerrado-ochre/25 shrink-0 mt-0.5" />
                    <p className="relative z-10 leading-relaxed">"{saber.quote}"</p>
                  </div>
                )}

                {saber.relatedLinks && saber.relatedLinks.length > 0 && (
                  <div className="mt-6 bg-surface-container-high border border-mineral-gray/10 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3 text-sm font-mono uppercase tracking-[0.2em] text-mineral-gray font-bold">
                      <Link className="w-4 h-4" />
                      REFERÊNCIAS EXTERNAS
                    </div>
                    <div className="space-y-3">
                      {saber.relatedLinks.map((link, index) => (
                        <a
                          key={`${link.url}-${index}`}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-xl border border-outline/30 bg-white/5 p-4 text-sm text-primary hover:bg-surface-container/80 transition-colors"
                        >
                          <div className="font-semibold">{link.label || link.url}</div>
                          {link.label && <div className="text-[12px] text-on-surface-variant mt-1 break-words">{link.url}</div>}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {saber.imageUrl && (
                <div className="w-full md:w-64 flex flex-col gap-3 shrink-0">
                  <div className="aspect-square bg-surface-container rounded-xl overflow-hidden border border-mineral-gray/15 shadow-inner">
                    <img 
                      className="w-full h-full object-cover filter brightness-95 saturate-105" 
                      src={saber.imageUrl} 
                      alt={saber.imageAlt || saber.title}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="font-mono text-[10px] text-center text-mineral-gray/80 font-bold uppercase tracking-wide px-2 select-all">
                    {saber.imageAlt || 'Registro Fotográfico Legal'}
                  </p>
                </div>
              )}
            </div>

            {/* Scientific vs Traditional Divergence Warning block if available */}
            {saber.divergence && (
              <div className="mt-8 p-5 bg-error-container/15 border-2 border-conflict-red rounded-xl flex gap-4 items-start shadow-inner">
                <AlertCircle className="w-5.5 h-5.5 text-conflict-red shrink-0 mt-0.5 animate-pulse-slow" />
                <div className="space-y-1.5 flex-1">
                  <p className="font-mono text-[10px] font-bold text-conflict-red tracking-wider uppercase leading-none">
                    DIVERGÊNCIA IDENTIFICADA ENCONTRADA
                  </p>
                  <div className="font-sans text-[13.5px] text-on-error-container leading-relaxed space-y-1">
                    <p><strong>Dado Técnico (Botânico):</strong> {saber.divergence.technicalBotany}</p>
                    <p><strong>Saber Tradicional:</strong> {saber.divergence.traditionalWisdom}</p>
                    <p className="text-[12px] opacity-80 mt-2 block border-t border-conflict-red/10 pt-2 italic">
                      {saber.divergence.note}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. OS GALHOS (PRÁTICAS VIVAS) (Técnicas individuais) */}
        {saber.relations && saber.relations.length > 0 && (
          <section className="relative mb-14">
            {/* Node marker */}
            <div className="absolute -left-[37px] top-1.5 w-5 h-5 rounded-full bg-secondary border-4 border-paper-background ring-2 ring-secondary/30 transition-transform hover:scale-115"></div>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[11px] font-bold text-secondary uppercase tracking-[0.12em]">
                OS GALHOS (PRÁTICAS VIVAS)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {saber.relations.map((rel, index) => (
                <div 
                  key={index}
                  className="p-5 bg-surface-container-low border border-mineral-gray/10 rounded-2xl flex gap-4 transition-all hover:-translate-y-0.5 shadow-xs"
                >
                  <div className="shrink-0">
                    <div className="w-11 h-11 rounded-full bg-secondary-container border border-secondary/20 flex items-center justify-center font-bold text-secondary text-sm">
                      {rel.initial}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-sans text-[15.5px] font-bold text-on-surface tracking-tight">
                      {rel.author}
                    </h4>
                    <p className="font-mono text-[10.5px] text-mineral-gray/80 font-bold mb-2.5">
                      {rel.role}
                    </p>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed italic pr-2">
                      {rel.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. AS FOLHAS (METADADOS DE RASTREABILIDADE) */}
        {saber.validation && (
          <section className="relative">
            {/* Node marker */}
            <div className="absolute -left-[37px] top-1.5 w-5 h-5 rounded-full bg-mineral-gray/40 border-4 border-paper-background"></div>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[11px] font-bold text-mineral-gray uppercase tracking-[0.12em]">
                AS FOLHAS (METADADOS)
              </span>
            </div>

            <div className="bg-restricted-dark text-surface-variant p-6 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none paper-texture bg-blend-soft-light"></div>
              
              <div className="relative z-10 font-mono text-[12px]">
                {/* Hash verification header */}
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-3 select-none">
                  <span className="text-white/70 font-semibold tracking-wider">TRACEABILITY_OBJECT_V2</span>
                  <span className="text-validation-seal bg-validation-seal/10 border border-validation-seal/20 px-2.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    HASH_VERIFIED
                  </span>
                </div>

                {/* Grid validation data logs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-1">
                    <p className="opacity-50 text-[10px] tracking-wider uppercase font-semibold">VALIDADO POR</p>
                    <p className="text-white font-medium">{saber.validation.validatorName}</p>
                    <p className="text-[11px] text-white/35 font-light select-all">ID: {saber.validation.validatorId}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="opacity-50 text-[10px] tracking-wider uppercase font-semibold">TEMPORALIDADE</p>
                    <p className="text-white font-medium">{saber.validation.date}</p>
                    {saber.validation.lunarMatch && (
                      <p className="text-[11px] text-cerrado-ochre font-medium">Ciclo Lunar: {saber.validation.lunarMatch}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="opacity-50 text-[10px] tracking-wider uppercase font-semibold">MOTIVO VALIDAÇÃO</p>
                    <p className="text-white font-medium select-all italic">"{saber.validation.reason}"</p>
                  </div>
                </div>

                {/* Footnotes */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-white/45 select-none">
                  <span className="font-semibold tracking-wide">
                    BLOCK_HEIGHT: {saber.validation.blockHeight}
                  </span>
                  <span className="opacity-60 text-[9px] uppercase tracking-widest">
                    PROCESSED BY PROTOCOLO RAIZ
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
