import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Outlet />
      <ToastContainer
        theme="colored"
        newestOnTop
        pauseOnHover={false}
      />
    </>
  )
};

export default App;
