// Rich content data for product detail pages, keyed by product line + product type keyword
// This data is sourced from official LOF Professional product documentation

export interface ProductRichContent {
  subtitle: string;
  longDescription: string;
  keyIngredients: { name: string; benefit: string }[];
  howToUse: string[];
  tips?: string;
  benefits: string[];
  frequency?: string;
  sizes?: string;
}

type ProductMatcher = {
  match: (title: string, productType: string) => boolean;
  content: ProductRichContent;
};

const productContentMatchers: ProductMatcher[] = [
  // ─── NUTRITIVE LINE ───
  {
    match: (title) => /shampoo/i.test(title) && /nutritive/i.test(title),
    content: {
      subtitle: 'Shampoo Hidratante Uso Diário',
      longDescription:
        'O Shampoo Nutritive promove limpeza suave e hidratação diária, preparando os fios para receberem a nutrição completa da linha. Com ativos naturais que preservam a umidade natural do cabelo, é ideal para uso frequente sem ressecar. Fórmula vegana, sem parabenos e sem sulfatos agressivos.',
      keyIngredients: [
        { name: 'Óleo de Macadâmia', benefit: 'Nutrição profunda e brilho natural' },
        { name: 'Manteiga de Karité', benefit: 'Maciez e proteção dos fios' },
        { name: 'Pantenol (Pró-vitamina B5)', benefit: 'Fortalecimento e hidratação' },
      ],
      howToUse: [
        'Aplique nos cabelos molhados, massageando suavemente o couro cabeludo.',
        'Deixe a espuma agir por 1-2 minutos para potencializar os ativos.',
        'Enxágue bem e repita se necessário.',
        'Siga com o Condicionador Nutritive para melhores resultados.',
      ],
      benefits: [
        'Limpeza suave sem ressecar os fios',
        'Hidratação desde a lavagem',
        'Prepara os fios para a nutrição',
        'Fórmula vegana e livre de parabenos',
        'Ideal para uso diário',
      ],
      frequency: 'Uso diário',
      sizes: '300ml | 1L',
    },
  },
  {
    match: (title) => /condicionador/i.test(title) && /nutritive/i.test(title),
    content: {
      subtitle: 'Condicionador Nutritivo Uso Diário',
      longDescription:
        'O Condicionador Nutritive oferece nutrição intensa do meio às pontas, selando as cutículas e proporcionando maciez imediata. Formulado com óleos nobres vegetais que penetram na fibra capilar, devolvendo a vitalidade aos fios secos e danificados. Desembaraço instantâneo e brilho saudável.',
      keyIngredients: [
        { name: 'Óleo de Macadâmia', benefit: 'Nutrição profunda sem pesar' },
        { name: 'Manteiga de Karité', benefit: 'Selagem de cutículas e maciez' },
        { name: 'Complexo de aminoácidos', benefit: 'Fortalecimento da fibra capilar' },
      ],
      howToUse: [
        'Após o shampoo Nutritive, retire o excesso de água dos cabelos.',
        'Aplique o condicionador do meio para as pontas, massageando mecha a mecha.',
        'Deslize os dedos pelos fios até estarem desembaraçados.',
        'Deixe agir por 3 minutos e enxágue bem.',
      ],
      tips: 'Para potencializar a nutrição, adicione 3 a 5 gotas do Booster Nutritive ao condicionador antes de aplicar.',
      benefits: [
        'Nutrição intensa do meio às pontas',
        'Desembaraço instantâneo',
        'Selagem de cutículas para brilho',
        'Maciez e movimento naturais',
        'Fórmula sem parabenos',
      ],
      frequency: 'Uso diário',
      sizes: '250ml | 1L',
    },
  },
  {
    match: (title) => /booster/i.test(title) && /nutritive/i.test(title),
    content: {
      subtitle: 'Máscara Líquida Hidratante Semi di Lino',
      longDescription:
        'O Booster Nutritive é uma máscara líquida concentrada com Semi di Lino (semente de linhaça) que potencializa qualquer tratamento capilar. Pode ser usado puro ou adicionado ao condicionador ou máscara, transformando a rotina de cuidados. Sua fórmula líquida permite absorção rápida e profunda na fibra capilar.',
      keyIngredients: [
        { name: 'Óleo de Semente de Linhaça (Semi di Lino)', benefit: 'Hidratação profunda e brilho intenso' },
        { name: 'Acetato de Tocoferila (Vitamina E)', benefit: 'Antioxidante e proteção contra danos' },
        { name: 'Óleo de Semente de Uva', benefit: 'Leveza, nutrição e proteção térmica' },
      ],
      howToUse: [
        'Adicione 3 a 5 gotas do Booster ao condicionador ou máscara de sua preferência.',
        'Misture nas mãos e aplique do meio para as pontas.',
        'Deixe agir junto com o produto por 3 a 5 minutos.',
        'Enxágue normalmente. Pode também ser usado puro como leave-in leve.',
      ],
      tips: 'Pode ser misturado a qualquer linha LOF para um boost de nutrição. Também funciona como pré-tratamento antes de processos químicos.',
      benefits: [
        'Potencializa qualquer tratamento capilar',
        'Hidratação profunda com Semi di Lino',
        'Brilho intenso e duradouro',
        'Fórmula líquida de rápida absorção',
        'Versátil: use puro ou misturado',
        'Proteção antioxidante com Vitamina E',
      ],
      frequency: 'A cada lavagem ou conforme necessidade',
      sizes: '15ml (pocket) | 60ml',
    },
  },

  // ─── HYDRATE LINE ───
  {
    match: (title) => /shampoo/i.test(title) && /hydrate/i.test(title),
    content: {
      subtitle: 'Shampoo Hidratação Profunda',
      longDescription:
        'O Shampoo Hydrate promove limpeza eficiente com hidratação profunda desde a lavagem. Formulado com Complexo de Algas Marinhas e Aloe Vera, prepara os fios para receberem o tratamento completo da linha Hydrate, sem remover a umidade natural dos cabelos.',
      keyIngredients: [
        { name: 'Complexo de Algas Marinhas', benefit: 'Minerais essenciais para revitalização' },
        { name: 'Aloe Vera (Babosa)', benefit: 'Hidratação natural e ação calmante' },
        { name: 'Pantenol', benefit: 'Fortalecimento e retenção de umidade' },
      ],
      howToUse: [
        'Aplique nos cabelos molhados, massageando suavemente o couro cabeludo.',
        'Deixe agir por 1-2 minutos.',
        'Enxágue bem e siga com o Condicionador ou Máscara Hydrate.',
      ],
      benefits: [
        'Limpeza suave com hidratação',
        'Revitalização com minerais marinhos',
        'Prepara os fios para o tratamento',
        'Livre de parabenos',
      ],
      frequency: 'Uso diário',
      sizes: '300ml | 1L',
    },
  },
  {
    match: (title) => /condicionador/i.test(title) && /hydrate/i.test(title),
    content: {
      subtitle: 'Condicionador Hidratante Uso Diário',
      longDescription:
        'O Condicionador Hydrate é desembaraçante e facilita o cuidado diário dos cabelos, deixando-os leves e soltos. Elaborado com Complexo de Algas Marinhas e Aloe Vera (Babosa), Óleo de Monoi e Pantenol, promove ação revitalizante, nutritiva e protetora, reduz as pontas duplas e deixa os cabelos mais saudáveis, macios, sedosos e com brilho.',
      keyIngredients: [
        { name: 'Complexo de Algas Marinhas', benefit: 'Revitalização e minerais essenciais' },
        { name: 'Aloe Vera (Babosa)', benefit: 'Hidratação profunda e ação calmante' },
        { name: 'Óleo de Monoi', benefit: 'Nutrição, brilho e perfume tropical' },
        { name: 'Pantenol', benefit: 'Fortalecimento e proteção dos fios' },
      ],
      howToUse: [
        'Após o shampoo Hydrate, retire o excesso de água dos cabelos.',
        'Aplique o condicionador de mecha em mecha, do meio até as pontas.',
        'Massageie suavemente, deslizando os fios entre os dedos até desembaraçar.',
        'Deixe agir por 2 minutos e enxágue bem.',
      ],
      tips: 'Para melhores resultados ao desembaraçar os fios, utilize uma escova para desembaraçar com o condicionador aplicado.',
      benefits: [
        'Desembaraço instantâneo',
        'Reduz pontas duplas',
        'Cabelos leves, soltos e com brilho',
        'Ação revitalizante e protetora',
        'Livre de parabenos',
      ],
      frequency: 'Uso diário',
      sizes: '250ml | 1L',
    },
  },
  {
    match: (title) => /m[áa]scara/i.test(title) && /hydrate/i.test(title),
    content: {
      subtitle: 'Máscara de Hidratação Profunda',
      longDescription:
        'A Máscara Hydrate apresenta uma fórmula premium que combina ingredientes para potencializar as propriedades revitalizantes, hidratantes, calmantes e protetoras, prolongando o efeito da hidratação profunda. Com ação emoliente e desembaraçante, deixa os fios leves, soltos, macios, nutridos e facilita o cuidado dos cabelos. Ideal para todos os tipos de cabelo que precisam de hidratação intensa.',
      keyIngredients: [
        { name: 'Algas Marinhas', benefit: 'Revitalização com minerais essenciais do mar' },
        { name: 'Aloe Vera', benefit: 'Hidratação profunda e calmante' },
        { name: 'Bio-Restore®', benefit: 'Tecnologia de reparação exclusiva' },
        { name: 'Óleo de Coco', benefit: 'Nutrição intensa e proteção' },
        { name: 'Óleo de Monoi', benefit: 'Brilho e perfume tropical' },
        { name: 'Pantenol', benefit: 'Fortalecimento e elasticidade' },
      ],
      howToUse: [
        'Após o shampoo Hydrate, retire o excesso de água dos cabelos.',
        'Aplique a máscara de mecha em mecha, do meio até as pontas.',
        'Massageie suavemente os fios até desembaraçar.',
        'Deixe agir de 5 a 10 minutos para hidratação intensa.',
        'Enxágue bem. Finalize com o Condicionador Hydrate.',
      ],
      tips: 'Você pode alternar o uso semanal da Máscara Hydrate com a máscara líquida da linha Wavy para resultados variados.',
      benefits: [
        'Hidratação profunda e duradoura',
        'Fórmula premium com Bio-Restore®',
        'Reduz frizz e pontas duplas',
        'Brilho intenso e maciez extrema',
        'Fios leves e fáceis de pentear',
        'Livre de parabenos',
      ],
      frequency: 'Uso semanal (1-2x por semana)',
      sizes: '300g | 500g',
    },
  },

  // ─── REPAIR LINE ───
  {
    match: (title) => /shampoo/i.test(title) && /repair/i.test(title),
    content: {
      subtitle: 'Shampoo Fitoprotetor para Cabelos Danificados',
      longDescription:
        'O Shampoo Repair é um fitoprotetor especialmente desenvolvido para cabelos danificados por processos químicos, calor e agressões externas. Sua fórmula com ativos vegetais de alta concentração promove limpeza profunda enquanto inicia o processo de reconstrução da fibra capilar, preparando os fios para o tratamento completo da linha Repair.',
      keyIngredients: [
        { name: 'Proteínas vegetais', benefit: 'Reconstrução da fibra capilar' },
        { name: 'Aminoácidos de trigo', benefit: 'Fortalecimento e elasticidade' },
        { name: 'Complexo fitoprotetor', benefit: 'Proteção contra danos futuros' },
      ],
      howToUse: [
        'Aplique nos cabelos molhados, massageando suavemente o couro cabeludo.',
        'Deixe a espuma agir por 1-2 minutos para penetração dos ativos.',
        'Enxágue bem e repita se necessário.',
        'Siga com o Condicionador Repair para resultados completos.',
      ],
      benefits: [
        'Reconstrução da fibra capilar desde a lavagem',
        'Limpeza profunda sem agredir',
        'Proteção com ativos fitoprotetores',
        'Ideal para cabelos com química',
        'Fórmula vegana e sem parabenos',
      ],
      frequency: 'Uso diário ou em dias alternados',
      sizes: '300ml | 1L',
    },
  },
  {
    match: (title) => /condicionador/i.test(title) && /repair/i.test(title),
    content: {
      subtitle: 'Condicionador Fitoprotetor para Cabelos Danificados',
      longDescription:
        'O Condicionador Repair é um fitoprotetor que atua na reconstrução e proteção de cabelos danificados. Penetra na fibra capilar para restaurar a elasticidade, resistência e brilho perdidos. Sela as cutículas, formando uma barreira protetora contra agressões futuras.',
      keyIngredients: [
        { name: 'Proteínas vegetais hidrolisadas', benefit: 'Reconstrução profunda da fibra' },
        { name: 'Queratina vegetal', benefit: 'Restauração de elasticidade e força' },
        { name: 'Complexo de aminoácidos', benefit: 'Preenchimento de falhas na cutícula' },
      ],
      howToUse: [
        'Após o Shampoo Repair, retire o excesso de água.',
        'Aplique do meio para as pontas, massageando mecha a mecha.',
        'Desembarace suavemente com os dedos ou pente de dentes largos.',
        'Deixe agir por 3 minutos e enxágue bem.',
      ],
      tips: 'Adicione 3 a 5 gotas do Booster Repair ao condicionador para potencializar a reconstrução.',
      benefits: [
        'Reconstrução da fibra danificada',
        'Restauração de elasticidade e resistência',
        'Selagem de cutículas para brilho',
        'Prevenção contra quebra e pontas duplas',
        'Fórmula sem parabenos',
      ],
      frequency: 'Uso diário',
      sizes: '250ml | 1L',
    },
  },
  {
    match: (title) => /booster/i.test(title) && /repair/i.test(title),
    content: {
      subtitle: 'Máscara Líquida Repositora Lipídica',
      longDescription:
        'O Booster Repair é uma máscara líquida concentrada com ação repositora lipídica, desenvolvida para cabelos extremamente danificados e quebradiços. Sua fórmula potente repõe os lipídios perdidos, reconstruindo a fibra de dentro para fora. Pode ser usado puro ou adicionado ao condicionador para um tratamento intensivo.',
      keyIngredients: [
        { name: 'Complexo lipídico reconstituinte', benefit: 'Reposição de lipídios essenciais' },
        { name: 'Proteínas vegetais concentradas', benefit: 'Reconstrução intensiva da fibra' },
        { name: 'Silicones voláteis', benefit: 'Brilho sem acúmulo de resíduos' },
      ],
      howToUse: [
        'Adicione 3 a 5 gotas do Booster ao condicionador ou máscara Repair.',
        'Misture nas mãos e aplique do meio para as pontas.',
        'Deixe agir junto com o produto por 3 a 5 minutos.',
        'Enxágue normalmente. Pode ser usado puro como sérum reparador.',
      ],
      tips: 'Em cabelos muito danificados, use puro nas pontas como leave-in noturno para reconstrução intensa.',
      benefits: [
        'Reposição lipídica profunda',
        'Reconstrução intensiva da fibra capilar',
        'Trata cabelos extremamente danificados',
        'Versátil: puro ou misturado',
        'Resultados visíveis na 1ª aplicação',
        'Brilho sem pesar nos fios',
      ],
      frequency: 'A cada lavagem ou conforme necessidade',
      sizes: '15ml (pocket) | 60ml',
    },
  },

  // ─── SILVER LINE ───
  {
    match: (title) => /shampoo/i.test(title) && /silver/i.test(title),
    content: {
      subtitle: 'Shampoo Matizador para Loiros',
      longDescription:
        'O Shampoo Silver é um matizador profissional com alta concentração de pigmentos violeta que neutraliza tons amarelados e alaranjados em cabelos loiros, platinados e grisalhos. Ao mesmo tempo que matiza, hidrata profundamente os fios, evitando o ressecamento comum em produtos matizadores.',
      keyIngredients: [
        { name: 'Pigmentos violeta concentrados', benefit: 'Neutralização de tons amarelados' },
        { name: 'Complexo hidratante', benefit: 'Hidratação enquanto matiza' },
        { name: 'Proteínas vegetais', benefit: 'Fortalecimento dos fios loiros' },
      ],
      howToUse: [
        'Aplique nos cabelos molhados, massageando suavemente.',
        'Deixe agir por 2 a 3 minutos para matização uniforme.',
        'Para matização mais intensa, aumente o tempo de ação.',
        'Enxágue e siga com condicionador ou máscara Silver.',
      ],
      tips: 'Use 2 a 3 vezes por semana para manutenção da cor ideal. Em cabelos muito amarelados, deixe agir até 5 minutos.',
      benefits: [
        'Neutraliza tons amarelados e alaranjados',
        'Alta concentração de pigmentos',
        'Hidrata enquanto matiza',
        'Não resseca os fios',
        'Sem parabenos',
      ],
      frequency: 'Uso 2-3x por semana',
      sizes: '300ml | 1L',
    },
  },
  {
    match: (title) => /m[áa]scara/i.test(title) && /silver/i.test(title),
    content: {
      subtitle: 'Máscara Matizadora para Loiros',
      longDescription:
        'A Máscara Silver é um tratamento matizador intensivo com altíssima concentração de pigmentos que proporciona matização uniforme e duradoura. Sua fórmula em creme penetra profundamente nos fios, neutralizando tons indesejados enquanto hidrata e nutre intensamente.',
      keyIngredients: [
        { name: 'Pigmentos violeta ultra-concentrados', benefit: 'Matização intensa e uniforme' },
        { name: 'Óleo de Argan', benefit: 'Nutrição profunda e brilho prateado' },
        { name: 'Pantenol', benefit: 'Hidratação e fortalecimento' },
      ],
      howToUse: [
        'Após o Shampoo Silver, retire o excesso de água.',
        'Aplique a máscara do meio para as pontas.',
        'Deixe agir por 5 a 10 minutos, conforme a intensidade desejada.',
        'Enxágue bem.',
      ],
      benefits: [
        'Matização uniforme e duradoura',
        'Brilho prateado sem ressecar',
        'Hidratação profunda',
        'Mantém a cor sem escurecer',
      ],
      frequency: 'Uso 2-3x por semana',
      sizes: '300g | 500g',
    },
  },

  // ─── PURIFYING LINE ───
  {
    match: (title) => /shampoo/i.test(title) && /purifying/i.test(title),
    content: {
      subtitle: 'Shampoo Vegan de Limpeza Profunda',
      longDescription:
        'O Shampoo Purifying é 100% vegano e promove limpeza profunda sem ressecar, removendo acúmulo de produtos, impurezas e resíduos. Ideal para preparar os fios antes de tratamentos ou quando sentir os cabelos pesados. Fórmula sem sulfatos agressivos.',
      keyIngredients: [
        { name: 'Tensoativos vegetais', benefit: 'Limpeza profunda sem sulfatos' },
        { name: 'Extratos botânicos', benefit: 'Purificação suave e natural' },
        { name: 'Pantenol', benefit: 'Proteção contra ressecamento' },
      ],
      howToUse: [
        'Aplique nos cabelos molhados, massageando o couro cabeludo.',
        'Deixe agir por 2 minutos para limpeza profunda.',
        'Enxágue e siga com o Condicionador Purifying.',
      ],
      tips: 'Ideal para uso antes de tratamentos ou quando sentir acúmulo nos fios. Use 1-2x por semana.',
      benefits: [
        'Limpeza profunda sem ressecar',
        'Remove acúmulo de produtos',
        '100% vegano e cruelty-free',
        'Sem sulfatos agressivos',
        'Prepara os fios para tratamentos',
      ],
      frequency: 'Uso 1-2x por semana',
      sizes: '300ml | 1L',
    },
  },
  {
    match: (title) => /condicionador/i.test(title) && /purifying/i.test(title),
    content: {
      subtitle: 'Condicionador Vegan Purificante',
      longDescription:
        'O Condicionador Purifying complementa a limpeza profunda do shampoo, repondo a hidratação necessária e selando as cutículas. 100% vegano e cruelty-free, proporciona leveza e frescor aos fios sem pesar.',
      keyIngredients: [
        { name: 'Extratos botânicos purificantes', benefit: 'Equilíbrio do couro cabeludo' },
        { name: 'Pantenol', benefit: 'Hidratação e proteção' },
        { name: 'Aminoácidos vegetais', benefit: 'Fortalecimento e maciez' },
      ],
      howToUse: [
        'Após o Shampoo Purifying, retire o excesso de água.',
        'Aplique do meio para as pontas.',
        'Deixe agir por 2-3 minutos.',
        'Enxágue bem.',
      ],
      benefits: [
        'Repõe hidratação após limpeza profunda',
        'Leveza e frescor',
        '100% vegano e cruelty-free',
        'Sem parabenos',
      ],
      frequency: 'Junto com o Shampoo Purifying',
      sizes: '250ml | 1L',
    },
  },

  // ─── WAVY LINE ───
  {
    match: (title) => /shampoo/i.test(title) && /wavy/i.test(title),
    content: {
      subtitle: 'Shampoo para Cabelos Cacheados',
      longDescription:
        'O Shampoo Wavy foi desenvolvido especialmente para cabelos cacheados e ondulados. Limpa suavemente sem remover os óleos naturais que os cachos precisam para se manterem definidos e hidratados. Fórmula sem silicones pesados.',
      keyIngredients: [
        { name: 'Extratos botânicos', benefit: 'Limpeza suave para cachos' },
        { name: 'Complexo hidratante leve', benefit: 'Hidratação sem pesar' },
        { name: 'Anti-frizz natural', benefit: 'Controle de frizz desde a lavagem' },
      ],
      howToUse: [
        'Aplique nos cabelos molhados, massageando suavemente.',
        'Enxágue delicadamente, sem esfregar os fios.',
        'Siga com o Condicionador Wavy.',
      ],
      benefits: [
        'Limpeza suave para cachos',
        'Mantém a definição natural',
        'Sem silicones pesados',
        'Controle de frizz',
      ],
      frequency: 'Uso diário ou em dias alternados',
      sizes: '300ml',
    },
  },
  {
    match: (title) => /condicionador/i.test(title) && /wavy/i.test(title),
    content: {
      subtitle: 'Condicionador para Cachos Definidos',
      longDescription:
        'O Condicionador Wavy proporciona hidratação leve e definição para cabelos cacheados e ondulados. Desembaraça sem desfazer os cachos, controlando o frizz e mantendo a flexibilidade natural dos fios.',
      keyIngredients: [
        { name: 'Óleos leves vegetais', benefit: 'Nutrição sem peso para cachos' },
        { name: 'Agentes anti-frizz', benefit: 'Controle duradouro de frizz' },
        { name: 'Pantenol', benefit: 'Hidratação e fortalecimento' },
      ],
      howToUse: [
        'Após o Shampoo Wavy, aplique nos fios com os dedos.',
        'Não desembarace com pente — use apenas os dedos.',
        'Amasse os cachos de baixo para cima (scrunch).',
        'Enxágue suavemente.',
      ],
      tips: 'Para máxima definição, não desembarace com pente. Use apenas os dedos para distribuir o condicionador.',
      benefits: [
        'Definição de cachos sem crocância',
        'Controle de frizz duradouro',
        'Hidratação leve que não pesa',
        'Toque suave e flexível',
      ],
      frequency: 'Uso diário',
      sizes: '250ml',
    },
  },
  {
    match: (title) => /booster/i.test(title) && /wavy/i.test(title),
    content: {
      subtitle: 'Máscara Líquida para Cachos',
      longDescription:
        'O Booster Wavy é uma máscara líquida concentrada para definição e hidratação de cachos. Pode ser usada pura como ativador de cachos ou misturada ao condicionador para potencializar o tratamento.',
      keyIngredients: [
        { name: 'Complexo para cachos', benefit: 'Definição e memória capilar' },
        { name: 'Óleos leves', benefit: 'Nutrição sem pesar' },
        { name: 'Agentes anti-frizz', benefit: 'Controle de volume e frizz' },
      ],
      howToUse: [
        'Adicione 3 a 5 gotas ao condicionador Wavy.',
        'Aplique nos fios com movimentos de scrunch.',
        'Pode ser usado puro nos fios úmidos como ativador.',
        'Deixe secar naturalmente para máxima definição.',
      ],
      benefits: [
        'Potencializa a definição dos cachos',
        'Fórmula líquida de absorção rápida',
        'Versátil: puro ou misturado',
        'Controle de frizz intensificado',
      ],
      frequency: 'A cada lavagem',
      sizes: '15ml (pocket) | 60ml',
    },
  },
  {
    match: (title) => /leave-in/i.test(title) && /wavy/i.test(title),
    content: {
      subtitle: 'Leave-in Ativador de Cachos',
      longDescription:
        'O Leave-in Wavy é um ativador de cachos que proporciona definição, controle de frizz e hidratação duradoura. Sua fórmula leve não pesa nos fios e mantém a flexibilidade natural dos cachos ao longo do dia.',
      keyIngredients: [
        { name: 'Complexo ativador de cachos', benefit: 'Definição e memória capilar' },
        { name: 'Proteção térmica', benefit: 'Protege contra secador e difusor' },
        { name: 'Agentes anti-frizz', benefit: 'Controle de frizz o dia todo' },
      ],
      howToUse: [
        'Aplique nos cabelos úmidos após a lavagem.',
        'Distribua de mecha em mecha com movimentos de scrunch.',
        'Amasse os cachos de baixo para cima.',
        'Deixe secar naturalmente ou use difusor.',
      ],
      benefits: [
        'Definição de cachos sem crocância',
        'Controle total de frizz',
        'Proteção térmica',
        'Toque flexível o dia todo',
      ],
      frequency: 'Após cada lavagem',
      sizes: '200ml',
    },
  },
];

export function getProductRichContent(title: string, productType: string): ProductRichContent | null {
  const matcher = productContentMatchers.find((m) => m.match(title, productType));
  return matcher?.content || null;
}
