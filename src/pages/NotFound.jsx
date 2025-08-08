import { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    document.title = 'Not Found';
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </div>
  );
}

export default NotFound;