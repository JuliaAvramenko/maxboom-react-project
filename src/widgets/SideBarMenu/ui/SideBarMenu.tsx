import { KeyboardEvent, FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '@/entities/User/model/hooks/useUser'
import { logout } from '@/features/login/model/services/logout/logout'
import SideBar from '@/features/SideBar'
import { userData, noUserData } from '@/mockData/sideBarProfileData'
import { Routes } from '@/shared/config/routerConfig/routes'
import { useAppDispatch } from '@/shared/libs/hooks/store'
import Heading, { HeadingType } from '@/shared/ui/Heading/Heading'
import Link from '@/shared/ui/Link/Link'

import styles from './SideBarMenu.module.scss'

/**
 * Компонент SideBarMenu раскрывающийся в бургер меню
 */

const SideBarMenu: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { email } = useUser()

  const data = email ? userData : noUserData

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, index: string) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault()
      navigate(index)
    }
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault()
      dispatch(logout())
      navigate(Routes.LOGOUT)
    }
  }

  const logoutBtnHandle = () => {
    dispatch(logout())
    navigate(Routes.LOGOUT)
  }

  return (
    <section className={styles.sideBar}>
      {email && (
        <Heading type={HeadingType.NORMAL} className={styles.sideBar__heading}>
          {email}
        </Heading>
      )}

      <ul role="list" className={styles.sideBar__list}>
        {data &&
          data.map((item, index) => (
            <SideBar key={index} isVisible={true} title={item.title}>
              <ul role="list" className={styles.sideBar__sublinks}>
                {item.routes?.map((el, i) => (
                  <li key={i}>
                    <Link
                      role="link"
                      onKeyDown={e => handleKeyDown(e, el.route)}
                      to={el.route}
                      className={styles.sideBar__sublink}>
                      {el.subtitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </SideBar>
          ))}
      </ul>
      {email && <SideBar onKeyUp={handleKeyUp} onClick={logoutBtnHandle} isVisible={false} title="Выход" />}
    </section>
  )
}

export default SideBarMenu
