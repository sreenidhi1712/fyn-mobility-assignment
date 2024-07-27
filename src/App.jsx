import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./Components/home/index.jsx"
import InfiniteScroll from "./Components/infiniteScroll/index.jsx"
import ScrollableList from "./Components/SortableList/index.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/gallery",
    element: <InfiniteScroll />
  },
  {
    path: "/list",
    element: <ScrollableList />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
