import { useParams } from "react-router-dom";

export const SkillPage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div>
      <h1>Skill Page</h1>
      <p>Skill ID: {id}</p>
      <p>TODO: Implement skill details page</p>
    </div>
  );
};

