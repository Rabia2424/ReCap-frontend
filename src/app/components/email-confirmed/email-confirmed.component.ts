// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-email-confirmed',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './email-confirmed.component.html',
//   styleUrl: './email-confirmed.component.css'
// })
// export class EmailConfirmedComponent implements OnInit{
//   constructor(private authService:AuthService,
//     private activatedRoute:ActivatedRoute,
//     private toastrService:ToastrService,
//     private router: Router
//   ){};
//   ngOnInit(): void {
//     this.activatedRoute.paramMap.subscribe(params => {
//       const token = params.get('token');
//       if (token) {
//         console.log('Token:', token);  // Token'ı konsola yazdırarak kontrol edin
//         this.verifyEmail(token);
//       }
//     });
//   }

//   verifyEmail(token:string){
//     this.authService.verifyEmail(token).subscribe(response=>{
//       this.toastrService.success(response.toString());
//     })
//   }

// }
