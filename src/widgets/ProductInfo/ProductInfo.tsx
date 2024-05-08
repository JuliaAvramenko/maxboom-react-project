import { type FC } from 'react'

import { RollUp } from '@/features/RollUp/RollUp'
import Paragraph from '@/shared/ui/Paragraph/Paragraph'

import { TProductInfo } from './model/type/type'
import styles from './ProductInfo.module.scss'

/**
 * Блок с описанием товара на странице товара
 */
export const ProductInfo: FC<TProductInfo> = ({ description }) => {
  return (
    <RollUp>
      <Paragraph className={styles.text}>{description}</Paragraph>
    </RollUp>
  )
}
