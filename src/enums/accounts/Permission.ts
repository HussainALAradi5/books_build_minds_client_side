export enum Permission {
  ProfileReadOwn = "profile:read.own",
  ProfileEditOwn = "profile:edit.own",
  ActivityReadOwn = "activity:read.own",
  PurchaseReadOwn = "purchase:read.own",
  PurchaseWriteOne = "purchase:write.one",
  LoanReadOwn = "loan:read.own",
  LoanWriteOne = "loan:write.one",
  ReceiptReadOwn = "receipt:read.own",
  ReviewReadOwn = "review:read.own",
  ReviewWriteOne = "review:write.one",
  ReviewEditOwn = "review:edit.own",
  ReviewDeleteOwn = "review:delete.own",
  ReviewDeleteAny = "review:delete.any",
  BookReadAny = "book:read.any",
  BookWriteOne = "book:write.one",
  BookEditAny = "book:edit.any",
  BookDeleteAny = "book:delete.any",
  BookImport = "book:write.bulk",
  BookBulkEdit = "book:edit.bulk",
  BookMediaWrite = "book-media:write.one",
  ProfileMediaWriteOwn = "profile-media:write.own",
  AuthorWrite = "author:write.one",
  PublisherWrite = "publisher:write.one",
  CountrySync = "country:sync",
  AdminRequestWriteOne = "admin-request:write.one",
  AdminRequestReadAny = "admin-request:read.any",
  AdminRequestEditAny = "admin-request:edit.any",
  AccessReadAny = "access:read.any",
  AccessEditAny = "access:edit.any",
}

export const permissionLabels = Object.fromEntries(
  Object.values(Permission).map((permission) => [
    permission,
    permission.replace(/[:.-]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
  ]),
) as Record<Permission, string>;

export const permissionColors = Object.fromEntries(
  Object.values(Permission).map((permission) => [
    permission,
    permission.includes(":delete.") ? "red" :
      permission.includes(":edit.") ? "orange" :
      permission.includes(":write.") ? "green" :
      permission.includes(":read.") ? "blue" : "purple",
  ]),
) as Record<Permission, "red" | "orange" | "green" | "blue" | "purple">;
