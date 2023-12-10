import { InjectionToken } from "@angular/core";

export const BACKEND_API_URL = new InjectionToken<string>(
    "Backend Api URL",
    {
        factory: () => {
            return "http://localhost:8080/api";
        }
    }
);
