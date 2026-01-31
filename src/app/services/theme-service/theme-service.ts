import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storedTheme: 'light' | 'dark' | null = localStorage.getItem('theme') as
    | 'light'
    | 'dark'
    | null;
  private theme: WritableSignal<'light' | 'dark'> = signal<'light' | 'dark'>(
    this.storedTheme ?? 'light',
  );
  constructor() {}

  public readonly currentTheme: Signal<'light' | 'dark'> = computed((): 'light' | 'dark' =>
    this.theme(),
  );

  public toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  private setTheme(theme: 'light' | 'dark'): void {
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
  }
}
