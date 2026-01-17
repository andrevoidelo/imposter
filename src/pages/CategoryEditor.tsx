import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { TextArea } from '../components/common/TextArea';
import { EmojiPicker } from '../components/common/EmojiPicker';
import { categoryService } from '../services/categoryService';
import { TopBar } from '../components/layout/TopBar';
import { Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CategoryEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEditing = !!id && id !== 'new';

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📦');
  const [wordsText, setWordsText] = useState('');
  const [isBuiltIn, setIsBuiltIn] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const all = categoryService.getAllCategories();
      const cat = all.find(c => c.id === id);
      if (cat) {
        setName(cat.name);
        setIcon(cat.icon);
        setWordsText(cat.words.join('\n'));
        setIsBuiltIn(cat.isBuiltIn);
      }
    }
  }, [id, isEditing]);

  const handleSave = () => {
    if (isBuiltIn) return;

    const words = wordsText
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length > 0);

    if (!name.trim()) {
      alert(t('categories.errorNoName'));
      return;
    }

    if (words.length === 0) {
      alert(t('categories.errorNoWords'));
      return;
    }

    if (isEditing) {
      categoryService.updateCategory(id!, {
        name: name.trim(),
        icon: icon.trim() || '📦',
        words
      });
    } else {
      categoryService.createCategory({
        name: name.trim(),
        icon: icon.trim() || '📦',
        words,
        isEnabled: true,
        isBuiltIn: false,
        difficulty: 'medium'
      });
    }

    navigate('/categories');
  };

  return (
    <PageWrapper className="space-y-6 pt-16 pb-24">
      <TopBar 
        title={isBuiltIn ? t('categories.view') : isEditing ? t('categories.edit') : t('categories.new')}
        onBack={() => navigate('/categories')}
        rightElement={!isBuiltIn && (
          <Button onClick={handleSave} size="sm" className="gap-2 h-9 px-3">
            <Save size={16} />
            {t('categories.save')}
          </Button>
        )}
      />

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex gap-4 items-end">
          <div className="shrink-0">
            <label className="block text-sm font-medium text-text-secondary mb-1">
              {t('categories.iconLabel')}
            </label>
            <button
              type="button"
              disabled={isBuiltIn}
              onClick={() => setIsEmojiPickerOpen(true)}
              className={`
                w-[52px] h-[52px] bg-bg-elevated border-2 border-transparent 
                ${!isBuiltIn && 'hover:border-primary-500 cursor-pointer'} 
                rounded-xl flex items-center justify-center text-2xl transition-all
              `}
            >
              {icon}
            </button>
          </div>
          <div className="flex-1">
            <Input
              label={t('categories.nameLabel')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('categories.namePlaceholder')}
              disabled={isBuiltIn}
            />
          </div>
        </div>

        <div className="flex-1">
          <TextArea
            label={t('categories.wordsLabel')}
            value={wordsText}
            onChange={(e) => setWordsText(e.target.value)}
            placeholder={t('categories.wordsPlaceholder')}
            disabled={isBuiltIn}
            className="min-h-[400px] font-medium leading-relaxed"
          />
        </div>

        {isBuiltIn && (
          <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl text-sm text-text-secondary">
            {t('categories.builtInNotice')}
          </div>
        )}
      </div>

      <EmojiPicker 
        isOpen={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        onSelect={(emoji) => setIcon(emoji)}
      />
    </PageWrapper>
  );
}
