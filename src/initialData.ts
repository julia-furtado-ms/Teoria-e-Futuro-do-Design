import { Saber } from './types';

export const INITIAL_SABERES: Saber[] = [
  {
    id: 'saber-buriti',
    title: 'O Uso do Buriti na Tecelagem',
    type: 'SABER TRADICIONAL',
    status: 'VALIDADO',
    biome: 'Cerrado',
    summary: 'A arte de extrair a seda do buriti exige paciência e respeito aos tempos da mata. Este saber detalha o processo desde o manejo da palmeira até a fiação.',
    quote: 'O olho do buriti é o coração da palmeira. Se tirar no tempo errado, o coração adoece e a tecelagem não brilha.',
    saberCentralText: 'A extração da fibra, ou "seda", deve ocorrer obrigatoriamente durante a lua minguante. Segundo o saber consolidado pelas anciãs, a seiva da palmeira está nas raízes nesse período, o que garante que a fibra não "carunche" e mantenha a flexibilidade necessária para o trançado fino.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3l962TRkAVwm7_ZwVi5DLgXw-y5tXrgDBoYZwt-Jzqpkpmw1YG6ix9J_p-sJzqJKASizfuQBSic3gkSZNIeWHANgnquOTEqV3b8PLQ-j4zjTGnTowWWhX8CE0QC615-juIrvuB6B6xZ7BsomwGs2bAYfXraX5lIscKnM8vFdVdSCwxhUR32XYStkMMVUvw2kxF056sv8jWFOnbuOfx4Wv6LvmCj3WIp4zb20aB1UbLcPjhPm4q5IQ6hZWE5DawQwKsGliNLlQN8c',
    imageAlt: 'Retirada da seda do buriti',
    community: {
      name: 'Mumbuca',
      description: 'Berço do artesanato em capim dourado e buriti no Jalapão.'
    },
    territory: 'Jalapão, TO',
    coordinates: "10°26'10.6\"S 46°35'12.5\"W",
    hash: 'sha256:8D4D3B032D4B314B4A4A485F6D9YIhLl7W1mLaOsq_FE68uxWpw',
    createdAt: '14 Outubro, 2023',
    divergence: {
      technicalBotany: 'Estudos acadêmicos sugerem que a umidade da fibra é constante independente da fase lunar.',
      traditionalWisdom: 'A comunidade relata perda total de 40% das peças feitas com fibra colhida na lua cheia.',
      note: 'O protocolo Raiz prioriza o relato de campo da comunidade.'
    },
    validation: {
      validatorName: 'Conselho de Guardiãs Mumbuca',
      validatorId: '0x8823...FF22',
      date: '14 Outubro, 2023',
      lunarMatch: 'Minguante (98% match)',
      reason: 'Saber ancestral em risco de descaracterização industrial.',
      blockHeight: '18,421,092'
    },
    relations: [
      {
        author: 'Maria das Dores',
        role: 'Artesã Mestra • 45 anos de ofício',
        content: '"Eu prefiro ferver a palha com um pouco de sal antes de secar ao sol. Isso evita que ela fique quebradiça no Jalapão seco."',
        initial: 'M'
      },
      {
        author: 'João de Barro',
        role: 'Tecelão • Guardião Local',
        content: '"A lavagem no rio antes da fiação ajuda a clarear a seda sem precisar usar alvejante químico, mantendo a força da fibra."',
        initial: 'J'
      }
    ]
  },
  {
    id: 'saber-pequi',
    title: 'Ciclos de Florada do Pequi: Observação Territorial Kalunga',
    type: 'TRONCO: SABER COLETIVO',
    status: 'VALIDADO',
    biome: 'Cerrado',
    summary: 'Este registro consolida décadas de observação coletiva sobre a relação entre o regime de chuvas e a produtividade dos pequizeiros no território Vão de Almas. Um protocolo de colheita sustentável que respeita o tempo de maturação do pequi e protege a regeneração da vegetação rasteira.',
    community: {
      name: 'Vão de Almas',
      description: 'Território quilombola com ricas práticas de manejo tradicional.'
    },
    territory: 'Cavalcante, GO',
    coordinates: "13.7801° S, 47.9292° W",
    hash: '0x82FE921C6y8tZMlVfI6BnC0oRweOd',
    createdAt: '08 Outubro, 2023',
    validation: {
      validatorName: 'Conselho Quilombola Kalunga',
      validatorId: '0x3344...EE98',
      date: '10 Outubro, 2023',
      reason: 'Registro consolidado de observação coletiva (42 Guardiãs).',
      blockHeight: '18,410,233'
    },
    relations: []
  },
  {
    id: 'saber-barbatimao-feridas',
    title: 'Uso da entrecasca de Barbatimão em feridas profundas',
    type: 'GALHO: RELATO INDIVIDUAL',
    status: 'QUARENTENA',
    biome: 'Cerrado',
    summary: 'Relatado por Anciã Maria Clara (Comunidade Vão de Almas). Descrição técnica e de manejo para extração sustentável da casca sem anelar o tronco principal.',
    community: {
      name: 'Vão de Almas',
      description: 'Saberes de medicina tradicional do Cerrado.'
    },
    territory: 'Cavalcante, GO',
    coordinates: '13.8055° S, 47.8891° W',
    hash: '0x82f012a6f2b18421092ffaa12',
    createdAt: '22 Maio, 2026',
    relations: [
      {
        author: 'Maria Clara',
        role: 'Anciã Curandeira',
        content: '"Minha avó ensinou que o corte deve ser feito apenas na face leste do tronco durante a lua minguante para preservar o fluxo de seiva."',
        initial: 'M'
      }
    ],
    questions: {
      origin: 'Herdado da linhagem materna, praticado há mais de 60 anos no Vão de Almas.',
      restrictions: 'Apenas para uso local e fins de cura comunitária, sem exploração industrial.',
      lived: 'Sim, amplamente vivenciado no tratamento de cicatrizes e inflamações graves.',
      intent: 'Preservação para as próximas gerações e validação pelo Conselho de Guardiãs.'
    }
  },
  {
    id: 'saber-barbatimao-cicatrizantes',
    title: 'Uso da casca de Barbatimão em cicatrizantes',
    type: 'GALHO: RELATO INDIVIDUAL',
    status: 'QUARENTENA',
    biome: 'Cerrado',
    summary: '"Minha avó ensinou que o corte deve ser feito apenas na face leste do tronco durante a lua minguante..."',
    community: {
      name: 'Território Kalunga',
      description: 'Manejo de plantas medicinais do Cerrado brasileiro.'
    },
    territory: 'Cavalcante, GO',
    coordinates: '13.7912° S, 47.9150° W',
    hash: '0x77c2ff82bc9942a12',
    createdAt: '24 Maio, 2026',
    relations: [
      {
        author: 'Tiago Cavalcante',
        role: 'Tecelão • Guardião Local',
        content: '"A lavagem e fervura correta é crucial ante de aplicar nas feridas."',
        initial: 'T'
      }
    ]
  },
  {
    id: 'saber-frutos',
    title: 'Mapeamento de Coleta de Frutos: Sítio Araras',
    type: 'DIVERGÊNCIA DETECTADA',
    status: 'DIVERGENCIA',
    biome: 'Cerrado',
    summary: 'Conflito entre o registro de colheita tradicional de 12/10 e o relato de queimada controlada divergente na área limítrofe.',
    community: {
      name: 'Sítio Araras',
      description: 'Associação de coletores tradicionais.'
    },
    territory: 'Niquelândia, GO',
    coordinates: '14.4731° S, 48.4522° W',
    hash: '0x44dae28432a63d3398e',
    createdAt: '12 Outubro, 2023',
    divergence: {
      technicalBotany: 'Imagens de satélite registram ocorrência de fogo controlado em Área de Proteção Permanente em data não programada.',
      traditionalWisdom: 'Comunidade relata necessidade de aceiro antecipado devido a ventos incomuns e proteção dos pequizeiros jovens.',
      note: 'Divergência encaminhada para mediação da Guardiã-Mestra zonal.'
    },
    relations: []
  },
  {
    id: 'saber-nascentes',
    title: 'Mapeamento de Nascentes Preservadas (Região Urucuia)',
    type: 'SABER RESTRITO',
    status: 'RESTRITO',
    biome: 'Cerrado',
    summary: 'Acesso permitido apenas via autorização expressa da linhagem local do Urucuia e consentimento comunitário.',
    restrictedLevel: 'Guardiãs de 3º Grau',
    restrictedLabel: 'Saber Restrito à Comunidade',
    restrictedMessage: 'Apenas Guardiãs de 3º Grau de Iniciação podem visualizar os ritos de preservação de água e floração desta espécie nascente.',
    community: {
      name: 'Geraizeiros do Urucuia',
      description: 'Comunidades geraizeiras do norte de Minas Gerais.'
    },
    territory: 'Arinos, MG',
    coordinates: '15.9122° S, 46.1055° W',
    hash: '0x99283fccae18421092',
    createdAt: '18 Setembro, 2023',
    relations: []
  },
  {
    id: 'saber-sementes',
    title: 'Protocolo de Partilha de Sementes Nativas',
    type: 'TRONCO: SABER COLETIVO',
    status: 'VALIDADO',
    biome: 'Cerrado',
    summary: 'Organização de canteiros, coleta coletiva e armazenamento sustentável de espécies nativas de reflorestamento, mantendo a biodiversidade do solo de savana.',
    community: {
      name: 'Rede de Sementes do Cerrado',
      description: 'Rede solidária de coletores e guardiões.'
    },
    territory: 'Brasília, DF',
    coordinates: '15.7801° S, 47.9292° W',
    hash: '0x8d4d3bced7ae8e1463d33',
    createdAt: '01 Novembro, 2023',
    validation: {
      validatorName: 'Conselho Técnico e Comunitário RSC',
      validatorId: '0x12ff...99a1',
      date: '05 Novembro, 2023',
      reason: 'Aprovado em plenária de guardiões de sementes.',
      blockHeight: '18,485,111'
    },
    relations: []
  },
  {
    id: 'saber-curas-amazonia',
    title: 'Manejo do Óleo de Copaíba na Floresta Circular',
    type: 'SABER TRADICIONAL',
    status: 'VALIDADO',
    biome: 'Amazônia',
    summary: 'Manejo tradicional e furos rituais de extração do óleo-resina em copaibeiras centenárias. O bocal de cera de abelha silvestre é usado depois para tapar o canal, estimulando a autodefesa ecológica da árvore.',
    community: {
      name: 'Etnias do Xingu',
      description: 'Linhagens ancestrais de medicina florestal do médio Xingu.'
    },
    territory: 'Altamira, PA',
    coordinates: '3.2031° S, 52.2044° W',
    hash: '0xabc1237890def456',
    createdAt: '12 Fevereiro, 2024',
    validation: {
      validatorName: 'Conselho de Anciãos do Xingu',
      validatorId: '0x99ff...bb22',
      date: '15 Fevereiro, 2024',
      reason: 'Saber de vital importância frente às pressões madeireiras.',
      blockHeight: '19,102,544'
    },
    relations: []
  }
];
