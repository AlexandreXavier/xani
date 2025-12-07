---
author: Alexandre Xavier
pubDatetime: 2025-12-07T16:22:00+01:00
modDatetime: 2025-12-07T19:23:47.400+01:00
title: Os Modelos 'Open Weight'?
slug: Os Modelos 'Open Weight'
featured: true
draft: false
tags:
  - ai
description:
   Da Revolução do Código Aberto à Era dos Pesos Abertos.
---


# Os Modelos 'Open Weight'? A Nova Fronteira da IA

![A beautiful landscape](https://6bhbi182cm.ufs.sh/f/eaJqTiDzJSPWUNwgPpqH53KM6qkE7WJOna8czYrtjmCsQexN "Open Weight")

## 1. Introdução: Da Revolução do Código Aberto à Era dos Pesos Abertos

No mundo da tecnologia, o termo "Código Aberto" (Open Source) é sinónimo de colaboração, transparência e inovação. Ele transformou a indústria do software, permitindo que qualquer pessoa veja, modifique e distribua o código-fonte de um programa. Agora, na era da Inteligência Artificial, um novo termo emergiu, soando familiar mas com um significado distinto: "Pesos Abertos" (Open Weight).

Embora ambos partilhem uma filosofia de abertura, referem-se a componentes fundamentalmente diferentes de uma tecnologia. Este artigo tem como objetivo desmistificar o que são modelos de pesos abertos de uma forma clara e acessível, explicando as suas diferenças em relação ao código aberto tradicional, a sua importância estratégica e os riscos que lhes estão associados.

Mas para percebermos estas diferenças, precisamos primeiro de saber: o que é exatamente o "código" e o que são os "pesos"?

## 2. Desmistificando os Termos: O Que São "Pesos" num Modelo de IA?

Num modelo de Inteligência Artificial, os pesos são o seu cérebro e conhecimento acumulado. Podemos descrevê-los como uma coleção imensamente complexa de parâmetros numéricos, interligados entre si, que resultam do processo de treino do modelo com vastos conjuntos de dados.

A sua função principal é permitir que o modelo faça previsões. Por exemplo, num modelo de linguagem, os pesos são o que lhe permite "adivinhar" a palavra ou token seguinte com base no texto que lhe é fornecido. Eles contêm a essência do "conhecimento" que o modelo adquiriu.

Em contraste, o código-fonte de um software tradicional consiste num conjunto de instruções legíveis por humanos que, uma vez compiladas, criam um programa funcional que o utilizador pode executar.

Com estes dois conceitos em mente, as diferenças entre "Open Source" e "Open Weight" tornam-se muito mais claras.

## 3. Open Weight vs. Open Source: As Diferenças Fundamentais

Para visualizar as distinções de forma clara, podemos comparar os dois conceitos lado a lado:

| Característica             | Open Source (Código Aberto)                                                                 | Open Weight (Pesos Abertos)                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Componente principal       | O código-fonte, que são as instruções para construir o programa [1].                       | Os pesos do modelo, que são os parâmetros resultantes do treino [2].                       |
| Processo de criação        | Compilação de código: um processo barato, rápido e determinístico que pode ser feito num computador comum [4]. | Treino do modelo: um processo extremamente caro (milhões de dólares), não determinístico e que exige uma infraestrutura massiva [4, 6]. |
| Transparência e recriação  | Totalmente recriável: com o código-fonte, qualquer pessoa pode compilar e recriar o programa exato [1]. | Não recriável: ter acesso aos pesos não permite recriar o modelo, pois os dados de treino não são públicos [1]. |

A conclusão principal é que, embora ambos promovam a abertura, o "Open Weight" não cumpre a definição estrita de "Open Source". O motivo é simples: o utilizador recebe as peças para executar o modelo, mas não a "fábrica" (os dados e o processo de treino) para o construir do zero. Por esta razão, muitos argumentam que, usando a definição rigorosa de código aberto, nenhum modelo de IA atual seria verdadeiramente "Open Source".

Se não são verdadeiramente "abertos" como o software tradicional, porque é que estes modelos são tão importantes e estratégicos?

## 4. Porque é que os Modelos Open Weight são Importantes?

### 4.1. Vantagens para o Mercado: Mais Escolha, Menos Custo

Os modelos de pesos abertos geram benefícios diretos para utilizadores e empresas, fomentando um ecossistema mais competitivo e flexível.

- **Flexibilidade e concorrência**: Quando os pesos de um modelo são públicos, múltiplos fornecedores de infraestrutura podem oferecê-lo como um serviço. Modelos como o Deep Seek 3.2 EXP ou o Kimmy K2 Thinking são disponibilizados por várias empresas. Esta competição força os preços a baixar e a eficiência a aumentar, resultando em mais velocidade e custos mais baixos para o utilizador final.
- **Controlo total**: Um dos maiores atrativos dos modelos Open Weight é a possibilidade de os executar no seu próprio hardware. Isto dá ao utilizador controlo total sobre os seus dados e a sua utilização. A tendência de criar modelos mais pequenos (como o GPT-OSS 120B e 20B) que podem correr num laptop potente ou numa única GPU reforça esta vantagem, tornando a IA de ponta mais acessível.

### 4.2. A Estratégia Geopolítica: A Corrida entre a China e os EUA

Embora os modelos mais avançados sejam, em geral, de laboratórios americanos, a China está a vencer de forma clara a "corrida dos Open Weight". A razão é puramente estratégica: é a única forma de ganharem relevância e quota de mercado nos Estados Unidos.

O obstáculo é duplo. Primeiro, devido a preocupações legítimas de segurança, nenhuma empresa americana aprovaria o uso de um modelo de IA alojado na China. Segundo, os laboratórios chineses têm dificuldade em competir ao nível do software de consumo (interfaces de utilizador) e das APIs, que as empresas americanas evitariam de qualquer forma.

Ao lançar os seus modelos como Open Weight, os laboratórios chineses contornam brilhantemente este bloqueio. Em vez de tentarem vender um produto final, eles fornecem os "blueprints e peças essenciais" para que equipas locais (americanas) montem os seus próprios carros de corrida. Isto permite que terceiros construam interfaces e serviços sobre os modelos chineses, garantindo que o seu design é, pelo menos, considerado num mercado que, de outra forma, lhes estaria completamente fechado.

No entanto, esta estratégia de abertura radical não vem sem os seus próprios perigos e desafios.

## 5. Os Riscos e Desafios do "Mundo Aberto"

A decisão de publicar os pesos de um modelo acarreta consequências significativas, especialmente no que toca à segurança, à responsabilidade e à viabilidade económica.

1. **O risco da irrevogabilidade**  
   O maior perigo de um modelo Open Weight é que, uma vez publicados, os pesos não podem ser retirados. Se, mais tarde, for descoberta uma capacidade perigosa ou maliciosa no modelo — como a capacidade de ajudar a criar uma arma biológica —, o criador perde toda a capacidade de implementar salvaguardas ou de o desativar. Nos modelos de pesos fechados (como o GPT-5), o criador mantém controlo total e pode bloquear utilizações nocivas.
2. **O dilema legal e financeiro**  
   Para os laboratórios americanos, publicar modelos Open Weight é mais complexo. Estão sujeitos a maiores preocupações com responsabilidade legal, direitos de autor e às expectativas de segurança dos seus investidores. Além disso, o modelo de negócio é desafiante: quem mais beneficia financeiramente não são os criadores do modelo, mas sim os fornecedores de infraestrutura que o alojam. Este cálculo de risco contrasta com a abordagem dos laboratórios chineses, que demonstraram uma maior "disposição para lançar coisas que são potencialmente riscos de segurança" para vencer em benchmarks. É precisamente este maior apetite ao risco que viabiliza a sua agressiva estratégia geopolítica de Open Weight.

Este equilíbrio delicado entre abertura, segurança e incentivo comercial definirá o futuro desta tecnologia.

## 6. Conclusão: Principais Ideias a Reter

Navegar na nova fronteira da IA exige clareza sobre os termos e as suas implicações. Ao terminar a nossa exploração dos modelos Open Weight, aqui ficam as três ideias essenciais a reter:

1. **"Open Weight" não é "Open Source"**: A distinção fundamental é a capacidade de recriação. "Open Weight" dá-lhe as peças para executar um modelo, mas não para o recriar do zero, ao contrário do verdadeiro software "Open Source".
2. **Um motor de competição e estratégia**: Os modelos de pesos abertos impulsionam a concorrência no mercado, beneficiando os utilizadores com preços mais baixos e mais opções. Servem também como uma ferramenta geopolítica crucial, permitindo aos laboratórios chineses contornar barreiras de segurança e confiança para competir no mercado ocidental.
3. **Abertura com responsabilidade**: Esta nova forma de abertura traz riscos significativos. O mais sério é a impossibilidade de reverter a publicação de um modelo, mesmo que se descubra que este pode ser usado para fins perigosos, levantando questões complexas sobre segurança e responsabilidade.
