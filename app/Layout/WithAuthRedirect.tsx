import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PUBLIC_ROUTES = ["/", "/register", "/login/business", "/recovery", "/auth/callbackv1"];

const withAuthRedirect = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuthRedirect = (props: P) => {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      const checkUserAuth = async () => {
        try {
          const jwt = localStorage.getItem("jwt") || "";
          const role = localStorage.getItem("role") || "";

          // Redirect to role-based dashboard if on root path with valid JWT and role
          if (router.pathname === "/" && jwt && role) {
            await router.replace(`/dashboard/${role}`);
            return;
          }

          // Allow access to public routes
          if (PUBLIC_ROUTES.includes(router.pathname)) {
            setIsCheckingAuth(false);
            return;
          }

          // Redirect to login if no JWT
          if (!jwt) {
            await router.replace("/");
            return;
          }

          // Allow access to valid role-based or general routes
          const isRoleBasedPath = router.pathname.includes(role);
          const isGeneralPath = !router.pathname.includes("/business") && !router.pathname.includes("/user");

          if (isRoleBasedPath || isGeneralPath) {
            setIsCheckingAuth(false);
            return;
          }

          // Redirect to role-based dashboard if accessing invalid role-specific path
          await router.replace(`/dashboard/${role}`);
        } catch (error) {
          console.error("Error during authentication check:", error);
        } finally {
          setIsCheckingAuth(false);
        }
      };

      checkUserAuth();
    }, [router.pathname]);

    // Show a loading state while checking authentication
    if (isCheckingAuth) {
      return null; // Optionally, replace with a loader component
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthRedirect.displayName = `WithAuthRedirect(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithAuthRedirect;
};

export default withAuthRedirect;