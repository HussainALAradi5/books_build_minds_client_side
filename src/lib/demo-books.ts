import type { BookDto } from "./types";

// Static preview data, matching the Flask seed command.
const samples = [
  ["the-midnight-library", "9780525559474", "The Midnight Library", "Matt Haig", "Viking", "2020-09-29", 7.50, 4.6],
  ["atomic-habits", "9780735211292", "Atomic Habits", "James Clear", "Avery", "2018-10-16", 8.90, 4.8],
  ["the-alchemist", "9780062315007", "The Alchemist", "Paulo Coelho", "HarperOne", "2014-04-15", 5.25, 4.5],
  ["educated", "9780399590504", "Educated", "Tara Westover", "Random House", "2018-02-20", 9.75, 4.7],
  ["deep-work", "9781455586691", "Deep Work", "Cal Newport", "Grand Central", "2016-01-05", 6.80, 4.4],
  ["sapiens", "9780062316097", "Sapiens", "Yuval Noah Harari", "Harper", "2015-02-10", 10.20, 4.5],
] as const;

export const demoBooks: BookDto[] = samples.map(([slug, isbn, title, author, publisher, published_at, price, average_rating], index) => ({
  book_id: index + 1, slug, isbn, title, author, publisher, published_at, price, average_rating,
  book_image: null, reviews: [], added_by_user_id: 0, purchased_by: [], media: [], copies_total: 3, available_copies: 3,
}));


