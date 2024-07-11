const APP_ROUTES = {
  private: {
    favorite: "/shop/favorite",
    cart: '/shop/cart',
    profile: '/profile'
  },
  public: {
    root: "/",
    login: "/login",
    signup: "/signup",
  },
};

export function checkIsPublicRoute(path: string) {
  const appPublicRoute = Object.values(APP_ROUTES.public);

  return appPublicRoute.includes(path);
}
