import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Ой!</h1>
      <p>Что-то не так.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}