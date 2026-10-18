-- Nullable until verified stored final states have been backfilled. No records are removed.
ALTER TABLE scores ADD COLUMN score INTEGER;
CREATE INDEX scores_time_score ON scores(level_id,level_hash,rules_version,ticks,score DESC);
