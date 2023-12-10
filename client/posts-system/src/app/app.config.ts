import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { TuiPushModule } from "@taiga-ui/kit";
import { authInterceptor } from "./http-interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            TuiRootModule,
            TuiDialogModule,
            TuiAlertModule,
            TuiPushModule
        ),
        provideAnimations(),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor])
        )
    ]
};
