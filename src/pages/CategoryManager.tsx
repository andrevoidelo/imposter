import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/common/Button';
import { categoryService } from '../services/categoryService';
import { type Category } from '../types/category';
import { TopBar } from '../components/layout/TopBar';
import { Trash2, Plus, ChevronRight } from 'lucide-react';

export default function CategoryManager() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(categoryService.getAllCategories());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm(t('categories.deleteConfirm'))) {
       categoryService.deleteCategory(id);
       setCategories(categoryService.getAllCategories());
    }
  };

  return (
    <PageWrapper className="space-y-6 pt-16 pb-24">
      <TopBar 
        title={t('categories.title')} 
        onBack={() => navigate('/setup')} 
        rightElement={
          <Button size="sm" onClick={() => navigate('/categories/new')} className="gap-2 h-9 px-3">
              <Plus size={16} />
              {t('categories.new')}
          </Button>
        }
      />

      <div className="space-y-4">
         <div className="space-y-2">
             {categories.map((cat) => (
                 <div 
                    key={cat.id} 
                    onClick={() => navigate(`/categories/edit/${cat.id}`)}
                    className="bg-bg-card p-4 rounded-2xl flex items-center justify-between border border-text-primary/5 hover:border-primary-500/50 transition-all cursor-pointer group"
                >
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {cat.icon}
                         </div>
                         <div>
                             <div className="font-bold">{cat.name}</div>
                             <div className="text-xs text-text-secondary">
                                 {cat.words.length} {t('categories.words')} • {cat.isBuiltIn ? t('categories.builtIn') : t('categories.custom')}
                             </div>
                         </div>
                     </div>
                     <div className="flex items-center gap-1">
                        {!cat.isBuiltIn && (
                            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10" onClick={(e) => handleDelete(e, cat.id)}>
                                <Trash2 size={18} />
                            </Button>
                        )}
                        <ChevronRight size={18} className="text-text-muted" />
                     </div>
                 </div>
             ))}
         </div>
      </div>
    </PageWrapper>
  );
}
