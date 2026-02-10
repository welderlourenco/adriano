import json
import random

# Lista completa de personagens famosos de D&D
personagens = [
    # Lendários (5 pontos) - Total: 75 cartas
    *["Drizzt Do'Urden", "Elminster", "Bruenor Battlehammer", "Cattie-brie", "Wulfgar", 
      "Tanis Half-Elven", "Raistlin Majere", "Fizban", "Gandalf", "Khelben Blackstaff",
      "Laeral Silverhand", "Piergeiron", "Azuth", "Mystra", "Cyric",
      "Kelemvor", "Tymora", "Shar", "Lolth", "Gruumsh",
      "Kord", "Tempus", "Helm", "Chauntea", "Bhaal",
      "Bane", "Forgotten God 1", "Forgotten God 2", "Forgotten God 3", "Forgotten God 4",
      "Torm", "Selûne", "Mask", "Waukeen", "Talona",
      "Malar", "Silvanus", "Liira", "Killandia", "Garagos",
      "Beshaaba", "Loviatar", "Jergal", "Orcus", "Demogorgon",
      "Yeenoghu", "Zuggtmoy", "Dagon", "Laduguer", "Ghaunadaur",
      "Bahgtru", "Ogrémoch", "Yan-C-Bin", "Zaknafein", "House Baenre",
      "Velsharoon", "Ilmater", "Red Knight", "Grumbar", "Istishia",
      "Akadi", "Sune", "Milil", "Deneir", "Savras",
      "Thoth", "Holder of Secrets", "The Spellspinner", "Ancient Dragon 1", "Ancient Dragon 2",
      "Ancient Dragon 3", "Ancient Dragon 4", "Ancient Dragon 5"],
    
    # Épicas (5 pontos) - Total: 100 cartas
    *["Jaheira", "Minsc", "Edwin", "Keldorn", "Imoen",
      "Caramon Majere", "Sturm Brightblade", "Gilthanas", "Riverwind", "Goldmoon",
      "Bigby", "Halruaa Mage", "Cadderly", "Hastur", "Prince of Lies",
      "Bhaal's Avatar", "Helm's Avatar", "Torm's Avatar", "Selûne's Avatar", "Mask's Avatar",
      "Drow Paladin", "Half-Dragon Warrior", "Shadow Thief", "Lich Lord", "Vampire Prince",
      "Eladrin Lord", "Tiefling Sorcerer", "Goliath Barbarian", "Dragonborn Warlord", "Kenku Rogue",
      "Tortle Monk", "Aarakocra Ranger", "Firbolg Cleric", "Tabaxi Bard", "Genasi Wizard",
      "Yuan-ti Abomination", "Duergar Champion", "Drow Cleric", "Drow Wizard", "Drow Ranger",
      "Orc Shaman", "Goblin King", "Ogre Mage", "Bugbear Chieftain", "Gnoll Warlord",
      "Minotaur Lord", "Centaur Champion", "Pegasus Knight", "Phoenix", "Ancient Elemental",
      "Beholder Eye Tyrant", "Mind Flayer Elder", "Illithid Psion", "Aboleth Ancient", "Hydra Head",
      "Chimera Beast", "Dragon Wyrmling", "Wyvern Queen", "Giant Stone", "Giant Frost",
      "Giant Fire", "Giant Storm", "Titan Lord", "Colossus Guardian", "Sphinx Riddle Master",
      "Erinyes Devil", "Pit Fiend", "Balor Demon", "Marilith Demon", "Nalfeshnee Lord",
      "Vrock Captain", "Hezrou Champion", "Glabrezu Master", "Succubus Seductress", "Incubus Trickster",
      "Bone Devil", "Bearded Devil", "Barbed Devil", "Ice Devil", "Lemure Lord"],

    # Raras (3 pontos) - Total: 100 cartas
    *["Lhaeo", "Jan Jansen", "Sarevok", "Hexxat", "Neera",
      "Shar-Yar", "Wild Mage", "Cleric of Lathander", "Knight of Torm", "Priestess of Helm",
      "Ranger Scout", "Rogue Assassin", "Fighter Champion", "Barbarian Berserker", "Monk Master",
      "Paladin Crusader", "Sorcerer Bloodline", "Wizard Enchanter", "Druid Shapeshifter", "Bard Performer",
      "Warlock Pact", "Artificer Inventor", "Cleric War", "Cleric Trickery", "Cleric Tempest",
      "Rogue Arcane Trickster", "Rogue Assassin Trainer", "Fighter Battle Master", "Ranger Monster Slayer", "Paladin Oath Breaker",
      "Elf Archer", "Human Swordsman", "Dwarf Berserker", "Halfling Rogue", "Gnome Artificer",
      "Tiefling Warlock", "Dragonborn Sorcerer", "Half-Orc Barbarian", "Aarakocra Rogue", "Tabaxi Monk",
      "Tortle Cleric", "Firbolg Ranger", "Genasi Artificer", "Lizardfolk Fighter", "Goblin Rogue",
      "Kobold Sorcerer", "Orc Fighter", "Hobgoblin Warrior", "Bugbear Ranger", "Gnoll Fighter",
      "Minotaur Fighter", "Centaur Ranger", "Satyr Bard", "Faun Ranger", "Dryad Guardian",
      "Nymph Enchantress", "Pixie Mage", "Sprite Rogue", "Fey Knight", "Eladrin Warrior",
      "Fomorian Giant", "Cloud Giant Scholar", "Storm Giant King", "Hill Giant Chief", "Lesser Dragon",
      "Wyvern Scout", "Manticore Scout", "Chimera Pack Leader", "Basilisk Lurker", "Medusa Gorgon",
      "Harpy Siren", "Lamia Queen", "Naga Seer", "Mummy Lord", "Ghast Champion",
      "Ghoul King", "Wight Lord", "Wraith Spectre", "Shadow Lord", "Shade Assassin",
      "Lich Phylactery", "Demi-Lich Spirit", "Specter Guardian", "Phantom Knight", "Ghost Warrior",
      "Skeletal Knight", "Bone Golem", "Stone Golem", "Iron Golem", "Clay Golem"],

    # Comuns (1 ponto) - Total: 25 cartas para completar 300
    *["Village Guard", "Town Guard", "Bandit Captain", "Brigand Leader", "Outlaw Scout",
      "Adventurer Novice", "Sellsword", "Mercenary", "Highwayman", "Brigand",
      "Poacher", "Brigand Scout", "Thug", "Cutthroat", "Ruffian",
      "Cultist", "Zealot", "Acolyte", "Novice Priest", "Witch",
      "Hedge Wizard", "Apprentice Mage", "Acolyte Wizard", "Mage Apprentice", "Novice Sorcerer"]
]

atributos_por_raridade = {
    "lendaria": {"min": 18, "max": 20},
    "epica": {"min": 14, "max": 17},
    "rara": {"min": 11, "max": 14},
    "comum": {"min": 8, "max": 11}
}

resistencias = ["forca", "destreza", "magia", "velocidade", "inteligencia"]

cartas = []
id_carta = 1

# Gerar 75 cartas lendárias
for i in range(75):
    personagem = personagens[0][min(i, len(personagens[0])-1)]
    cartas.append({
        "id": id_carta,
        "nome": f"{personagem} #{i+1}" if i < len(personagens[0]) else f"Lendario {i+1}",
        "raridade": "lendaria",
        "pontos": 10,
        "forca": random.randint(15, 20),
        "destreza": random.randint(15, 20),
        "magia": random.randint(14, 20),
        "velocidade": random.randint(14, 20),
        "inteligencia": random.randint(14, 20),
        "resistencia": random.choice(resistencias)
    })
    id_carta += 1

# Gerar 100 cartas épicas
for i in range(100):
    cartas.append({
        "id": id_carta,
        "nome": f"Epico Herói {i+1}",
        "raridade": "epica",
        "pontos": 5,
        "forca": random.randint(12, 17),
        "destreza": random.randint(12, 17),
        "magia": random.randint(11, 16),
        "velocidade": random.randint(11, 16),
        "inteligencia": random.randint(11, 16),
        "resistencia": random.choice(resistencias)
    })
    id_carta += 1

# Gerar 100 cartas raras
for i in range(100):
    cartas.append({
        "id": id_carta,
        "nome": f"Rara Aventureira {i+1}",
        "raridade": "rara",
        "pontos": 3,
        "forca": random.randint(9, 14),
        "destreza": random.randint(9, 14),
        "magia": random.randint(8, 13),
        "velocidade": random.randint(8, 13),
        "inteligencia": random.randint(8, 13),
        "resistencia": random.choice(resistencias)
    })
    id_carta += 1

# Gerar 25 cartas comuns
for i in range(25):
    cartas.append({
        "id": id_carta,
        "nome": f"Comum Viajante {i+1}",
        "raridade": "comum",
        "pontos": 1,
        "forca": random.randint(6, 11),
        "destreza": random.randint(6, 11),
        "magia": random.randint(5, 10),
        "velocidade": random.randint(5, 10),
        "inteligencia": random.randint(5, 10),
        "resistencia": random.choice(resistencias)
    })
    id_carta += 1

# Salvar em JSON
with open('cartas_database.json', 'w', encoding='utf-8') as f:
    json.dump({"cartas": cartas}, f, indent=2, ensure_ascii=False)

print(f"✓ {len(cartas)} cartas geradas com sucesso!")
print(f"  - Lendárias: 75 (10 pontos cada)")
print(f"  - Épicas: 100 (5 pontos cada)")
print(f"  - Raras: 100 (3 pontos cada)")
print(f"  - Comuns: 25 (1 ponto cada)")
