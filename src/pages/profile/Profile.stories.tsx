import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import { Profile } from "./Profile";
import { Skills } from "./sections/skillsPage";
import { Personal } from "./sections/personal";
import { Favorites } from "./sections/favorites";
import { Requests } from "./sections/requests";
import { Exchanges } from "./sections/exchanges";

export default {
  title: "Widgets/Profile",
  component: Profile,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => (
  <div
    style={{
      width: "1440px",
      margin: "0 auto",
      border: "1px solid #ddd",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    }}
  >
    <MemoryRouter initialEntries={["/profile/personal"]}>
      <Routes>
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Navigate to="personal" replace />} />
          <Route path="requests" element={<Requests />} />
          <Route path="exchanges" element={<Exchanges />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="skills" element={<Skills />} />
          <Route path="personal" element={<Personal />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </div>
);
