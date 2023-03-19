import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const params = useParams();

  const id = params.id;

  return (
    <>
      <h1>EventDetailPage</h1>
      <p> Event ID : {id}</p>
    </>
  );
};

export default EventDetailPage;
