import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiButtonModule } from "@taiga-ui/core";
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { PostsService } from "./services/posts.service";
import { PostsListComponent } from "./components/posts/posts-list/posts-list.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiButtonModule, PostsListComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.less",
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }]
})
export class AppComponent {
    private readonly postsService: PostsService = inject(PostsService);

    title = "posts-system";

    public stressTest() {
        this.postsService.stressTest();
    }
}
