const WHATSAPP_NUMBER = ''; 
const CONTACT_EMAIL = 'kennedy.of@proton.me';
const STAGE_TRANSITION_DURATION_MS = 340;
const TOAST_DURATION_MS = 4600;
const SPOTLIGHT_START_POSITION = { x: 77, y: 42 };

// Elementos do DOM usados pelos controles da página.
const rootElement = document.documentElement;
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
const heroSection = document.querySelector('.hero');
const storySection = document.querySelector('.story');
const phaseIndexLabel = document.getElementById('phase-index');
const phaseTitleElement = document.getElementById('phase-title');
const phaseDescriptionElement = document.getElementById('phase-description');
const codeEditor = document.getElementById('code-pane');
const previewHeading = document.getElementById('preview-h');
const editorStatusLabel = document.getElementById('editor-status');
const editorTabs = [...document.querySelectorAll('.file-tab')];
const stageProgressBars = [...document.querySelectorAll('.stage-dots i')];

// Textos e estados apresentados em cada etapa do editor demonstrativo.
const stages = [
  {
    index: '01 / INTERFACE',
    title: 'A primeira camada.',
    description: 'Interfaces responsivas com componentes reutilizáveis, React e TypeScript.',
    preview: 'Uma experiência com identidade.',
    status: 'React · TypeScript'
  },
  {
    index: '02 / BACK-END',
    title: 'A lógica por trás.',
    description: 'Rotas, dados e integrações com Node.js, Laravel e bancos SQL.',
    preview: 'Conectado de ponta a ponta.',
    status: 'Node.js · APIs'
  },
  {
    index: '03 / EXPERIÊNCIA',
    title: 'Detalhes que contam.',
    description: 'Design responsivo, microinterações e movimento com atenção à performance.',
    preview: 'Pronto para interagir.',
    status: 'CSS · animações'
  }
];

// Trechos de código usados para ilustrar cada etapa no editor.
const stageCodeSamples = [
  [
    '<span class="c5">// interface • React + TypeScript</span>',
    '<span class="c2">type</span> ' +
      '<span class="c3">Props</span> = { title: <span class="c2">string</span> };',
    '<span class="c2">export default function</span> ' +
      '<span class="c3">Hero</span>({ title }: Props) {',
    '  <span class="c2">return</span> (',
    '    <span class="c1">&lt;main</span> ' +
      'className=<span class="c4">"hero"</span><span class="c1">&gt;</span>',
    '      <span class="c1">&lt;h1&gt;</span>{title}<span class="c1">&lt;/h1&gt;</span>',
    '    <span class="c1">&lt;/main&gt;</span>',
    '  );',
    '}'
  ],
  [
    '<span class="c5">// back-end • Node.js / API</span>',
    '<span class="c2">import</span> express ' +
      '<span class="c2">from</span> <span class="c4">"express"</span>;',
    '<span class="c2">const</span> app = express();',
    'app.<span class="c3">get</span>(' +
      '<span class="c4">"/api/projetos"</span>, (req, res) =&gt; {',
    '  res.<span class="c3">json</span>({',
    '    status: <span class="c4">"ok"</span>,',
    '    stack: [<span class="c4">"Node.js"</span>, <span class="c4">"MySQL"</span>]',
    '  });',
    '});'
  ],
  [
    '<span class="c5">/* interface • CSS responsivo */</span>',
    '<span class="c3">.experiencia</span> {',
    '  <span class="c2">display</span>: <span class="c4">grid</span>;',
    '  <span class="c2">gap</span>: ' +
      '<span class="c4">clamp(1rem, 3vw, 3rem)</span>;',
    '  <span class="c2">transition</span>: <span class="c4">transform .6s ease</span>;',
    '}',
    '<span class="c3">@media (max-width: 768px)</span> {',
    '  <span class="c3">.experiencia</span> { ' +
      '<span class="c2">gap</span>: <span class="c4">1rem</span>; }',
    '}'
  ]
];
let activeStageIndex = -1;
let scrollUpdateScheduled = false;

function clampToRange(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

// Atualiza o editor e seus textos quando a etapa ativa muda.
function updateStageContent(stageIndex) {
  if (stageIndex === activeStageIndex) return;

  const previousStageIndex = activeStageIndex;
  activeStageIndex = stageIndex;
  const stage = stages[stageIndex];

  if (!prefersReducedMotion && previousStageIndex !== -1) {
    const options = {
      duration: STAGE_TRANSITION_DURATION_MS,
      easing: 'ease-out'
    };
    const animatedElements = [
      codeEditor,
      phaseTitleElement,
      phaseDescriptionElement,
      previewHeading
    ];

    animatedElements.forEach((element) => {
      element.animate?.(
        [
          { opacity: 0.35, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        options
      );
    });
  }

  phaseIndexLabel.textContent = stage.index;
  phaseTitleElement.textContent = stage.title;
  phaseDescriptionElement.textContent = stage.description;
  previewHeading.textContent = stage.preview;
  editorStatusLabel.textContent = stage.status;
  editorTabs.forEach((tab, tabIndex) => {
    tab.classList.toggle('active', tabIndex === stageIndex);
  });
  codeEditor.innerHTML = stageCodeSamples[stageIndex]
    .map((codeLine, lineIndex) => {
      const lineNumber = lineIndex + 1;
      const lineContent = codeLine || '&nbsp;';

      return (
        `<div class="code-line"><span class="ln">${lineNumber}</span>` +
        `<span class="content">${lineContent}</span></div>`
      );
    })
    .join('');
}

// Sincroniza o indicador de rolagem, o destaque da capa e o editor.
function updateScrollEffects() {
  scrollUpdateScheduled = false;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  rootElement.style.setProperty(
    '--scroll',
    clampToRange(window.scrollY / Math.max(1, maxScroll)).toFixed(4)
  );

  if (!prefersReducedMotion) {
    rootElement.style.setProperty(
      '--hero-s',
      clampToRange(
        -heroSection.getBoundingClientRect().top /
        Math.max(1, heroSection.offsetHeight)
      ).toFixed(4)
    );
  }

  const storyProgress = clampToRange(
    -storySection.getBoundingClientRect().top /
    Math.max(1, storySection.offsetHeight - window.innerHeight)
  );
  const lastStageIndex = stages.length - 1;
  const stageIndex = Math.min(
    lastStageIndex,
    Math.floor(storyProgress * stages.length)
  );

  rootElement.style.setProperty('--story-p', storyProgress.toFixed(4));
  updateStageContent(stageIndex);
  stageProgressBars.forEach((bar, index) => {
    const progress = clampToRange(storyProgress * stages.length - index);
    bar.style.transform = `scaleX(${progress.toFixed(3)})`;
  });
}

// Agrupa atualizações de rolagem para evitar trabalho repetido no mesmo quadro.
function scheduleScrollUpdate() {
  if (!scrollUpdateScheduled) {
    scrollUpdateScheduled = true;
    requestAnimationFrame(updateScrollEffects);
  }
}

window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
window.addEventListener('resize', scheduleScrollUpdate, { passive: true });

// Navega para a etapa correspondente ao clicar em uma aba do editor.
editorTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const stageIndex = Number(tab.dataset.stage);
    const storyTop = storySection.getBoundingClientRect().top + window.scrollY;
    const availableScroll = storySection.offsetHeight - window.innerHeight;
    const stagePosition = (stageIndex + 0.5) / stages.length;

    window.scrollTo({
      top: storyTop + availableScroll * stagePosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
});

// Controla o menu móvel e mantém seus atributos de acessibilidade sincronizados.
const menuButton = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Revela elementos quando entram na tela; respeita a preferência por menos movimento.
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add('visible');
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
  });
}

// Exibe mensagens temporárias quando os dados de contato não estão configurados.
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(
    () => toast.classList.remove('show'),
    TOAST_DURATION_MS
  );
}

// Abre o WhatsApp somente quando o número informado tem formato válido.
document.getElementById('whatsapp-link').addEventListener('click', (event) => {
  event.preventDefault();
  const number = WHATSAPP_NUMBER.replace(/\D/g, '');
  const text = 'Olá! Conheci a Kenny Tech e gostaria de conversar sobre um projeto.';

  if (/^55\d{10,11}$/.test(number)) {
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  } else {
    showToast('Configure WHATSAPP_NUMBER no arquivo js/main.js para ativar o orçamento.');
  }
});

// Spotlight discreto na capa; não interfere em telas touch.
if (!prefersReducedMotion && window.matchMedia('(pointer:fine)').matches) {
  let pointerQueued = false;
  let pointerX = SPOTLIGHT_START_POSITION.x;
  let pointerY = SPOTLIGHT_START_POSITION.y;
  heroSection.addEventListener('pointermove', (event) => {
    const bounds = heroSection.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width * 100).toFixed(1);
    pointerY = ((event.clientY - bounds.top) / bounds.height * 100).toFixed(1);

    if (!pointerQueued) {
      pointerQueued = true;
      requestAnimationFrame(() => {
        heroSection.style.setProperty('--pointer-x', `${pointerX}%`);
        heroSection.style.setProperty('--pointer-y', `${pointerY}%`);
        pointerQueued = false;
      });
    }
  }, { passive: true });
}

// Ativa links de e-mail quando o endereço configurado é válido.
const emailLinks = [...document.querySelectorAll('[data-email-link]')];
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL.trim());
if (validEmail) {
  emailLinks.forEach((link) => {
    link.href =
      `mailto:${CONTACT_EMAIL.trim()}?subject=` +
      encodeURIComponent('Orçamento — Kenny Tech');
  });
} else {
  emailLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Configure CONTACT_EMAIL no arquivo js/main.js para ativar o contato por e-mail.');
    });
  });
}

updateScrollEffects();
