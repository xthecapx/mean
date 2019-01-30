import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pin';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    /* this.http.post('/api/info', { url: 'https://www.youtube.com/watch?v=WaH8BR4peGs' }).subscribe(res => {
      console.log(res);
    }); */
  }
}
