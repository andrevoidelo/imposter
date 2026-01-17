import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from '../components/common/Button';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TopBar } from '../components/layout/TopBar';
import { FixedFooter } from '../components/layout/FixedFooter';

export default function HowToPlay() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PageWrapper className="space-y-6 pt-16 pb-24">
      <TopBar title={t('howToPlay.title')} onBack={() => navigate('/')} />

      <div className="space-y-6 text-text-secondary overflow-y-auto custom-scrollbar">
        <section className="space-y-2">
            <h2 className="text-lg font-bold text-primary-400">{t('howToPlay.concept.title')}</h2>
            <p>
              <Trans i18nKey="howToPlay.concept.text" components={{ 1: <span className="text-role-impostor font-bold" /> }} />
            </p>
        </section>

        <section className="space-y-2">
            <h2 className="text-lg font-bold text-primary-400">{t('howToPlay.clues.title')}</h2>
            <p>{t('howToPlay.clues.text')}</p>
            <p className="text-sm bg-bg-elevated p-3 rounded-lg border-l-4 border-primary-500">
                <Trans i18nKey="howToPlay.clues.tip" components={{ 1: <span className="font-bold" /> }} />
            </p>
        </section>

        <section className="space-y-2">
            <h2 className="text-lg font-bold text-primary-400">{t('howToPlay.vote.title')}</h2>
            <p>{t('howToPlay.vote.text')}</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><Trans i18nKey="howToPlay.vote.li1" components={{ 1: <span className="text-role-impostor font-bold" /> }} /></li>
                <li><Trans i18nKey="howToPlay.vote.li2" components={{ 1: <span className="text-success font-bold" /> }} /></li>
            </ul>
        </section>

        <section className="space-y-2">
            <h2 className="text-lg font-bold text-primary-400">{t('howToPlay.lastChance.title')}</h2>
            <p>
              <Trans i18nKey="howToPlay.lastChance.text" components={{ 1: <strong /> }} />
            </p>
        </section>

        <section className="space-y-2">
             <h2 className="text-lg font-bold text-primary-400">{t('howToPlay.specialModes.title')}</h2>
             <div className="space-y-4">
                 <div className="bg-bg-elevated p-4 rounded-xl">
                     <h3 className="font-bold text-warning mb-1">{t('howToPlay.specialModes.undercover.title')}</h3>
                     <p className="text-sm">
                        <Trans i18nKey="howToPlay.specialModes.undercover.text" components={{ 1: <strong /> }} />
                     </p>
                 </div>
                 <div className="bg-bg-elevated p-4 rounded-xl">
                     <h3 className="font-bold text-white mb-1">{t('howToPlay.specialModes.confused.title')}</h3>
                     <p className="text-sm">
                        <Trans i18nKey="howToPlay.specialModes.confused.text" components={{ 1: <strong /> }} />
                     </p>
                 </div>
             </div>
        </section>
      </div>
      
      <FixedFooter>
        <Button 
            fullWidth 
            size="lg" 
            onClick={() => navigate('/setup')}
            className="bg-gradient-to-r from-primary-500 to-primary-600 shadow-xl shadow-primary-500/20 h-16"
        >
            {t('howToPlay.button')}
        </Button>
      </FixedFooter>
    </PageWrapper>
  );
}
