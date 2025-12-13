declare module "next/server" {
  interface RouteHandlerContext<P extends Record<string, any> = Record<string, any>> {
    params: P; 
}
}
