import React, { FC, ReactNode, useState } from "react";

import styled from "@emotion/styled";

import PlusIcon from "../../../Shared/PlusIcon";
import CloseIcon from "../../../Shared/CloseIcon";
import Chip from "../../../Shared/Chip";

const TopBarContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const ChipContainer = styled.div({
  display: "flex",
  flexDirection: "row",
});

export interface SearchTermsProps {
  searchTermsChanged(selected?: string[]): void;
}

//  this will take some grams (1 2 or 3 words) as props
const SearchTerms: FC<SearchTermsProps> = ({ searchTermsChanged }: SearchTermsProps) => {
  const initialSearchTerms: string[] = [];
  const [searchTerms, setSearchTerms] = useState(initialSearchTerms);
  const [showAddTermInput, setShowAddTermInput] = useState(false);

  function renderChip(searchTerm: string, index: number): ReactNode {
    return (
      <Chip
        onClick={() => {
          setSearchTerms(searchTerms.splice(index, 1));
        }}
        deletable={true}
      >
        <>
          <p>{searchTerm}</p>
          <CloseIcon />
        </>
      </Chip>
    );
  }

  return (
    <div>
      <TopBarContainer>
        <div>Search Terms</div>
        <div>{`${searchTerms.length}/6`}</div>
      </TopBarContainer>
      <ChipContainer>
        {searchTerms.map((searchTerm, index) => {
          return renderChip(searchTerm, index);
        })}
        <Chip
          onClick={() => {
            setShowAddTermInput(true);
          }}
          deletable={false}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <>Add</>
            <div
              style={{
                height: 24,
                width: 24,
              }}
            >
              <PlusIcon />
            </div>
          </div>
        </Chip>
      </ChipContainer>
      {showAddTermInput && (
        <input
          type="search"
          placeholder={"Search Terms"}
          value={""}
          onChange={() => {
            // this is perhaps supposed to initiate queries through the indexable grams?
          }}
        />
      )}
    </div>
  );
};

export default SearchTerms;
