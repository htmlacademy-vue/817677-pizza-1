export default function isLoggedIn({ next, store, nextMiddleware }) {
  if (store.$jwt.getToken()) {
    next();
  } else {
    next("/");
  }
  return nextMiddleware();
}
