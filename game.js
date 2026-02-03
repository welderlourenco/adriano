// ==========================================
// ALQUIMIA COMBAT - GAME ENGINE
// Roguelike Boss Rush com Sistema de Craft
// ==========================================

// ==========================================
// CONFIGURAÇÕES E CONSTANTES
// ==========================================

const CONFIG = {
    PLAYER_SPEED: 5,
    PLAYER_BASE_HP: 100,
    PLAYER_BASE_ATK: 10,
    PLAYER_BASE_DEF: 5,
    ATTACK_COOLDOWN: 500,
    ATTACK_RANGE: 100,
    ENEMY_BASE_HP: 50,
    ENEMY_BASE_ATK: 8,
    ENEMY_BASE_DEF: 2,
    HEAL_PERCENT_ON_VICTORY: 0.3
};

// Sistema de Raridades
const RARITIES = {
    common: { name: 'Comum', color: '#9ca3af', multiplier: 1, dropWeight: 50 },
    uncommon: { name: 'Incomum', color: '#22c55e', multiplier: 1.5, dropWeight: 25 },
    rare: { name: 'Raro', color: '#3b82f6', multiplier: 2.5, dropWeight: 15 },
    epic: { name: 'Épico', color: '#a855f7', multiplier: 4, dropWeight: 7 },
    legendary: { name: 'Lendário', color: '#f59e0b', multiplier: 7, dropWeight: 2.5 },
    mythic: { name: 'Mítico', color: '#ef4444', multiplier: 12, dropWeight: 0.5 }
};

// Materiais do jogo - cada um tem propriedades que influenciam o craft
const MATERIALS = {
    // === METAIS ===
    iron: { 
        name: 'Ferro', icon: '🔩', category: 'metal', 
        value: 10, attack: 3, defense: 2,
        desc: 'Metal comum, bom para armas básicas'
    },
    steel: { 
        name: 'Aço', icon: '⚙️', category: 'metal', 
        value: 25, attack: 5, defense: 4,
        desc: 'Liga resistente de ferro e carbono'
    },
    silver: { 
        name: 'Prata', icon: '🥈', category: 'metal', 
        value: 30, attack: 4, defense: 3, element: 'holy',
        desc: 'Metal sagrado, eficaz contra o mal'
    },
    gold: { 
        name: 'Ouro', icon: '🪙', category: 'metal', 
        value: 40, attack: 2, defense: 1, element: 'luck',
        desc: 'Metal precioso com propriedades mágicas'
    },
    titanium: { 
        name: 'Titânio', icon: '🔷', category: 'metal', 
        value: 60, attack: 7, defense: 8,
        desc: 'Metal incrivelmente leve e resistente'
    },
    mithril: { 
        name: 'Mithril', icon: '💎', category: 'metal', 
        value: 80, attack: 8, defense: 7, element: 'magic',
        desc: 'Metal élfico lendário'
    },
    adamantium: { 
        name: 'Adamantium', icon: '🔶', category: 'metal', 
        value: 100, attack: 10, defense: 10,
        desc: 'O metal mais resistente conhecido'
    },

    // === MADEIRAS ===
    wood: { 
        name: 'Madeira', icon: '🪵', category: 'wood', 
        value: 5, attack: 1, defense: 1,
        desc: 'Madeira comum de árvore'
    },
    oak: { 
        name: 'Carvalho', icon: '🌳', category: 'wood', 
        value: 15, attack: 2, defense: 3,
        desc: 'Madeira forte e durável'
    },
    darkwood: { 
        name: 'Madeira Negra', icon: '🖤', category: 'wood', 
        value: 35, attack: 4, defense: 5, element: 'dark',
        desc: 'Madeira corrompida pela escuridão'
    },
    elderwood: { 
        name: 'Madeira Anciã', icon: '🌲', category: 'wood', 
        value: 55, attack: 5, defense: 6, element: 'nature',
        desc: 'Madeira de árvores milenares'
    },
    worldtree: { 
        name: 'Madeira da Árvore-Mundo', icon: '🌴', category: 'wood', 
        value: 90, attack: 7, defense: 8, element: 'life',
        desc: 'Fragmento da lendária Árvore-Mundo'
    },

    // === PEDRAS ===
    stone: { 
        name: 'Pedra', icon: '🪨', category: 'stone', 
        value: 3, attack: 1, defense: 2,
        desc: 'Pedra comum'
    },
    granite: { 
        name: 'Granito', icon: '�ite', category: 'stone', 
        value: 12, attack: 2, defense: 4,
        desc: 'Pedra muito dura'
    },
    obsidian: { 
        name: 'Obsidiana', icon: '◼️', category: 'stone', 
        value: 28, attack: 6, defense: 2, element: 'dark',
        desc: 'Vidro vulcânico afiado'
    },
    moonstone: { 
        name: 'Pedra da Lua', icon: '🌙', category: 'stone', 
        value: 45, attack: 3, defense: 5, element: 'magic',
        desc: 'Pedra que brilha à luz da lua'
    },

    // === GEMAS ===
    ruby: { 
        name: 'Rubi', icon: '❤️', category: 'gem', 
        value: 50, attack: 6, defense: 0, element: 'fire',
        desc: 'Gema do fogo ardente'
    },
    sapphire: { 
        name: 'Safira', icon: '💙', category: 'gem', 
        value: 50, attack: 0, defense: 6, element: 'ice',
        desc: 'Gema do gelo eterno'
    },
    emerald: { 
        name: 'Esmeralda', icon: '💚', category: 'gem', 
        value: 50, attack: 3, defense: 3, element: 'nature',
        desc: 'Gema da natureza viva'
    },
    amethyst: { 
        name: 'Ametista', icon: '💜', category: 'gem', 
        value: 45, attack: 4, defense: 2, element: 'magic',
        desc: 'Gema de poder arcano'
    },
    topaz: { 
        name: 'Topázio', icon: '💛', category: 'gem', 
        value: 48, attack: 5, defense: 1, element: 'lightning',
        desc: 'Gema da tempestade'
    },
    diamond: { 
        name: 'Diamante', icon: '💠', category: 'gem', 
        value: 100, attack: 5, defense: 5,
        desc: 'A gema mais pura e valiosa'
    },
    void_crystal: { 
        name: 'Cristal do Vazio', icon: '🔮', category: 'gem', 
        value: 120, attack: 8, defense: 4, element: 'void',
        desc: 'Cristal formado no abismo entre mundos'
    },

    // === COUROS E TECIDOS ===
    leather: { 
        name: 'Couro', icon: '🟤', category: 'fabric', 
        value: 8, attack: 0, defense: 3,
        desc: 'Couro de animal comum'
    },
    silk: { 
        name: 'Seda', icon: '🧵', category: 'fabric', 
        value: 20, attack: 0, defense: 2, element: 'magic',
        desc: 'Tecido mágico e leve'
    },
    dragonhide: { 
        name: 'Couro de Dragão', icon: '🐉', category: 'fabric', 
        value: 90, attack: 3, defense: 10, element: 'fire',
        desc: 'Escamas de dragão ancestral'
    },
    phoenix_feather: { 
        name: 'Pena de Fênix', icon: '🪶', category: 'fabric', 
        value: 85, attack: 2, defense: 4, element: 'fire',
        desc: 'Pena imortal da fênix'
    },

    // === OSSOS E PARTES ===
    bone: { 
        name: 'Osso', icon: '🦴', category: 'bone', 
        value: 6, attack: 2, defense: 1,
        desc: 'Osso de criatura'
    },
    fang: { 
        name: 'Presa', icon: '🦷', category: 'bone', 
        value: 18, attack: 5, defense: 0,
        desc: 'Presa afiada de predador'
    },
    horn: { 
        name: 'Chifre', icon: '🦏', category: 'bone', 
        value: 22, attack: 4, defense: 2,
        desc: 'Chifre de criatura poderosa'
    },
    scale: { 
        name: 'Escama', icon: '🐟', category: 'bone', 
        value: 14, attack: 1, defense: 4,
        desc: 'Escama protetora'
    },
    claw: { 
        name: 'Garra', icon: '🐾', category: 'bone', 
        value: 16, attack: 6, defense: 0,
        desc: 'Garra afiada de fera'
    },
    skull: { 
        name: 'Crânio', icon: '💀', category: 'bone', 
        value: 25, attack: 3, defense: 3, element: 'dark',
        desc: 'Crânio imbuído de energia sombria'
    },
    demon_horn: { 
        name: 'Chifre Demoníaco', icon: '😈', category: 'bone', 
        value: 70, attack: 8, defense: 2, element: 'dark',
        desc: 'Chifre de demônio maior'
    },

    // === ESSÊNCIAS MÁGICAS ===
    fire_essence: { 
        name: 'Essência de Fogo', icon: '🔥', category: 'essence', 
        value: 35, attack: 5, defense: 0, element: 'fire',
        desc: 'Chama condensada em forma pura'
    },
    ice_essence: { 
        name: 'Essência de Gelo', icon: '❄️', category: 'essence', 
        value: 35, attack: 0, defense: 5, element: 'ice',
        desc: 'Frio eterno cristalizado'
    },
    lightning_essence: { 
        name: 'Essência de Raio', icon: '⚡', category: 'essence', 
        value: 35, attack: 4, defense: 1, element: 'lightning',
        desc: 'Poder da tempestade aprisionado'
    },
    nature_essence: { 
        name: 'Essência da Natureza', icon: '🌿', category: 'essence', 
        value: 35, attack: 2, defense: 4, element: 'nature',
        desc: 'Força vital da natureza'
    },
    dark_essence: { 
        name: 'Essência Sombria', icon: '🌑', category: 'essence', 
        value: 45, attack: 6, defense: 2, element: 'dark',
        desc: 'Fragmento de escuridão pura'
    },
    light_essence: { 
        name: 'Essência de Luz', icon: '✨', category: 'essence', 
        value: 45, attack: 2, defense: 6, element: 'light',
        desc: 'Luz divina condensada'
    },
    soul_fragment: { 
        name: 'Fragmento de Alma', icon: '👻', category: 'essence', 
        value: 70, attack: 4, defense: 4, element: 'soul',
        desc: 'Essência de um ser poderoso'
    },
    void_essence: { 
        name: 'Essência do Vazio', icon: '🕳️', category: 'essence', 
        value: 100, attack: 7, defense: 3, element: 'void',
        desc: 'Energia do nada absoluto'
    }
};

// Tipos de equipamento
const EQUIPMENT_SLOTS = ['weapon', 'helmet', 'armor', 'pants', 'boots', 'gloves', 'accessory'];

// Nomes de equipamentos por categoria e tipo
const EQUIPMENT_NAMES = {
    weapon: {
        metal: ['Espada', 'Machado', 'Martelo', 'Lança', 'Adaga', 'Alabarda', 'Foice'],
        wood: ['Cajado', 'Arco', 'Lança', 'Clava', 'Bastão'],
        bone: ['Foice de Osso', 'Lâmina Ossea', 'Tridente', 'Machado Tribal'],
        stone: ['Martelo de Pedra', 'Machado Primitivo', 'Maça'],
        gem: ['Cetro', 'Orbe', 'Varinha', 'Bastão Arcano'],
        essence: ['Lâmina Elemental', 'Arma Etérea', 'Cristal de Poder'],
        fabric: ['Chicote', 'Funda']
    },
    helmet: {
        metal: ['Elmo', 'Capacete', 'Coroa de Batalha', 'Viseira'],
        wood: ['Capuz Reforçado', 'Máscara de Madeira'],
        bone: ['Crânio de Guerra', 'Coroa de Ossos', 'Máscara Tribal'],
        fabric: ['Capuz', 'Bandana', 'Touca Mágica'],
        gem: ['Tiara', 'Diadema', 'Coroa Cristalina'],
        stone: ['Elmo de Pedra'],
        essence: ['Auréola', 'Coroa Elemental']
    },
    armor: {
        metal: ['Armadura de Placas', 'Cota de Malha', 'Peitoral', 'Couraça'],
        wood: ['Armadura de Madeira', 'Colete Florestal'],
        fabric: ['Túnica', 'Manto', 'Vestes', 'Robe'],
        bone: ['Armadura de Ossos', 'Couraça Tribal'],
        gem: ['Armadura Cristalina'],
        stone: ['Armadura de Pedra'],
        essence: ['Manto Elemental', 'Armadura Etérea']
    },
    pants: {
        metal: ['Grevas', 'Calças de Malha', 'Proteções de Aço'],
        fabric: ['Calças de Couro', 'Calças de Tecido', 'Calças Mágicas'],
        bone: ['Proteções de Osso'],
        wood: ['Calças Florestais'],
        gem: ['Calças Cristalinas'],
        stone: ['Proteções de Pedra'],
        essence: ['Calças Etéreas']
    },
    boots: {
        metal: ['Botas de Aço', 'Sabatons', 'Botas Blindadas'],
        fabric: ['Botas de Couro', 'Sandálias', 'Sapatos Mágicos'],
        wood: ['Botas Florestais', 'Tamancos'],
        bone: ['Botas de Osso'],
        gem: ['Botas Cristalinas'],
        stone: ['Botas de Pedra'],
        essence: ['Botas Etéreas']
    },
    gloves: {
        metal: ['Manoplas', 'Luvas de Aço', 'Guarda-mãos'],
        fabric: ['Luvas de Couro', 'Luvas de Tecido', 'Mitenes'],
        bone: ['Garras de Guerra', 'Luvas de Osso'],
        wood: ['Luvas Florestais'],
        gem: ['Luvas Cristalinas'],
        stone: ['Luvas de Pedra'],
        essence: ['Luvas Etéreas']
    },
    accessory: {
        gem: ['Anel', 'Amuleto', 'Bracelete', 'Colar', 'Pingente'],
        metal: ['Anel de Metal', 'Corrente', 'Medalhão', 'Broche'],
        essence: ['Talismã', 'Relíquia', 'Amuleto Arcano', 'Foco Mágico'],
        bone: ['Colar de Ossos', 'Amuleto Tribal'],
        fabric: ['Bracelete de Couro', 'Faixa Mágica'],
        wood: ['Amuleto de Madeira'],
        stone: ['Anel de Pedra']
    }
};

// Prefixos por raridade
const RARITY_PREFIXES = {
    common: ['', 'Simples', 'Básico', 'Comum'],
    uncommon: ['Refinado', 'Polido', 'Bom', 'Decente'],
    rare: ['Superior', 'Fino', 'Excelente', 'Notável'],
    epic: ['Magnífico', 'Soberbo', 'Majestoso', 'Grandioso'],
    legendary: ['Lendário', 'Ancestral', 'Divino', 'Sagrado'],
    mythic: ['Primordial', 'Cósmico', 'Eterno', 'Transcendente']
};

// Sufixos por elemento
const ELEMENT_SUFFIXES = {
    fire: ['das Chamas', 'do Inferno', 'Flamejante', 'Incandescente'],
    ice: ['do Gelo', 'Congelante', 'do Inverno', 'Glacial'],
    lightning: ['do Trovão', 'da Tempestade', 'Elétrico', 'Fulminante'],
    nature: ['da Natureza', 'da Floresta', 'Verdejante', 'Selvagem'],
    dark: ['das Sombras', 'da Escuridão', 'Sombrio', 'Maldito'],
    light: ['da Luz', 'Sagrado', 'Radiante', 'Abençoado'],
    holy: ['Sagrado', 'Divino', 'Abençoado', 'Purificador'],
    magic: ['Arcano', 'Místico', 'Encantado', 'Mágico'],
    soul: ['das Almas', 'Espiritual', 'Fantasmagórico'],
    void: ['do Vazio', 'do Abismo', 'do Nada', 'Dimensional'],
    luck: ['da Fortuna', 'da Sorte', 'Afortunado'],
    life: ['da Vida', 'Vital', 'Restaurador']
};

// Ícones de equipamento por tipo e categoria
const EQUIPMENT_ICONS = {
    weapon: {
        metal: ['⚔️', '🗡️', '🔪', '⚒️', '🪓'],
        wood: ['🏹', '🪄', '🏑', '🪃'],
        bone: ['💀', '🦴'],
        gem: ['🔮', '💎', '✨'],
        essence: ['⚡', '🔥', '❄️', '✨'],
        stone: ['🪨', '⚒️'],
        fabric: ['🎀']
    },
    helmet: {
        metal: ['⛑️', '🪖', '👑'],
        default: ['🎭', '👒']
    },
    armor: {
        metal: ['🛡️', '⚙️'],
        fabric: ['👘', '🥋', '🧥'],
        default: ['🎽']
    },
    pants: { default: ['👖'] },
    boots: { default: ['👢', '👟', '🥾'] },
    gloves: { default: ['🧤', '🥊'] },
    accessory: {
        gem: ['💍', '📿', '🧿'],
        default: ['📿', '🎖️']
    }
};

// Inimigos por tier (a cada 5 andares sobe o tier)
const ENEMY_TIERS = [
    // Tier 0 (Andar 1-5)
    {
        names: ['Slime', 'Goblin', 'Rato Gigante', 'Esqueleto', 'Kobold', 'Morcego'],
        colors: ['#90EE90', '#98FB98', '#87CEEB', '#DDA0DD'],
        drops: ['wood', 'stone', 'bone', 'leather', 'iron'],
        maxRarity: 'uncommon'
    },
    // Tier 1 (Andar 6-10)
    {
        names: ['Orc', 'Lobo Sombrio', 'Golem de Pedra', 'Harpia', 'Troll', 'Ogro'],
        colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'],
        drops: ['iron', 'steel', 'oak', 'fang', 'scale', 'granite'],
        maxRarity: 'rare'
    },
    // Tier 2 (Andar 11-20)
    {
        names: ['Cavaleiro Negro', 'Elemental de Fogo', 'Naga', 'Quimera', 'Ciclope', 'Basilisco'],
        colors: ['#FF6347', '#FF4500', '#DC143C', '#B22222'],
        drops: ['steel', 'silver', 'ruby', 'sapphire', 'fire_essence', 'ice_essence', 'darkwood'],
        maxRarity: 'epic'
    },
    // Tier 3 (Andar 21-35)
    {
        names: ['Demônio Menor', 'Hidra', 'Lich', 'Behemoth', 'Fênix', 'Wyrm'],
        colors: ['#9932CC', '#8B008B', '#800080', '#4B0082'],
        drops: ['mithril', 'titanium', 'emerald', 'amethyst', 'dragonhide', 'lightning_essence', 'dark_essence', 'demon_horn'],
        maxRarity: 'legendary'
    },
    // Tier 4 (Andar 36-50)
    {
        names: ['Dragão Ancião', 'Arcanjo Caído', 'Senhor Demônio', 'Titã', 'Leviatã'],
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1'],
        drops: ['diamond', 'adamantium', 'elderwood', 'void_crystal', 'light_essence', 'soul_fragment', 'phoenix_feather'],
        maxRarity: 'mythic'
    },
    // Tier 5 (Andar 51+)
    {
        names: ['Deus da Guerra', 'Entidade Cósmica', 'Abominação Primordial', 'O Esquecido', 'Vazio Encarnado', 'Avatar do Caos'],
        colors: ['#FF0000', '#FF1493', '#00FFFF', '#FFFF00'],
        drops: ['diamond', 'adamantium', 'void_crystal', 'soul_fragment', 'void_essence', 'worldtree', 'moonstone'],
        maxRarity: 'mythic'
    }
];

// ==========================================
// ESTADO DO JOGO
// ==========================================

const gameState = {
    // Estado geral
    running: false,
    paused: false,
    wave: 1,
    gold: 0,
    
    // Player
    player: {
        x: 150,
        y: 0,
        width: 60,
        height: 90,
        hp: CONFIG.PLAYER_BASE_HP,
        maxHp: CONFIG.PLAYER_BASE_HP,
        baseAttack: CONFIG.PLAYER_BASE_ATK,
        baseDefense: CONFIG.PLAYER_BASE_DEF,
        attack: CONFIG.PLAYER_BASE_ATK,
        defense: CONFIG.PLAYER_BASE_DEF,
        attackCooldown: 0,
        isAttacking: false,
        facingRight: true,
        color: '#4a90d9'
    },
    
    // Enemy
    enemy: {
        x: 0,
        y: 0,
        width: 60,
        height: 90,
        hp: CONFIG.ENEMY_BASE_HP,
        maxHp: CONFIG.ENEMY_BASE_HP,
        attack: CONFIG.ENEMY_BASE_ATK,
        defense: CONFIG.ENEMY_BASE_DEF,
        attackCooldown: 0,
        attackInterval: 2000,
        lastAttack: 0,
        isAttacking: false,
        name: 'Slime',
        color: '#90EE90',
        tier: 0
    },
    
    // Inventário
    inventory: {
        materials: {},  // { materialId_rarity: { id, rarity, count } }
        equipment: []   // Array de equipamentos criados
    },
    
    // Equipamento do player
    equipment: {
        weapon: null,
        helmet: null,
        armor: null,
        pants: null,
        boots: null,
        gloves: null,
        accessory: null
    },
    
    // Craft
    craftSlots: [null, null, null],
    craftPreview: null,
    
    // Input
    keys: {},
    
    // Canvas
    canvas: null,
    ctx: null,
    arenaWidth: 0,
    arenaHeight: 0
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================

function init() {
    // Setup canvas
    gameState.canvas = document.getElementById('game-canvas');
    gameState.ctx = gameState.canvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup UI
    setupUI();
    
    console.log('🎮 Alquimia Combat inicializado!');
}

function resizeCanvas() {
    const container = gameState.canvas.parentElement;
    gameState.canvas.width = container.clientWidth - 6;
    gameState.canvas.height = container.clientHeight - 200;
    
    gameState.arenaWidth = gameState.canvas.width;
    gameState.arenaHeight = gameState.canvas.height;
    
    // Ajusta posição Y dos personagens
    const groundY = gameState.arenaHeight - 120;
    gameState.player.y = groundY - gameState.player.height;
    gameState.enemy.y = groundY - gameState.enemy.height;
    
    // Ajusta posição X do inimigo
    if (gameState.enemy.x === 0) {
        gameState.enemy.x = gameState.arenaWidth - 150 - gameState.enemy.width;
    }
}

function setupEventListeners() {
    // Keyboard
    document.addEventListener('keydown', (e) => {
        gameState.keys[e.code] = true;
        
        // Teclas de ação
        if (e.code === 'Space' || e.code === 'KeyJ') {
            e.preventDefault();
            if (gameState.running && !gameState.paused) {
                playerAttack();
            }
        }
        
        // Menus
        if (e.code === 'KeyI') toggleInventory();
        if (e.code === 'KeyC') toggleCraft();
        if (e.code === 'KeyE') toggleEquipment();
        if (e.code === 'Escape') closeAllModals();
    });
    
    document.addEventListener('keyup', (e) => {
        gameState.keys[e.code] = false;
    });
    
    // Mobile controls
    document.getElementById('btn-left')?.addEventListener('touchstart', () => gameState.keys['ArrowLeft'] = true);
    document.getElementById('btn-left')?.addEventListener('touchend', () => gameState.keys['ArrowLeft'] = false);
    document.getElementById('btn-right')?.addEventListener('touchstart', () => gameState.keys['ArrowRight'] = true);
    document.getElementById('btn-right')?.addEventListener('touchend', () => gameState.keys['ArrowRight'] = false);
    document.getElementById('btn-attack')?.addEventListener('touchstart', playerAttack);
    
    // Botões de menu
    document.getElementById('start-btn')?.addEventListener('click', startGame);
    document.getElementById('btn-inventory')?.addEventListener('click', toggleInventory);
    document.getElementById('btn-craft')?.addEventListener('click', toggleCraft);
    document.getElementById('btn-equipment')?.addEventListener('click', toggleEquipment);
    document.getElementById('next-wave-btn')?.addEventListener('click', nextWave);
    document.getElementById('restart-btn')?.addEventListener('click', restartGame);
    document.getElementById('craft-btn')?.addEventListener('click', performCraft);
}

function setupUI() {
    // Setup craft slots click
    document.querySelectorAll('.craft-slot:not(.result)').forEach(slot => {
        slot.addEventListener('click', () => {
            const index = parseInt(slot.dataset.slot);
            if (gameState.craftSlots[index]) {
                removeCraftSlot(index);
            }
        });
    });
    
    // Tooltip
    createTooltip();
}

function createTooltip() {
    if (!document.getElementById('tooltip')) {
        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.className = 'hidden';
        tooltip.innerHTML = `
            <div class="tooltip-name"></div>
            <div class="tooltip-rarity"></div>
            <div class="tooltip-stats"></div>
            <div class="tooltip-desc"></div>
        `;
        document.body.appendChild(tooltip);
    }
}

// ==========================================
// GAME LOOP
// ==========================================

function startGame() {
    document.getElementById('title-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Dá alguns materiais iniciais
    addMaterial('wood', 'common', 5);
    addMaterial('stone', 'common', 5);
    addMaterial('iron', 'common', 3);
    addMaterial('leather', 'common', 3);
    addMaterial('bone', 'common', 2);
    
    resizeCanvas();
    initEnemy();
    
    gameState.running = true;
    gameState.paused = false;
    
    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (!gameState.running) {
        requestAnimationFrame(gameLoop);
        return;
    }
    
    if (!gameState.paused) {
        update(timestamp);
        render();
    }
    
    requestAnimationFrame(gameLoop);
}

function update(timestamp) {
    // Movimento do player
    const speed = CONFIG.PLAYER_SPEED;
    
    if (gameState.keys['ArrowLeft'] || gameState.keys['KeyA']) {
        gameState.player.x = Math.max(10, gameState.player.x - speed);
        gameState.player.facingRight = false;
    }
    if (gameState.keys['ArrowRight'] || gameState.keys['KeyD']) {
        gameState.player.x = Math.min(gameState.arenaWidth - gameState.player.width - 10, gameState.player.x + speed);
        gameState.player.facingRight = true;
    }
    
    // Cooldown de ataque do player
    if (gameState.player.attackCooldown > 0) {
        gameState.player.attackCooldown -= 16;
    }
    
    // IA do inimigo
    updateEnemy(timestamp);
}

function render() {
    const ctx = gameState.ctx;
    
    // Limpa canvas
    ctx.clearRect(0, 0, gameState.arenaWidth, gameState.arenaHeight);
    
    // Desenha fundo
    drawBackground(ctx);
    
    // Desenha personagens
    drawCharacter(ctx, gameState.player, true);
    drawCharacter(ctx, gameState.enemy, false);
}

function drawBackground(ctx) {
    // Gradiente de fundo
    const gradient = ctx.createLinearGradient(0, 0, 0, gameState.arenaHeight);
    gradient.addColorStop(0, '#2d1b4e');
    gradient.addColorStop(0.6, '#1a0a2e');
    gradient.addColorStop(1, '#3d2a1f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, gameState.arenaWidth, gameState.arenaHeight);
    
    // Chão
    const groundY = gameState.arenaHeight - 100;
    ctx.fillStyle = '#5a3d2a';
    ctx.fillRect(0, groundY, gameState.arenaWidth, 100);
    
    // Linha do chão
    ctx.strokeStyle = '#6b4423';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(gameState.arenaWidth, groundY);
    ctx.stroke();
    
    // Algumas pedras decorativas
    ctx.fillStyle = '#4a3320';
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(100 + i * 200, groundY + 50, 15 + Math.random() * 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawCharacter(ctx, char, isPlayer) {
    const x = char.x;
    const y = char.y;
    const w = char.width;
    const h = char.height;
    
    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x + w/2, y + h + 5, w/2, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Corpo
    const bodyGradient = ctx.createLinearGradient(x, y, x, y + h);
    if (isPlayer) {
        bodyGradient.addColorStop(0, '#4a90d9');
        bodyGradient.addColorStop(1, '#2d5a8a');
    } else {
        bodyGradient.addColorStop(0, char.color);
        bodyGradient.addColorStop(1, shadeColor(char.color, -30));
    }
    
    ctx.fillStyle = bodyGradient;
    roundRect(ctx, x, y + 30, w, h - 30, 10);
    ctx.fill();
    
    // Borda
    ctx.strokeStyle = isPlayer ? '#6bb3ff' : shadeColor(char.color, 30);
    ctx.lineWidth = 3;
    roundRect(ctx, x, y + 30, w, h - 30, 10);
    ctx.stroke();
    
    // Cabeça
    ctx.fillStyle = isPlayer ? '#ffd699' : '#99ffd6';
    ctx.beginPath();
    ctx.arc(x + w/2, y + 25, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = isPlayer ? '#e6b366' : '#66e6b3';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Olhos
    ctx.fillStyle = '#333';
    const eyeOffset = isPlayer ? (char.facingRight ? 5 : -5) : (char.x > gameState.player.x ? -5 : 5);
    ctx.beginPath();
    ctx.arc(x + w/2 - 6 + eyeOffset, y + 22, 3, 0, Math.PI * 2);
    ctx.arc(x + w/2 + 6 + eyeOffset, y + 22, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Arma (se equipada ou padrão)
    const weaponX = isPlayer ? x + w + 5 : x - 25;
    const weaponY = y + h/2;
    
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (isPlayer && gameState.equipment.weapon) {
        ctx.fillText(gameState.equipment.weapon.icon, weaponX, weaponY);
    } else if (isPlayer) {
        ctx.fillText('⚔️', weaponX, weaponY);
    } else {
        ctx.fillText('🗡️', weaponX, weaponY);
    }
    
    // Efeito de ataque
    if (char.isAttacking) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(isPlayer ? x + w + 30 : x - 30, y + h/2, 30, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Nome
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(isPlayer ? 'Herói' : char.name, x + w/2, y - 10);
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function shadeColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// ==========================================
// SISTEMA DE COMBATE
// ==========================================

function playerAttack() {
    if (gameState.player.attackCooldown > 0 || gameState.paused) return;
    
    const distance = Math.abs(gameState.enemy.x - gameState.player.x);
    if (distance > CONFIG.ATTACK_RANGE + 50) return;
    
    gameState.player.isAttacking = true;
    gameState.player.attackCooldown = CONFIG.ATTACK_COOLDOWN;
    
    setTimeout(() => {
        gameState.player.isAttacking = false;
    }, 200);
    
    // Calcula dano
    const baseDamage = gameState.player.attack;
    const defense = gameState.enemy.defense;
    const variance = 0.9 + Math.random() * 0.2;
    const damage = Math.max(1, Math.floor(baseDamage * (100 / (100 + defense)) * variance));
    
    // Aplica dano
    gameState.enemy.hp = Math.max(0, gameState.enemy.hp - damage);
    
    // Feedback visual
    showDamagePopup(gameState.enemy.x + gameState.enemy.width/2, gameState.enemy.y, damage);
    updateHUD();
    
    // Verifica morte
    if (gameState.enemy.hp <= 0) {
        enemyDefeated();
    }
}

function enemyAttack() {
    if (gameState.paused) return;
    
    gameState.enemy.isAttacking = true;
    
    setTimeout(() => {
        gameState.enemy.isAttacking = false;
    }, 200);
    
    // Calcula dano
    const baseDamage = gameState.enemy.attack;
    const defense = gameState.player.defense;
    const variance = 0.9 + Math.random() * 0.2;
    const damage = Math.max(1, Math.floor(baseDamage * (100 / (100 + defense)) * variance));
    
    // Aplica dano
    gameState.player.hp = Math.max(0, gameState.player.hp - damage);
    
    // Feedback visual
    showDamagePopup(gameState.player.x + gameState.player.width/2, gameState.player.y, damage);
    updateHUD();
    
    // Verifica morte
    if (gameState.player.hp <= 0) {
        playerDefeated();
    }
}

function updateEnemy(timestamp) {
    const enemy = gameState.enemy;
    const player = gameState.player;
    
    // Movimento em direção ao player
    const distance = Math.abs(enemy.x - player.x);
    const attackRange = CONFIG.ATTACK_RANGE;
    
    if (distance > attackRange) {
        const speed = 2 + gameState.wave * 0.1;
        if (enemy.x > player.x) {
            enemy.x -= speed;
        } else {
            enemy.x += speed;
        }
    }
    
    // Ataque
    if (distance <= attackRange + 30) {
        if (timestamp - enemy.lastAttack >= enemy.attackInterval) {
            enemy.lastAttack = timestamp;
            enemyAttack();
        }
    }
}

function showDamagePopup(x, y, damage, isHeal = false) {
    const popup = document.createElement('div');
    popup.className = `damage-popup ${isHeal ? 'heal' : ''}`;
    popup.textContent = isHeal ? `+${damage}` : `-${damage}`;
    popup.style.left = `${x + gameState.canvas.offsetLeft}px`;
    popup.style.top = `${y + gameState.canvas.offsetTop}px`;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.remove(), 1000);
}

function updateHUD() {
    // Player
    document.getElementById('player-health-fill').style.width = 
        `${(gameState.player.hp / gameState.player.maxHp) * 100}%`;
    document.getElementById('player-health-text').textContent = 
        `${gameState.player.hp}/${gameState.player.maxHp}`;
    document.getElementById('player-atk').textContent = gameState.player.attack;
    document.getElementById('player-def').textContent = gameState.player.defense;
    
    // Enemy
    document.getElementById('enemy-health-fill').style.width = 
        `${(gameState.enemy.hp / gameState.enemy.maxHp) * 100}%`;
    document.getElementById('enemy-health-text').textContent = 
        `${gameState.enemy.hp}/${gameState.enemy.maxHp}`;
    document.getElementById('enemy-atk').textContent = gameState.enemy.attack;
    document.getElementById('enemy-def').textContent = gameState.enemy.defense;
    document.getElementById('enemy-name').textContent = `${gameState.enemy.name} Lv.${gameState.wave}`;
    
    // Info
    document.getElementById('wave-counter').textContent = `Onda: ${gameState.wave}`;
    document.getElementById('gold-counter').textContent = `💰 ${gameState.gold}`;
}

// ==========================================
// SISTEMA DE INIMIGOS E PROGRESSÃO
// ==========================================

function initEnemy() {
    const wave = gameState.wave;
    const tier = Math.min(Math.floor((wave - 1) / 5), ENEMY_TIERS.length - 1);
    const tierData = ENEMY_TIERS[tier];
    
    // Seleciona nome e cor aleatórios do tier
    const name = tierData.names[Math.floor(Math.random() * tierData.names.length)];
    const color = tierData.colors[Math.floor(Math.random() * tierData.colors.length)];
    
    // Escala de dificuldade
    const scaleFactor = 1 + (wave * 0.15) + Math.pow(wave, 1.2) * 0.03;
    
    gameState.enemy = {
        x: gameState.arenaWidth - 150 - 60,
        y: gameState.arenaHeight - 120 - 90,
        width: 60,
        height: 90,
        maxHp: Math.floor(CONFIG.ENEMY_BASE_HP * scaleFactor),
        hp: Math.floor(CONFIG.ENEMY_BASE_HP * scaleFactor),
        attack: Math.floor(CONFIG.ENEMY_BASE_ATK * scaleFactor * 0.8),
        defense: Math.floor(CONFIG.ENEMY_BASE_DEF * scaleFactor * 0.5),
        attackInterval: Math.max(600, 2000 - wave * 25),
        lastAttack: 0,
        isAttacking: false,
        name: name,
        color: color,
        tier: tier
    };
    
    updateHUD();
}

function enemyDefeated() {
    gameState.paused = true;
    
    // Gera loot
    const loot = generateLoot();
    
    // Adiciona gold
    const goldReward = 10 + gameState.wave * 5 + Math.floor(Math.random() * gameState.wave * 3);
    gameState.gold += goldReward;
    
    // Mostra modal de vitória
    showVictoryModal(loot, goldReward);
}

function playerDefeated() {
    gameState.running = false;
    
    document.getElementById('defeat-wave').textContent = gameState.wave;
    document.getElementById('defeat-modal').classList.remove('hidden');
}

function nextWave() {
    document.getElementById('victory-modal').classList.add('hidden');
    
    gameState.wave++;
    
    // Cura parcial
    const healAmount = Math.floor(gameState.player.maxHp * CONFIG.HEAL_PERCENT_ON_VICTORY);
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healAmount);
    
    // Reset posições
    gameState.player.x = 150;
    
    initEnemy();
    
    gameState.paused = false;
}

function restartGame() {
    document.getElementById('defeat-modal').classList.add('hidden');
    
    // Reset completo
    gameState.wave = 1;
    gameState.gold = 0;
    gameState.player.hp = gameState.player.maxHp;
    gameState.player.x = 150;
    
    // Limpa inventário e equipamento
    gameState.inventory = { materials: {}, equipment: [] };
    gameState.equipment = {
        weapon: null, helmet: null, armor: null,
        pants: null, boots: null, gloves: null, accessory: null
    };
    gameState.craftSlots = [null, null, null];
    
    // Materiais iniciais
    addMaterial('wood', 'common', 5);
    addMaterial('stone', 'common', 5);
    addMaterial('iron', 'common', 3);
    addMaterial('leather', 'common', 3);
    addMaterial('bone', 'common', 2);
    
    recalculatePlayerStats();
    initEnemy();
    
    gameState.running = true;
    gameState.paused = false;
}

// ==========================================
// SISTEMA DE LOOT
// ==========================================

function generateLoot() {
    const tier = Math.min(Math.floor((gameState.wave - 1) / 5), ENEMY_TIERS.length - 1);
    const tierData = ENEMY_TIERS[tier];
    const loot = [];
    
    // Quantidade de drops
    const dropCount = 2 + tier + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < dropCount; i++) {
        const materialId = tierData.drops[Math.floor(Math.random() * tierData.drops.length)];
        const rarity = rollRarity(gameState.wave, tierData.maxRarity);
        const quantity = 1 + Math.floor(Math.random() * (1 + tier));
        
        loot.push({ materialId, rarity, quantity });
        addMaterial(materialId, rarity, quantity);
    }
    
    return loot;
}

function rollRarity(wave, maxRarity) {
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
    const maxIndex = rarityOrder.indexOf(maxRarity);
    
    // Calcula pesos ajustados pelo andar
    const weights = {};
    let totalWeight = 0;
    
    for (let i = 0; i <= maxIndex; i++) {
        const rarity = rarityOrder[i];
        let weight = RARITIES[rarity].dropWeight;
        
        // Bônus de peso para raridades maiores conforme avança
        if (i > 0) {
            weight += wave * 0.5;
        }
        
        weights[rarity] = weight;
        totalWeight += weight;
    }
    
    // Roll
    let roll = Math.random() * totalWeight;
    for (const [rarity, weight] of Object.entries(weights)) {
        roll -= weight;
        if (roll <= 0) {
            return rarity;
        }
    }
    
    return 'common';
}

function showVictoryModal(loot, gold) {
    const modal = document.getElementById('victory-modal');
    const lootDisplay = document.getElementById('loot-display');
    
    lootDisplay.innerHTML = `
        <div class="loot-item">
            <span class="loot-icon">💰</span>
            <span class="loot-name">Ouro</span>
            <span class="loot-count">+${gold}</span>
        </div>
    `;
    
    for (const drop of loot) {
        const material = MATERIALS[drop.materialId];
        const rarity = RARITIES[drop.rarity];
        
        const item = document.createElement('div');
        item.className = `loot-item rarity-${drop.rarity}`;
        item.innerHTML = `
            <span class="loot-icon">${material.icon}</span>
            <span class="loot-name" style="color: ${rarity.color}">${rarity.name}</span>
            <span class="loot-name">${material.name}</span>
            <span class="loot-count">x${drop.quantity}</span>
        `;
        lootDisplay.appendChild(item);
    }
    
    modal.classList.remove('hidden');
}

// ==========================================
// SISTEMA DE INVENTÁRIO
// ==========================================

function addMaterial(materialId, rarity, count = 1) {
    const key = `${materialId}_${rarity}`;
    
    if (!gameState.inventory.materials[key]) {
        gameState.inventory.materials[key] = {
            id: materialId,
            rarity: rarity,
            count: 0
        };
    }
    
    gameState.inventory.materials[key].count += count;
}

function removeMaterial(materialId, rarity, count = 1) {
    const key = `${materialId}_${rarity}`;
    
    if (gameState.inventory.materials[key]) {
        gameState.inventory.materials[key].count -= count;
        
        if (gameState.inventory.materials[key].count <= 0) {
            delete gameState.inventory.materials[key];
        }
        return true;
    }
    return false;
}

function getMaterialCount(materialId, rarity) {
    const key = `${materialId}_${rarity}`;
    return gameState.inventory.materials[key]?.count || 0;
}

// ==========================================
// SISTEMA DE CRAFT ALQUÍMICO
// ==========================================

function addToCraftSlot(materialId, rarity) {
    // Verifica se tem o material
    if (getMaterialCount(materialId, rarity) < 1) return;
    
    // Encontra slot vazio
    const emptyIndex = gameState.craftSlots.findIndex(s => s === null);
    if (emptyIndex === -1) return;
    
    gameState.craftSlots[emptyIndex] = { id: materialId, rarity: rarity };
    updateCraftUI();
}

function removeCraftSlot(index) {
    gameState.craftSlots[index] = null;
    updateCraftUI();
}

function updateCraftUI() {
    // Atualiza slots visuais
    document.querySelectorAll('.craft-slot:not(.result)').forEach((slot, index) => {
        const item = gameState.craftSlots[index];
        
        if (item) {
            const material = MATERIALS[item.id];
            slot.textContent = material.icon;
            slot.classList.add('filled', `rarity-${item.rarity}`);
        } else {
            slot.textContent = '';
            slot.classList.remove('filled');
            Object.keys(RARITIES).forEach(r => slot.classList.remove(`rarity-${r}`));
        }
    });
    
    // Calcula preview
    const preview = calculateCraftResult();
    const resultSlot = document.getElementById('craft-result');
    const craftBtn = document.getElementById('craft-btn');
    const previewDiv = document.getElementById('craft-preview');
    
    if (preview) {
        resultSlot.textContent = preview.icon;
        resultSlot.className = `craft-slot result rarity-${preview.rarity}`;
        craftBtn.disabled = false;
        previewDiv.innerHTML = `
            <strong style="color: ${RARITIES[preview.rarity].color}">${preview.name}</strong><br>
            <span style="color: #4ade80">ATK: +${preview.attack}</span> | 
            <span style="color: #60a5fa">DEF: +${preview.defense}</span>
            ${preview.element ? `<br><span style="color: #ffd700">Elemento: ${preview.element}</span>` : ''}
        `;
        gameState.craftPreview = preview;
    } else {
        resultSlot.textContent = '?';
        resultSlot.className = 'craft-slot result';
        craftBtn.disabled = true;
        previewDiv.textContent = 'Adicione 2-3 materiais para criar um item';
        gameState.craftPreview = null;
    }
}

function calculateCraftResult() {
    const slots = gameState.craftSlots.filter(s => s !== null);
    if (slots.length < 2) return null;
    
    // Coleta dados dos materiais
    let totalValue = 0;
    let totalAttack = 0;
    let totalDefense = 0;
    const categories = {};
    const elements = [];
    const rarities = [];
    
    for (const slot of slots) {
        const material = MATERIALS[slot.id];
        const rarityData = RARITIES[slot.rarity];
        
        totalValue += material.value * rarityData.multiplier;
        totalAttack += material.attack * rarityData.multiplier;
        totalDefense += material.defense * rarityData.multiplier;
        
        categories[material.category] = (categories[material.category] || 0) + 1;
        
        if (material.element) {
            elements.push(material.element);
        }
        
        rarities.push(slot.rarity);
    }
    
    // Determina categoria dominante
    const dominantCategory = Object.entries(categories)
        .sort((a, b) => b[1] - a[1])[0][0];
    
    // Determina tipo de equipamento baseado nos stats e categorias
    const equipType = determineEquipmentType(dominantCategory, totalAttack, totalDefense, categories);
    
    // Determina raridade do resultado
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
    const avgRarityIndex = rarities.reduce((sum, r) => sum + rarityOrder.indexOf(r), 0) / rarities.length;
    let resultRarityIndex = Math.floor(avgRarityIndex);
    
    // Bônus de raridade se valor total for alto
    if (totalValue > 150) resultRarityIndex = Math.min(resultRarityIndex + 1, 5);
    if (totalValue > 250) resultRarityIndex = Math.min(resultRarityIndex + 1, 5);
    
    const resultRarity = rarityOrder[resultRarityIndex];
    
    // Gera nome do item
    const name = generateItemName(equipType, dominantCategory, resultRarity, elements[0]);
    
    // Calcula stats finais
    const isWeapon = equipType === 'weapon';
    const finalAttack = Math.floor(totalAttack * (isWeapon ? 1.5 : 0.3));
    const finalDefense = Math.floor(totalDefense * (isWeapon ? 0.3 : 1.5));
    
    // Seleciona ícone
    const icon = selectEquipmentIcon(equipType, dominantCategory, elements[0]);
    
    return {
        type: equipType,
        name: name,
        rarity: resultRarity,
        attack: Math.max(1, finalAttack),
        defense: Math.max(1, finalDefense),
        element: elements[0] || null,
        icon: icon,
        category: dominantCategory,
        value: Math.floor(totalValue)
    };
}

function determineEquipmentType(dominantCategory, attack, defense, categories) {
    // Lógica baseada em proporção de ataque/defesa e categorias
    
    // Gemas sozinhas = acessório
    if (categories.gem >= 2 && Object.keys(categories).length <= 2) {
        return 'accessory';
    }
    
    // Essências = acessório ou arma
    if (categories.essence >= 2) {
        return attack > defense ? 'weapon' : 'accessory';
    }
    
    // Ataque muito maior = arma
    if (attack > defense * 1.5) {
        return 'weapon';
    }
    
    // Defesa muito maior = armadura/escudo
    if (defense > attack * 1.5) {
        const armorTypes = ['helmet', 'armor', 'pants', 'boots', 'gloves'];
        return armorTypes[Math.floor(Math.random() * armorTypes.length)];
    }
    
    // Couro/tecido = armadura leve
    if (dominantCategory === 'fabric') {
        const lightArmor = ['armor', 'pants', 'boots', 'gloves'];
        return lightArmor[Math.floor(Math.random() * lightArmor.length)];
    }
    
    // Metal com mais defesa = armadura pesada
    if (dominantCategory === 'metal' && defense >= attack) {
        const heavyArmor = ['helmet', 'armor', 'pants', 'boots', 'gloves'];
        return heavyArmor[Math.floor(Math.random() * heavyArmor.length)];
    }
    
    // Default: arma se ataque >= defesa, senão armadura aleatória
    if (attack >= defense) {
        return 'weapon';
    }
    
    const allArmor = ['helmet', 'armor', 'pants', 'boots', 'gloves'];
    return allArmor[Math.floor(Math.random() * allArmor.length)];
}

function generateItemName(type, category, rarity, element) {
    // Base name
    const typeNames = EQUIPMENT_NAMES[type];
    const categoryNames = typeNames[category] || typeNames[Object.keys(typeNames)[0]];
    const baseName = categoryNames[Math.floor(Math.random() * categoryNames.length)];
    
    // Prefix
    const prefixes = RARITY_PREFIXES[rarity];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    // Suffix
    let suffix = '';
    if (element && ELEMENT_SUFFIXES[element]) {
        const suffixes = ELEMENT_SUFFIXES[element];
        suffix = ' ' + suffixes[Math.floor(Math.random() * suffixes.length)];
    }
    
    return `${prefix ? prefix + ' ' : ''}${baseName}${suffix}`.trim();
}

function selectEquipmentIcon(type, category, element) {
    const typeIcons = EQUIPMENT_ICONS[type];
    const categoryIcons = typeIcons?.[category] || typeIcons?.default || ['❓'];
    
    // Chance de usar ícone elemental
    if (element && Math.random() > 0.5) {
        const elementIcons = {
            fire: '🔥', ice: '❄️', lightning: '⚡', nature: '🌿',
            dark: '🌑', light: '✨', holy: '✝️', magic: '🔮',
            void: '🕳️', life: '💚', soul: '👻', luck: '🍀'
        };
        if (elementIcons[element]) return elementIcons[element];
    }
    
    return categoryIcons[Math.floor(Math.random() * categoryIcons.length)];
}

function performCraft() {
    if (!gameState.craftPreview) return;
    
    // Remove materiais do inventário
    for (const slot of gameState.craftSlots) {
        if (slot) {
            removeMaterial(slot.id, slot.rarity, 1);
        }
    }
    
    // Adiciona equipamento ao inventário
    gameState.inventory.equipment.push({...gameState.craftPreview});
    
    // Limpa slots
    gameState.craftSlots = [null, null, null];
    gameState.craftPreview = null;
    
    // Atualiza UI
    updateCraftUI();
    updateMaterialsGrid();
    
    alert(`✨ Item criado: ${gameState.inventory.equipment[gameState.inventory.equipment.length - 1].name}!`);
}

// ==========================================
// SISTEMA DE EQUIPAMENTO
// ==========================================

function equipItem(index) {
    const item = gameState.inventory.equipment[index];
    if (!item) return;
    
    const slot = item.type;
    
    // Se já tem item equipado, desequipa
    if (gameState.equipment[slot]) {
        gameState.inventory.equipment.push(gameState.equipment[slot]);
    }
    
    // Equipa novo item
    gameState.equipment[slot] = item;
    
    // Remove do inventário
    gameState.inventory.equipment.splice(index, 1);
    
    recalculatePlayerStats();
    updateEquipmentUI();
    updateEquipableItemsGrid();
}

function unequipItem(slot) {
    if (!gameState.equipment[slot]) return;
    
    gameState.inventory.equipment.push(gameState.equipment[slot]);
    gameState.equipment[slot] = null;
    
    recalculatePlayerStats();
    updateEquipmentUI();
    updateEquipableItemsGrid();
}

function recalculatePlayerStats() {
    let bonusAttack = 0;
    let bonusDefense = 0;
    
    for (const slot of EQUIPMENT_SLOTS) {
        const item = gameState.equipment[slot];
        if (item) {
            bonusAttack += item.attack || 0;
            bonusDefense += item.defense || 0;
        }
    }
    
    gameState.player.attack = gameState.player.baseAttack + bonusAttack;
    gameState.player.defense = gameState.player.baseDefense + bonusDefense;
    
    updateHUD();
}

// ==========================================
// UI - MODAIS
// ==========================================

function toggleInventory() {
    const modal = document.getElementById('inventory-modal');
    const isHidden = modal.classList.contains('hidden');
    
    closeAllModals();
    
    if (isHidden) {
        modal.classList.remove('hidden');
        updateInventoryGrid();
        gameState.paused = true;
    }
}

function toggleCraft() {
    const modal = document.getElementById('craft-modal');
    const isHidden = modal.classList.contains('hidden');
    
    closeAllModals();
    
    if (isHidden) {
        modal.classList.remove('hidden');
        updateMaterialsGrid();
        updateCraftUI();
        gameState.paused = true;
    }
}

function toggleEquipment() {
    const modal = document.getElementById('equipment-modal');
    const isHidden = modal.classList.contains('hidden');
    
    closeAllModals();
    
    if (isHidden) {
        modal.classList.remove('hidden');
        updateEquipmentUI();
        updateEquipableItemsGrid();
        gameState.paused = true;
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        if (!modal.id.includes('victory') && !modal.id.includes('defeat')) {
            modal.classList.add('hidden');
        }
    });
    
    if (gameState.running && !document.getElementById('victory-modal').classList.contains('hidden') === false) {
        gameState.paused = false;
    }
}

function updateInventoryGrid() {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';
    
    // Materiais
    for (const [key, data] of Object.entries(gameState.inventory.materials)) {
        const material = MATERIALS[data.id];
        const rarity = RARITIES[data.rarity];
        
        const item = createItemSlot(
            material.icon,
            data.count,
            data.rarity,
            {
                name: `${rarity.name} ${material.name}`,
                rarity: rarity.name,
                rarityColor: rarity.color,
                stats: `ATK: +${material.attack} | DEF: +${material.defense}`,
                desc: material.desc
            }
        );
        
        grid.appendChild(item);
    }
    
    // Equipamentos
    for (let i = 0; i < gameState.inventory.equipment.length; i++) {
        const equip = gameState.inventory.equipment[i];
        const rarity = RARITIES[equip.rarity];
        
        const item = createItemSlot(
            equip.icon,
            null,
            equip.rarity,
            {
                name: equip.name,
                rarity: rarity.name,
                rarityColor: rarity.color,
                stats: `ATK: +${equip.attack} | DEF: +${equip.defense}`,
                desc: `Tipo: ${equip.type}${equip.element ? ` | Elemento: ${equip.element}` : ''}`
            }
        );
        
        grid.appendChild(item);
    }
}

function updateMaterialsGrid() {
    const grid = document.getElementById('materials-grid');
    grid.innerHTML = '';
    
    for (const [key, data] of Object.entries(gameState.inventory.materials)) {
        const material = MATERIALS[data.id];
        const rarity = RARITIES[data.rarity];
        
        const item = createItemSlot(
            material.icon,
            data.count,
            data.rarity,
            {
                name: `${rarity.name} ${material.name}`,
                rarity: rarity.name,
                rarityColor: rarity.color,
                stats: `ATK: +${material.attack} | DEF: +${material.defense}`,
                desc: material.desc
            },
            () => addToCraftSlot(data.id, data.rarity)
        );
        
        grid.appendChild(item);
    }
}

function updateEquipmentUI() {
    document.querySelectorAll('.equip-slot').forEach(slotEl => {
        const slotName = slotEl.dataset.slot;
        const item = gameState.equipment[slotName];
        const content = slotEl.querySelector('.slot-content');
        
        // Remove classes de raridade anteriores
        Object.keys(RARITIES).forEach(r => slotEl.classList.remove(`rarity-${r}`));
        
        if (item) {
            content.textContent = item.icon;
            slotEl.classList.add('equipped', `rarity-${item.rarity}`);
            slotEl.onclick = () => unequipItem(slotName);
            
            slotEl.onmouseenter = (e) => showTooltip(e, {
                name: item.name,
                rarity: RARITIES[item.rarity].name,
                rarityColor: RARITIES[item.rarity].color,
                stats: `ATK: +${item.attack} | DEF: +${item.defense}`,
                desc: 'Clique para desequipar'
            });
            slotEl.onmouseleave = hideTooltip;
        } else {
            content.textContent = '';
            slotEl.classList.remove('equipped');
            slotEl.onclick = null;
            slotEl.onmouseenter = null;
            slotEl.onmouseleave = null;
        }
    });
}

function updateEquipableItemsGrid() {
    const grid = document.getElementById('equipable-items');
    grid.innerHTML = '';
    
    gameState.inventory.equipment.forEach((equip, index) => {
        const rarity = RARITIES[equip.rarity];
        
        const item = createItemSlot(
            equip.icon,
            null,
            equip.rarity,
            {
                name: equip.name,
                rarity: rarity.name,
                rarityColor: rarity.color,
                stats: `ATK: +${equip.attack} | DEF: +${equip.defense}`,
                desc: `Tipo: ${equip.type} | Clique para equipar`
            },
            () => equipItem(index)
        );
        
        grid.appendChild(item);
    });
}

function createItemSlot(icon, count, rarity, tooltipData, onClick) {
    const item = document.createElement('div');
    item.className = `item-slot rarity-${rarity}`;
    item.innerHTML = `
        <span class="item-icon">${icon}</span>
        ${count ? `<span class="item-count">x${count}</span>` : ''}
    `;
    
    if (onClick) {
        item.onclick = onClick;
    }
    
    item.onmouseenter = (e) => showTooltip(e, tooltipData);
    item.onmouseleave = hideTooltip;
    
    return item;
}

function showTooltip(e, data) {
    const tooltip = document.getElementById('tooltip');
    
    tooltip.querySelector('.tooltip-name').textContent = data.name;
    tooltip.querySelector('.tooltip-name').style.color = data.rarityColor || '#fff';
    tooltip.querySelector('.tooltip-rarity').textContent = data.rarity;
    tooltip.querySelector('.tooltip-rarity').style.color = data.rarityColor || '#aaa';
    tooltip.querySelector('.tooltip-stats').textContent = data.stats;
    tooltip.querySelector('.tooltip-desc').textContent = data.desc;
    
    tooltip.classList.remove('hidden');
    
    const x = Math.min(e.pageX + 15, window.innerWidth - 300);
    const y = Math.min(e.pageY + 15, window.innerHeight - 150);
    
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

function hideTooltip() {
    document.getElementById('tooltip').classList.add('hidden');
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', init);
