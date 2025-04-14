import React from 'react'

const GetFare = () => {

  const [fare, setFare] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchFare = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-rides", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          driverId: "driverId", // Replace with actual driverId
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFare(data);
    } catch (error) {
      console.error("Error fetching fare:", error);
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    fetchFare();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fare?.length === 0) {
    return <div>No fare available</div>;
  }

  if (fare?.length > 0) {
    return (
      <div>
        <h1>Fare</h1>
        <ul>
          {fare.map((ride) => (
            <li key={ride._id}>
              {ride.source} to {ride.destination} - {ride.amount}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h1>Fare</h1>
      <p>No fare available</p>
    </div>
  );
}

export default GetFare
