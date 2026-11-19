CREATE TABLE game_statistics_events (
  id TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  day TEXT NOT NULL,
  game TEXT NOT NULL CHECK (game IN ('war-of-the-wizards', 'emerald-hollows')),
  type TEXT NOT NULL CHECK (type IN ('game_loaded', 'run_start')),
  source TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE INDEX game_statistics_expiry ON game_statistics_events(expires_at);

CREATE TABLE game_statistics_daily (
  day TEXT NOT NULL,
  game TEXT NOT NULL,
  source TEXT NOT NULL,
  country TEXT NOT NULL,
  game_loaded INTEGER NOT NULL,
  run_start INTEGER NOT NULL,
  PRIMARY KEY (day, game, source, country)
);

CREATE TRIGGER count_game_statistic AFTER INSERT ON game_statistics_events
BEGIN
  INSERT INTO game_statistics_daily(day, game, source, country, game_loaded, run_start)
  VALUES (NEW.day, NEW.game, NEW.source, NEW.country, NEW.type = 'game_loaded', NEW.type = 'run_start')
  ON CONFLICT(day, game, source, country) DO UPDATE SET
    game_loaded = game_loaded + excluded.game_loaded,
    run_start = run_start + excluded.run_start;
END;
