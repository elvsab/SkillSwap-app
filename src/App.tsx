import { useEffect } from "react";
import { useDispatch } from "./app/providers/store";

import {
  fetchCategories,
  fetchSubcategories,
} from "./entities/skills/model/skillsSlice";
import { RouterProvider } from "react-router-dom";
import router from "./app/providers/router/router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
