import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../../shared/components/icon/icon';

interface Highlight {
  title: string;
  description: string;
}

interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: IconName;
}

@Component({
  selector: 'app-about-page',
  imports: [RouterLink, Icon],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  readonly highlights: Highlight[] = [
    {
      title: 'What I do',
      description:
        'Design and build full-stack web applications with Angular, TypeScript, and Node.js — from first idea to production.',
    },
    {
      title: 'Latest project',
      description:
        'DevDiffy — a free, browser-based developer toolbox. Everything runs locally: no signups, no servers, no tracking.',
    },
    {
      title: "Let's connect",
      description:
        'Open to interesting projects and collaborations. Reach me at nitesh20rv@gmail.com or through any of the links here.',
    },
  ];

  readonly socialLinks: SocialLink[] = [
    { label: 'GitHub', handle: 'BeingAnProgrammer', href: 'https://github.com/BeingAnProgrammer', icon: 'github' },
    { label: 'LinkedIn', handle: 'rvnitesh', href: 'https://www.linkedin.com/in/rvnitesh/', icon: 'linkedin' },
    { label: 'X (Twitter)', handle: '@ItsNitesh_', href: 'https://x.com/ItsNitesh_', icon: 'twitter' },
    { label: 'Medium', handle: '@rvnitesh', href: 'https://medium.com/@rvnitesh', icon: 'medium' },
  ];
}
