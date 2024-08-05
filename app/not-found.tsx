'use client'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import { useLang } from '@/hooks/useLang'
import s from '@/styles/not-found/index.module.scss'

const NotFound = () => {
  const { lang, translations } = useLang()

  return (
    <main>
      <section className={s.not_found}>
        <div className='container'>
          <EmptyPageContent
            subtitle={translations[lang].common.not_found_subtitle}
            description={translations[lang].common.not_found_description}
            btnText={translations[lang].common.go_shopping}
            bgClassName={s.empty_bg}
            bgWordClassName={s.not_found_bg}
            emptyWord={translations[lang].common.not_found_bg}
            oopsWord={translations[lang].common.ops}
            title={translations[lang].common.not_found_title}
          />
        </div>
      </section>
    </main>
  )
}

export default NotFound
