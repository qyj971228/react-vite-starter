import React, { useCallback, useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { RouteConfig, routerConfigs } from '@/router'
import { useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function setMenuItems(items: RouteConfig[], prePath?: string): MenuItem[] {
  return items.map(el => {
    // key
    let key: string = el.path
    if (prePath) {
      key = prePath + '/' + key // 子路由前面没有[/]
    }
    // children
    let children: MenuItem[] | null = null
    if (el.children && el.children.length) {
      children = setMenuItems(el.children, key)
    }
    return {
      key,
      label: el.name,
      children,
    }
  })
}

const routerItems: MenuItem[] = setMenuItems(routerConfigs)

const App: React.FC = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const getOpenItemKeys = useCallback(() => {
    const res: string[] = []
    let add = ''
    const arr = pathname.split('/')
    arr.forEach((el, i) => {
      if (i !== 0 && i !== arr.length - 1) {
        add += '/' + el
        res.push(add)
      }
    })
    return res
  }, [pathname])

  const [openKeys, setOpenKeys] = useState(getOpenItemKeys())
  const [selectedKeys, setSelectedKeys] = useState([pathname])

  useEffect(() => {
    setOpenKeys(getOpenItemKeys())
    setSelectedKeys([pathname])
  }, [pathname, getOpenItemKeys])

  const onHandleClick: MenuProps['onClick'] = e => {
    navigate(e.key)
  }
  const onHandleOpenChange = (keys: string[]) => {
    setOpenKeys(keys)
  }

  return (
    <Menu
      className='overflow-y-auto w-[256px]'
      onClick={onHandleClick}
      onOpenChange={onHandleOpenChange}
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      mode='inline'
      items={routerItems}
    />
  )
}

export default App
