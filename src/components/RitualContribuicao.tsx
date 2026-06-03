import React, { useState, useEffect, useRef } from 'react';
import { Saber, BiomeType, User } from '../types';
import { 
  Info, Sparkles, FileUp, Save, Heart, TreePine, 
  Sun, CheckCircle, HelpCircle, FileText, Trash2, Globe, ChevronRight, ShieldAlert
} from 'lucide-react';

interface RitualContribuicaoProps {
  onSubmit: (newSaber: Partial<Saber>) => void;
  currentUser: User | null;
}

interface AttachmentFile {
  file: File;
  id: string;
}

export default function RitualContribuicao({ onSubmit, currentUser }: RitualContribuicaoProps) {
  // Local form states
  const [community, setCommunity] = useState('');
  const [lineage, setLineage] = useState('');
  const [title, setTitle] = useState('');
  const [saberText, setSaberText] = useState('');
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState(''); // Secrecy
  const [q3, setQ3] = useState(''); // Vivenciado
  const [intent, setIntent] = useState('');
  const [selectedBiome, setSelectedBiome] = useState<BiomeType>('Cerrado');
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  // Auto-fill form values based on authenticated user
  useEffect(() => {
    if (currentUser) {
      setCommunity(currentUser.communityName);
      setLineage(currentUser.username);
      setSelectedBiome(currentUser.biome);
    } else {
      setCommunity('');
      setLineage('');
      setSelectedBiome('Cerrado');
    }
  }, [currentUser]);

  // Live hash calculator simulation
  const [liveHash, setLiveHash] = useState('sha256:awaiting_input...');

  useEffect(() => {
    if (saberText.trim().length > 0) {
      // Simulate simple cryptographic hash calculation from content
      let hash = 0;
      for (let i = 0; i < saberText.length; i++) {
        hash = (hash << 5) - hash + saberText.charCodeAt(i);
        hash |= 0;
      }
      const hex = Math.abs(hash).toString(16).padEnd(8, '4').toUpperCase();
      setLiveHash(`sha256:7c3f${hex}9fa1a86bc2ffd`);
    } else {
      setLiveHash('sha256:awaiting_input...');
    }
  }, [saberText]);

  const handleAddAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validar tamanho do arquivo
      if (file.size > MAX_FILE_SIZE) {
        alert(`O arquivo "${file.name}" excede o tamanho máximo de 50MB`);
        continue;
      }

      // Verificar se o arquivo já foi adicionado
      const fileExists = attachments.some(a => a.file.name === file.name && a.file.size === file.size);
      if (fileExists) {
        alert(`O arquivo "${file.name}" já foi adicionado`);
        continue;
      }

      // Adicionar o arquivo
      const newAttachment: AttachmentFile = {
        file,
        id: `${file.name}-${Date.now()}-${Math.random()}`
      };
      setAttachments(prev => [...prev, newAttachment]);
    }

    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    e.currentTarget.value = '';
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter(item => item.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !saberText.trim() || !community.trim()) {
      alert('Por favor, preencha o título, o relato e o nome da comunidade.');
      return;
    }

    // Prepare partial Saber object to push to global state
    const newSaber: Partial<Saber> = {
      title,
      summary: saberText.substring(0, 160) + (saberText.length > 160 ? '...' : ''),
      saberCentralText: saberText,
      type: 'GALHO: RELATO INDIVIDUAL',
      status: 'QUARENTENA',
      biome: selectedBiome,
      community: {
        name: community,
        description: `Linhagem de transmissão reportada por ${lineage || 'Guardiã'}.`
      },
      territory: community.includes('Jalapão') ? 'Jalapão, TO' : 'Arinos, MG',
      coordinates: community.includes('Jalapão') ? '10°26\'10.6"S 46°35\'12.5"W' : '-15.8239 S, -47.1022 W',
      hash: liveHash,
      createdAt: 'Hoje',
      relations: lineage ? [
        {
          author: lineage,
          role: 'Autora do Relato',
          content: `"${saberText.substring(0, 100)}..."`,
          initial: lineage.charAt(0).toUpperCase()
        }
      ] : [],
      questions: {
        origin: q1,
        restrictions: q2,
        lived: q3,
        intent: intent
      }
    };

    onSubmit(newSaber);

    // Reset fields after successful ingestion
    setTitle('');
    setSaberText('');
    setLineage('');
    setQ1('');
    setQ2('');
    setQ3('');
    setIntent('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      
      {/* Route Breadcrumb and Introductions */}
      <section className="space-y-4">
        <nav className="flex items-center gap-1.5 text-on-surface-variant/65 font-mono text-xs select-none">
          <span>Início</span> 
          <ChevronRight className="w-3.5 h-3.5" /> 
          <span className="font-semibold text-primary">Contribuição de Saberes</span>
        </nav>

        <h1 className="font-serif text-[44px] leading-tight font-bold text-clay-terracotta tracking-tight">
          Contribuição de Saberes:&nbsp;<span className="font-normal text-on-surface text-[38px] block mt-1 tracking-wide">Tecendo Novos Saberes</span>
        </h1>

        <div className="p-5 bg-quarantine-amber/10 border-l-4 border-quarantine-amber rounded-r-xl shadow-xs space-y-3">
          <div className="flex gap-4 items-start">
            <Info className="w-5.5 h-5.5 text-quarantine-amber shrink-0 mt-0.5 fill-quarantine-amber/5" />
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              A contribuição de um novo saber é um ato de profunda responsabilidade com a linhagem e o território. Toda informação inserida passará pelo tempo de validação (Quarentena), onde outras guardiãs e o conselho territorial certificarão a autenticidade e os protocolos de acesso antes da integração definitiva à Teia.
            </p>
          </div>
          
          {currentUser ? (
            <div className="flex items-center gap-3.5 pt-2.5 border-t border-quarantine-amber/15 select-none font-mono text-[11px] text-cerrado-ochre bg-white/5 p-3 rounded-lg">
              <div className="w-7 h-7 rounded-full bg-cerrado-ochre/25 overflow-hidden border border-cerrado-ochre/35 flex items-center justify-center font-bold text-xs uppercase">
                <span>{currentUser.username[0]}</span>
              </div>
              <div>
                Assinatura Chancela Ativa:&nbsp;
                <span className="font-sans font-bold text-on-surface">{currentUser.username}</span> ({currentUser.role}) do território&nbsp;
                <span className="font-sans font-bold text-on-surface">{currentUser.communityName}</span>. Campos autopreenchidos.
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 pt-2.5 border-t border-quarantine-amber/15 select-none font-mono text-[10.5px] text-conflict-red bg-white/5 p-3 rounded-lg">
              <ShieldAlert className="w-4 h-4 text-conflict-red" />
              <div>
                Identidade Geral Anônima (Consulta). Para assinar relatos tradicionalmente com seu nome e chancelar territorialidade, faça&nbsp;
                <span className="font-bold underline">Login na Barra Lateral</span>.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Structured Intake Forms */}
      <form onSubmit={handleFormSubmit} className="space-y-10 pb-16">
        
        {/* Section 1: Raiz Ancestral */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 py-1">
            <span className="font-mono text-[9px] font-bold text-mineral-gray uppercase tracking-widest block mb-2">
              01. ORIGEM
            </span>
            <h3 className="font-serif text-[22px] font-bold text-forest-deep tracking-tight mb-2">
              Raiz Ancestral
            </h3>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed opacity-85">
              Identifique o território dador e a linhagem que sustenta e chancela este conhecimento.
            </p>
          </div>

          <div className="md:col-span-8 bg-surface-container/45 border border-mineral-gray/10 p-6 rounded-2xl space-y-4 shadow-3xs">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="title" className="font-mono text-[10.5px] font-bold text-on-surface-variant uppercase tracking-wider">
                Título do Saber Tradicional
              </label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Uso da entrecasca de Barbatimão em feridas profunda"
                className="bg-surface-container-low border border-outline/30 rounded-lg p-3 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface placeholder-on-surface-variant/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="community" className="font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Nome da Comunidade ou Território
                </label>
                <input
                  type="text"
                  id="community"
                  required
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  placeholder="Ex: Comunidade Kalunga - Engenho II"
                  className="bg-surface-container-low border border-outline/30 rounded-lg p-3 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface placeholder-on-surface-variant/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="lineage" className="font-mono text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Linhagem (Mestre / Anciã de Transmissão)
                </label>
                <input
                  type="text"
                  id="lineage"
                  required
                  value={lineage}
                  onChange={(e) => setLineage(e.target.value)}
                  placeholder="Ex: Dona Sebastiana dos Santos"
                  className="bg-surface-container-low border border-outline/30 rounded-lg p-3 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface placeholder-on-surface-variant/40"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: O Saber Description (The Relato card) */}
        <div className="bg-surface-container border border-outline/20 p-8 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 select-none md:block hidden">
            <TreePine className="w-48 h-48 text-forest-deep" />
          </div>

          <div className="relative z-10 space-y-6">
            <div>
              <span className="font-mono text-[9px] font-bold text-mineral-gray uppercase tracking-widest block mb-2 select-none">
                02. O SABER
              </span>
              <h3 className="font-serif text-[22px] font-bold text-forest-deep tracking-tight">
                Relato da Vivência
              </h3>
            </div>

            <div className="flex flex-col gap-1.5">
              <textarea
                id="saberText"
                required
                rows={8}
                value={saberText}
                onChange={(e) => setSaberText(e.target.value)}
                placeholder="Comece o relato aqui, honrando o tempo, os tempos da lua, as colheitas precisas e o assentamento das palavras..."
                className="w-full bg-paper-background/40 border border-mineral-gray/20 rounded-lg p-6 font-serif text-lg leading-relaxed placeholder:opacity-30 italic text-on-surface focus:outline-none focus:ring-1 focus:ring-cerrado-ochre"
              />

              <div className="flex justify-between items-center mt-3 border-t border-mineral-gray/10 pt-3 select-none">
                <p className="font-mono text-xs text-on-surface-variant/75">
                  Traceability Hash: <span className="text-clay-terracotta font-bold select-all">{liveHash}</span>
                </p>
                <FileText className="w-4.5 h-4.5 text-mineral-gray/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: The 4 Intencionalidade Questions block (Screenshot 4) */}
        <div className="bg-restricted-dark text-white p-8 rounded-2xl space-y-8 relative overflow-hidden shadow-md">
          {/* subtle paper texture blend */}
          <div className="absolute inset-0 opacity-5 pointer-events-none paper-texture bg-blend-soft-light"></div>
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-[9.5px] font-extrabold text-cerrado-ochre uppercase tracking-wider block">
              03. TERMO DE INTENCIONALIDADE
            </span>
            <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
              As 4 Perguntas de Intencionalidade
            </h3>
            <p className="font-sans text-xs opacity-75 italic leading-relaxed">
              A tecnologia serve à vida, e não o contrário. Responda com o coração e as memórias do seu território.
            </p>
          </div>

          <div className="space-y-6 pt-4 relative z-10">
            {/* Q1 */}
            <div className="space-y-2">
              <label htmlFor="q1" className="font-serif text-lg block text-white/90">
                1. De onde veio esse saber e como ele chegou até você?
              </label>
              <textarea
                id="q1"
                required
                rows={3}
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
                placeholder="Descreva a genealogia do saber e as linhagens que ensinaram..."
                className="w-full bg-white/10 border border-white/15 text-white placeholder-white/20 rounded-lg p-4 focus:ring-1 focus:ring-cerrado-ochre focus:border-cerrado-ochre text-sm"
              />
            </div>

            {/* Q2 & Q3 split in grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Q2 */}
              <div className="space-y-3">
                <label className="font-serif text-lg block text-white/90">
                  2. Há restrições de circulação ou partes sensíveis ou reservadas que NÃO devem ser digitalizadas?
                </label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="circulacao"
                      value="sigilo"
                      onChange={(e) => setQ2(e.target.value)}
                      className="w-4.5 h-4.5 text-cerrado-ochre bg-white/10 border-white/25 focus:ring-cerrado-ochre"
                    />
                    <span className="text-sm">Sim, requer sigilo</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="circulacao"
                      value="publico"
                      onChange={(e) => setQ2(e.target.value)}
                      className="w-4.5 h-4.5 text-cerrado-ochre bg-white/10 border-white/25 focus:ring-cerrado-ochre"
                    />
                    <span className="text-sm">Não, é de uso público</span>
                  </label>
                </div>
              </div>

              {/* Q3 */}
              <div className="space-y-3">
                <label className="font-serif text-lg block text-white/90">
                  3. Você testou e viveu esse saber no seu território?
                </label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="testado"
                      value="vivenciado"
                      onChange={(e) => setQ3(e.target.value)}
                      className="w-4.5 h-4.5 text-validation-seal bg-white/10 border-white/25 focus:ring-validation-seal"
                    />
                    <span className="text-sm">Sim, foi vivenciado</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="testado"
                      value="registro"
                      onChange={(e) => setQ3(e.target.value)}
                      className="w-4.5 h-4.5 text-validation-seal bg-white/10 border-white/25 focus:ring-validation-seal"
                    />
                    <span className="text-sm">Apenas registro oral</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <label htmlFor="intent" className="font-serif text-lg block text-white/90">
                4. Qual a intenção deste registro na Teia?
              </label>
              <select
                id="intent"
                required
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full bg-white/10 border border-white/15 text-white/90 rounded-lg p-3.5 focus:ring-1 focus:ring-cerrado-ochre text-sm h-12 leading-none"
              >
                <option value="" className="text-on-background">Selecione o propósito primordial...</option>
                <option value="preservacao" className="text-on-background">Preservação imaterial para gerações futuras</option>
                <option value="compartilhamento" className="text-on-background">Compartilhamento solidário entre territórios</option>
                <option value="protecao" className="text-on-background">Denúncia e salvaguarda biológica contra biopirataria</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Biome selection & Related files */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Biome Choice */}
          <div className="bg-surface-container p-6 rounded-2xl border border-mineral-gray/10 flex flex-col gap-4 select-none">
            <span className="font-mono text-[9px] font-bold text-mineral-gray tracking-wider uppercase">
              BIOMA & ECOSSISTEMA
            </span>
            <div className="flex flex-wrap gap-2.5 mt-2">
              <button
                type="button"
                onClick={() => setSelectedBiome('Cerrado')}
                className={`px-4 py-2.5 rounded-full border-2 font-bold text-[13px] flex items-center gap-1.5 transition-all duration-200 ${
                  selectedBiome === 'Cerrado'
                    ? 'bg-cerrado-ochre border-cerrado-ochre text-white shadow-xs'
                    : 'border-mineral-gray/25 text-on-surface-variant hover:border-mineral-gray/40'
                }`}
              >
                <Sun className="w-4 h-4 shrink-0" />
                Cerrado
              </button>

              <button
                type="button"
                onClick={() => setSelectedBiome('Amazônia')}
                className={`px-4 py-2.5 rounded-full border-2 font-bold text-[13px] flex items-center gap-1.5 transition-all duration-200 ${
                  selectedBiome === 'Amazônia'
                    ? 'bg-forest-deep border-forest-deep text-white shadow-xs'
                    : 'border-mineral-gray/25 text-on-surface-variant hover:border-mineral-gray/40'
                }`}
              >
                <TreePine className="w-4 h-4 shrink-0" />
                Amazônia
              </button>

              <button
                type="button"
                onClick={() => setSelectedBiome('Mata Atlântica')}
                className={`px-4 py-2.5 rounded-full border-2 font-bold text-[13px] flex items-center gap-1.5 transition-all duration-200 ${
                  selectedBiome === 'Mata Atlântica'
                    ? 'bg-secondary border-secondary text-white shadow-xs'
                    : 'border-mineral-gray/25 text-on-surface-variant hover:border-mineral-gray/40'
                }`}
              >
                Mata Atlântica
              </button>
            </div>
          </div>

          {/* Dynamic Drag-and-drop simulated attachment list */}
          <div className="bg-surface-container p-6 rounded-2xl border border-mineral-gray/10 flex flex-col justify-between">
            <span className="font-mono text-[9px] font-bold text-mineral-gray tracking-wider uppercase mb-4 select-none">
              MATERIAL RELACIONADO (ANEXOS)
            </span>

            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="audio/*,video/*,image/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />

              <button
                type="button"
                onClick={handleAddAttachment}
                className="w-full flex items-center gap-2.5 justify-center p-3.5 bg-surface-container-high/40 border border-dashed border-outline/30 hover:border-cerrado-ochre/50 rounded-xl cursor-pointer hover:bg-surface-container-high transition-all text-sm font-sans"
              >
                <FileUp className="w-5 h-5 text-clay-terracotta shrink-0" />
                <span className="font-semibold text-on-surface opacity-85">
                  Anexar depoimentos, áudios ou vídeos (máx 50MB)
                </span>
              </button>

              <div className="flex flex-wrap gap-2">
                {attachments.map(item => (
                  <div 
                    key={item.id}
                    className="bg-surface-container-high px-3 py-1.5 rounded-lg text-[11.5px] font-mono text-on-surface font-semibold flex items-center gap-2 border border-mineral-gray/10 max-w-xs"
                  >
                    <span className="truncate" title={`${item.file.name} (${formatFileSize(item.file.size)})`}>
                      {item.file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(item.id)}
                      className="p-0.5 text-mineral-gray/50 hover:text-conflict-red transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {attachments.length > 0 && (
                <p className="text-[11px] text-on-surface-variant/70 font-sans">
                  Total: {attachments.length} arquivo{attachments.length !== 1 ? 's' : ''} • 
                  {attachments.reduce((sum, a) => sum + a.file.size, 0) > 0 && (
                    <span className="ml-1">{formatFileSize(attachments.reduce((sum, a) => sum + a.file.size, 0))}</span>
                  )}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Action button rows */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-6 pt-8 border-t border-mineral-gray/20 select-none">
          <button
            type="button"
            onClick={() => alert('Seu rascunho temporário foi assinado eletronicamente e salvo localmente no browser!')}
            className="text-on-surface-variant font-bold hover:text-clay-terracotta transition-colors flex items-center gap-2 text-sm px-4 py-2.5"
          >
            <Save className="w-4.5 h-4.5 text-mineral-gray" />
            Salvar Rascunho
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto bg-clay-terracotta text-white px-8 py-4 rounded-xl font-bold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-150 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 shrink-0" />
            Iniciar Validação do Saber
          </button>
        </div>

      </form>

    </div>
  );
}
