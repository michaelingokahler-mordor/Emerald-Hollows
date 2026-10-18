CREATE TABLE profiles(id TEXT PRIMARY KEY, nickname TEXT NOT NULL, token_hash TEXT NOT NULL, created_at INTEGER NOT NULL);
CREATE TABLE runs(id TEXT PRIMARY KEY, profile_id TEXT NOT NULL REFERENCES profiles(id), level_id TEXT NOT NULL, level_hash TEXT NOT NULL, rules_version TEXT NOT NULL, replay TEXT NOT NULL, state TEXT, cursor INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'pending', created_at INTEGER NOT NULL);
CREATE INDEX runs_profile ON runs(profile_id, created_at);
CREATE TABLE scores(profile_id TEXT NOT NULL REFERENCES profiles(id),level_id TEXT NOT NULL,level_hash TEXT NOT NULL,rules_version TEXT NOT NULL,ticks INTEGER NOT NULL,points INTEGER NOT NULL,run_id TEXT NOT NULL REFERENCES runs(id),PRIMARY KEY(profile_id,level_id,level_hash,rules_version));
CREATE INDEX scores_rank ON scores(level_id,level_hash,rules_version,ticks);
CREATE TABLE limits(bucket TEXT PRIMARY KEY, count INTEGER NOT NULL);
