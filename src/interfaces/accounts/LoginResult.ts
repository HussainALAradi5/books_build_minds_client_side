import type { ApiMessage } from "@/interfaces/shared/ApiMessage";

export interface LoginResult extends ApiMessage { token: string; userId: number }
