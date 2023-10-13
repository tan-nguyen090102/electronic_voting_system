import React, { useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home - Voting System";
  }, []);

  return (
    <Flex>
      <Heading>This is Home page</Heading>
    </Flex>
  );
}
