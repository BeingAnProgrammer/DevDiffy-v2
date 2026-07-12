import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturesSection } from './sections/features-section/features-section';
import { HeroSection } from './sections/hero-section/hero-section';
import { HowItWorksSection } from './sections/how-it-works-section/how-it-works-section';
import { ToolsGridSection } from './sections/tools-grid-section/tools-grid-section';
import { WhyDevdiffySection } from './sections/why-devdiffy-section/why-devdiffy-section';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, HowItWorksSection, FeaturesSection, ToolsGridSection, WhyDevdiffySection],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
