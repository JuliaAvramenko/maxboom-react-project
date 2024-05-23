import { useEffect, type FC } from 'react'
import { useSelector } from 'react-redux'

import { StateSchema } from '@/app/providers/StoreProvider'
import IconHand from '@/assets/images/img-hand.png.png'
import HeadingBlock from '@/entities/HeadingBlock'
import { ReviewCard } from '@/entities/ReviewCard/ReviewCard'
import { getAverageMark, getFirstFeedbacks } from '@/features/Reviews/model/slice/feedbacksSlice'
import { IFeedback } from '@/features/Reviews/model/types/types'
import { Routes } from '@/shared/config/routerConfig/routes'
import { LINK_REVIEWS_ALL, TEXT_CUSTOMERS_ABOUT_US } from '@/shared/constants/constants'
import { useAppDispatch } from '@/shared/libs/hooks/store'
import { useResize } from '@/shared/libs/hooks/useResize'
import Scroll from '@/shared/ui/Scroll/Scroll'

import styles from './reviewsBlock.module.scss'

/**
 * Компонент ReviewsBlock - это контейнер для отзывов со скролл баром, используется на главной странице MainPage
 * @param {string} title - загаловок контейнера
 * @param {string} linkText - загаловок ссылки
 * @param {string} linkPath - адрес ссылки
 */

const ReviewsBlock: FC = () => {
  const dispatch = useAppDispatch()
  const reviews = useSelector((store: StateSchema) => store.feedbacks)
  const { isScreenLg, isScreenMd } = useResize()

  const arrayThreeReviews = reviews.feedbacks.slice(0, 3)
  const arrayTwoReviews = reviews.feedbacks.slice(0, 2)
  const array = isScreenLg ? arrayThreeReviews : arrayTwoReviews

  useEffect(() => {
    dispatch(getFirstFeedbacks())

    dispatch(getAverageMark())
  }, [])

  return (
    reviews?.count !== 0 && (
      <section className={styles.reviewsBlock}>
        <HeadingBlock
          title={TEXT_CUSTOMERS_ABOUT_US}
          isIcon={true}
          image={IconHand}
          alt="картинка"
          isLink={true}
          subtitle={LINK_REVIEWS_ALL}
          link={`${Routes.REVIEWS}/${0}`}
        />
        {isScreenMd ? (
          <ul className={styles.grid}>
            <ReviewCard
              key="feadbackHeader"
              pk={0}
              text=""
              date=""
              score={reviews.averageMark.average_score__avg}
              name=""
              index={0}
            />
            {array.map((item: IFeedback, index) => (
              <ReviewCard
                key={item.pk}
                pk={item.pk}
                text={item.text}
                date={item.pub_date}
                score={item.average_score}
                name={item.author_name}
                index={index}
              />
            ))}
          </ul>
        ) : (
          <Scroll withManualGrip={true}>
            <ReviewCard
              key="feadbackHeader"
              pk={0}
              text=""
              date=""
              score={reviews.averageMark.average_score__avg}
              name=""
              index={0}
            />
            {reviews.feedbacks.map((item: IFeedback, index) => (
              <ReviewCard
                key={item.pk}
                pk={item.pk}
                text={item.text}
                date={item.pub_date}
                score={item.average_score}
                name={item.author_name}
                index={index}
              />
            ))}
          </Scroll>
        )}
      </section>
    )
  )
}

export default ReviewsBlock
