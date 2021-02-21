import { useState } from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1px 1px;
  grid-template-areas:
    "a x x x x x x"
    "y o o o o o o"
    "y o o o o o o"
    "y o o o o o o"
    "y o o o o o o"
    "y o o o o o o"
    "y o o o o o o";
  background-color: black;
  border: 1px solid black;
`;

const X = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  grid-template-areas: ". . . . . .";
  grid-area: x;
`;

const Y = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1px 1px;
  grid-template-areas:
    "."
    "."
    "."
    "."
    "."
    ".";
  grid-area: y;
`;

const A = styled.div`
  grid-area: a;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  grid-template-areas: ". .";
`;

const Output = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1px 1px;
  grid-template-areas:
    ". . . . . ."
    ". . . . . ."
    ". . . . . ."
    ". . . . . ."
    ". . . . . ."
    ". . . . . .";
  grid-area: o;
`;

const Input = styled.input`
  padding: 0.25rem 0.5rem;
  appearance: none;
  border: 0;
  background-color: white;
  color: black;
  font-size: 1rem;
  min-width: 0;

  &:focus {
    outline: 0;
    color: red;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
`;

const Sub = styled.div`
  padding: 0.25rem 0.5rem;
  background-color: white;
  flex: 1;
  display: flex;
  align-items: center;

  &:first-of-type {
    border-bottom: 1px solid black;
  }
`;

// @ts-ignore
const cartesian = (...a): string[][][] =>
  // @ts-ignore
  a.reduce((a, b) => a.map((d) => b.map((e) => [d, e].flat())));

export const App = () => {
  const [state, setState] = useState({
    seed: "why you",
    branch: "who you",
    x: ["were", "were not", "are", "are not", "will be", "will not be"],
    y: [
      "thought",
      "did not think",
      "think",
      "do not think",
      "will think",
      "will not think",
    ],
  });

  const handleChange = (key: string) => ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleAxisChange = ({
    axis,
    index,
  }: {
    axis: "x" | "y";
    index: number;
  }) => ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => {
      const next = prev[axis];
      next[index] = value;
      return {
        ...prev,
        [axis]: next,
      };
    });
  };

  const grid = cartesian(state.y, state.x);

  return (
    <Grid>
      <A>
        <Input defaultValue={state.seed} onChange={handleChange("seed")} />
        <Input defaultValue={state.branch} onChange={handleChange("branch")} />
      </A>
      <X>
        {state.x.map((q, i) => {
          return (
            <Input
              key={i}
              defaultValue={q}
              onChange={handleAxisChange({ axis: "x", index: i })}
            />
          );
        })}
      </X>

      <Y>
        {state.y.map((q, i) => {
          return (
            <Input
              key={i}
              defaultValue={q}
              onChange={handleAxisChange({ axis: "y", index: i })}
            />
          );
        })}
      </Y>

      <Output>
        {grid.map((row: string[][], i) => {
          return row.map(([left, right], j) => {
            return (
              <Cell key={[i, j].join("-")}>
                <Sub>{[state.seed, left, state.branch, right].join(" ")}</Sub>
                <Sub>{[state.seed, right, state.branch, left].join(" ")}</Sub>
              </Cell>
            );
          });
        })}
      </Output>
    </Grid>
  );
};
