import type { WorkflowStep } from "@/interfaces/ui/workflow/WorkflowStep";

export const libraryGuideSteps: readonly WorkflowStep[] = [
  { id: "browse", title: "Choose your next book", description: "Explore the catalog and use search or filters to find a book. Open its page to see the condition, price, available copies, and reader reviews. Sign in to borrow, rent, or purchase." },
  { id: "loan", title: "Borrow or rent", description: "Choose Borrow for 14 days or Rent for 7 days when a copy is available. Review the displayed rental fee before renting. The book page and the Loans tab in My profile show your due date." },
  { id: "return", title: "Return your loan", description: "Open My profile, select Loans, find your active loan, and choose Return. You can also use Return book on the book page. A successful return closes the loan and makes the copy available again." },
  { id: "purchase", title: "Purchase and keep your receipt", description: "Choose Purchase book on its page. Once the purchase succeeds, Download receipt becomes available. Your account keeps a record of the purchase." },
  { id: "review", title: "Share a review", description: "After purchasing, open the book's Reviews tab. Choose a rating and write a comment of at least 10 characters, then submit. You can edit or delete your review; an administrator can also moderate it." },
  { id: "profile", title: "Find everything in your profile", description: "Use Account for your details and profile picture, Loans for borrowing and returns, and Activity for your history. Filters and pagination load the matching results from the server." },
];
