import { Outlet } from "react-router-dom";

export const Profile = () => {
  return (
    <div>
      <h1>Profile Layout</h1>
      <nav>
        <a href="/profile/personal">Personal</a> | 
        <a href="/profile/requests">Requests</a> | 
        <a href="/profile/exchanges">Exchanges</a> | 
        <a href="/profile/favorites">Favorites</a> | 
        <a href="/profile/skills">Skills</a>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

