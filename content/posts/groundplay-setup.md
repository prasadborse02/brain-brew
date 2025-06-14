---
title: GroundPlay setup on local
date: 2025-05-08T12:15:00-00:00
---

> A sports platform that brings together players for various sports. Related to [[football-explained-part1|Football structure]] and inspired by the need for better sports community tools.

# Database Setup

1. create a directory, named grounplay-postgres-setup
	```
	mkdir groundplay-postgres-setup
	cd groundplay-postgres-setup
	```
2. Add docker-compose.yml file that has the post and the details of the database
	```
	services:
	  postgres:
	    image: postgis/postgis:17-3.4
	    container_name: groundplay-db
	    restart: always
	    environment:
	      POSTGRES_DB: groundplay
	      POSTGRES_USER: postgres
	      POSTGRES_PASSWORD: mypassword
	    ports:
	      - "5432:5432"
	    volumes:
	      - pg_data:/var/lib/postgresql/data
	      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
	
	volumes:
	  pg_data:
	```
3. Add init.sql file to define the table schemas and trigger

	```
	-- Enable PostGIS extension
	CREATE EXTENSION IF NOT EXISTS postgis;
	
	-- -----------------------------------------
	-- Helper function to auto-update timestamps
	-- -----------------------------------------
	CREATE OR REPLACE FUNCTION update_timestamps()
	RETURNS TRIGGER AS $$
	BEGIN
	    IF TG_OP = 'INSERT' THEN
	        NEW.creation_time := CURRENT_TIMESTAMP;
	    END IF;
	    NEW.last_update := CURRENT_TIMESTAMP;
	    RETURN NEW;
	END;
	$$ LANGUAGE plpgsql;
	
	-- -----------------------------------------
	-- Helper function to update enrolled_players in games
	-- -----------------------------------------
	CREATE OR REPLACE FUNCTION update_registered_players_count()
	RETURNS TRIGGER AS $$
	BEGIN
	    UPDATE games
	    SET enrolled_players = (
	        SELECT COUNT(*)
	        FROM game_members
	        WHERE game_id = NEW.game_id
	    )
	    WHERE id = NEW.game_id;
	
	    RETURN NEW;
	END;
	$$ LANGUAGE plpgsql;
	
	-- -----------------------------------------
	-- Create players table
	-- -----------------------------------------
	CREATE TABLE IF NOT EXISTS players (
	    id BIGSERIAL PRIMARY KEY,
	    name VARCHAR(255) NOT NULL,
	    phone_number VARCHAR(255) NOT NULL UNIQUE,
	    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	    email VARCHAR(255),
	    password VARCHAR(255) NOT NULL,
	    salt VARCHAR(255) NOT NULL
	);
	
	-- -----------------------------------------
	-- Create games table
	-- -----------------------------------------
	CREATE TABLE IF NOT EXISTS games (
	    id BIGSERIAL PRIMARY KEY,
	    organizer BIGINT NOT NULL,
	    sport VARCHAR(255) NOT NULL CHECK (sport IN ('CRICKET', 'FOOTBALL', 'VOLLEYBALL', 'TENNIS', 'BADMINTON', 'HOCKEY', 'KABADDI', 'KHO_KHO','BASKETBALL')),
	    team_size INTEGER NOT NULL,
	    start_time TIMESTAMP NOT NULL,
	    end_time TIMESTAMP NOT NULL,
	    status BOOLEAN NOT NULL,
	    coordinates GEOGRAPHY(Point, 4326) NOT NULL,
	    location VARCHAR(255),
	    description TEXT,
	    enrolled_players INTEGER,
	    creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	);
	
	-- -----------------------------------------
	-- Create game_members table
	-- -----------------------------------------
	CREATE TABLE IF NOT EXISTS game_members (
	    id BIGSERIAL,
	    game_id BIGINT NOT NULL,
	    player_id BIGINT NOT NULL,
	    status BOOLEAN NOT NULL,
	    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	    PRIMARY KEY (game_id, player_id),
	    FOREIGN KEY (game_id) REFERENCES games(id),
	    FOREIGN KEY (player_id) REFERENCES players(id)
	);
	
	-- -----------------------------------------
	-- Attach triggers
	-- -----------------------------------------
	
	-- Players table: Update timestamps
	CREATE TRIGGER players_timestamp_trigger
	BEFORE INSERT OR UPDATE ON players
	FOR EACH ROW
	EXECUTE FUNCTION update_timestamps();
	
	-- Games table: Update timestamps
	CREATE TRIGGER games_timestamp_trigger
	BEFORE INSERT OR UPDATE ON games
	FOR EACH ROW
	EXECUTE FUNCTION update_timestamps();
	
	-- Game_members table: Update timestamps
	CREATE TRIGGER game_members_timestamp_trigger
	BEFORE INSERT OR UPDATE ON game_members
	FOR EACH ROW
	EXECUTE FUNCTION update_timestamps();
	
	-- Game_members table: After insert/update, update enrolled_players
	CREATE TRIGGER trg_update_player_count
	AFTER INSERT OR UPDATE ON game_members
	FOR EACH ROW
	EXECUTE FUNCTION update_registered_players_count();
	
	-- -----------------------------------------
	-- Helper function to update game_members status when game status changes to false
	-- -----------------------------------------
	CREATE OR REPLACE FUNCTION update_game_members_status()
	RETURNS TRIGGER AS $$
	BEGIN
	    IF NEW.status = FALSE AND (OLD.status IS NULL OR OLD.status = TRUE) THEN
	        UPDATE game_members
	        SET status = FALSE
	        WHERE game_id = NEW.id;
	    END IF;
	    RETURN NEW;
	END;
	$$ LANGUAGE plpgsql;
	
	-- Games table: Update game_members status when game status changes to false
	CREATE TRIGGER trg_update_game_members_status
	AFTER UPDATE ON games
	FOR EACH ROW
	EXECUTE FUNCTION update_game_members_status();
	```


4. Get the database running
   ```
	docker-compose up -d
	```

While triggers are good practice to keep your data clean, but at the same time triggers are hard to debug so per requirement you can choose one the options. The just chose the shortest path possible lol ;)

# Application setup

## Using docker

1. Clone the project 
	```
	git clone https://github.com/yourusername/groundplay.git
	cd groundplay
	```
2. Update your local credentials in file `docker-compose.yml`
3. Get the application running
	```
	docker build -t groundplay-app .
	docker compose up -d
	```

## Without using docker

1. Clone the project 
2. Update the application.properties with your local configurations
	```
	# Database Configuration
	spring.datasource.url=jdbc:postgresql://localhost:5432/groundplay
	spring.datasource.username=your_username
	spring.datasource.password=your_password
	
	# JWT Configuration
	jwt.secret=your_jwt_secret_key
	jwt.expiration=1296000000  # 15 days in milliseconds
	
	# Encryption Configuration
	encryption.secret=your_encryption_secret_key
	```
3.  Build and run the application
	```
	# Build the project
	./gradlew build
	
	# Run the application
	./gradlew bootRun
	```

> Let me know, if I'm wrong or missing out on something

---

**Related:** 
- [[part 1|Python Dependency Management]] - Learn proper Docker isolation practices
- [[draft it is|Sports TakeHub]] - Another sports platform concept