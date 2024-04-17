import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import useReadTodayActivities from "./useReadTodayActivities";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { data: todayActivities, status, error } = useReadTodayActivities();

  switch (status) {
    case "error":
      return <p>Error: {error.message}</p>;
  }

  return (
    <StyledToday>
      <Row $type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {status === "pending" ? (
        <Spinner />
      ) : todayActivities?.length > 0 ? (
        <TodayList>
          {todayActivities.map(todayActivity => (
            <TodayItem key={todayActivity.id} todayActivity={todayActivity} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>No activities today.</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
