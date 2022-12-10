import { ChakraProvider, theme } from "@chakra-ui/react";
import routes from "./routes";
import RouteCustom from "./components/CustomeRoute.tsx";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./i18n/config";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        {routes?.map((item) => (
          <RouteCustom key={item?.path} {...item} />
        ))}
      </Switch>
    </Router>
  </ChakraProvider>
);
