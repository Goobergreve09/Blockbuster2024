import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Container, Row, Col } from "react-bootstrap";
import blockbusterTotalaccess from "../assets/images/BlockBusterTotalAccess.png";
import MemberCardProfile from "../components/MemberCardProfile";
import { QUERY_WATCHLIST } from "../utils/queries";

const Profile = () => {
  // Define useState and useEffect at the top
  const [userData, setUserData] = useState({});
  const [paddedUsername, setPaddedUsername] = useState("");
  const [totalWatchHours, setTotalWatchHours] = useState(0);

  // Fetch data with useQuery
  const { loading, data } = useQuery(QUERY_WATCHLIST);

  useEffect(() => {
    if (!loading && data) {
      const user = data?.me || {};
      setUserData(user);
      setPaddedUsername(user?.username ? user.username.padEnd(20, ".") : "");

      // Calculate total watch hours
      let totalHours = 0;
      if (user?.savedWatchlist) {
        totalHours = user.savedWatchlist.reduce((total, movie) => {
          const runtime = movie.movieLength ? parseInt(movie.movieLength) : 0;
          return total + runtime;
        }, 0);
      }
      setTotalWatchHours(totalHours / 60); // Convert minutes to hours
    }
  }, [loading, data]);

  // sets the "User Since" date on MemberCard
  const memberSince = new Date(Date.now()).toLocaleDateString();

  // Convert total watch hours to string with two decimal places
  const formattedTotalWatchHours = totalWatchHours.toFixed(2);

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="home-container align-items-center">
      <Row className="img-header-row">
        <Col className="justify-content-center">
          <img
            src={blockbusterTotalaccess}
            alt="Vintage Logo"
            style={{ width: "30%" }}
          />
          <div className="membership-card">
            <MemberCardProfile
              username={userData.username}
              email={userData.email}
              hoursWatched={formattedTotalWatchHours} // Pass total watch hours to MemberCard
              paddedUsername={paddedUsername}
              memberSince={memberSince}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;