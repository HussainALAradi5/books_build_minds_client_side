import type { WorkflowStep } from "@/interfaces/ui/workflow/WorkflowStep";

export const accessGuideSteps: readonly WorkflowStep[] = [
  { id: "permissions", title: "Inspect permission keys", description: "Use Permissions to inspect or add keys. A key grants access only where a server policy checks that key; creating a new name alone does not add new application behavior." },
  { id: "roles", title: "Build an access role", description: "Use Roles to give a set of permissions a meaningful name. Select only the permissions required for the intended work and save the role." },
  { id: "groups", title: "Organize roles into groups", description: "Use Groups to collect roles that should be assigned together. Existing role and permission changes affect the users receiving them." },
  { id: "users", title: "Assign access to users", description: "Use Users to assign roles and groups to an account. Check the resulting permissions with a test account. The access management page itself still requires the administrator account role." },
];
