<div align="center">

# 🕵️ Impostor!

**A social deduction party game for friends and family**

*Um jogo de dedução social para amigos e família*

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/andrevoidelo/imposter)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Android%20%7C%20iOS-lightgrey.svg)]()

[ 🇺🇸 English](#english) | [ 🇧🇷 Português](#português)

</div>

---

<a name="english"></a>

## 🇺🇸 English

### About

**Impostor!** is a digital adaptation of classic social deduction games like Werewolf and Mafia. Players gather around and pass a single device to secretly view their roles. Innocents know a secret word, while the Impostor must blend in without knowing it.

The game runs **100% offline** as a Progressive Web App (PWA), making it perfect for parties, gatherings, and road trips.

### Features (so far)

- 🎮 **Multiple Game Modes**
  - **Classic**: One impostor with no clues
  - **Undercover**: Impostor receives a similar word for extra challenge
  
- 👥 **Special Roles**
  - **Innocents**: Knows the secret word
  - **Impostor**: Must blend in without knowing the word
  - **Confused** (Optional): Knows a different word but is innocent
  
- 🌐 **Localization Support**: Full English and Portuguese localization
- 🌙 **Dark/Light Themes**: Beautiful UI with smooth animations
- 📱 **Cross-Platform**: Web, Android, and iOS support
- 📴 **Fully Offline**: No internet required after installation
- 🔊 **Sound Effects**: Immersive audio feedback
- 📂 **Custom Categories**: Create and manage your own word lists

### Game Flow

Setup → Role Reveal → Rounds (Give Clues) → Discussion → Vote → Endgame

1. **Setup**: Add 3-15 players and configure game settings
2. **Role Reveal**: Each player secretly views their role
3. **Rounds**: Players take turns giving one-word clues about the secret word
4. **Discussion**: Timed debate to identify the Impostor
5. **Vote**: Eliminate a suspected player
6. **Endgame**: Reveal the winner and secret word

### Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| State | Zustand |
| Animations | Framer Motion |
| Mobile | Capacitor 8 |
| Build | Vite 7 |
| i18n | i18next |
| Audio | Howler.js |

### Installation

#### Prerequisites
- Node.js 18+
- npm or yarn

#### Development

##### Clone the repository
```bash
git clone https://github.com/andrevoidelo/imposter.git
cd imposter
```

##### Install dependencies
```bash
npm install
```

##### Start development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

#### Production Build

```bash
npm run build
npm run preview
```

#### Mobile (Android/iOS)

##### Build and sync to native projects
```bash
npm run build
npx cap sync
```

##### Open in Android Studio
```bash
npx cap open android
```

##### Open in Xcode (macOS only)
```bash
npx cap open ios
```

### Categories
The game includes 10 built-in categories with +-100 words each:

| Category | Difficulty |
|----------|------------|
| 🐾 Animals & Nature | Easy |
| 🍔 Food & Drinks |	Easy |
| 🎬 Movies & Entertainment	| Medium |
| 💼 Professions	| Medium |
| 💡 Everyday Objects	| Easy |
| ✈️ Travel & Places	| Medium |
| ⚽ Sports	| Easy |
| 🚀 Transportation	| Easy |
| 👗 Clothing & Fashion |	Easy |
| 💻 Technology	| Medium |

### Contributing
Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Add new word categories
- Improve translations

### License
This project is licensed under the MIT License.

<a name="português"></a>

## 🇧🇷 Português

### Sobre

**Impostor!** é uma adaptação digital de jogos clássicos de dedução social como Lobisomem e Máfia. Os jogadores se reúnem e passam um único dispositivo para ver secretamente seus papéis. Os Inocentes conhecem uma palavra secreta, enquanto o Impostor deve se disfarçar sem conhecê-la.

O jogo funciona **100% offline** como um Progressive Web App (PWA), sendo perfeito para festas, encontros e viagens.

### Funcionalidades (até agora)

- 🎮 **Múltiplos Modos de Jogo**
  - **Clássico:** Um impostor sem nenhuma pista
  - **Infiltrado:** Impostor recebe uma palavra similar para maior desafio
  
- 👥 **Papéis Especiais**
  - **Inocente:** Conhece a palavra secreta
  - **Impostor:** Deve se disfarçar sem conhecer a palavra
  - **Confuso (Opcional):** Conhece uma palavra diferente mas é inocente
  
- 🌐 **Suporte a Localização:** Localização completa em Português e Inglês
- 🌙 **Temas Claro/Escuro:** Interface bonita com animações suaves
- 📱 **Multiplataforma:** Suporte para Web, Android e iOS
- 📴 **Totalmente Offline:** Sem necessidade de internet após instalação
- 🔊 **Efeitos Sonoros:** Feedback de áudio imersivo
- 📂 **Categorias Personalizadas:** Crie e gerencie suas próprias listas de palavras

### Fluxo do Jogo

Configuração → Revelação → Rodadas (Dar Dicas) → Discussão → Votação → Fim

1. **Configuração:** Adicione 3-15 jogadores e configure as opções
2. **Revelação de Papéis:** Cada jogador vê secretamente seu papel
3. **Rodadas:** Jogadores dão dicas de uma palavra sobre a palavra secreta
4. **Discussão:** Debate cronometrado para identificar o Impostor
5. **Votação:** Elimine um jogador suspeito
6. **Fim de Jogo:** Revele o vencedor e a palavra secreta

### Stack Tecnológica

| Categoria |	Tecnologia |
|----------|------------|
| Framework |	React 19 + TypeScript |
| Estilização |	Tailwind CSS 4 |
| Estado |	Zustand |
| Animações	| Framer Motion |
| Mobile |	Capacitor 8 |
| Build	| Vite 7 |
| i18n |	i18next |
| Áudio	| Howler.js |

### Instalação

#### Pré-requisitos
- Node.js 18+
- npm or yarn

#### Desenvolvimento

##### Clone o repositório

```bash
git clone https://github.com/andrevoidelo/imposter.git
cd imposter
```

##### Instale as dependências

```bash
npm install
```

##### Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`

#### Build de Produção

```bash
npm run build
npm run preview
```

#### Mobile (Android/iOS)

##### Faça a build e sincronização com projetos nativos
```bash
npm run build
npx cap sync
```

##### Abra no Android Studio
```bash
npx cap open android
```

##### Abra no Xcode (macOS only)
```bash
npx cap open ios
```

### Categorias

O jogo inclui 10 categorias embutidas com +-100 palavras cada:

| Categoria	| Dificuldade |
|-----------|-------------|
|🐾 Animais e Natureza |	Fácil |
|🍔 Comidas e Bebidas	 |Fácil |
|🎬 Filmes e Entretenimento |	Médio |
|💼 Profissões | Médio |
|💡 Objetos do Dia a Dia |	Fácil |
|✈️ Viagens e Lugares |	Médio |
|⚽ Esportes |	Fácil |
|🚀 Transportes |	Fácil |
|👗 Roupas e Moda |	Fácil |
|💻 Tecnologia |	Médio |

### Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Adicionar novas categorias de palavras
- Melhorar as traduções

### Licença
Este projeto está licenciado sob a Licença MIT.

---

<div align="center">
Made with ❤️ for party game lovers
</div>

<div align="center">
Feito com ❤️ para amantes de jogos de festa
</div>
