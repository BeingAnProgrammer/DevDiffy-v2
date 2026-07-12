import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonDirective } from '../../directives/button.directive';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ButtonDirective, Icon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {}
