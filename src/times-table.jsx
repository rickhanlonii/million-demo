import {
  Button,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Suspense, useState, lazy, startTransition } from "react";
const LagRadar = lazy(() => import("react-lag-radar"));
const TableView = lazy(() => import("./table-view"));
const TableViewMillion = lazy(() => import("./table-view-million"));

const descriptions = {
  million:
    "Low blocking time, and low delay in updating UI. Unresponsive while updating.",
  "react-compiler":
    "Low blocking time, and low delay in updating UI. Unresponsive while updating.",
  "react-compiler-transitions":
    "Low blocking time, and low delay in updating UI. Responsive while updating.",
};

// Difference from MillionJS demo - moved button to its own component.
// This is how controlled input should setstate outside the transition.
// It ensures fast feedback, while the results transition in the UI.
const CountButton = ({ onClick }) => {
  const [inputCount, setInputCount] = useState(0);

  return (
    <Button
      colorScheme="purple"
      variant="solid"
      onClick={() => {
        setInputCount(inputCount + 1);
        onClick(inputCount + 1);
      }}
    >
      <Text fontSize="md">Increment ({inputCount})</Text>
    </Button>
  );
};

const TimesTable = ({ nodes, mode }) => {
  const [count, setCount] = useState(0);
  // Difference from MillionJS demo.
  // Needs to set unique numbers, so the `key` works.
  const array = Array(nodes);
  let usedNumbers = new Set();
  for (let i = 0; i < nodes; i++) {
    let uniqueNumber = Math.floor(Math.random() * 10000);
    while (usedNumbers.has(uniqueNumber)) {
      uniqueNumber += 100;
    }
    usedNumbers.add(uniqueNumber);
    array[i] = uniqueNumber;
  }

  return (
    <Stack direction="column" spacing={5}>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Suspense fallback={<SkeletonCircle size="200" />}>
          <LagRadar size={200} />
        </Suspense>
        <Text fontSize="xs" mb={3}>
          {descriptions[mode]}
        </Text>
      </Flex>

      <CountButton
        onClick={(c) => {
          if (mode.includes("react-compiler-transitions")) {
            startTransition(() => {
              setCount(c);
            });
          } else {
            setCount(c);
          }
        }}
      />

      <Suspense
        fallback={<SkeletonText noOfLines={9} spacing="3" skeletonHeight="4" />}
      >
        {mode.includes("react-compiler") ? (
          <TableView array={array} count={count} />
        ) : (
          <TableViewMillion array={array} count={count} />
        )}
      </Suspense>
    </Stack>
  );
};

export default TimesTable;
