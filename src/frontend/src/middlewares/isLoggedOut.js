export default function isLoggedOut({ next, store }) {
  if (store.$jwt.getToken()) {
    next("/");
  }
}
