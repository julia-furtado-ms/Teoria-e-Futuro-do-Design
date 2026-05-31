import { motion } from 'motion/react';
import { 
  Sprout, 
  Sparkles, 
  MapPin, 
  BookOpen, 
  ShieldCheck, 
  Hammer, 
  Compass, 
  UserCheck, 
  Droplet, 
  Flame, 
  ArrowRight,
  EyeOff
} from 'lucide-react';
import { BiomeType } from '../types';

interface HomeProps {
  setActiveTab: (tab: 'home' | 'biomas' | 'linhagem' | 'guardia' | 'contribuicao') => void;
  setSelectedBiome: (biome: BiomeType | 'Todos') => void;
}

export default function Home({ setActiveTab, setSelectedBiome }: HomeProps) {
  // Navigation trigger that also filters
  const handleExploreBiome = (biome: BiomeType | 'Todos') => {
    setSelectedBiome(biome);
    setActiveTab('biomas');
  };

  const craftsmanshipFeatures = [
    {
      title: 'Fibras & Trançados',
      description: 'Como e quando colher hastes de Capim Dourado e Seda de Buriti sem danificar a planta mãe. O ponto de secagem à sombra e ritos de torção de fibras para amarrações de alta durabilidade.',
      icon: Sprout,
      color: 'text-cerrado-ochre',
      bg: 'bg-cerrado-ochre/10',
      sample: 'Capim Dourado, Palha de Buriti, Cipós',
    },
    {
      title: 'Barros & Cerâmicas',
      description: 'Identificação e coleta respeitosa de argilas em barrancos e leitos de rios. Processo de cura e moagem de torrões, aditivos de pó de casca ou cinzas para modelagem e queima rústica sem trincas.',
      icon: Flame,
      color: 'text-clay-terracotta',
      bg: 'bg-clay-terracotta/10',
      sample: 'Panelas de barro, utilitários cozidos em cova',
    },
    {
      title: 'Tinturas & Pigmentos Naturais',
      description: 'Extração de tintas duradouras da floresta de forma sustentável: barbatimão para marrons terrosos, cumaru para tons escuros e urucum para vermelhos. Fixação com cinzas e terras ricas em ferro.',
      icon: Droplet,
      color: 'text-forest-deep',
      bg: 'bg-forest-deep/10',
      sample: 'Tingimento de fios de algodão e coco',
    },
    {
      title: 'Sementes, Adornos & Madeiras',
      description: 'Secagem, polimento e furação manual de sementes de tucumã, coco de macaúba e lágrimas-de-nossa-senhora para biojoias utilitárias e adereços resistentes ao tempo.',
      icon: Hammer,
      color: 'text-primary-fixed-dim',
      bg: 'bg-primary-fixed-dim/10',
      sample: 'Entalhes, biojoias de sementes, furos manuais',
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Pesquisa e Navegação por Biomas',
      desc: 'Navegue pelas fichas de saberes tradicionais associadas aos biomas. Cada ficha contém segredos práticos do manejo sustentável que evitam a exaustão das plantas.',
      actionLabel: 'Ver Biomas',
      action: () => handleExploreBiome('Todos'),
      icon: Compass
    },
    {
      num: '02',
      title: 'Contribuição Prática do Artesão',
      desc: 'Artesãos credenciados podem relatar técnicas testadas localmente ou alertar sobre variações das colheitas. O saber é documentado respeitando a linhagem ancestral.',
      actionLabel: 'Contribuir',
      action: () => setActiveTab('contribuicao'),
      icon: BookOpen
    },
    {
      num: '03',
      title: 'Tempo de Validação (Quarentena)',
      desc: 'Toda nova contribuição entra em análise preventiva. Fica reservada no painel de governança até que se comprovem os ritos de integridade e não-exploração predatória.',
      icon: EyeOff
    },
    {
      num: '04',
      title: 'Chancela das Guardiãs',
      desc: 'As Guardiãs do território revisam as marcas geográficas e a autenticidade técnica. Decidem se o saber é de circulação aberta ou restrita à comunidade local contra biopirataria.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Intro Hero banner */}
      <div className="bg-gradient-to-br from-surface-variant via-surface-container/80 to-surface-container-low border border-outline/35 rounded-3xl p-10 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none paper-texture bg-blend-soft-light"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cerrado-ochre/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-cerrado-ochre/15 text-cerrado-ochre font-mono text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase border border-cerrado-ochre/25">
            <Sparkles className="w-3.5 h-3.5" />
            Artesanato Prático & Autonomia das Comunidades
          </div>
          
          <h1 className="font-serif text-[48px] md:text-[54px] leading-tight font-bold text-on-surface tracking-tight">
            Tecendo Linhas de <span className="text-cerrado-ochre">Matéria-Prima</span> e Sabedoria Prática
          </h1>
          
          <p className="font-sans text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed font-light">
            A <strong>Teia de Saberes</strong> é salvaguarda e guia prático. Nossa rede conecta 
            o conhecimento do que a terra ao seu redor produz com o ofício vivo das mãos. 
            Catalogamos as técnicas tradicionais de coleta respeitosa e de manufatura sustentável de artesanatos 
            — organizadas por biomas brasileiros e geridas pelas próprias Guardiãs dos territórios.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => handleExploreBiome('Todos')}
              className="bg-clay-terracotta text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 hover:bg-clay-terracotta/90 active:scale-98 transition-all duration-150 flex items-center gap-2.5"
            >
              <Compass className="w-4.5 h-4.5" />
              Explorar Biomas e Técnicas
            </button>
            <button
              onClick={() => setActiveTab('contribuicao')}
              className="border border-outline hover:border-cerrado-ochre text-on-surface hover:text-cerrado-ochre px-7 py-3.5 rounded-xl font-bold text-sm bg-surface-container-lowest/80 transition-all duration-150 flex items-center gap-2.5"
            >
              <BookOpen className="w-4.5 h-4.5" />
              Inserir Ficha de Matéria-Prima
            </button>
          </div>
        </div>
      </div>

      {/* Focus explanation: Practical Earth Craftsmanship */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-[10px] font-extrabold text-clay-terracotta uppercase tracking-[0.2em] block">
            CONEXÃO DIRETA COM A TERRA
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
            O Foco: Saberes Práticos Úteis
          </h2>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Aqui preservamos a utilidade do saber. Menos conjecturas abstratas, mais o ofício tangível: como respeitar os fluxos da seiva, extrair pigmentações duradouras da floresta e costurar o capim sob o sol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {craftsmanshipFeatures.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div 
                key={feat.title}
                className="bg-surface border border-outline/25 p-7 rounded-2xl flex gap-5 hover:border-outline transition-all duration-150 shadow-xs relative group"
              >
                <div className={`p-4 rounded-xl ${feat.bg} ${feat.color} shrink-0 h-14 w-14 flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="font-serif text-xl font-bold text-on-surface tracking-tight group-hover:text-cerrado-ochre transition-colors">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed">
                    {feat.description}
                  </p>
                  <div className="pt-2 text-xs font-mono text-mineral-gray flex items-center gap-1.5">
                    <span className="font-semibold text-cerrado-ochre">Matérias principais:</span>
                    <span>{feat.sample}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it works section (Visual Flow) */}
      <div className="bg-surface-container-low/40 border border-outline/20 rounded-3xl p-10 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-[10px] font-extrabold text-cerrado-ochre uppercase tracking-[0.2em] block">
            GOVERNANÇA ANCESTRAL E DIGITAL
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-on-surface">
            Como Funciona a Teia de Saberes?
          </h2>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Garantimos blindagem e veracidade comunitária por meio de um fluxo de escuta, validação e arquivamento ético que protege as famílias produtoras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div 
                key={step.title}
                className="bg-surface border border-outline/25 p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:translate-y-[-2px] transition-all duration-150 shadow-2xs relative"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-cerrado-ochre/50 border border-cerrado-ochre/20 rounded-full px-2.5 py-0.5">
                      PASSO {step.num || `0${idx + 1}`}
                    </span>
                    {StepIcon && <StepIcon className="w-5 h-5 text-mineral-gray/40" />}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-bold text-on-surface tracking-tight leading-snug">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {step.actionLabel && step.action && (
                  <button
                    onClick={step.action}
                    className="mt-4 flex items-center gap-1.5 text-xs font-mono font-bold text-cerrado-ochre hover:text-white transition-colors duration-200"
                  >
                    <span>{step.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Earth Resource Ethos & Responsibility Footer */}
      <div className="p-8 rounded-2xl bg-forest-deep/15 border border-forest-deep/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-validation-seal font-mono text-[9px] font-black tracking-wider uppercase">
            <UserCheck className="w-3.5 h-3.5" />
            Responsabilidade de Linhagem
          </div>
          <h4 className="font-serif text-xl font-bold text-on-surface tracking-tight">
            Nenhuma flor ou caule deve ser arrancada por pura ambição
          </h4>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            A Teia repudia o patenteamento industrial de sementes nativas e o turismo de desrespeito. Nossos segredos artesanais permanecem ancorados nos povos originários que colhem com moderação e deixam a mãe terra regenerar sua própria força.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => handleExploreBiome('Todos')}
            className="bg-surface hover:bg-surface-variant border border-outline/65 text-on-surface px-6 py-3 rounded-lg font-bold text-xs transition-all duration-150 font-mono"
          >
            Ver Saberes
          </button>
        </div>
      </div>
    </div>
  );
}
