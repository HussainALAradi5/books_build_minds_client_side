export interface FileDropzoneProps {
  label: string;
  accept: string;
  maxFiles: number;
  onUpload: (files: File[]) => Promise<void>;
}

export interface LoanActionsProps {
  slug: string;
  signedIn: boolean;
  available: number;
  demo: boolean;
}


