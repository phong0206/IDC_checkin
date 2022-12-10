import { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";

import { useAppSelector } from "redux/hooks";
import isEqual from "react-fast-compare";

import LoadingPage from "../LoadingPage";
interface RouteProps {
  component: any;
  exact: boolean;
  // layout: any;
  layoutParams?: any;
}

function RequireAuth({ children }: any) {
  const userInfo = useAppSelector((state) => state.userInfo, isEqual);
  return userInfo?.user ? children : <Redirect to="/login" />;
}

function RouteCustom(props: RouteProps) {
  const {
    component: InnerComponent,
    exact,
    /* layout: Layout, layoutParams, */ ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={(propsPre: any) => (
        // <Layout {...layoutParams}>
        <Suspense
          fallback={
            <div className={"loading-container"}>
              <LoadingPage />
            </div>
          }
        >
          {exact ? (
            <RequireAuth>
              <InnerComponent {...propsPre} />
            </RequireAuth>
          ) : (
            <InnerComponent {...propsPre} />
          )}
        </Suspense>
      )}
    />
  );
}
export default RouteCustom;
