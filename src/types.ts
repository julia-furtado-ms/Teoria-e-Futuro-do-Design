export type BiomeType = 'Cerrado' | 'Amazônia' | 'Mata Atlântica' | 'Caatinga' | 'Pantanal' | 'Pampa';

export type SaberType = 
  | 'SABER TRADICIONAL'
  | 'TRONCO: SABER COLETIVO'
  | 'GALHO: RELATO INDIVIDUAL'
  | 'SABER RESTRITO'
  | 'DIVERGÊNCIA DETECTADA';

export type SaberStatus = 
  | 'VALIDADO' 
  | 'QUARENTENA' 
  | 'RESTRITO' 
  | 'DIVERGENCIA';

export interface Community {
  name: string;
  description?: string;
}

export interface SaberRelation {
  author: string;
  role: string;
  content: string;
  initial: string;
}

export interface SaberLink {
  url: string;
  label?: string;
}

export interface Saber {
  id: string;
  title: string;
  summary: string;
  type: SaberType;
  status: SaberStatus;
  community: Community;
  territory: string;
  coordinates: string;
  hash: string;
  createdAt: string;
  biome: BiomeType;
  
  // Specific fields for full view (Saber 1)
  quote?: string;
  saberCentralText?: string;
  imageUrl?: string;
  imageAlt?: string;
  
  // Divergence fields if applicable
  divergence?: {
    technicalBotany: string;
    traditionalWisdom: string;
    note: string;
  };
  
  // Validation / Traceability Metadata
  validation?: {
    validatorName: string;
    validatorId: string;
    date: string;
    lunarMatch?: string;
    reason: string;
    blockHeight: string;
  };

  // Live accounts / comments (Galhos)
  relations?: SaberRelation[];

  // For restricted / secret data
  restrictedLevel?: string;
  restrictedLabel?: string;
  restrictedMessage?: string;

  // Custom questions answers
  questions?: {
    origin: string;
    restrictions: string;
    lived: string;
    intent: string;
  };
  
  // External reference links for content stored off-site
  relatedLinks?: SaberLink[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  communityName: string;
  role: 'GUARDIÃ' | 'CONTRIBUIDOR' | 'VISITANTE';
  biome: BiomeType;
  territory: string;
  avatarUrl?: string;
}

export interface AppState {
  saberes: Saber[];
  activeTab: 'home' | 'biomas' | 'linhagem' | 'guardia' | 'contribuicao';
  selectedSaberId: string | null; // For drill-down view in "Linhagem de Saberes" or detail modal
  selectedBiomeFilter: BiomeType | 'Todos';
  selectedCommunityFilter: string;
  searchQuery: string;
}
