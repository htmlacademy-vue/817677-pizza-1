import Vue from "vue";
import store from "@/store";
import Router from "vue-router";
import routes from "@/router/routes";
// import { middlewarePipeline } from "@/middlewares";

Vue.use(Router);

export default Promise.all(routes).then((routes) => {
  const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (!to.meta.middlewares) {
      return next();
    }

    const middlewares = to.meta.middlewares;

    Object.keys(middlewares).forEach((middleware) => {
      middlewares[middleware]({ to, from, next, store });
    });
    return next();
  });

  return router;
});

// const router = new Router({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });
//
// router.beforeEach((to, from, next) => {
//   const middlewares = to.meta.middlewares;
//   if (!middlewares?.length) {
//     return next();
//   }
//
//   // Запускаем обход по цепочке проверок
//   const context = { to, from, next, store };
//   const firstMiddlewareIndex = 0;
//   const nextMiddlewareIndex = 1;
//   return middlewares[firstMiddlewareIndex]({
//     ...context,
//     nextMiddleware: middlewarePipeline(
//       context,
//       middlewares,
//       nextMiddlewareIndex
//     ),
//   });
// });
//
// export default router;
