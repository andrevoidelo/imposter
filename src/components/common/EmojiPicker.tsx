import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { Button } from './Button';
import { useTranslation } from 'react-i18next';

const EMOJI_DATA = [
  { char: '📦', en: 'box package', pt: 'caixa pacote' }, 
  { char: '🍎', en: 'apple fruit food', pt: 'maçã fruta comida' }, 
  { char: '🍔', en: 'burger hamburger food', pt: 'hambúrguer comida' }, 
  { char: '🍕', en: 'pizza food', pt: 'pizza comida' }, 
  { char: '⚽', en: 'soccer ball sports', pt: 'futebol bola esportes' }, 
  { char: '🎮', en: 'game video controller', pt: 'videogame controle' }, 
  { char: '🚗', en: 'car transport', pt: 'carro transporte' }, 
  { char: '✈️', en: 'plane airplane transport', pt: 'avião transporte' }, 
  { char: '🐶', en: 'dog animal', pt: 'cachorro animal cão' }, 
  { char: '🐱', en: 'cat animal', pt: 'gato animal' }, 
  { char: '🌍', en: 'earth world globe', pt: 'terra mundo globo' }, 
  { char: '🏠', en: 'house home', pt: 'casa lar' }, 
  { char: '💡', en: 'light bulb idea', pt: 'lâmpada luz ideia' }, 
  { char: '🎵', en: 'music note', pt: 'música nota' }, 
  { char: '🎭', en: 'theater drama mask', pt: 'teatro máscara drama' }, 
  { char: '🎬', en: 'movie cinema clapper', pt: 'filme cinema claquete' }, 
  { char: '👗', en: 'dress fashion', pt: 'vestido moda' }, 
  { char: '💼', en: 'briefcase work', pt: 'maleta pasta trabalho' }, 
  { char: '💻', en: 'computer laptop tech', pt: 'computador notebook tecnologia' }, 
  { char: '📱', en: 'phone mobile tech', pt: 'celular telefone tecnologia' },
  { char: '🔥', en: 'fire hot', pt: 'fogo quente' }, 
  { char: '💎', en: 'diamond gem', pt: 'diamante gema' }, 
  { char: '🌈', en: 'rainbow', pt: 'arco-íris' }, 
  { char: '🎨', en: 'art paint palette', pt: 'arte pintura paleta' }, 
  { char: '🧩', en: 'puzzle', pt: 'quebra-cabeça' }, 
  { char: '🏆', en: 'trophy win', pt: 'troféu vitória' }, 
  { char: '🍺', en: 'beer drink', pt: 'cerveja bebida' }, 
  { char: '🍦', en: 'ice cream', pt: 'sorvete doce' }, 
  { char: '🍩', en: 'donut', pt: 'rosquinha doce' },
  { char: '🐻', en: 'bear animal', pt: 'urso animal' }, 
  { char: '🐨', en: 'koala animal', pt: 'coala animal' }, 
  { char: '🦁', en: 'lion animal', pt: 'leão animal' }, 
  { char: '🦉', en: 'owl bird', pt: 'coruja pássaro' }, 
  { char: '🦋', en: 'butterfly insect', pt: 'borboleta inseto' }, 
  { char: '🌲', en: 'tree forest', pt: 'árvore floresta' }, 
  { char: '🌸', en: 'flower', pt: 'flor' }, 
  { char: '⚓', en: 'anchor sea', pt: 'âncora mar' }, 
  { char: '🏖️', en: 'beach summer', pt: 'praia verão' }, 
  { char: '🚀', en: 'rocket space', pt: 'foguete espaço' },
  { char: '👻', en: 'ghost', pt: 'fantasma' }, 
  { char: '👽', en: 'alien', pt: 'alienígena ET' }, 
  { char: '👑', en: 'crown king queen', pt: 'coroa rei rainha' }, 
  { char: '💄', en: 'lipstick beauty', pt: 'batom beleza' }, 
  { char: '🧸', en: 'teddy bear toy', pt: 'ursinho brinquedo' }, 
  { char: '🎸', en: 'guitar music instrument', pt: 'violão guitarra instrumento' }, 
  { char: '📷', en: 'camera photo', pt: 'câmera foto' }, 
  { char: '📚', en: 'books reading', pt: 'livros leitura' }, 
  { char: '💰', en: 'money bag', pt: 'dinheiro saco' }, 
  { char: '🔑', en: 'key', pt: 'chave' },
  { char: '🌮', en: 'taco food', pt: 'taco comida' }, 
  { char: '🍣', en: 'sushi food', pt: 'sushi comida' },
  { char: '🍉', en: 'watermelon fruit', pt: 'melancia fruta' }, 
  { char: '🍌', en: 'banana fruit', pt: 'banana fruta' },
  { char: '🍓', en: 'strawberry fruit', pt: 'morango fruta' }, 
  { char: '🥑', en: 'avocado', pt: 'abacate' },
  { char: '🍿', en: 'popcorn', pt: 'pipoca' }, 
  { char: '☕', en: 'coffee drink', pt: 'café bebida' },
  { char: '🏀', en: 'basketball sports', pt: 'basquete esportes' }, 
  { char: '🎾', en: 'tennis sports', pt: 'tênis esportes' },
  { char: '🥊', en: 'boxing sports', pt: 'boxe esportes' }, 
  { char: '🚵', en: 'bike sports', pt: 'bicicleta esportes' },
  { char: '🚂', en: 'train transport', pt: 'trem transporte' }, 
  { char: '🚁', en: 'helicopter transport', pt: 'helicóptero transporte' },
  { char: '🚜', en: 'tractor', pt: 'trator' }, 
  { char: '🚢', en: 'ship boat', pt: 'navio barco' },
  { char: '🦊', en: 'fox animal', pt: 'raposa animal' }, 
  { char: '🐼', en: 'panda animal', pt: 'panda animal' },
  { char: '🐷', en: 'pig animal', pt: 'porco animal' }, 
  { char: '🐔', en: 'chicken bird', pt: 'galinha frango pássaro' },
  { char: '🐸', en: 'frog animal', pt: 'sapo animal' }, 
  { char: '🐢', en: 'turtle animal', pt: 'tartaruga animal' },
  { char: '🐉', en: 'dragon', pt: 'dragão' }, 
  { char: '🐙', en: 'octopus', pt: 'polvo' },
  { char: '🦖', en: 't-rex dinosaur', pt: 'dinossauro rex' }, 
  { char: '🦄', en: 'unicorn', pt: 'unicórnio' },
  { char: '🌵', en: 'cactus plant', pt: 'cacto planta' }, 
  { char: '🌻', en: 'sunflower', pt: 'girassol' },
  { char: '🌙', en: 'moon night', pt: 'lua noite' }, 
  { char: '⭐', en: 'star', pt: 'estrela' },
  { char: '☁️', en: 'cloud weather', pt: 'nuvem clima' }, 
  { char: '⚡', en: 'lightning weather', pt: 'raio trovão clima' },
  { char: '❄️', en: 'snow winter', pt: 'neve inverno' }, 
  { char: '🎈', en: 'balloon party', pt: 'balão festa' },
  { char: '🎁', en: 'gift present', pt: 'presente' }, 
  { char: '🎉', en: 'celebration', pt: 'festa comemoração' },
  { char: '🧨', en: 'firecracker', pt: 'bombinha fogos' }, 
  { char: '🗡️', en: 'sword', pt: 'espada' },
  { char: '🏹', en: 'bow arrow', pt: 'arco flecha' }, 
  { char: '🛠️', en: 'tools', pt: 'ferramentas' },
  { char: '🧪', en: 'science lab', pt: 'ciência laboratório' }, 
  { char: '🧬', en: 'dna', pt: 'dna' },
  { char: '🔭', en: 'telescope', pt: 'telescópio' }, 
  { char: '🪐', en: 'saturn planet', pt: 'saturno planeta' },
  { char: '🧿', en: 'evil eye', pt: 'olho grego' }, 
  { char: '🍄', en: 'mushroom', pt: 'cogumelo' },
  { char: '🧁', en: 'cupcake', pt: 'bolinho doce' }, 
  { char: '🦷', en: 'tooth', pt: 'dente' },
  { char: '🧠', en: 'brain', pt: 'cérebro' }, 
  { char: '❤', en: 'heart love', pt: 'coração amor' },
  { char: '🦾', en: 'robot arm', pt: 'robô braço' }
];

interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ isOpen, onClose, onSelect }: EmojiPickerProps) => {
  const [search, setSearch] = useState('');
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('pt') ? 'pt' : 'en';

  const filteredEmojis = useMemo(() => {
    const s = search.toLowerCase();
    if (!s) return EMOJI_DATA;
    return EMOJI_DATA.filter(e => {
        const terms = e[currentLang].toLowerCase();
        return terms.includes(s);
    });
  }, [search, currentLang]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[450px] bg-bg-card border border-text-primary/10 rounded-3xl z-[101] shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-text-primary/10 flex flex-col gap-4 bg-bg-elevated/30">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">
                  {currentLang === 'pt' ? 'Escolher Ícone' : 'Choose Icon'}
                </h3>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X size={20} />
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  autoFocus
                  className="w-full bg-bg-dark/50 border-2 border-transparent focus:border-primary-500 rounded-xl py-2 pl-10 pr-4 outline-none transition-all text-sm"
                  placeholder={currentLang === 'pt' ? 'Pesquisar emoji...' : 'Search emoji...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-5 gap-2 content-start">
              {filteredEmojis.map((e, idx) => (
                <button
                  key={`${e.char}-${idx}`}
                  onClick={() => {
                    onSelect(e.char);
                    onClose();
                    setSearch('');
                  }}
                  className="aspect-square flex items-center justify-center text-3xl hover:bg-primary-500/20 rounded-xl transition-all active:scale-90"
                  title={e[currentLang]}
                >
                  {e.char}
                </button>
              ))}
              {filteredEmojis.length === 0 && (
                <div className="col-span-5 py-12 text-center text-text-muted">
                  {currentLang === 'pt' 
                    ? `Nenhum emoji encontrado para "${search}"`
                    : `No emoji found for "${search}"`}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
