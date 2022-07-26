import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { routes } from '@/views'

export function useMenu() {
  const { pathname } = useLocation()
  return useMemo(() => {
    let defaultOpenKeys = ''
    let defaultSelectedKeys = ''
    for (let i = 0; i < routes.length; i++) {
      if (!routes[i].children) {
        if (routes[i].path == pathname) {
          defaultSelectedKeys = routes[i].id
          break
        }
      } else {
        for (let j = 0; j < routes[i].children.length; j++) {
          if (routes[i].children[j].path == pathname) {
            defaultOpenKeys = routes[i].id
            defaultSelectedKeys = routes[i].children[j].id
            break
          }
        }
      }
    }
    return [defaultOpenKeys + '', defaultSelectedKeys + '']

  }, [pathname])
}

export function useBreadcrumb() {
  let arr = [];
  const { pathname } = useLocation()
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path == pathname && routes[i].path != '/dashboard') {
      arr.push(routes[i].label)
    } else if (routes[i].path != pathname && routes[i].children) {
      for (let j = 0; j < routes[i].children.length; j++) {
        if (routes[i].children[j].path == pathname) {
          arr.push(routes[i])
          arr.push(routes[i].children[j])
        }
      }
    }
  }
  return arr
}