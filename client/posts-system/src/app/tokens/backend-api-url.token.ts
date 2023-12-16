import { InjectionToken } from "@angular/core";

export const BACKEND_API_URL = new InjectionToken<string>(
    "Backend Api URL",
    {
        factory: () => {
            return "/api";
        }
    }
);
