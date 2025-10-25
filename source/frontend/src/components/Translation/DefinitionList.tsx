import React from 'react';

interface DefinitionListProps {
  // The array of strings to display
  items: string[] | undefined | null;
  // The maximum number of items to show
  limit: number;
  // Pass the CSS class for styling from the parent
  listClassName: string;
}

/**
 * A reusable component that renders a limited number of items from an array
 * in an unordered list.
 */
const DefinitionList: React.FC<DefinitionListProps> = ({ items, limit, listClassName }) => {
  // --- Reliability Check ---
  // If the items array is null, undefined, or empty, render nothing.
  if (!items || items.length === 0) {
    return null;
  }

  // --- Limiting Logic ---
  // Take a "slice" of the array from the beginning up to the limit.
  // This gracefully handles cases where the array is shorter than the limit.
  const itemsToShow = items.slice(0, limit);

  return (
    <ul className={listClassName}>
      {itemsToShow.map((item, index) => (
        <li key={`item-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

export default DefinitionList;