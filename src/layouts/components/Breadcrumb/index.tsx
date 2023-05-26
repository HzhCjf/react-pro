import React from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Breadcrumb } from "antd";

import { findSideBarRoutes } from "@/routes";
import { XRoutes, XRoute } from "@/routes/types";

// const BreadcrumbItem = Breadcrumb.Item;

const findBreadcrumbTitle = (pathname: string, routes: XRoutes): any => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];

    if (route.path === pathname) {
      // console.log(route);

      return {
        title: route.meta?.title as string,
      };
    }

    if (route.children) {
      console.log(2);
      for (let j = 0; j < route.children.length; j++) {
        const childRoute = route.children[j];

        // 为了路由的params参数能匹配上，必须使用matchPath方法
        if (matchPath(childRoute.path as string, pathname)) {
          console.log(3);
          return {
            title: route.meta?.title as string,
            childTitle: childRoute.meta?.title,
          };
        }
      }
    }
  }
};
/* const findBreadcrumbTitle = (pathname: string, routes: XRoutes): any => {
  const currentPath = window.location.pathname;
  const matchingRoutes: any = [];

  // 解析与当前路径匹配的所有路由
  routes.forEach((route) => {
    if (route.children) {
      route.children.forEach((childRoute) => {
        const childPath = childRoute;
        const isExactMatch = childRoute.exact
          ? currentPath === childPath
          : currentPath.startsWith(childPath);
        if (isExactMatch) {
          matchingRoutes.push({ ...childRoute, parentPath: route.path });
        }
      });
    } else {
      const isExactMatch = route.exact
        ? currentPath === route.path
        : currentPath.startsWith(route.path);
      if (isExactMatch) {
        matchingRoutes.push(route);
      }
    }
  });

  // 将匹配的路由转换为面包屑项
  const breadcrumbItems = [];
  let parentRoute = matchingRoutes[0];
  while (parentRoute) {
    breadcrumbItems.unshift({
      label: parentRoute.label,
      link: parentRoute.path,
    });
    parentRoute = parentRoute.parentPath
      ? routes.find((route) => route.path === parentRoute.parentPath)
      : null;
  }

  return breadcrumbItems;
}; */

function BreadcrumbComponent() {
  const location = useLocation();

  const { pathname } = location;
  // 获取需要遍历的路由表
  const routes = findSideBarRoutes();
  // 生成导航
  const titles = findBreadcrumbTitle(pathname, routes);

  console.log(titles);

  return (
    <Breadcrumb style={{ margin: "15px 10px" }}>
      <Breadcrumb items={[{ title: titles.title }]} />;
      {/* <BreadcrumbItem>{titles.title}</BreadcrumbItem> */}
      {/* 二级导航可能没有，所以进行判断 */}
      {titles.childTitle && (
        // <BreadcrumbItem>{titles.childTitle}</BreadcrumbItem>
        <Breadcrumb items={[{ title: titles.childTitle }]} />
      )}
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;
