# Impostor!

Um jogo de dedução social para festas e grupos de amigos.

## Funcionalidades

- **100% Offline**: Funciona sem internet.
- **PWA**: Instalável como app no celular.
- **Multiplataforma**: Android, iOS e Web.
- **Modos de Jogo**: Clássico, Undercover, Mr. White.
- **Categorias**: Gerenciamento de categorias e palavras.

## Como Rodar

### Desenvolvimento

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Capacitor (Mobile)

Para sincronizar as mudanças com os projetos nativos:

```bash
npx cap sync
```

Para abrir no Android Studio:

```bash
npx cap open android
```

Para abrir no Xcode (macOS apenas):

```bash
npx cap open ios
```

## Estrutura do Projeto

- `src/components`: Componentes React.
- `src/pages`: Páginas da aplicação.
- `src/contexts`: Estado global (Zustand).
- `src/services`: Lógica de negócio e serviços.
- `src/data`: Dados estáticos (palavras, categorias).
- `src/types`: Definições de tipos TypeScript.