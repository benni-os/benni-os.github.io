# 🏛️ BENNI·OS DESIGN SYSTEM & SPATIAL ARCHITECTURE MASTER BIBLE
### *Guia Definitivo de Engenharia Visual, UI/UX de Elite e Protocolo de Execução para Enxames de Agentes*
**Versão:** 2026.2-PRO · **Padrão de Qualidade:** Awwwards Site of the Year / Apple Pro / Shopify Editions

---

## 🧭 SUMÁRIO EXECUTIVO

Este documento é a **Bíblia de Referência Absoluta** para reproduzir a arquitetura, o design system, a física de movimento, a engenharia de performance e a unificação 3D do **Benni OS**. Ele foi concebido para:
1. **Treinar a intuição estética e técnica** para projetar e sustentar interfaces no patamar do Top 1% mundial.
2. **Servir como System Prompt / Skill de Execução para Enxames de Agentes de IA**, garantindo que qualquer comando de criação gere a arquitetura completa, sem retrabalho, sem regressões visuais e sem reintroduzir os bugs documentados na evolução do sistema.

---

## 1. 🧰 STACK TECNOLÓGICA UNIFICADA (O QUE, COMO E QUANDO USAR)

| Tecnologia | Versão | Papel na Arquitetura | Quando Usar | Como Integrar |
| :--- | :--- | :--- | :--- | :--- |
| **Three.js** | `r128` | Motor Gráfico WebGL (GPU). Renderiza monólitos 3D, spline cameras, partículas e Z-buffer. | Em toda cena que exige profundidade física, iluminação real e oclusão de objetos. | `<canvas id="hero-gl-canvas">` ou via React Three Fiber (`@react-three/fiber`). |
| **GSAP + ScrollTrigger** | `3.12.5` | Coreografia de tempo e gatilhos de scroll milimétricos com *scrubbing*. | Para sincronizar o progresso de rolagem `[0.0 -> 1.0]` com a câmera 3D e sequências de frames. | `ScrollTrigger.create({ trigger, start, end, scrub: 0.6 })` |
| **Lenis Scroll** | `1.3.23` | Normalizador de inércia e viscosidade de scroll (60Hz/120Hz/144Hz). | Sempre ativo no `<body>` para remover o scroll engasgado padrão do navegador. | `new Lenis({ lerp: 0.08, smoothWheel: true })` integrado ao RAF do GSAP. |
| **Vite** | `5.4+` | Bundler e ambiente de desenvolvimento ultrarrápido (HMR). | Na estrutura do projeto para build de produção, tree-shaking e deploy. | `npm run dev` / `npm run build` |
| **TypeScript** | `5.5+` | Tipagem estática rigorosa para matemática vetorial 3D e estados. | Em todos os arquivos de lógica (`src/**/*.ts`). | `tsconfig.json` com `target: ES2020`. |
| **Vite PWA / Workbox** | `0.20+` | Service Worker com cache inteligente offline e suporte a PWA instalável. | Para armazenar frames, vídeos e assets no disco do usuário via `StaleWhileRevalidate`. | `VitePWA({ workbox: { maximumFileSizeToCacheInBytes: 60MB } })` |
| **Puter.js** | `v2` | Backend Serverless gratuito (Auth, KV Store, AI, Hosting). | Para transformar sites estáticos em dinâmicos sem custo de servidor. | `<script src="https://js.puter.com/v2/"></script>` + `puter.kv.get()` |
| **WebP Frame Sequence** | Lossy 85% | Renderização ultra-fluida de vídeo via Canvas 2D sem travamento de decodificação. | No Hero e transições críticas onde `<video>` sofre com jitter de seek. | Canvas 2D com pré-carregamento assíncrono e `requestAnimationFrame`. |
| **Google Fonts** | — | Tríade Tipográfica Editorial de Elite: *DM Serif Display*, *Instrument Sans*, *IBM Plex Mono*. | Títulos cinematográficos, corpo legível e metadados cibernéticos. | `<link href="https://fonts.googleapis.com/css2?...">` |

---

## 2. 🌌 UNIFICAÇÃO ESPACIAL E Z-BUFFER (O EFEITO "SHOPIFY EDITIONS")

### O Segredo Arquitetural:
O erro número 1 é tentar empilhar divs HTML sobre o canvas usando `z-index`. Isso quebra o **Depth Buffer** da GPU e faz o texto parecer uma "etiqueta colada no vidro".

```
❌ AMADOR: EMPILHAMENTO EM CAMADAS (Z-INDEX)
[ Fundo 2D ] ─── (sem luz) ───▶ [ Canvas 3D ] ─── (sem oclusão) ───▶ [ HTML Textos ]

✅ ELITE BENNI OS: UNIFICAÇÃO ESPACIAL (SHARED Z-BUFFER)
┌────────────────────────────────────────────────────────────────────────┐
│                        ESPAÇO 3D UNIFICADO (GPU)                       │
│                                                                        │
│  • Posição da Câmera: THREE.CatmullRomCurve3 (Waypoints 3D por Scroll) │
│  • Orientação: Matriz 4x4 -> Quaternions com SLERP (Anti-Gimbal Lock)   │
│  • Monólito 3D: MeshPhysicalMaterial (Metal 0.98, Clearcoat 1.0)       │
│  • Luz Dinâmica: PointLight sincronizado com o Grade do Capítulo      │
│  • UI / Cards: Projetados na Matriz 3D ou com Raycast Occlusion        │
└────────────────────────────────────────────────────────────────────────┘
```

### Implementação de Referência (Spline Camera Anti-Gimbal):
```javascript
// 1. Curva de Bézier 3D Centrípeta
const cameraPath = new THREE.CatmullRomCurve3(cameraWaypoints, false, "centripetal", 0.5);
const lookAtPath = new THREE.CatmullRomCurve3(lookAtWaypoints, false, "centripetal", 0.5);

// 2. No Loop de Animação (120 FPS / Zero Garbage Collection):
cameraPath.getPointAt(smoothProgress, targetCamPos);
lookAtPath.getPointAt(smoothProgress, targetLookAt);

smoothCamPos.lerp(targetCamPos, 0.09);
threeCam.position.copy(smoothCamPos);

smoothLookAt.lerp(targetLookAt, 0.09);
rotationMatrix.lookAt(threeCam.position, smoothLookAt, threeCam.up);
targetQuaternion.setFromRotationMatrix(rotationMatrix);
threeCam.quaternion.slerp(targetQuaternion, 0.09); // Rotação contínua sem saltos
```

---

## 3. 📐 TIPOGRAFIA MATEMÁTICA & NEON AURA (ZERO CORTES)

### A Fórmula Matemática Anti-Overflow:
Nunca use tamanhos brutos como `font-size: 8.5vw` sem delimitadores. Todo título longo precisa de três travas:
1. `clamp(min_rem, preferred_vw, max_rem)`
2. `max-width: min(840px, 78vw)`
3. `max-width: 24ch` no texto do título para forçar quebras equilibradas.

```css
/* Títulos Principais Benni OS */
#heroTitle {
  font-family: "DM Serif Display", serif !important;
  font-size: clamp(2.4rem, 4.6vw, 4.6rem) !important;
  line-height: 0.98 !important;
  font-weight: 500 !important;
  letter-spacing: -0.035em !important;
  max-width: 24ch !important;
  word-break: normal !important;
  overflow-wrap: break-word !important;
}

/* Capítulos com Frases Longas (04, 07, 08, 09) */
.hero-sticky[data-chapter="04"] #heroTitle,
.hero-sticky[data-chapter="07"] #heroTitle {
  font-size: clamp(2.1rem, 3.8vw, 3.9rem) !important;
  line-height: 1.02 !important;
}
```

### O Sistema de Sombra Neon Tripla:
Para garantir contraste cirúrgico sobre vídeos em movimento, partículas 3D e fundos escuros:
```css
/* Aura Luminosa Tripla */
#heroTitle {
  background: linear-gradient(90deg, #ffffff 0%, #d4af37 20%, #ffffff 40%, #426bff 60%, #d4af37 80%, #ffffff 100%) !important;
  background-size: 300% 100% !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: shimmer 8s linear infinite !important;
  filter: drop-shadow(0 0 18px rgba(201, 164, 92, 0.5)) 
          drop-shadow(0 0 38px rgba(66, 107, 255, 0.32)) 
          drop-shadow(0 8px 30px rgba(0, 0, 0, 0.95)) !important;
}

/* Kicker Tecnológico */
#heroKicker {
  color: #638bff !important;
  text-shadow: 0 0 10px rgba(99, 139, 255, 0.9), 0 0 22px rgba(66, 107, 255, 0.55), 0 2px 10px rgba(0, 0, 0, 0.9) !important;
  filter: drop-shadow(0 0 8px rgba(66, 107, 255, 0.6)) !important;
}

/* Corpo com Escudo de Contraste */
#heroBody {
  color: #f7f3ec !important;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.95), 0 0 25px rgba(9, 9, 11, 0.95), 0 0 12px rgba(201, 164, 92, 0.2) !important;
}
```

---

## 4. ⚡ PROTOCOLO ANTI-TEARING & COMPOSITING GPU DE ALTA PERFORMANCE

### O Problema do Screen Tearing:
A aplicação indiscriminada de `will-change: transform` em contêineres de grande escala (como vídeos em 100vh ou cartões 3D) força o navegador a alocar texturas de VRAM persistentes e desproporcionais. Durante rolagens rápidas com inércia (Lenis), a GPU esgota a taxa de preenchimento (*fillrate*), gerando o clássico corte de tela (*Screen Tearing*).

### Diretrizes Inegociáveis de Performance:
1. **Zero `will-change` passivo em elementos massivos:** Remover `will-change: transform` de contêineres full-screen (`.dossier-frame`, `.wall-media`, `.plate`).
2. **Aceleração de Hardware Cirúrgica:** Utilizar `transform: translate3d(0, 0, 0);` e `backface-visibility: hidden;` para delegar a composição diretamente à GPU sem travar a camada na VRAM.
3. **Isolamento de Backdrop-Filter em Contextos 3D:** Em elementos com `transform-style: preserve-3d`, isolar o `backdrop-filter` para evitar travamentos de pipeline gráfico em GPUs móveis e integradas.

```css
/* Padrão Benni OS para Elementos 3D Fluidos e Sem Tearing */
.w11-3d, .w22-card-3d, .w22-glass {
  transform-style: preserve-3d;
  perspective: 1200px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}
```

---

## 5. 🎬 WAVE 20 — FRAME SCROLLER ENGINE (CANVAS 2D WEBP)

### Substituição de `<video>` por Frame Sequence:
Em seções onde o scroll do usuário controla o avanço temporal milimétrico (como o Hero do Benni OS), a tag HTML `<video>` falha devido à latência de decodificação de keyframes (`currentTime`). A solução de engenharia de elite consiste em desmembrar o vídeo em uma sequência de frames discretos WebP renderizados em Canvas 2D.

### Especificações do Motor:
- **Resolução e Formato:** 960 frames exportados em `.webp` (qualidade 85%) para carregamento instantâneo.
- **Pré-carregamento Inteligente:** Buffer progressivo em memória dos primeiros 60 frames com carregamento contínuo em segundo plano.
- **Double Buffer Clear (Anti-Ghosting):** Limpeza obrigatória do contexto do canvas antes de cada pintura para prevenir artefatos e sobreposição de caixas antigas:
```javascript
function drawFrame(img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Cálculo de cobertura proporcional (object-fit: cover)
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShiftX = (canvas.width - img.width * ratio) / 2;
  const centerShiftY = (canvas.height - img.height * ratio) / 2;
  ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
}
```
- **Fallback Automático:** Caso a sequência de frames não esteja acessível, o motor chaveia suavemente para os stills fotográficos (`hero-01-arrival.png` a `hero-11-the-first-move.png`).

---

## 6. 📱 WAVE 21 — MOBILE ULTRA-RESPONSIVENESS & CONTRAST GATE

### O Desafio Mobile (`@media (max-width: 768px)`):
Efeitos que funcionam perfeitamente em displays 4K (como reflexos de vidro, sombras luminosas amarelas e gradientes transparentes) tornam o texto ilegível ou geram sobreposição em telas compactas.

### As 4 Regras de Ouro do Mobile Benni OS:
1. **Blanket Filter Override (Zero Blur nos Textos):**
   ```css
   @media (max-width: 768px) {
     .plate *, .corridor-wall *, .card *, .ledger-row * {
       filter: none !important;
       text-shadow: none !important;
     }
     #heroTitle, .plate-heading, .wall-title, .chamber-title, .gradient-shimmer, .reveal-text {
       filter: none !important;
       text-shadow: none !important;
       -webkit-text-fill-color: #ffffff !important;
       color: #ffffff !important;
       background: transparent !important;
     }
   }
   ```
2. **Extinção do Espaço em Branco no System Dossier:**
   Substituir a regra de scroll desktop `min-height: 240vh` por `min-height: auto !important; padding-bottom: 12vh !important;` para eliminar telas em branco vazias no celular.
3. **Prevenção de Sobreposição no Nemesis Inference (Wall 03):**
   Resetar deslocamentos absolutos (`bottom: 10vh`) para fluxo flexível padrão (`position: relative !important; bottom: auto !important; gap: 15px !important;`), permitindo que títulos longos em negrito quebrem linhas sem colidir com os textos secundários.
4. **Hero Frame Aspect Ratio Seguro:**
   Manter o enquadramento 9:16 sem zoom excessivo que corte detalhes narrativos e metadados do HUD.

---

## 7. 🌐 WAVE 19 — INTERNACIONALIZAÇÃO (i18n) ENGINE & MULTI-IDIOMA

### Especificações Técnicas do Motor i18n:
- **Idiomas Nativos:** Português (PT-BR), Inglês (EN) e Espanhol (ES).
- **Zero Dependências:** Dicionário reativo integrado diretamente no ciclo de vida da página sem necessidade de bibliotecas externas pesadas.
- **Persistência em 3 Camadas:**
  1. `localStorage.getItem('benni_lang')` para carregamento instantâneo.
  2. Fallback automático para `navigator.language`.
  3. Sincronização remota via **Puter KV** (`benni_user_lang`) para manter a preferência em qualquer dispositivo.
- **Transição Suave de Textos:** Animação de *fade-out / fade-in* durante a troca de idioma para evitar saltos bruscos no layout.
- **Governança de SEO:** Atualização em tempo real do atributo `<html lang="...">` e das meta tags correspondentes.

---

## 8. ✨ WAVE 22 — 3D MICROINTERACTIONS & IMMERSIVE FEEDBACK

### Catálogo de Microinterações:
1. **Parallax 3D Dinâmico em Cards:**
   - Efeito de profundidade e rotação tridimensional orientado pela posição do cursor (`--w22-rotX`, `--w22-rotY`).
   - Elevação física do conteúdo interno (`transform: translateZ(30px)`).
2. **Flip Cards Interativos:**
   - Animação de rotação Y de 180° com suavização cúbica (`cubic-bezier(0.16, 1, 0.3, 1)`) para revelação de especificações técnicas do sistema.
3. **Botões Magnéticos com Elevação Tátil:**
   - `.w22-btn-3d` com deslocamento vertical no clique e sombra projetada dinâmica.
4. **Glassmorphism Interativo com Feixe Seguidor:**
   - Gradiente de brilho dinâmico (`--w22-glow-x`, `--w22-glow-y`) refletindo o movimento do mouse nas bordas de vidro.
5. **Stagger de Entrada Cinematográfico:**
   - Classes `.w22-stagger` com atrasos escalonados matematicamente (`0.05 + i * 0.04s`) ativados por `IntersectionObserver`.

---

## 9. 🎻 WAVE 15 — 3D ORCHESTRA SECCIONAL & ACESSIBILIDADE WCAG AAA

### I. A Sinfonia Visual 3D por Seção:
Cada ato do site possui uma instância 3D dedicada com lazy-loading (`IntersectionObserver`), garantindo que apenas a seção visível consuma recursos da GPU:

| Seção | Arquitetura 3D | Composição Geométrica & Shaders | Interatividade |
| :--- | :--- | :--- | :--- |
| **Dossier** | *Data Stream Cascade* | 1.200 partículas em queda com 40 feixes verticais de glitch dourado (`LineBasicMaterial`). | Scroll Contínuo |
| **Corridor** | *Infinite Mirror Portals* | 5 Torus concêntricos com `MeshStandardMaterial` (Ouro/Cobalto) + poeira estelar. | Mouse Parallax + Scroll |
| **Chamber** | *Holographic Glass Cubes* | 12 cubos translúcidos com `MeshPhysicalMaterial` (Reflexo, Wireframe, Órbita 3D). | Rotação Contínua + Flutuação |
| **Handoff** | *Transition Particles* | 3.000 partículas morfing em esfera geométrica com interpolação baseada no scroll. | Scroll Progressivo |
| **Adam** | *Kinetic Sculpture* | 30 anéis entrelaçados em torção contínua com aura estelar volumétrica. | Mouse Gyro + Scroll |

### II. O Padrão de Acessibilidade Obrigatório:
- **Skip Link Oculto:** `<a href="#hero" class="skip-link">Pular para o conteúdo principal</a>` com foco revelador (`top: 16px; left: 16px;`).
- **Focus Ring de Alto Contraste:** `:focus-visible { outline: 3px solid #426bff !important; outline-offset: 6px !important; }`.
- **Injeção Dinâmica de ARIA:** Todos os elementos clicáveis (`.ledger-row`, `.plate`, `.corridor-wall`, `.adam-action-bar`) recebem `role="button"`, `tabindex="0"` e listener para navegação por teclado (`Enter` / `Space`).
- **Respeito a `prefers-reduced-motion`:** Se o usuário tiver sensibilidade a movimento, todos os motores 3D entram em fallback estático imediato sem ocultar a arte base.

---

## 10. 🌐 WAVE 16 & 17 — SEO, ANALYTICS & SOBERANIA DE MARCA

### I. A Soberania da Marca BENNI·OS no Design:
- **Fixed Navigation Glassmorphic:** Logotipo monumental `BENNI·OS` em *DM Serif Display* com acento dourado `#d4af37`, tag `SOVEREIGN SYSTEM` iluminada e sinal operacional `SYSTEM ACTIVE` com LED verde pulsante.
- **HUD Cybernético do Hero:** Metadados de capítulo com prefixo de runtime `BENNI·OS // C01..C11`.
- **Rodapé Monumental:** Marca `BENNI·OS` em escala imperial (`clamp(3.8rem, 12vw, 12rem)`) com gradiente ouro/cobalto metálico e sombras de profundidade.

### II. SEO Técnico & Privacy Analytics:
- **Domínio Canônico:** `https://benni-os.net/` configurado no `CNAME`, canonicals e meta tags.
- **Rich Snippets:** JSON-LD para `WebSite`, `Article` e `BreadcrumbList`.
- **Plausible Analytics:** Monitoramento leve sem cookies, rastreando `page_view`, `section_view`, `cta_click`, `3d_interaction` e `Core Web Vitals`.
- **Dashboard Operacional:** Interface dedicada em `/dashboard.html`.

---

## 11. 📁 GOVERNANÇA DE DIRETÓRIOS & PADRÃO DE REPOSITÓRIO

Para manter o projeto limpo, profissional e em conformidade com o ecossistema Vite/Node:

```text
├── docs/                                          # Documentação técnica e Guias Mestres
│   └── BENNI_OS_DESIGN_SYSTEM_AND_ARCHITECTURE_MASTER_BIBLE.md
├── public/                                        # Assets públicos servidos na raiz pelo Vite
│   ├── frames/hero/                               # Sequência de frames WebP do Hero (0001 a 0960)
│   ├── *.mp4 / *.png / *.jpeg                     # Mídias secundárias e stills de fallback
│   ├── admin.html / dashboard.html                # Painéis de controle
│   └── CNAME, robots.txt, sitemap.xml             # Configurações de DNS e busca
├── src/                                           # Código fonte modular (quando aplicável)
├── index.html                                     # Aplicação cinematográfica principal
├── index - Copia.html                             # Backup curado pelo operador
├── ledger.db                                      # Banco de dados local de simulação
├── package.json & tsconfig.json                   # Dependências e tipagem
└── vite.config.ts                                 # Configuração de build, HMR e PWA
```

**Regra de Ouro:** NUNCA deixar scripts de teste descartáveis (`.cjs`), logs de depuração (`.txt`, `.json`) ou vídeos obsoletos pesados soltos na raiz do projeto.

---

## 12. ⚠️ REGISTRO DE ANTIPATTERNS & BUGS SUPERADOS (LIÇÕES APRENDIDAS)

| Erro Cometido no Passado | Consequência | Solução Arquitetural Benni OS |
| :--- | :--- | :--- |
| **`#hero-gl-canvas { opacity: 0.15; }`** | Todo o monólito 3D, anéis dourados e spline camera ficaram quase invisíveis. | Sempre declarar `opacity: 1 !important;` e `z-index: 5;` para o canvas 3D frontal. |
| **`will-change: transform` em contêineres de vídeo** | Causou esgotamento de VRAM e *Screen Tearing* severo durante o scroll no desktop. | Remover `will-change` global; aplicar `transform: translate3d(0, 0, 0)` e `backface-visibility: hidden`. |
| **`display: none` em `prefers-reduced-motion`** | Ocultava completamente os motores 3D do site em sistemas com efeitos visuais desligados. | **NUNCA** ocultar os canvas 3D com `display: none`. Suavizar animações mantendo 100% da renderização visível. |
| **Vídeos >120MB no repositório Git** | Bloqueou operações de `git push` e estourou os limites do GitHub Pages / Cloudflare. | Utilizar sequência de frames WebP no Hero e otimizar vídeos secundários para menos de 15MB. |
| **Falta de `ctx.clearRect()` na troca de frames** | Gerou "frame ghosting" e sobreposição de caixas anteriores na tela. | Limpar explicitamente o canvas inteiro antes de desenhar o novo frame. |
| **Glimmer amarelo sobrepondo textos no mobile** | Dificultou a leitura dos cartões Chamber e seções escuras em telas pequenas. | Aplicar a regra Blanket no CSS Mobile removendo filtros e forçando texto branco sólido. |
| **`position: absolute; bottom: 10vh;` no Wall 03** | Fez com que textos em negrito colidissem com os subtítulos no celular. | Usar fluxo relativo com flexbox e `gap: 15px` nas regras mobile. |
| **`navigator.maxTouchPoints > 0` no Windows** | Bloqueava o 3D no computador do usuário achando que era celular/touch simples. | **NUNCA** usar `maxTouchPoints` como trava de 3D. Apenas verificar largura real de viewport. |

---

## 13. 📜 TEMPLATE DE PROMPT PARA ENXAMES DE AGENTES

Copie e cole este prompt para despachar qualquer enxame:

```markdown
Você é o Engenheiro Chefe de UI/UX e Diretor Técnico WebGL do Benni OS Swarm.
Sua missão é construir uma aplicação web de altíssimo padrão (Awwwards Top 1%) seguindo rigorosamente a BENNI_OS_DESIGN_SYSTEM_AND_ARCHITECTURE_MASTER_BIBLE.md.

DIRETRIZES FUNDAMENTAIS:
1. ARQUITETURA VITE + TS: Estrutura limpa com vite.config.ts (Workbox PWA 60MB), tsconfig.json, package.json e assets em /public.
2. UNIFICAÇÃO ESPACIAL WEBGL: Câmera com interpolação Quaternária (SLERP), 3D Glass Shatter com refração física e Z-Buffer unificado.
3. MOTOR DE FRAMES WEBP: Hero com Canvas 2D de alta performance, double buffer clear e fallback fotográfico estático.
4. PERFORMANCE & ANTI-TEARING: Zero will-change passivo em contêineres gigantes; aceleração por hardware com translate3d(0, 0, 0) e backface-visibility: hidden.
5. RESPONSIVIDADE MOBILE CIRÚRGICA: Blanket filter override contra blur nos textos, eliminação de espaços em branco excessivos e fluxos flexbox sem sobreposição.
6. INTERNACIONALIZAÇÃO (WAVE 19): Motor i18n nativo reativo (PT / EN / ES) com persistência em localStorage e Puter KV.
7. MICROINTERAÇÕES 3D (WAVE 22): Cards Parallax 3D com física de mouse, flip cards, botões táteis e feixe luminoso dinâmico.
8. TIPOGRAFIA MATEMÁTICA: Tríade (DM Serif Display, Instrument Sans, IBM Plex Mono) com clamp(), max-width: 24ch e aura neon tripla.
9. IDENTIDADE & SEO (WAVES 16/17): Marca BENNI·OS soberana, Rich Snippets Schema.org e Analytics privacy-first.
Execute a construção de ponta a ponta e valide com npm run build gerando zero erros.
```

---
*Benni OS — Sovereign Autonomy System · 2026*
