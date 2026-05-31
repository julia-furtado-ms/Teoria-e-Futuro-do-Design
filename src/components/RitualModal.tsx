import React, { useState, useEffect } from 'react';
import { Saber } from '../types';
import { 
  X, HelpCircle, ShieldCheck, Key, PenTool, Check, Loader2, Sparkles
} from 'lucide-react';

interface RitualModalProps {
  saber: Saber | null;
  onClose: () => void;
  onValidate: (id: string, validatorName: string, restrictedOption: 'sigilo' | 'publico') => void;
}

export default function RitualModal({ saber, onClose, onValidate }: RitualModalProps) {
  const [consentText, setConsentText] = useState('');
  const [restrictedSelect, setRestrictedSelect] = useState<'sigilo' | 'publico'>('publico');
  const [validatorName, setValidatorName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  
  // Real-time block hash signer simulation
  const [animatedHash, setAnimatedHash] = useState('0xHASH_GENERATING_...');

  useEffect(() => {
    if (!saber) return;
    
    // Simulate active blockchain ledger synchronization
    const interval = setInterval(() => {
      const generated = '0x' + Array.from({ length: 24 }, () => 
        Math.floor(Math.random() * 16).toString(16).toUpperCase()
      ).join('');
      setAnimatedHash(generated);
    }, 250);

    return () => clearInterval(interval);
  }, [saber]);

  if (!saber) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatorName.trim()) {
      alert('Por favor, preencha o nome da Guardiã que assume a responsabilidade histórica.');
      return;
    }

    setIsValidating(true);

    // Simulate validation ledger mining
    setTimeout(() => {
      onValidate(saber.id, validatorName, restrictedSelect);
      setIsValidating(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Viewport blurred dark mask backdrop */}
      <div 
        className="absolute inset-0 bg-restricted-dark/90 backdrop-blur-sm transition-opacity duration-300" 
        onClick={isValidating ? undefined : onClose}
      />

      {/* Floating container card */}
      <div className="relative bg-paper-background w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar border-t-4 border-clay-terracotta shadow-2xl rounded-b-xl p-8 animate-in fade-in zoom-in-95 duration-250 select-none">
        
        {/* Modal Top Header Bar */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="font-mono text-[9px] font-bold text-clay-terracotta uppercase tracking-[0.15em] block mb-1">
              PROCESSO DE VALIDAÇÃO COMUNITÁRIA
            </span>
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">
              Ouvindo o Saber
            </h2>
          </div>
          <button 
            disabled={isValidating}
            onClick={onClose}
            className="p-1 text-mineral-gray hover:text-primary transition-all rounded-full hover:bg-surface-container disabled:opacity-30 cursor-pointer"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Traditional Responsibility citation */}
        <div className="mb-8 p-4 bg-surface-container-low border-l-2 border-clay-terracotta rounded-r-lg">
          <p className="font-sans text-xs text-on-surface-variant font-medium leading-relaxed italic">
            "Antes de registrar, aspergimos a intenção sobre a palavra. O que se escreve aqui torna-se parte da raiz."
          </p>
        </div>

        {/* Selected Saber Overview block */}
        <div className="bg-surface-container-high/70 border border-outline/30 rounded-xl p-5 mb-8 space-y-2">
          <span className="font-mono text-[9px] font-bold text-mineral-gray uppercase tracking-widest leading-none block border-b border-mineral-gray/5 pb-2">
            REGISTRO SOB ANÁLISE COLETIVA
          </span>
          <h4 className="font-sans text-base font-bold text-primary tracking-tight">
            {saber.title}
          </h4>
          <p className="font-sans text-[13px] text-on-surface-variant italic leading-relaxed truncate">
            {saber.summary}
          </p>
        </div>

        {/* validation form inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Question 1 Consent */}
          <div className="space-y-2">
            <label htmlFor="consent" className="font-serif text-lg block text-on-surface leading-snug">
              1. Este saber foi colhido com o consentimento da terra e da linhagem?
            </label>
            <textarea
              id="consent"
              required
              rows={2}
              value={consentText}
              onChange={(e) => setConsentText(e.target.value)}
              placeholder="Descreva brevemente como a comunidade aprovou esta colheita de testemunho..."
              className="w-full bg-surface-container border border-outline/30 rounded-lg p-3 text-sm focus:ring-1 focus:ring-cerrado-ochre text-on-surface focus:outline-none"
            />
          </div>

          {/* Question 2 Secrecy Degree */}
          <div className="space-y-3">
            <label className="font-serif text-lg block text-on-surface leading-snug">
              2. Há algum segredo nestas dores que deve permanecer silenciado para estranhos?
            </label>
            <div className="flex flex-col sm:flex-row gap-6 mt-1.5 pl-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="radio"
                  name="modal-restricted"
                  checked={restrictedSelect === 'sigilo'}
                  onChange={() => setRestrictedSelect('sigilo')}
                  className="w-4.5 h-4.5 text-clay-terracotta focus:ring-clay-terracotta"
                />
                <span className="font-sans text-sm text-on-surface font-semibold">Sim, gravar como Saber Restrito à Comunidade</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="radio"
                  name="modal-restricted"
                  checked={restrictedSelect === 'publico'}
                  onChange={() => setRestrictedSelect('publico')}
                  className="w-4.5 h-4.5 text-clay-terracotta focus:ring-clay-terracotta"
                />
                <span className="font-sans text-sm text-on-surface font-semibold">Não, é público ao Bioma</span>
              </label>
            </div>
          </div>

          {/* Question 3 Responsibility Signer */}
          <div className="space-y-2">
            <label htmlFor="signer" className="font-serif text-lg block text-on-surface leading-snug">
              3. Quem assume a responsabilidade histórica por esta validação?
            </label>
            <input
              type="text"
              id="signer"
              required
              value={validatorName}
              onChange={(e) => setValidatorName(e.target.value)}
              placeholder="Digite o nome completo da Guardiã revisora"
              className="w-full bg-surface-container border border-outline/30 rounded-lg p-3 text-sm focus:ring-1 focus:ring-cerrado-ochre text-on-surface focus:outline-none"
            />
          </div>

          {/* Ledger block verification section */}
          <div className="pt-6 border-t border-mineral-gray/10 flex flex-col items-center gap-3 select-none">
            <p className="font-mono text-[9px] font-bold text-mineral-gray uppercase tracking-widest leading-none">
              REDE DE ASSINATURA CRIPTOGRÁFICA
            </p>
            <div className="font-mono text-[12px] font-bold text-clay-terracotta bg-surface-container px-5 py-2.5 rounded-lg border border-mineral-gray/5 text-center break-all select-all tracking-wide">
              {animatedHash}
            </div>
          </div>

          {/* validation trigger buttons */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isValidating}
              className="w-full bg-clay-terracotta hover:bg-primary text-white py-4 rounded-xl font-bold text-[17px] tracking-wide select-none outline-none focus:outline-none transition-all duration-150 active:scale-99 flex items-center justify-center gap-2.5 disabled:opacity-70 shadow-md"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  VALIDANDO E MINERANDO CONSENSO...
                </>
              ) : (
                <>
                  <PenTool className="w-5 h-5" />
                  VALIDAR E LACRAR NA TEIA
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
