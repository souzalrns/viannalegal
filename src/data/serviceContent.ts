export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDocument {
  item: string;
  note?: string;
}

export interface TimelineStage {
  stage: string;
  duration: string;
}

export interface ServiceContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumbLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDuration: string;
  heroDurationNote?: string;
  intro: string[];
  whoQualifiesIntro: string;
  whoQualifies: string[];
  documentsNeeded: ServiceDocument[];
  timeline: TimelineStage[];
  commonMistakes: string[];
  faqs: ServiceFaq[];
  relatedServices: string[];
}

export const servicesContent: Record<string, ServiceContent> = {
  netos: {
    slug: 'netos',
    metaTitle: 'Cidadania Portuguesa para Netos | Requisitos e Prazos 2026 | ViannaLegal',
    metaDescription:
      'Guia completo sobre cidadania portuguesa para netos de português: requisitos de vínculo efetivo, documentos, prazos actualizados (41 a 46 meses para maiores) e como evitar os erros mais comuns.',
    breadcrumbLabel: 'Cidadania para Netos',
    heroTitle: 'Cidadania Portuguesa para Netos',
    heroSubtitle:
      'Você é neto de um português ou portuguesa e quer entender se tem direito à cidadania europeia? Veja os requisitos reais, o que muda com a Lei Orgânica 1/2026 e quanto tempo leva.',
    heroDuration: '41 a 46 meses*',
    heroDurationNote: '* Estimativa baseada em dados das conservatórias (abr/mai 2026), ±5%. Pode variar.',
    intro: [
      'Ter um avô ou avó nascido em Portugal é, hoje, um dos caminhos mais buscados por brasileiros para conquistar a cidadania europeia. A boa notícia é que esse direito existe e é amplamente reconhecido pela lei portuguesa. A má notícia é que, diferente do processo para filhos, o caminho dos netos não é automático: a lei exige a comprovação de um "vínculo efetivo com a comunidade nacional portuguesa" — um critério que gera dúvida em quase todo processo que chega até nós.',
      'Esse requisito existe desde a reforma da Lei da Nacionalidade de 2020 e continua valendo com a Lei Orgânica n.º 1/2026 (em vigor desde 18 de maio de 2026), que reforçou o rigor na análise documental sem eliminar a via de netos. Na prática, isso significa que ser neto de português, por si só, não basta: é preciso reunir provas concretas de que você mantém uma ligação real com Portugal e a cultura portuguesa.',
      'Apesar dessa exigência, a maioria dos casos que analisamos tem, sim, condições de seguir adiante — o problema raramente é a falta de direito, e quase sempre é a falta de organização das provas certas, no formato certo, desde o início.',
    ],
    whoQualifiesIntro:
      'Você provavelmente tem direito à cidadania portuguesa como neto se puder demonstrar:',
    whoQualifies: [
      'Filiação comprovada: seu pai ou sua mãe é filho(a) de um avô ou avó nascido em Portugal (ou que tenha adquirido a nacionalidade portuguesa antes do seu nascimento).',
      'Certidões em ordem: existência de certidões de nascimento, casamento e, quando aplicável, óbito, que estabeleçam a cadeia completa avô → pai/mãe → você.',
      'Vínculo efetivo demonstrável: conhecimento básico do idioma português (o que normalmente já é atendido por brasileiros nativos), histórico de visitas a Portugal, participação em associações ou comunidades lusófonas, ou outros laços culturais e familiares documentáveis.',
      'Ausência de condenação penal grave que, segundo a lei portuguesa, impeça a aquisição da nacionalidade.',
    ],
    documentsNeeded: [
      { item: 'Certidão de nascimento do avô/avó português(a)', note: 'Em inteiro teor, emitida pela conservatória portuguesa de origem.' },
      { item: 'Certidão de nascimento e casamento do pai/mãe', note: 'Atualizadas e, se brasileiras, apostiladas com Apostila de Haia.' },
      { item: 'Sua certidão de nascimento', note: 'Apostilada, com no máximo 12 meses de emissão na maioria dos casos.' },
      { item: 'Documento de identificação válido', note: 'RG ou passaporte.' },
      { item: 'Provas de vínculo efetivo', note: 'Passaportes com selos de entrada em Portugal, certificados de idioma, comprovantes de participação em associações lusófonas, entre outros.' },
      { item: 'Procuração para a equipe jurídica', note: 'Modelo fornecido por nós, reconhecida em cartório.' },
    ],
    timeline: [
      { stage: 'Análise gratuita e montagem da estratégia de vínculo efetivo', duration: '15-30 dias' },
      { stage: 'Localização e regularização de certidões', duration: '1-4 meses (varia conforme arquivo)' },
      { stage: 'Montagem e distribuição do processo na conservatória', duration: '30-60 dias' },
      { stage: 'Análise pelo IRN (Instituto dos Registos e do Notariado)', duration: '41 a 46 meses (maiores) / 2 a 4 meses (menores)' },
      { stage: 'Registro da nacionalidade e emissão do cartão de cidadão/passaporte', duration: '2-4 meses' },
    ],
    commonMistakes: [
      'Reunir provas de vínculo efetivo genéricas ou sem data, que não conseguem ser verificadas pela conservatória.',
      'Dar entrada no processo com certidões desatualizadas ou sem apostilamento correto, gerando diligência e meses de atraso.',
      'Subestimar o tempo de localização de registros antigos (pré-1911), que muitas vezes exige pesquisa em arquivos paroquiais.',
      'Não considerar que o processo é avaliado caso a caso — o que foi aceito como vínculo efetivo para um parente pode não bastar para outro, dependendo da conservatória.',
    ],
    faqs: [
      {
        question: 'Meu avô nunca registrou nada em Portugal depois que emigrou. Ainda tenho direito?',
        answer:
          'Sim, na maioria dos casos. O que importa é a certidão de nascimento do seu avô em Portugal, não um registro posterior. Fazemos a localização desse registro diretamente nos arquivos portugueses quando a família não tem o documento original.',
      },
      {
        question: 'Quanto conhecimento de português eu preciso comprovar?',
        answer:
          'Para brasileiros, o idioma raramente é um obstáculo, já que o português é a língua nativa. O ponto de atenção está nos outros elementos do vínculo efetivo — viagens, laços culturais e familiares — que costumam pesar mais na análise.',
      },
      {
        question: 'Posso iniciar o processo mesmo sem nunca ter visitado Portugal?',
        answer:
          'Sim, é possível, mas a ausência de visitas exige reforçar outros elementos de vínculo efetivo (participação em comunidades, certificados de idioma, manutenção de laços familiares). Avaliamos gratuitamente quais provas fazem sentido reunir no seu caso específico antes de dar entrada no processo.',
      },
    ],
    relatedServices: ['filhos-menores', 'transcricao-casamento'],
  },

  'filhos-menores': {
    slug: 'filhos-menores',
    metaTitle: 'Cidadania Portuguesa para Filhos Menores | Processo Simplificado | ViannaLegal',
    metaDescription:
      'Filhos menores de cidadãos portugueses têm direito automático à cidadania. Veja documentos, prazos (2 a 4 meses) e como dar entrada no processo simplificado.',
    breadcrumbLabel: 'Cidadania para Filhos Menores',
    heroTitle: 'Cidadania Portuguesa para Filhos Menores',
    heroSubtitle:
      'Se um dos pais é cidadão português, o filho menor de idade tem direito automático à nacionalidade — sem exigência de vínculo efetivo. É o processo mais rápido entre todos os caminhos de descendência.',
    heroDuration: '2 a 4 meses',
    intro: [
      'Entre todos os processos de cidadania por descendência, o de filhos menores é o mais direto. A lei portuguesa reconhece que quem nasce filho de português é português desde o nascimento — não é necessário provar vínculo cultural ou afetivo com Portugal, como ocorre no caso dos netos.',
      'Isso significa que, sendo confirmada a filiação com as certidões corretas, o processo costuma seguir um trâmite relativamente previsível, com foco em garantir que toda a documentação esteja completa e correta desde a primeira submissão.',
      'O ponto de atenção mais comum nesse tipo de processo não é o direito em si — que já está garantido por lei — e sim detalhes formais: tradução, apostilamento e prazo de validade das certidões brasileiras.',
    ],
    whoQualifiesIntro: 'O filho menor de idade tem direito à cidadania portuguesa quando:',
    whoQualifies: [
      'Um dos pais é cidadão português, seja por nascimento, naturalização ou outro processo de aquisição já concluído.',
      'A filiação está devidamente registrada em certidão de nascimento.',
      'O menor está representado legalmente pelos pais ou responsável legal no processo (procuração específica).',
    ],
    documentsNeeded: [
      { item: 'Certidão de nascimento do menor', note: 'Em inteiro teor, apostilada e com tradução juramentada se necessário.' },
      { item: 'Certidão de nacionalidade portuguesa do pai/mãe português(a)', note: 'Ou documento equivalente que comprove a cidadania já adquirida.' },
      { item: 'Documento de identidade dos pais', note: 'RG, passaporte ou cartão de cidadão.' },
      { item: 'Certidão de casamento dos pais', note: 'Quando aplicável.' },
      { item: 'Procuração assinada pelos responsáveis legais', note: 'Reconhecida em cartório.' },
    ],
    timeline: [
      { stage: 'Análise gratuita e checklist de documentos', duration: '7-15 dias' },
      { stage: 'Regularização e apostilamento de certidões', duration: '30-60 dias' },
      { stage: 'Distribuição do processo na conservatória competente', duration: '15-30 dias' },
      { stage: 'Análise e registo pelo IRN', duration: '2 a 4 meses' },
    ],
    commonMistakes: [
      'Submeter certidão de nascimento sem o nome do pai/mãe português atualizado corretamente (erros de grafia geram diligência).',
      'Esquecer de apostilar documentos emitidos no Brasil antes do envio.',
      'Não regularizar previamente o nome do progenitor português caso ele tenha alterado o nome após casamento ou outro processo civil.',
    ],
    faqs: [
      {
        question: 'Meu filho nasceu no Brasil. Isso afeta o direito à cidadania portuguesa?',
        answer:
          'Não. O local de nascimento não importa para filhos de português — o direito é transmitido pela filiação, independentemente de o filho ter nascido no Brasil, em Portugal ou em qualquer outro país.',
      },
      {
        question: 'Os dois pais precisam ser portugueses?',
        answer:
          'Não, basta que um dos pais seja cidadão português no momento do nascimento do filho ou que tenha adquirido a nacionalidade depois, desde que a filiação esteja comprovada.',
      },
      {
        question: 'O processo muda se o filho completar 18 anos durante a tramitação?',
        answer:
          'O processo segue as regras vigentes na data de entrada do pedido. Recomendamos iniciar o quanto antes para garantir as condições do processo simplificado de menor de idade.',
      },
    ],
    relatedServices: ['filhos-maiores', 'netos'],
  },

  'filhos-maiores': {
    slug: 'filhos-maiores',
    metaTitle: 'Cidadania Portuguesa para Filhos Maiores de Idade | Prazos e Requisitos | ViannaLegal',
    metaDescription:
      'Filhos maiores de cidadãos portugueses também têm direito à cidadania, com processo próprio. Veja prazos (50 a 56 meses por inscrição / 2 a 3 meses por transcrição), documentos e diferenças em relação ao processo de menores.',
    breadcrumbLabel: 'Cidadania para Filhos Maiores',
    heroTitle: 'Cidadania Portuguesa para Filhos Maiores de Idade',
    heroSubtitle:
      'Já é adulto e um dos seus pais é português? O direito à cidadania continua válido — o processo apenas segue um trâmite próprio, um pouco mais longo que o de menores de idade.',
    heroDuration: '50 a 56 meses',
    intro: [
      'Muita gente acredita, erroneamente, que o direito à cidadania portuguesa por filiação só vale enquanto o filho é menor de idade. Não é verdade: filhos maiores de cidadãos portugueses mantêm o mesmo direito à nacionalidade, sem exigência de vínculo efetivo (esse critério é exclusivo para netos).',
      'A diferença prática está no trâmite: o processo de filhos maiores corre fora do regime simplificado de menores e, por isso, tende a levar um pouco mais de tempo na fila de análise da conservatória ou consulado.',
      'É um processo bastante comum entre brasileiros adultos que descobrem, ao organizar a documentação da família, que um dos pais nunca havia formalizado a própria cidadania portuguesa — ou que formalizou, mas o filho nunca deu entrada no próprio pedido.',
    ],
    whoQualifiesIntro: 'O filho maior de idade tem direito à cidadania portuguesa quando:',
    whoQualifies: [
      'Um dos pais é (ou foi, antes de eventual falecimento) cidadão português, com a nacionalidade comprovada por documento próprio.',
      'A filiação está corretamente registrada em certidão de nascimento, sem divergências de nome ou data.',
      'Não há impedimento legal por condenação penal grave conforme a legislação portuguesa.',
    ],
    documentsNeeded: [
      { item: 'Certidão de nascimento em inteiro teor', note: 'Apostilada, mostrando a filiação com o pai/mãe português.' },
      { item: 'Certidão de nacionalidade portuguesa do progenitor', note: 'Ou certidão de nascimento portuguesa do pai/mãe, conforme o caso.' },
      { item: 'Documento de identificação válido', note: 'RG ou passaporte.' },
      { item: 'Certidão de casamento dos pais', note: 'Quando aplicável à linha de filiação.' },
      { item: 'Procuração para a equipe jurídica', note: 'Reconhecida em cartório.' },
    ],
    timeline: [
      { stage: 'Análise gratuita e checklist de documentos', duration: '7-15 dias' },
      { stage: 'Regularização e apostilamento de certidões', duration: '30-60 dias' },
      { stage: 'Distribuição do processo na conservatória ou consulado', duration: '15-30 dias' },
      { stage: 'Análise e registo pelo IRN', duration: '50 a 56 meses' },
    ],
    commonMistakes: [
      'Assumir que, por ser maior de idade, o filho perdeu o direito — gerando anos de atraso em iniciar um processo que já era válido.',
      'Não atualizar a certidão de nascimento quando há divergência de nome entre a certidão brasileira e o documento português do progenitor.',
      'Deixar para reunir documentação do pai/mãe português apenas no momento de dar entrada, sem antecipar eventuais inconsistências.',
    ],
    faqs: [
      {
        question: 'Tenho 40 anos e meu pai nunca formalizou a cidadania dele. Ainda dá tempo?',
        answer:
          'Sim. Se seu pai já é (ou tem direito a ser) cidadão português, você mantém o direito independentemente da sua idade atual. O primeiro passo costuma ser regularizar a documentação do progenitor, quando ainda não formalizada.',
      },
      {
        question: 'O processo de filho maior é mais caro que o de menor de idade?',
        answer:
          'O custo varia conforme a complexidade documental de cada família, não pela idade do requerente. Fazemos uma análise gratuita para apresentar um orçamento específico para o seu caso.',
      },
      {
        question: 'Posso incluir meus próprios filhos no mesmo processo?',
        answer:
          'Não no mesmo pedido, mas uma vez reconhecida sua cidadania portuguesa, seus filhos (netos do cidadão português original) passam a ter direito próprio, seguindo as regras aplicáveis a cada geração.',
      },
    ],
    relatedServices: ['filhos-menores', 'netos'],
  },

  conjuges: {
    slug: 'conjuges',
    metaTitle: 'Cidadania Portuguesa por Casamento | Requisitos e Prazos 2026 | ViannaLegal',
    metaDescription:
      'Casado ou em união estável com um(a) português(a)? Veja os requisitos para cidadania portuguesa por casamento, prazos (50 a 54 meses) e o papel da transcrição de casamento.',
    breadcrumbLabel: 'Cidadania por Casamento',
    heroTitle: 'Cidadania Portuguesa por Casamento ou União Estável',
    heroSubtitle:
      'Estar casado(a) com um cidadão português ou portuguesa há mais de 3 anos abre caminho para a nacionalidade. Entenda os requisitos e os documentos que realmente fazem diferença na análise.',
    heroDuration: '50 a 54 meses',
    intro: [
      'A cidadania por casamento ou união estável é um dos caminhos previstos na Lei da Nacionalidade para quem construiu vida conjugal com um cidadão português. Diferente do processo por descendência, aqui o vínculo que precisa ser comprovado é a relação em si — sua duração, estabilidade e o fato de o casamento ser civilmente reconhecido tanto no Brasil quanto, depois da transcrição, em Portugal.',
      'É comum que esse processo seja confundido com a transcrição de casamento, mas são etapas diferentes: a transcrição registra o casamento brasileiro nos livros civis portugueses e costuma ser pré-requisito; a cidadania por casamento, em si, é o pedido de nacionalidade baseado nesse vínculo já formalizado.',
      'O requisito de tempo mínimo de casamento (3 anos) é um dos pontos mais perguntados — e um dos mais simples de confirmar antes mesmo de iniciar qualquer documentação.',
    ],
    whoQualifiesIntro: 'Você pode solicitar cidadania portuguesa por casamento se:',
    whoQualifies: [
      'É casado(a) civilmente ou possui união de facto reconhecida judicialmente com cidadão português há, no mínimo, 3 anos.',
      'O casamento ou união está (ou será) registrado junto à conservatória portuguesa, via transcrição.',
      'Mantém o vínculo matrimonial durante toda a tramitação do processo — separação ou divórcio durante o processo pode interromper o pedido.',
      'Não há impedimento por condenação penal grave conforme legislação portuguesa.',
    ],
    documentsNeeded: [
      { item: 'Certidão de casamento', note: 'Em inteiro teor, apostilada, com tradução se necessário.' },
      { item: 'Certidão de nacionalidade portuguesa do cônjuge', note: 'Ou documento equivalente comprovando a cidadania.' },
      { item: 'Comprovação de tempo de relação', note: 'Documentos que demonstrem a vida em comum quando aplicável à união de facto.' },
      { item: 'Documento de identidade de ambos os cônjuges', note: 'RG, passaporte ou cartão de cidadão.' },
      { item: 'Procuração para a equipe jurídica', note: 'Reconhecida em cartório por ambas as partes, quando aplicável.' },
    ],
    timeline: [
      { stage: 'Análise gratuita e verificação do tempo de casamento', duration: '15-30 dias' },
      { stage: 'Transcrição do casamento (se ainda não feita)', duration: '1-4 meses' },
      { stage: 'Montagem e distribuição do processo de cidadania', duration: '30-60 dias' },
      { stage: 'Análise pelo IRN', duration: '50 a 54 meses' },
    ],
    commonMistakes: [
      'Dar entrada no pedido de cidadania antes de concluir a transcrição do casamento, gerando indeferimento ou suspensão.',
      'Não reunir provas suficientes da união de facto em casos sem casamento civil formalizado.',
      'Desconsiderar que separações informais (sem divórcio formal) podem ser interpretadas como rompimento do vínculo durante a análise.',
    ],
    faqs: [
      {
        question: 'Casamento e união estável têm o mesmo tratamento legal para esse fim?',
        answer:
          'Ambos são reconhecidos pela lei, mas a união de facto exige reconhecimento judicial e provas mais robustas de convivência, já que não existe registro civil automático como no casamento.',
      },
      {
        question: 'Preciso fazer a transcrição de casamento mesmo morando no Brasil?',
        answer:
          'Sim, a transcrição é o que torna seu casamento "visível" para o sistema civil português e é normalmente pré-requisito para o pedido de cidadania. O processo é feito a distância, sem necessidade de viajar a Portugal.',
      },
      {
        question: 'E se eu me divorciar depois de já ter a cidadania portuguesa?',
        answer:
          'Uma vez concedida e registrada a nacionalidade, ela não é automaticamente revertida por divórcio posterior. O vínculo conjugal precisa estar mantido apenas durante a tramitação do próprio pedido.',
      },
    ],
    relatedServices: ['transcricao-casamento', 'residencia'],
  },

  residencia: {
    slug: 'residencia',
    metaTitle: 'Nacionalidade Portuguesa por Residência | Naturalização 2026 | ViannaLegal',
    metaDescription:
      'Quem reside legalmente em Portugal há 7 anos (CPLP) ou 10 anos pode solicitar a naturalização. Veja documentos, prazos de análise (27 a 30 meses) e como funciona o processo.',
    breadcrumbLabel: 'Nacionalidade por Residência',
    heroTitle: 'Nacionalidade Portuguesa por Residência (Naturalização)',
    heroSubtitle:
      'Reside legalmente em Portugal e quer formalizar a nacionalidade portuguesa? Entenda o caminho da naturalização, que segue regras diferentes dos processos por descendência.',
    heroDuration: '27 a 30 meses',
    intro: [
      'A naturalização é o caminho para quem construiu vida em Portugal através de residência legal, sem vínculo de descendência ou casamento com cidadão português. É um dos pontos que mais mudou com a Lei Orgânica n.º 1/2026 (em vigor desde 18 de maio de 2026): o prazo mínimo de residência legal exigido para brasileiros e demais cidadãos da CPLP subiu de 5 para 7 anos. Para nacionais de outros países, o prazo exigido é ainda maior.',
      'Antes da aprovação final, uma versão anterior do projeto havia sido parcialmente invalidada pelo Tribunal Constitucional (Acórdão n.º 1133/2025, dez/2025) — mas a decisão atingiu principalmente uma norma específica de proteção contra demora da administração pública, não o aumento do prazo de residência em si. O texto final, já em vigor, manteve o aumento para 7 anos.',
      'Quem já tinha processo formalmente pendente antes de 18 de maio de 2026 segue as regras anteriores (5 anos). Para quem ainda não protocolou, recomendamos confirmar com precisão em qual prazo seu caso se encaixa antes de organizar a documentação.',
    ],
    whoQualifiesIntro: 'Você pode solicitar naturalização por residência se:',
    whoQualifies: [
      'Reside legalmente em Portugal há, no mínimo, 7 anos (cidadãos da CPLP, incluindo brasileiros) ou pelo prazo aplicável a outras nacionalidades, com título de residência válido durante todo o período.',
      'Possui conhecimento suficiente da língua portuguesa (comprovado por certificado ou habilitações escolares em português; nacionais de países lusófonos têm presunção de cumprimento desse requisito).',
      'Não possui condenação penal que, segundo a lei portuguesa, impeça a naturalização.',
      'Mantém ligação efetiva com a comunidade portuguesa, seja por residência continuada, trabalho ou vida familiar em território nacional.',
    ],
    documentsNeeded: [
      { item: 'Título de residência válido em Portugal', note: 'Comprovando o prazo exigido — 7 anos para CPLP/brasileiros desde maio de 2026.' },
      { item: 'Certificado de registo criminal português e do país de origem', note: 'Emitidos dentro da validade exigida.' },
      { item: 'Certificado de conhecimento da língua portuguesa', note: 'CIPLE ou equivalente, salvo dispensa aplicável.' },
      { item: 'Certidão de nascimento', note: 'Apostilada e traduzida, se necessário.' },
      { item: 'Comprovativo de meios de subsistência', note: 'Conforme exigido pelo IRN.' },
    ],
    timeline: [
      { stage: 'Análise gratuita do tempo de residência e elegibilidade', duration: '15-30 dias' },
      { stage: 'Reunião e regularização de documentos e certificados', duration: '1-3 meses' },
      { stage: 'Submissão do processo ao IRN', duration: '30 dias' },
      { stage: 'Análise e decisão', duration: '12-24 meses' },
    ],
    commonMistakes: [
      'Submeter o pedido antes de completar o prazo de residência legal contínua exigido por lei (7 anos para CPLP desde maio de 2026, antes 5 anos).',
      'Não providenciar o certificado de língua portuguesa quando exigido, mesmo sendo falante nativo de português brasileiro.',
      'Deixar de renovar o título de residência durante o período de espera, criando uma lacuna que pode comprometer a contagem do tempo.',
    ],
    faqs: [
      {
        question: 'Brasileiro que já fala português precisa mesmo de certificado de idioma?',
        answer:
          'Nacionais de países de língua oficial portuguesa têm presunção de cumprimento do requisito de idioma, salvo se a falta de domínio for evidenciada de forma manifesta. Mesmo assim, avaliamos a documentação específica do seu caso na análise gratuita inicial.',
      },
      {
        question: 'O prazo de residência realmente subiu para 7 anos?',
        answer:
          'Sim, para brasileiros e demais cidadãos da CPLP, a Lei Orgânica 1/2026 (em vigor desde 18/5/2026) elevou o prazo de 5 para 7 anos. Quem já tinha processo formalmente pendente antes dessa data segue a regra anterior de 5 anos.',
      },
      {
        question: 'Posso solicitar a naturalização enquanto ainda tenho outro processo de cidadania em andamento (ex: por descendência)?',
        answer:
          'Avaliamos isso caso a caso, já que normalmente faz sentido seguir pelo caminho mais rápido e com maior chance de êxito, em vez de tramitar dois pedidos simultâneos.',
      },
    ],
    relatedServices: ['conjuges', 'transcricao-casamento'],
  },

  bisnetos: {
    slug: 'bisnetos',
    metaTitle: 'Cidadania Portuguesa para Bisnetos | Nova Via Direta 2026 | ViannaLegal',
    metaDescription:
      'Desde a Lei Orgânica 1/2026, bisnetos de portugueses têm via direta de atribuição da nacionalidade, sem depender de o neto naturalizar primeiro. Veja como funciona.',
    breadcrumbLabel: 'Cidadania para Bisnetos',
    heroTitle: 'Cidadania Portuguesa para Bisnetos',
    heroSubtitle:
      'Até maio de 2026, bisnetos de portugueses só conseguiam a cidadania de forma sequencial. A Lei Orgânica 1/2026 abriu uma via direta de atribuição — veja o que isso muda na prática.',
    heroDuration: 'A confirmar conforme regulamentação',
    intro: [
      'Esta é uma das mudanças mais relevantes — e menos divulgadas — da Lei Orgânica n.º 1/2026, em vigor desde 18 de maio de 2026: bisnetos de portugueses passaram a ter via própria de atribuição da nacionalidade, mediante prova de vínculo efetivo com a comunidade portuguesa. Antes dessa lei, o caminho era sequencial — o bisneto só conseguia a cidadania depois que o próprio neto (pai ou mãe do bisneto) já tivesse formalizado a nacionalidade portuguesa.',
      'Como a regulamentação prática dessa via ainda está em fase inicial de aplicação pelas conservatórias, os prazos e o nível exato de exigência documental para bisnetos podem ser ajustados nos próximos meses. Recomendamos uma análise atualizada do seu caso específico antes de presumir qualquer prazo.',
      'Na prática, isso abre uma porta para milhares de famílias brasileiras que, até então, ficavam de fora por não terem um neto com processo já concluído.',
    ],
    whoQualifiesIntro: 'Você pode ter direito à via direta de bisneto se:',
    whoQualifies: [
      'É descendente em linha reta de um bisavô ou bisavó nascido em Portugal (ou que tenha sido cidadão português originário).',
      'Consegue comprovar a cadeia completa de filiação: bisavô → avô/avó → pai/mãe → você, com certidões correspondentes.',
      'Demonstra vínculo efetivo com a comunidade portuguesa (critério equivalente ao exigido para netos, com prova de ligação genuína).',
      'Não possui impedimento por condenação penal grave conforme a legislação portuguesa.',
    ],
    documentsNeeded: [
      { item: 'Certidão de nascimento do bisavô/bisavó português(a)', note: 'Em inteiro teor, localizada na conservatória ou arquivo paroquial de origem.' },
      { item: 'Certidões de toda a cadeia de filiação', note: 'Avô/avó, pai/mãe e a sua própria, todas em inteiro teor.' },
      { item: 'Provas de vínculo efetivo', note: 'Mesmo padrão exigido para netos: idioma, visitas, laços culturais e familiares documentáveis.' },
      { item: 'Documento de identificação válido', note: 'RG ou passaporte.' },
      { item: 'Procuração para a equipe jurídica', note: 'Reconhecida em cartório.' },
    ],
    timeline: [
      { stage: 'Análise gratuita da cadeia de filiação e estratégia de vínculo efetivo', duration: '15-30 dias' },
      { stage: 'Localização de certidões do bisavô/avó (frequentemente pré-1911)', duration: '2-6 meses' },
      { stage: 'Montagem e distribuição do processo', duration: '30-60 dias' },
      { stage: 'Análise pelo IRN', duration: 'Prazo ainda em consolidação pelas conservatórias' },
    ],
    commonMistakes: [
      'Presumir que o prazo e a exigência documental serão idênticos ao processo de netos, sem confirmar a regulamentação mais recente.',
      'Não localizar a certidão do bisavô antes de iniciar, subestimando o tempo de pesquisa em registros anteriores a 1911.',
      'Deixar de reunir provas de vínculo efetivo robustas, já que o critério para bisnetos tende a ser avaliado com pelo menos o mesmo rigor que para netos.',
    ],
    faqs: [
      {
        question: 'Meu neto (meu pai) nunca formalizou a cidadania. Eu ainda preciso esperar ele primeiro?',
        answer:
          'Não necessariamente mais. Com a via direta criada pela Lei Orgânica 1/2026, é possível, em tese, requerer diretamente como bisneto, sem depender da naturalização prévia do seu pai ou mãe. Avaliamos com você qual caminho é mais seguro e rápido no seu caso.',
      },
      {
        question: 'Essa via já está sendo aplicada na prática pelas conservatórias?',
        answer:
          'A lei está em vigor desde maio de 2026, mas a aplicação prática por parte das conservatórias ainda está em fase de consolidação. Fazemos o acompanhamento dessas atualizações e indicamos o momento e a forma mais segura de dar entrada no seu processo.',
      },
      {
        question: 'Trinetos (4ª geração) também têm direito?',
        answer:
          'Até o momento, a via direta criada pela nova lei é específica para bisnetos (3º grau na linha reta). Trinetos seguem dependendo da naturalização prévia de um ascendente mais próximo.',
      },
    ],
    relatedServices: ['netos', 'transcricao-casamento'],
  },

  'transcricao-casamento': {
    slug: 'transcricao-casamento',
    metaTitle: 'Transcrição de Casamento em Portugal | Prazos e Documentos | ViannaLegal',
    metaDescription:
      'Entenda quando a transcrição de casamento brasileiro é necessária em Portugal, os documentos exigidos e o prazo médio (1-4 meses) para conclusão.',
    breadcrumbLabel: 'Transcrição de Casamento',
    heroTitle: 'Transcrição de Casamento em Portugal',
    heroSubtitle:
      'Casou-se no Brasil e um dos cônjuges é (ou vai se tornar) português? A transcrição registra esse casamento nos livros civis portugueses — e costuma ser o passo mais rápido entre todos os nossos serviços.',
    heroDuration: '1-4 meses',
    intro: [
      'A transcrição de casamento é o procedimento que torna um casamento celebrado no Brasil "visível" para o sistema de registo civil português. Sem ela, o casamento existe legalmente no Brasil, mas não produz efeitos automáticos em Portugal — o que pode travar pedidos de cidadania por casamento, herança ou outros atos civis em território português.',
      'É, na prática, o processo mais objetivo entre os que conduzimos: depende quase exclusivamente da qualidade e atualidade das certidões apresentadas, sem os critérios subjetivos de vínculo efetivo que existem no processo de netos, por exemplo.',
      'Costuma ser o primeiro passo para quem pretende, depois, seguir com o pedido de cidadania por casamento, mas também é solicitado de forma independente por quem só precisa formalizar o casamento perante o sistema português.',
    ],
    whoQualifiesIntro: 'A transcrição de casamento é necessária ou recomendada quando:',
    whoQualifies: [
      'Um dos cônjuges é cidadão português, ou está em processo de se tornar.',
      'O casal pretende, no futuro, solicitar cidadania portuguesa por casamento.',
      'Há necessidade de uso do casamento para fins legais em Portugal (herança, registo de imóveis, atos notariais).',
    ],
    documentsNeeded: [
      { item: 'Certidão de casamento brasileira', note: 'Em inteiro teor, com no máximo 6-12 meses de emissão.' },
      { item: 'Apostila de Haia', note: 'Aplicada na certidão pelo cartório competente no Brasil.' },
      { item: 'Documentos de identidade de ambos os cônjuges', note: 'RG, passaporte ou cartão de cidadão.' },
      { item: 'Certidão de nascimento de ambos', note: 'Quando exigida pela conservatória responsável.' },
      { item: 'Procuração para a equipe jurídica', note: 'Reconhecida em cartório.' },
    ],
    timeline: [
      { stage: 'Análise gratuita e checklist de documentos', duration: '7-15 dias' },
      { stage: 'Apostilamento e regularização da certidão', duration: '15-30 dias' },
      { stage: 'Submissão à conservatória portuguesa', duration: '15-30 dias' },
      { stage: 'Confirmação do registro', duration: '30-60 dias' },
    ],
    commonMistakes: [
      'Apresentar certidão de casamento desatualizada ou sem apostilamento, gerando devolução do pedido.',
      'Não verificar divergências de nome entre a certidão de casamento e os documentos de identidade dos cônjuges.',
      'Achar que a transcrição já concede a cidadania — ela apenas registra o casamento; o pedido de nacionalidade é uma etapa separada.',
    ],
    faqs: [
      {
        question: 'A transcrição já me dá direito à cidadania portuguesa?',
        answer:
          'Não diretamente. A transcrição registra o casamento no sistema português; o pedido de cidadania por casamento é uma etapa separada, que normalmente parte da transcrição já concluída.',
      },
      {
        question: 'Quanto tempo demora, na prática?',
        answer:
          'Para casos com documentação completa e correta, costuma levar entre 1 e 4 meses. O maior fator de atraso é certidão desatualizada ou sem apostilamento.',
      },
      {
        question: 'Preciso viajar a Portugal para fazer a transcrição?',
        answer:
          'Não. O processo é feito a distância, com procuração para a nossa equipe jurídica, sem necessidade de deslocamento.',
      },
    ],
    relatedServices: ['conjuges', 'netos'],
  },
};

export const serviceSlugs = Object.keys(servicesContent);
