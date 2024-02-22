import Heading, { HeadingType } from '@/shared/ui/Heading/Heading'
import styles from './HelpPage.module.scss'
import Subheading from '@/shared/ui/Subheading/Subheading'
import HelpCategories from '@/widgets/HelpCategories/HelpCategories'
import FormReturn from '@/widgets/FormReturn/FormReturn'
import WrapperForMainContent from '../../components/WrapperForMainContent/WrapperForMainContent'

const HelpPage = () => {
  return (
    <WrapperForMainContent>
      <div className={styles.help__wrapper}>
        <div className={styles.help__container}>
          <Heading type={HeadingType.NORMAL}>Помощь</Heading>
          <Subheading className={styles.help__path}>Главная/Помощь</Subheading>
          <div className={styles.help__cats}>
            <Heading type={HeadingType.NORMAL}>Категории</Heading>
            <HelpCategories />
          </div>
        </div>
        <div className={styles.help__container}>
          <Heading type={HeadingType.NORMAL}>Форма возврата</Heading>
          <FormReturn />
        </div>
      </div>
    </WrapperForMainContent>
  )
}

export default HelpPage
