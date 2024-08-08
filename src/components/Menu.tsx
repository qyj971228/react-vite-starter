import React from 'react';
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

  // 获取所在的上一级item
  function getOpenItem() {
    const arr = location.pathname.split('/')
    if (arr.length > 1) {
      arr.pop()
    }
    return arr.join('/')
  }

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  };

  return (
    <Menu
      className='overflow-y-auto w-[256px]'
      onClick={onClick}
      defaultOpenKeys={[getOpenItem()]}
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      items={routerItems}
    />
  );
};

export default App;