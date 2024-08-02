/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useLang } from '@/hooks/useLang'
import { IBreadcrumbsProps } from '@/types/modules'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Crumb from './Crumb'

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0]
  return pathWithoutQuery.split('/').filter((v) => v.length > 0)
}

const Breadcrumbs = ({
  getDefaultTextGenerator,
  getTextGenerator,
}: IBreadcrumbsProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { lang, translations } = useLang()

  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(pathname)
      const pathnameNestedRoutes = generatePathParts(pathname)

      const crumbList = asPathNestedRoutes.map((subpath, idx) => {
        const param = pathnameNestedRoutes[idx]
          .replace('[', '')
          .replace(']', '')

        const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')

        return {
          href,
          textGenerator: getTextGenerator(param, searchParams.getAll('')),
          text: getDefaultTextGenerator(subpath, href),
        }
      })

      return [...crumbList]
    },
    [pathname, getTextGenerator, searchParams, getDefaultTextGenerator, lang]
  )

  return (
    <div className='container breadcrumbs__container'>
      <ul className='list-reset breadcrumbs'>
        <li className='breadcrumbs__item'>
          <Link href='/' className='breadcrumbs__item__link first-crumb'>
            {translations[lang].breadcrumbs.main}
          </Link>
        </li>
        {breadcrumbs.map((crumb, idx) =>
          crumb.text ? (
            <li key={idx} className='breadcrumbs__item'>
              {/** @ts-ignore */}
              <Crumb
                {...crumb}
                key={idx}
                last={idx === breadcrumbs.length - 1}
              />
            </li>
          ) : (
            ''
          )
        )}
      </ul>
    </div>
  )
}

export default Breadcrumbs
