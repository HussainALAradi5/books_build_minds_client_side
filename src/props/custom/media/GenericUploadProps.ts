export interface GenericUploadProps { label: string; accept: string; maxFiles: number; onUpload: (files: File[]) => Promise<void> }
