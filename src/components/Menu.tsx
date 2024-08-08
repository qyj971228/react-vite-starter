import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { RouteConfig, routerConfigs } from '@/router';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function setMenuItems(items: RouteConfig[], prePath?: string): MenuItem[] {
  return items.map(el => {
    // children
    let children: MenuItem[] | null = null
    if (el.children && el.children.length) {
      children = setMenuItems(el.children, el.path)
    }
    // key
    let key: string = el.path
    if (prePath) {
      key = prePath + '/' + key // 子路由前面没有[/]
    }
    return {
      key,
      label: el.name,
      children
    }
  })
}

const routerItems: MenuItem[] = setMenuItems(routerConfigs)

console.log(routerItems)

const App: React.FC = () => {

  const navigate = useNavigate()

  const location = useLocation()

  const [openKeys, setOpenKeys] = useState([getOpenItem()])
  const [selectedKeys, setSelectedKeys] = useState([location.pathname])

  useEffect(() => {
    setOpenKeys([getOpenItem()])
    setSelectedKeys([location.pathname])
  }, [location.pathname])

  // 获取所在的上一级item
  function getOpenItem() {
    const arr = location.pathname.split('/')
    if (arr.length > 1) {
      arr.pop()
    }
    return arr.join('/')
  }

  const onHandleClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  };
  const onHandleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      className='overflow-y-auto w-[256px]'
      onClick={onHandleClick}
      onOpenChange={onHandleOpenChange}
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      mode="inline"
      items={routerItems}
    />
  );
};

export default App;