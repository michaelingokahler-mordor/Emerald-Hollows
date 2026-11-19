type GameEvent = 'game_loaded' | 'run_start';

interface StatisticsModule {
  recordGameStatistic(game: 'emerald-hollows', event: GameEvent): void;
}

let statistics: Promise<StatisticsModule | undefined> | undefined;

export function recordGameStatistic(event: GameEvent): void {
  if (!import.meta.env.PROD || location.origin !== 'https://sabnockworks.com' || navigator.webdriver) return;
  const modulePath = '/assets/game-statistics.mjs';
  statistics ??= import(/* @vite-ignore */ modulePath).catch(() => {
    statistics = undefined;
    return undefined;
  });
  void statistics.then(module => module?.recordGameStatistic('emerald-hollows', event));
}
