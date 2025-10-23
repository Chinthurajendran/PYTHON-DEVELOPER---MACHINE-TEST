import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AppRoutes from "./AppRoutes"


function App() {
  return (
    <div>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        newestOnTop
        closeButton={false}
        role="alert"
        toastClassName={(context) =>
          [
            'relative w-full max-w-sm flex items-start gap-4 p-4 rounded-xl shadow-lg border-l-4 animate-slide-in',
            'bg-white text-black',
            context?.type === 'success' && 'border-green-500',
            context?.type === 'error' && 'border-red-500',
            context?.type === 'info' && 'border-blue-500',
            context?.type === 'warning' && 'border-yellow-500'
          ]
            .filter(Boolean)
            .join(' ')
        }
        bodyClassName="text-sm font-medium leading-snug flex-1"
      />
    </div>
  )
}

export default App
