import React, { useState } from 'react';
import { User, BiomeType } from '../types';
import { X, Mail, Lock, User as UserIcon, ShieldCheck, MapPin, Users, Sparkles, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onRegisterSuccess: (user: User) => void;
}

export default function AuthModal({ onClose, onLoginSuccess, onRegisterSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Registration specific fields
  const [username, setUsername] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [biome, setBiome] = useState<BiomeType>('Cerrado');
  const [territory, setTerritory] = useState('');
  const [role, setRole] = useState<'GUARDIÃ' | 'CONTRIBUIDOR'>('CONTRIBUIDOR');

  const [error, setError] = useState<string | null>(null);

  // Quick-test seed users for easy testing
  const seedUsers = [
    {
      email: 'jovina@teia.org',
      password: 'senha',
      username: 'Anciã Dona Jovina',
      communityName: 'Vão de Almas',
      role: 'GUARDIÃ' as const,
      biome: 'Cerrado' as const,
      territory: 'Cavalcante, GO',
    },
    {
      email: 'jovelina@teia.org',
      password: 'senha',
      username: 'Matriarca Dona Jovelina',
      communityName: 'Mumbuca',
      role: 'GUARDIÃ' as const,
      biome: 'Cerrado' as const,
      territory: 'Jalapão, TO',
    },
    {
      email: 'sebastiana@teia.org',
      password: 'senha',
      username: 'Dona Sebastiana',
      communityName: 'Médio Xingu',
      role: 'CONTRIBUIDOR' as const,
      biome: 'Amazônia' as const,
      territory: 'Altamira, PA',
    }
  ];

  const handleQuickLogin = (seed: typeof seedUsers[0]) => {
    // Check if user exists in localStorage registered users
    const registered = localStorage.getItem('teia_registered');
    let usersList: User[] = [];
    if (registered) {
      try {
        usersList = JSON.parse(registered);
      } catch (e) {
        usersList = [];
      }
    }

    const exists = usersList.find(u => u.email === seed.email);
    if (!exists) {
      // Register them
      const newUser: User = {
        id: `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        username: seed.username,
        email: seed.email,
        communityName: seed.communityName,
        role: seed.role,
        biome: seed.biome,
        territory: seed.territory,
        
      };
      usersList.push(newUser);
      localStorage.setItem('teia_registered', JSON.stringify(usersList));
      localStorage.setItem(`teia_pwd_${seed.email}`, seed.password);
    }
    
    // Simulate login for them
    const matchedUser = exists || usersList.find(u => u.email === seed.email);
    if (matchedUser) {
      onLoginSuccess(matchedUser);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Fetch registered users
    const registered = localStorage.getItem('teia_registered');
    let usersList: User[] = [];
    if (registered) {
      try {
        usersList = JSON.parse(registered);
      } catch (e) {
        usersList = [];
      }
    }

    if (isLogin) {
      // Validate login
      if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      const user = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
      const savedPwd = localStorage.getItem(`teia_pwd_${email.toLowerCase()}`);

      if (!user || savedPwd !== password) {
        setError('E-mail ou Senha Ancestral incorretos.');
        return;
      }

      onLoginSuccess(user);
    } else {
      // Validate Sign Up
      if (!email || !password || !username || !communityName || !territory) {
        setError('Por favor, preencha todos os campos de registro.');
        return;
      }

      const exists = usersList.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setError('Este e-mail de acesso já está cadastrado na Teia.');
        return;
      }

      // Avatares não utilizados — não atribuir `avatarUrl`
      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email: email.toLowerCase(),
        communityName,
        role,
        biome,
        territory,
      };

      usersList.push(newUser);
      localStorage.setItem('teia_registered', JSON.stringify(usersList));
      localStorage.setItem(`teia_pwd_${email.toLowerCase()}`, password);

      onRegisterSuccess(newUser);
    }
  };

  return (
    <div className="fixed inset-0 bg-restricted-dark/80 backdrop-blur-md flex items-center justify-center z-120 p-4 animate-fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        id="auth-modal-card"
        className="bg-surface-container border border-outline/35 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
      >
        {/* Detail Graphics Side Panel */}
        <div className="hidden md:flex md:w-5/12 bg-forest-deep p-6 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 grayscale contrast-125 saturate-50 pointer-events-none">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkfzskAs0euZxIzwf9A6VWKGYq7KGU7e6b3UoCN3pm-qBRHRV7ZK22BjMzwi7DBxxPsGFuM14gc91AeWObq5RawULWy-kr9zjK9jwkGrYR0ALyhi3pxmtLsuJWXbDU04UoE4BZTZKcko7e6Ptsf9nU7E_3s2gCUac-oYpiM2KJdAyn9MU4HEPe0dF9CgLhyUGYfw8MbQ2nrGFRRrk5IOnvCmBJvpGrgU6q38akh9VQ8MgkXeA1V9x3WvdB8N8wk_nMyn82V0SGcXo" 
              alt="Cerrado Background Overlay" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-10 space-y-4">
            <span className="font-mono text-[9px] font-bold tracking-widest text-cerrado-ochre bg-white/10 px-2.5 py-1 rounded-sm uppercase">
              REDE DE SEGURANÇA
            </span>
            <h4 className="font-serif text-2xl font-bold text-white leading-tight">
              Protocolo Ancestral
            </h4>
            <p className="font-sans text-[11px] text-white/70 leading-relaxed">
              O acesso aos saberes tradicionais e dados confidenciais comunitários é regrado por consentimento prévio e graus de iniciação informada.
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-cerrado-ochre">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                Dados Criptográficos
              </span>
            </div>
            <p className="font-sans text-[10px] text-white/50 mt-1 leading-normal select-none">
              Identidade autenticada via hash inviolável de linhagem comunitária.
            </p>
          </div>
        </div>

        {/* Form Panel */}
        <div id="auth-form-panel" className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-primary">
                {isLogin ? 'Entrar na Teia' : 'Iniciar Consenso'}
              </h3>
              <p className="font-sans text-xs text-on-surface-variant mt-1">
                {isLogin 
                  ? 'Efetue a marcação de sua identidade para consultar as linhagens' 
                  : 'Cadastre suas credenciais para contribuir com relatos tradicionais'}
              </p>
            </div>
            <button 
              onClick={onClose}
              id="close-auth-button"
              className="p-1 px-1.5 rounded-lg bg-surface-container-high border border-outline/25 hover:border-outline/50 hover:bg-surface-container-highest transition-all cursor-pointer text-mineral-gray"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>


          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-conflict-red/10 border border-conflict-red/30 rounded-lg text-xs font-semibold text-conflict-red animate-shake">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-4">
                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="auth-username" className="font-mono text-[10px] font-bold text-mineral-gray uppercase tracking-wider">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mineral-gray/70" />
                    <input
                      id="auth-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ex: Dona Sebastiana dos Santos"
                      className="w-full bg-surface-container-low border border-outline/30 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface placeholder-on-surface-variant/40"
                    />
                  </div>
                </div>

                {/* Role Selecting Option */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold text-mineral-gray uppercase tracking-wider">
                      Função na Rede
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as 'GUARDIÃ' | 'CONTRIBUIDOR')}
                      className="w-full bg-surface-container-low border border-outline/30 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface cursor-pointer appearance-none"
                    >
                      <option value="CONTRIBUIDOR">Contribuidora</option>
                      <option value="GUARDIÃ">Guardiã Ancestral</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold text-mineral-gray uppercase tracking-wider">
                      Bioma de Atuação
                    </label>
                    <select
                      value={biome}
                      onChange={(e) => setBiome(e.target.value as BiomeType)}
                      className="w-full bg-surface-container-low border border-outline/30 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface cursor-pointer appearance-none"
                    >
                      <option value="Cerrado">Cerrado</option>
                      <option value="Amazônia">Amazônia</option>
                      <option value="Mata Atlântica">Mata Atlântica</option>
                      <option value="Caatinga">Caatinga</option>
                      <option value="Pantanal">Pantanal</option>
                      <option value="Pampa">Pampa</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Traditional Community */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="auth-community" className="font-mono text-[10px] font-bold text-mineral-gray uppercase tracking-wider">
                      Comunidade
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mineral-gray/70" />
                      <input
                        id="auth-community"
                        type="text"
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        placeholder="Ex: Kalunga"
                        className="w-full bg-surface-container-low border border-outline/30 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface placeholder-on-surface-variant/40"
                      />
                    </div>
                  </div>

                  {/* Territory Location */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="auth-territory" className="font-mono text-[10px] font-bold text-mineral-gray uppercase tracking-wider">
                      Território / Estado
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mineral-gray/70" />
                      <input
                        id="auth-territory"
                        type="text"
                        value={territory}
                        onChange={(e) => setTerritory(e.target.value)}
                        placeholder="Ex: Cavalcante, GO"
                        className="w-full bg-surface-container-low border border-outline/30 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface placeholder-on-surface-variant/40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="auth-email" className="font-mono text-[10px] font-bold text-mineral-gray uppercase tracking-wider">
                E-mail de Acesso
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mineral-gray/70" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guardia@teia.org"
                  className="w-full bg-surface-container-low border border-outline/30 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface placeholder-on-surface-variant/40 animate-none"
                />
              </div>
            </div>

            {/* Password ancestral */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="auth-password" className="font-mono text-[10px] font-bold text-mineral-gray uppercase tracking-wider">
                Senha Ancestral
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mineral-gray/70" />
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? "Sua assinatura de segredo" : "Escolha um segredo simples para acesso"}
                  className="w-full bg-surface-container-low border border-outline/30 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-cerrado-ochre text-on-surface placeholder-on-surface-variant/40"
                />
              </div>
            </div>

            <button
              type="submit"
              id="auth-submit-button"
              className="w-full mt-2 h-12 flex items-center justify-center bg-clay-terracotta text-white rounded-xl shadow-md transition-all font-semibold text-sm hover:scale-[1.01] active:scale-[0.99] hover:bg-clay-terracotta/90 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isLogin ? 'Autenticar com o Protocolo' : 'Registrar Identidade na Teia'}
            </button>
          </form>

          {/* Toggle Button */}
          <div className="mt-6 pt-4 border-t border-outline/15 text-center text-xs">
            <span className="text-on-surface-variant">
              {isLogin ? 'Não está cadastrada neste consórcio?' : 'Já possui assinatura autenticada?'}
            </span>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              type="button"
              id="auth-switch-button"
              className="ml-1.5 text-cerrado-ochre font-bold hover:underline cursor-pointer"
            >
              {isLogin ? 'Consolidar Identidade (Cadastro)' : 'Efetuar Login'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
