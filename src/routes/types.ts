import type { ReactElement } from "react";
import type { RouteObject } from "react-router-dom";

export interface XMeta {
  icon?: React.ReactNode;
  title?: string | ReactElement;
}

export interface XRoute extends RouteObject {
  meta?: XMeta;
  children?: XRoutes;
  hidden?: boolean;
}

export type XRoutes = XRoute[];
