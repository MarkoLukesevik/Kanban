import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storedTheme = localStorage.getItem('theme') as
    | 'light'
    | 'dark'
    | null;
  private theme = signal<'light' | 'dark'>(this.storedTheme ?? 'light');
  constructor() {}

  public getCurrentTheme(): Signal<'light' | 'dark'> {
    return this.theme;
  }

  public toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  private setTheme(theme: 'light' | 'dark'): void {
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
  }
}
