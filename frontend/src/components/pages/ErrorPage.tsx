
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError(); 

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>this is the wrong page </p>
      <p><i>{(error as Error)?.message || "Unknown Error"}</i></p>
      <a href="/" style={{ textDecoration: "none", color: "blue" }}>go to the home</a>
    </div>
  );
};

export default ErrorPage;
