import { Language } from "./types";

export const TRANSLATIONS = {
  en: {
    app: {
      title: "Contract Risk Analysis",
      subtitle: "Reimagined",
      description: "LexGuard uses advanced AI to stress-test your contracts. We identify hidden risks, abusive clauses, and missing protections based on **who you represent**.",
      riskCard: "Risk Detection",
      riskDesc: "Finds liabilities and traps before you sign.",
      gapCard: "Clause Gap Analysis",
      gapDesc: "Points out what is missing to protect you.",
      planCard: "Negotiation Plan",
      planDesc: "Actionable advice to improve your position.",
      startBtn: "Start Analysis",
      contextTitle: "Analysis Context",
      contextDesc: "To provide a realistic and critical analysis, LexGuard needs to understand your position.",
      continueBtn: "Continue to Contract Upload",
      uploadTitle: "Upload Contract",
      uploadDesc: "Paste the contract text below or upload a PDF/text file.",
      dragDrop: "Drag & Drop PDF or text file here",
      orPaste: "or paste text directly",
      backBtn: "Back to Context",
      analyzeBtn: "Start Analysis",
      analyzingTitle: "Analyzing Contract...",
      analyzingDesc: "Our AI is currently reading the document, cross-referencing with your interests, and identifying potential risks. This may take up to a minute.",
      reportTitle: "Analysis Report",
      printBtn: "Print Report",
      newAnalysisBtn: "New Analysis",
      disclaimer: "Disclaimer: LexGuard AI is an automated tool and does not constitute professional legal advice. Always consult with a qualified attorney before signing binding agreements.",
      ddLabel: "9. Include Background Check / Due Diligence?",
      ddDesc: "LexGuard will suggest specific checks on the counterparty using public data sources.",
      supportedFiles: "Supported: .pdf, .txt, .md",
      navContext: "Context",
      navContract: "Contract",
      navReport: "Report"
    },
    systemInstruction: `
You are an experienced contract, commercial, and consumer law attorney.
Your role is to analyze and stress-test any type of contract from the perspective specified by the user.

Your priority is to deliver a realistic, critical, and risk-oriented analysis.
You must not try to “please” the user with optimistic views; you must show the situation as it really is, even if the conclusions are uncomfortable.
IMPORTANT: Respond entirely in ENGLISH.

Analysis framework – structure your answer like this:

A. Context summary
B. Contract overview
C. Obligations and performance
D. Financial terms and risk allocation
E. Term, renewal, termination, and exit
F. Liability, penalties, and indemnities
G. Guarantees, securities, and personal exposure
H. Intellectual property, confidentiality, and data protection
I. Dispute resolution, governing law, and forum
J. Background check & due diligence on the counterparty (If requested)
K. Missing protections & suggested clauses
L. Worst-case scenarios (stress test)
M. Practical guidance, negotiation points, and checklist

Style and tone:
- Be direct, honest, and realistic.
- Avoid vague reassurances.
- Use Markdown headings, bullet points, and tables.
`,
    questions: [
      {
        id: 'purpose',
        label: '1. Purpose of the analysis',
        placeholder: 'e.g., decide whether to sign, renegotiate, terminate, sue...',
        help: 'What is the main objective of this analysis?'
      },
      {
        id: 'representation',
        label: '2. Who do you represent?',
        placeholder: 'e.g., buyer, seller, employee, tenant, investor...',
        help: 'In favor of whom should the contract be analyzed?'
      },
      {
        id: 'jurisdiction',
        label: '3. Governing law and jurisdiction',
        placeholder: 'e.g., New York (USA), London (UK), Brazil...',
        help: 'Which country/state governs this contract?'
      },
      {
        id: 'contractType',
        label: '4. Type of contract',
        placeholder: 'e.g., SaaS, NDA, Employment, Lease...',
        help: 'What specific type of agreement is this?'
      },
      {
        id: 'stage',
        label: '5. Stage of the relationship',
        placeholder: 'e.g., Draft under negotiation, Signed and in force...',
        help: 'Is this a new draft or an existing dispute?'
      },
      {
        id: 'counterparty',
        label: '6. Counterparty profile',
        placeholder: 'e.g., Large corporation, startup, individual...',
        help: 'Who is the other party? Do you know anything about them?'
      },
      {
        id: 'riskTolerance',
        label: '7. Risk tolerance & Priorities',
        placeholder: 'e.g., Maximum protection, IP ownership is key...',
        help: 'Are you looking for a balanced view or maximum security?'
      },
      {
        id: 'timeHorizon',
        label: '8. Time horizon & Economic relevance',
        placeholder: 'e.g., 2 years, High financial impact...',
        help: 'How long does it last and how much money is at stake?'
      },
      {
        id: 'additionalInfo',
        label: '10. Anything else important',
        placeholder: 'e.g., Worried about the non-compete clause...',
        help: 'Specific clauses or scenarios that worry you.'
      }
    ]
  },
  pt: {
    app: {
      title: "Análise de Risco Contratual",
      subtitle: "Reimaginada",
      description: "A LexGuard usa IA avançada para testar a robustez dos seus contratos. Identificamos riscos ocultos, cláusulas abusivas e proteções ausentes com base em **quem você representa**.",
      riskCard: "Detecção de Riscos",
      riskDesc: "Encontra responsabilidades e armadilhas antes de você assinar.",
      gapCard: "Lacunas Contratuais",
      gapDesc: "Aponta o que está faltando para proteger você.",
      planCard: "Plano de Negociação",
      planDesc: "Conselhos práticos para melhorar sua posição.",
      startBtn: "Iniciar Análise",
      contextTitle: "Contexto da Análise",
      contextDesc: "Para fornecer uma análise realista e crítica, a LexGuard precisa entender sua posição.",
      continueBtn: "Continuar para Upload",
      uploadTitle: "Upload do Contrato",
      uploadDesc: "Cole o texto do contrato abaixo ou envie um arquivo PDF ou texto.",
      dragDrop: "Arraste e solte PDF ou arquivo de texto aqui",
      orPaste: "ou cole o texto diretamente",
      backBtn: "Voltar ao Contexto",
      analyzeBtn: "Iniciar Análise",
      analyzingTitle: "Analisando Contrato...",
      analyzingDesc: "Nossa IA está lendo o documento, cruzando informações com seus interesses e identificando riscos potenciais. Isso pode levar até um minuto.",
      reportTitle: "Relatório de Análise",
      printBtn: "Imprimir Relatório",
      newAnalysisBtn: "Nova Análise",
      disclaimer: "Aviso Legal: A LexGuard AI é uma ferramenta automatizada e não constitui aconselhamento jurídico profissional. Sempre consulte um advogado qualificado antes de assinar acordos vinculativos.",
      ddLabel: "9. Incluir Background Check / Due Diligence?",
      ddDesc: "A LexGuard sugerirá verificações específicas sobre a contraparte usando fontes públicas.",
      supportedFiles: "Suportado: .pdf, .txt, .md",
      navContext: "Contexto",
      navContract: "Contrato",
      navReport: "Relatório"
    },
    systemInstruction: `
Você é um advogado experiente em direito contratual, comercial e do consumidor.
Seu papel é analisar e testar a robustez (stress-test) de qualquer tipo de contrato sob a perspectiva especificada pelo usuário.

Sua prioridade é entregar uma análise realista, crítica e orientada a riscos.
Você não deve tentar "agradar" o usuário com visões otimistas; você deve mostrar a situação como ela realmente é, mesmo que as conclusões sejam desconfortáveis.
IMPORTANTE: Responda inteiramente em PORTUGUÊS (Brasil).

Estrutura da análise – organize sua resposta assim:

A. Resumo do contexto
B. Visão geral do contrato
C. Obrigações e desempenho
D. Termos financeiros e alocação de risco
E. Prazo, renovação, rescisão e saída
F. Responsabilidade, penalidades e indenizações
G. Garantias e exposição pessoal
H. Propriedade intelectual, confidencialidade e proteção de dados
I. Resolução de disputas, lei aplicável e foro
J. Verificação de antecedentes e Due Diligence da contraparte (Se solicitado)
K. Proteções ausentes e cláusulas sugeridas
L. Cenários de pior caso (stress test)
M. Orientação prática, pontos de negociação e checklist

Estilo e tom:
- Seja direto, honesto e realista.
- Evite garantias vagas.
- Use cabeçalhos Markdown, listas e tabelas.
`,
    questions: [
      {
        id: 'purpose',
        label: '1. Objetivo da análise',
        placeholder: 'ex: decidir se assino, renegociar, rescindir, processar...',
        help: 'Qual é o objetivo principal desta análise?'
      },
      {
        id: 'representation',
        label: '2. Quem você representa?',
        placeholder: 'ex: comprador, vendedor, funcionário, inquilino, investidor...',
        help: 'A favor de quem o contrato deve ser analisado?'
      },
      {
        id: 'jurisdiction',
        label: '3. Lei aplicável e jurisdição',
        placeholder: 'ex: Brasil (SP), Nova York (EUA), Londres...',
        help: 'Qual país/estado rege este contrato?'
      },
      {
        id: 'contractType',
        label: '4. Tipo de contrato',
        placeholder: 'ex: SaaS, NDA, Trabalho, Locação, Prestação de Serviços...',
        help: 'Qual é o tipo específico deste acordo?'
      },
      {
        id: 'stage',
        label: '5. Estágio do relacionamento',
        placeholder: 'ex: Minuta em negociação, Assinado e vigente...',
        help: 'É uma nova minuta ou uma disputa existente?'
      },
      {
        id: 'counterparty',
        label: '6. Perfil da contraparte',
        placeholder: 'ex: Grande empresa, startup, pessoa física...',
        help: 'Quem é a outra parte? Você sabe algo sobre eles?'
      },
      {
        id: 'riskTolerance',
        label: '7. Tolerância ao risco e Prioridades',
        placeholder: 'ex: Proteção máxima, Propriedade Intelectual é chave...',
        help: 'Você busca uma visão equilibrada ou segurança máxima?'
      },
      {
        id: 'timeHorizon',
        label: '8. Horizonte temporal e Relevância econômica',
        placeholder: 'ex: 2 anos, Alto impacto financeiro...',
        help: 'Qual a duração e quanto dinheiro está em jogo?'
      },
      {
        id: 'additionalInfo',
        label: '10. Outras informações importantes',
        placeholder: 'ex: Preocupado com a cláusula de não concorrência...',
        help: 'Cláusulas ou cenários específicos que te preocupam.'
      }
    ]
  }
};

export const getQuestions = (lang: Language) => TRANSLATIONS[lang].questions;
export const getSystemInstruction = (lang: Language) => TRANSLATIONS[lang].systemInstruction;