import { nGram } from "n-gram";
import { stem } from "stemr";

import cleanText from "../../utils/cleanText";

function getStemmedGrams(query: string): string[] {
  const cleanedQuery = cleanText(query).split(" ");
  const stemmedGrams: string[] = [];
  Array.from([1, 2, 3]).forEach((nGramSize) => {
    const allGrams: string[][] = nGram(nGramSize)(cleanedQuery);
    allGrams.forEach((gramSet) => {
      stemmedGrams.push(
        gramSet
          .map((gram) => {
            return stem(gram);
          })
          .join(" ")
          .toLowerCase()
      );
    });
  });

  return stemmedGrams;
}

export { getStemmedGrams };
