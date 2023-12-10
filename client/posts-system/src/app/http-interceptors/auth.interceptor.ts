import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    return next(req.clone({
        setHeaders: {
            "Authorization": "Basic ZGRwLWFkbWluOjEyMzEyMw==",
        }
    }));
};
