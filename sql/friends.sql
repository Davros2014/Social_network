DROP TABLE IF EXISTS friends;

CREATE TABLE friends(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) NOT NULL,
    receiver_id INTEGER REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT FALSE NOT NULL
);

-- sender = viewer
-- recipient = owner


create unique index idx_unique_sender
 on friends (least(sender_id, receiver_id),greatest(sender_id, receiver_id));


CREATE OR REPLACE FUNCTION random_between(low INT ,high INT)
   RETURNS INT AS
$$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$$ language 'plpgsql' STRICT;


CREATE OR REPLACE FUNCTION random_accept()
   RETURNS INT AS
$$
BEGIN
   floor(random()* 10);
END;
$$ language 'plpgsql' STRICT;


CREATE OR REPLACE FUNCTION random_accept()
   RETURNS BOOLEAN AS
$$
DECLARE
    f int:=ROUND(random());
BEGIN

    IF f > 0 THEN
        RETURN true;
    ELSE
        RETURN false;
    END IF;
END;
$$ language 'plpgsql' STRICT;




do $$
DECLARE user_count int:=200;
DECLARE friends_count int:=25;
begin
for r in 1..user_count loop
    for i in 1..friends_count loop
        insert into friends (sender_id,receiver_id,accepted)
        values(r,(SELECT random_between(1,user_count)),(SELECT random_accept()))
        ON CONFLICT (least(sender_id, receiver_id),greatest(sender_id, receiver_id))
        DO NOTHING;
    end loop;
end loop;
    delete from friends where sender_id=receiver_id;
end;
$$;
