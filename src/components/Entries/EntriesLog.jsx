import styled from "styled-components";
import Entry from "./Entry";

export default function Entries ({ entries }) {
    return (
        <StyledEntriesLog>
            {entries
                .map((e, i) => (
                  <Entry
                    key={i}
                    id={e._id}
                    date={e.transaction.date}
                    title={e.transaction.description}
                    value={e.transaction.value}
                    type={e.transaction.type}
                  />
                ))
                .reverse()}
        </StyledEntriesLog>
    );
};

const StyledEntriesLog = styled.div`
    box-sizing: none;
    width: 95%;
    background-color: white;
    overflow-Y: scroll;
`