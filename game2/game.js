class GameState {
    constructor() {
        this.gameState = 'menu'; // menu, deck-selection, battle, game-over
        this.initializeGame();
    }

    initializeGame() {
        this.playerHand = this.selectRandomCards(20);
        this.computerHand = this.selectRandomCards(20);
        this.playerRounds = 0;
        this.computerRounds = 0;
        this.playerWons = [];
        this.computerWons = [];
        this.currentRound = 0;
        this.playerSelectedCard = null;
        this.playerDefenseCard = null;
    }

    selectRandomCards(count) {
        let selected = [];
        let available = [...cartas];
        for (let i = 0; i < count && available.length > 0; i++) {
            let randomIndex = Math.floor(Math.random() * available.length);
            selected.push(available[randomIndex]);
            available.splice(randomIndex, 1);
        }
        return selected;
    }

    selectPlayerHand(selectedIds) {
        this.playerHand = this.playerHand.filter(c => selectedIds.includes(c.id));
        this.computerHand = this.selectRandomCards(9);
    }

    executeRound(attackingCardId, defendingCardId, selectedAttribute) {
        console.log('[GameState.executeRound] Parametros recebidos:', { attackingCardId, defendingCardId, selectedAttribute });
        console.log('[GameState.executeRound] currentRound:', this.currentRound);
        
        let attackingCard, defendingCard;
        const isPlayerAttacking = (this.currentRound % 2 === 0);
        console.log('[GameState.executeRound] isPlayerAttacking:', isPlayerAttacking);
        
        // Obter cartas atacante/defensora
        if (isPlayerAttacking) {
            console.log('[GameState] Procurando em playerHand:', this.playerHand.length, 'cartas');
            console.log('[GameState] playerHand IDs:', this.playerHand.map(c => c.id));
            attackingCard = this.playerHand.find(c => c.id === attackingCardId);
            
            console.log('[GameState] Procurando em computerHand:', this.computerHand.length, 'cartas');
            console.log('[GameState] computerHand IDs:', this.computerHand.map(c => c.id));
            defendingCard = this.computerHand.find(c => c.id === defendingCardId);
        } else {
            console.log('[GameState] Procurando em computerHand:', this.computerHand.length, 'cartas');
            console.log('[GameState] computerHand IDs:', this.computerHand.map(c => c.id));
            attackingCard = this.computerHand.find(c => c.id === attackingCardId);
            
            console.log('[GameState] Procurando em playerHand:', this.playerHand.length, 'cartas');
            console.log('[GameState] playerHand IDs:', this.playerHand.map(c => c.id));
            defendingCard = this.playerHand.find(c => c.id === defendingCardId);
        }
        
        console.log('[GameState.executeRound] Resultado: attackingCard:', attackingCard?.nome, 'defendingCard:', defendingCard?.nome);
        
        if (!attackingCard || !defendingCard) {
            console.error('[ERRO] Carta nao encontrada! attacking:', attackingCard, 'defending:', defendingCard);
            return { winner: 'draw', selectedAttribute: 'forca', isPlayerAttacking: true, playerCard: {}, computerCard: {} };
        }
        
        // Ambos usam o mesmo atributo (o do atacante)
        let attackValue = attackingCard[selectedAttribute];
        let defendValue = defendingCard[selectedAttribute];
        
        // Resistência penaliza o atacante se o defensor tiver resistência ao atributo
        if (selectedAttribute === defendingCard.resistencia) {
            attackValue = Math.floor(attackValue / 2);
        }

        this.currentRound++;
        let winner = null;
        
        // Comparar valores e determinar vencedor
        if (attackValue > defendValue) {
            if (isPlayerAttacking) {
                this.playerRounds++;
                winner = 'player';
                this.playerWons.push(this.currentRound);
            } else {
                this.computerRounds++;
                winner = 'computer';
                this.computerWons.push(this.currentRound);
            }
        } else if (defendValue > attackValue) {
            if (isPlayerAttacking) {
                this.computerRounds++;
                winner = 'computer';
                this.computerWons.push(this.currentRound);
            } else {
                this.playerRounds++;
                winner = 'player';
                this.playerWons.push(this.currentRound);
            }
        } else {
            winner = 'draw';
        }

        // Remover cartas da mão
        if (isPlayerAttacking) {
            this.playerHand = this.playerHand.filter(c => c.id !== attackingCardId);
            this.computerHand = this.computerHand.filter(c => c.id !== defendingCardId);
        } else {
            this.computerHand = this.computerHand.filter(c => c.id !== attackingCardId);
            this.playerHand = this.playerHand.filter(c => c.id !== defendingCardId);
        }

        return {
            winner,
            playerCard: attackingCard,
            computerCard: defendingCard,
            playerValue: attackValue,
            computerValue: defendValue,
            selectedAttribute: selectedAttribute || 'forca',
            isPlayerAttacking
        };
    }

    selectPlayerCard(cardId) {
        this.playerSelectedCard = this.playerHand.find(c => c.id === parseInt(cardId));
    }
    
    selectPlayerDefenseCard(cardId) {
        this.playerDefenseCard = this.playerHand.find(c => c.id === parseInt(cardId));
    }

    isGameOver() {
        return this.playerRounds >= 5 || this.computerRounds >= 5;
    }

    getWinner() {
        if (this.playerRounds >= 5) return 'player';
        if (this.computerRounds >= 5) return 'computer';
        return null;
    }
}

class GameUI {
    constructor() {
        this.game = new GameState();
        this.selectedCardIds = [];
    }

    render() {
        console.log('render() chamado, gameState:', this.game.gameState);
        const app = document.getElementById('app');
        
        if (this.game.gameState === 'menu') {
            app.innerHTML = this.renderMenu();
        } else if (this.game.gameState === 'deck-selection') {
            app.innerHTML = this.renderDeckSelection();
        } else if (this.game.gameState === 'battle') {
            app.innerHTML = this.renderBattle();
        } else if (this.game.gameState === 'game-over') {
            app.innerHTML = this.renderGameOver();
        }
    }

    renderMenu() {
        return `
            <div class="menu-container">
                <h1>Battle Cards</h1>
                <p>Jogo de Cartas com Tematica D&D</p>
                <button class="btn-primary" onclick="ui.startGame()">
                    Iniciar Jogo
                </button>
            </div>
        `;
    }

    renderDeckSelection() {
        // Acompanhar cartas selecionadas
        if (!this.selectedCardIds) {
            this.selectedCardIds = [];
        }
        
        const totalPoints = this.getTotalPoints(this.selectedCardIds);
        
        return `
            <div class="deck-selection-container">
                <h2>Selecione sua Mao (9 cartas, max 35 pontos)</h2>
                <div class="selection-info">
                    Cartas Selecionadas: ${this.selectedCardIds.length}/9 | Pontos: ${totalPoints}/35
                </div>
                
                <div class="cards-grid">
                    ${this.game.playerHand.map(card => `
                        <div onclick="ui.toggleCardSelection(${card.id})" 
                             data-card-id="${card.id}"
                             class="card-slot ${this.selectedCardIds.includes(card.id) ? 'selected' : ''}">
                            <div class="card-name">${card.nome}</div>
                            <div class="card-rarity ${this.getRaridadeClass(card.raridade)}">${card.raridade}</div>
                            <div class="card-pontos">${card.pontos}pt</div>
                            <div class="card-stats">
                                Forca: ${card.forca} | Destreza: ${card.destreza}<br>
                                Magia: ${card.magia} | Velocidade: ${card.velocidade}<br>
                                Inteligencia: ${card.inteligencia}<br>
                                Resistencia: ${card.resistencia.toUpperCase()}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <button class="btn-primary" onclick="ui.startBattle()" ${this.selectedCardIds.length === 9 && totalPoints <= 35 ? '' : 'disabled'}>
                    Iniciar Batalha
                </button>
                <button class="btn-secondary" onclick="ui.resetGame()">
                    Voltar
                </button>
            </div>
        `;
    }

    renderBattle() {
        const isPlayerTurn = (this.game.currentRound % 2) === 0;
        const turnText = isPlayerTurn ? 'Sua Vez de ATACAR!' : 'Computador ATACANDO - Escolha DEFESA!';
        const turnColor = isPlayerTurn ? '#00ff00' : '#ff0000';
        const actionLabel = isPlayerTurn ? 'carta para ATACAR' : 'carta para DEFENDER';

        let battleHtml = `
            <div class="round-container">
                <div class="round-header">
                    <h3 style="color: ${turnColor};">${turnText}</h3>
                    <div class="score">
                        Voce: ${this.game.playerRounds} | Computador: ${this.game.computerRounds}
                    </div>
                </div>
                
                <div class="battle-grid">
                    <div class="player-section">
                        <h3>Escolha ${actionLabel}</h3>
                        <div class="hand-container">
                            ${this.game.playerHand.map(card => `
                                <div onclick="${isPlayerTurn ? 'ui.selectPlayerCard(' + card.id + ')' : 'ui.selectPlayerDefenseCard(' + card.id + ')'}" 
                                     class="card-slot ${(isPlayerTurn && this.game.playerSelectedCard && this.game.playerSelectedCard.id === card.id) || (!isPlayerTurn && this.game.playerDefenseCard && this.game.playerDefenseCard.id === card.id) ? 'selected' : ''}">
                                    <div class="card-name">${card.nome}</div>
                                    <div class="card-rarity ${this.getRaridadeClass(card.raridade)}">${card.raridade}</div>
                                    <div class="card-pontos">${card.pontos}pt</div>
                                    <div class="card-stats">
                                        For: ${card.forca} | Des: ${card.destreza} | Mag: ${card.magia}<br>
                                        Vel: ${card.velocidade} | Int: ${card.inteligencia}<br>
                                        Res: ${card.resistencia.toUpperCase()}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="computer-section">
                        <h3>Computador</h3>
                        <div class="hand-container">
                            <div class="card-slot hidden">
                                <div class="card-name">?</div>
                                <div class="card-rarity">?</div>
                                <div class="card-pontos">?</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="attribute-select" style="display: ${isPlayerTurn ? 'block' : 'none'};">
                    <label for="selected-attribute">Escolha um atributo:</label>
                    <select id="selected-attribute">
                        <option value="">-- Selecione --</option>
                        <option value="forca">Forca</option>
                        <option value="destreza">Destreza</option>
                        <option value="magia">Magia</option>
                        <option value="velocidade">Velocidade</option>
                        <option value="inteligencia">Inteligencia</option>
                    </select>
                    <button class="btn-execute" onclick="ui.executeRound();" ${!this.game.playerSelectedCard ? 'disabled="disabled"' : ''}>Executar Ataque</button>
                </div>

                <div id="computer-turn" style="display: ${!isPlayerTurn ? 'block' : 'none'}; text-align: center; margin: 20px;">
                    <p>Voce escolheu sua defesa! Clique para continuar.</p>
                    <button class="btn-execute" onclick="ui.executeComputerRound()" ${!this.game.playerDefenseCard ? 'disabled="disabled"' : ''}>Proxima Rodada</button>
                </div>
            </div>
        `;
        
        return battleHtml;
    }

    renderRoundResult(result) {
        console.log('renderRoundResult chamado com:', result);
        
        let resultText = '';
        
        if (result.winner === 'player') {
            resultText = result.isPlayerAttacking ? 'Voce conquistou a vitoria nesta rodada!' : 'Voce defendeu com sucesso!';
        } else if (result.winner === 'computer') {
            resultText = result.isPlayerAttacking ? 'O computador defendeu com sucesso!' : 'O computador conquistou a vitoria nesta rodada!';
        } else {
            resultText = 'Empate nesta rodada!';
        }

        console.log('[DEBUG renderRoundResult] result object:', result);
        console.log('[DEBUG] selectedAttribute:', result.selectedAttribute);
        console.log('[DEBUG] selectedAttribute type:', typeof result.selectedAttribute);
        
        if (!result.selectedAttribute) {
            console.error('[ERRO] selectedAttribute eh undefined ou null!');
            console.error('[DEBUG] result keys:', Object.keys(result));
            alert('Erro: selectedAttribute nao foi retornado');
            return;
        }
        
        const atributoFormatado = result.selectedAttribute.charAt(0).toUpperCase() + result.selectedAttribute.slice(1);

        let resultHtml = `
            <div class="round-result">
                <h2>${resultText}</h2>
                <div class="round-info">
                    <strong>Rodada:</strong> ${this.game.currentRound} | 
                    <strong>Seu placar:</strong> ${this.game.playerRounds} | 
                    <strong>Computador:</strong> ${this.game.computerRounds}
                </div>
                <div class="cards-result">
                    <div class="card-result">
                        <h3>Sua Carta</h3>
                        <div class="card-detail">
                            <strong>${result.playerCard.nome}</strong><br>
                            ${atributoFormatado}: <strong>${result.playerValue}</strong>
                        </div>
                    </div>
                    <div class="card-result">
                        <h3>Carta do Computador</h3>
                        <div class="card-detail">
                            <strong>${result.computerCard.nome}</strong><br>
                            ${atributoFormatado}: <strong>${result.computerValue}</strong>
                        </div>
                    </div>
                </div>
                <button class="btn-primary" onclick="ui.continueGame()" style="width: 100%;">
                    Proxima Rodada
                </button>
            </div>
        `;

        console.log('Adicionando modal ao DOM');
        const app = document.getElementById('app');
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = resultHtml;
        const modalElement = resultDiv.firstChild;
        app.appendChild(modalElement);
        console.log('Modal adicionado');
    }

    renderGameOver() {
        const winner = this.game.getWinner();
        const winnerText = winner === 'player' ? 'Voce conquistou a vitoria!' : 'O computador venceu!';
        
        return `
            <div class="game-over-container">
                <h1>${winnerText}</h1>
                <div class="final-stats">
                    <div class="stat-line">
                        Vitorias suas: <span style="color: #00ff00; font-size: 1.3em;">${this.game.playerRounds}</span>
                    </div>
                    <div class="stat-line">
                        Vitorias do computador: <span style="color: #ff0000; font-size: 1.3em;">${this.game.computerRounds}</span>
                    </div>
                </div>
                <button class="btn-main" onclick="ui.resetGame()" style="margin-top: 30px; padding: 12px 40px; font-size: 1.1em;">Novo Jogo</button>
            </div>
        `;
    }

    toggleCardSelection(cardId) {
        if (!this.selectedCardIds) {
            this.selectedCardIds = [];
        }
        
        cardId = parseInt(cardId);  // Converter para número
        
        const index = this.selectedCardIds.indexOf(cardId);
        if (index > -1) {
            this.selectedCardIds.splice(index, 1);
        } else if (this.selectedCardIds.length < 9) {
            this.selectedCardIds.push(cardId);
        }
        
        this.render();
    }

    getTotalPoints(cardIds) {
        return cardIds.reduce((sum, id) => {
            const card = this.game.playerHand.find(c => c.id === id);
            return sum + (card ? card.pontos : 0);
        }, 0);
    }

    selectPlayerCard(cardId) {
        this.game.selectPlayerCard(cardId);
        this.render();
    }

    selectPlayerDefenseCard(cardId) {
        this.game.selectPlayerDefenseCard(cardId);
        this.render();
    }

    executeRound() {
        console.log('executeRound chamado');
        
        if (!this.game.playerSelectedCard) {
            alert('Selecione uma carta para atacar!');
            return;
        }
        
        console.log('Carta selecionada:', this.game.playerSelectedCard.nome);
        
        const attackCardId = this.game.playerSelectedCard.id;
        const attributeSelect = document.getElementById('selected-attribute');
        
        if (!attributeSelect) {
            console.error('Select de atributo nao foi encontrado');
            alert('Erro! Select nao encontrado.');
            return;
        }
        
        const attribute = attributeSelect.value;
        console.log('Atributo selecionado:', attribute);

        if (!attribute || attribute === '') {
            alert('Selecione um atributo!');
            return;
        }
        
        console.log('Computador escolhendo...');
        // Computador escolhe carta aleatoria para defender
        const defendCard = this.game.computerHand[Math.floor(Math.random() * this.game.computerHand.length)];
        console.log('Carta do computador:', defendCard.nome);
        
        console.log('Executando rodada...');
        const result = this.game.executeRound(attackCardId, defendCard.id, attribute);
        
        console.log('Resultado:', result);
        
        if (!result) {
            console.error('Result eh nulo!');
            return;
        }
        
        this.renderRoundResult(result);
    }

    executeComputerRound() {
        console.log('executeComputerRound chamado');
        
        if (!this.game.playerDefenseCard) {
            alert('Selecione uma carta para defender!');
            return;
        }
        
        console.log('Carta de defesa selecionada:', this.game.playerDefenseCard.nome);
        
        // Computador escolhe uma carta aleatoria para atacar
        const computerAttackCard = this.game.computerHand[Math.floor(Math.random() * this.game.computerHand.length)];
        const attribute = ['forca', 'destreza', 'magia', 'velocidade', 'inteligencia'][Math.floor(Math.random() * 5)];
        
        console.log('Carta de ataque:', computerAttackCard.nome, 'Atributo:', attribute);
        
        const result = this.game.executeRound(computerAttackCard.id, this.game.playerDefenseCard.id, attribute);
        console.log('Resultado do turn do computador:', result);
        
        this.renderRoundResult(result);
    }

    continueGame() {
        console.log('continueGame chamado');
        const modal = document.querySelector('.round-result');
        if (modal) {
            console.log('Removendo modal');
            modal.remove();
        }

        if (this.game.isGameOver()) {
            console.log('Jogo acabou!');
            this.game.gameState = 'game-over';
        }
        
        // Limpar selecoes anterior
        this.game.playerSelectedCard = null;
        this.game.playerDefenseCard = null;

        console.log('Re-renderizando...');
        this.render();
    }

    startGame() {
        this.game.gameState = 'deck-selection';
        this.game.initializeGame();
        this.render();
    }

    startBattle() {
        if (!this.selectedCardIds || this.selectedCardIds.length !== 9) {
            alert('Selecione exatamente 9 cartas!');
            return;
        }

        this.game.selectPlayerHand(this.selectedCardIds);
        this.game.gameState = 'battle';
        this.render();
    }

    resetGame() {
        this.game = new GameState();
        this.selectedCardIds = [];
        this.render();
    }

    getRaridadeClass(raridade) {
        return `raridade-${raridade.toLowerCase()}`;
    }
}

const ui = new GameUI();
ui.render();
