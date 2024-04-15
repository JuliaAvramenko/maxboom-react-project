import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectCategorySlug } from '@/entities/Category/selectors/categorySelectors'
import { CategoryItem } from '@/features/CategoryItem/CategoryItem'
import { useAppDispatch } from '@/shared/libs/hooks/store'
import Heading, { HeadingType } from '@/shared/ui/Heading/Heading'
import { getCategoryBranchesSelector, getCategorySelector } from '@/widgets/CategoryList/selectors/selectors'
import { getCategoryBranches } from '@/widgets/CategoryList/services/getCategoryBranches'
import { getCategories } from '@/widgets/CategoryList/services/getCatergories'

import styles from './CategoryList.module.scss'

/**
 * Список категорий для страницы товаров.
 * Фиксированная высота настраивается классом .category-list__items
 */
export const CategoryList: FC = () => {
  const dispatch = useAppDispatch()
  const categoryBranches = useSelector(getCategoryBranchesSelector)
  const getMainCategories = useSelector(getCategorySelector)
  const categorySlug = useSelector(selectCategorySlug)

  const { slug } = useParams()

  useEffect(() => {
    dispatch(getCategoryBranches(slug))
  }, [])

  useEffect(() => {
    dispatch(getCategoryBranches(categorySlug))
    dispatch(getCategories())
  }, [categorySlug])

  return (
    <div className={styles['category-list']}>
      <Heading type={HeadingType.NORMAL} className={styles['category-list__title']}>
        Категории
      </Heading>
      <ul className={styles['category-list__items']}>
        {categoryBranches.branches?.length > 0
          ? categoryBranches.branches.map(item => (
              <CategoryItem
                key={item.id}
                id={item.id}
                name={item.name}
                slug={item.slug}
                count={item.products_count}
              />
            ))
          : getMainCategories.map(item => (
              <CategoryItem
                key={item.id}
                id={item.id}
                name={item.name}
                slug={item.slug}
                // Поля count в списке категорий верхнего уровня на бэке нет, если мы его оставляем, то нужно будет запросить вывод количества товаров
                count={0}
              />
            ))}
      </ul>
    </div>
  )
}
