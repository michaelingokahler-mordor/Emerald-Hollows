CREATE TABLE game_statistics_events_next (
  id TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  day TEXT NOT NULL,
  game TEXT NOT NULL CHECK (game IN ('war-of-the-wizards', 'emerald-hollows', 'velvet-cruise')),
  type TEXT NOT NULL CHECK (type IN ('game_loaded', 'run_start')),
  source TEXT NOT NULL,
  country TEXT NOT NULL
);

-- Copy deduplication records before adding the counting trigger.
INSERT INTO game_statistics_events_next (id, expires_at, day, game, type, source, country)
SELECT id, expires_at, day, game, type, source, country FROM game_statistics_events;
DROP TABLE game_statistics_events;
ALTER TABLE game_statistics_events_next RENAME TO game_statistics_events;
CREATE INDEX game_statistics_expiry ON game_statistics_events(expires_at);

CREATE TRIGGER count_game_statistic AFTER INSERT ON game_statistics_events
BEGIN
  INSERT INTO game_statistics_daily(day, game, source, country, game_loaded, run_start)
  VALUES (NEW.day, NEW.game, NEW.source, NEW.country, NEW.type = 'game_loaded', NEW.type = 'run_start')
  ON CONFLICT(day, game, source, country) DO UPDATE SET
    game_loaded = game_loaded + excluded.game_loaded,
    run_start = run_start + excluded.run_start;
END;
