SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: config; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.config (
    config_id integer NOT NULL,
    key text NOT NULL,
    display_name text NOT NULL,
    type text NOT NULL,
    default_value text NOT NULL,
    value text NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_by bigint
);


--
-- Name: config_config_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.config_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: config_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.config_config_id_seq OWNED BY public.config.config_id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    username character varying(20) NOT NULL,
    email character varying(80) NOT NULL,
    encrypted_password character varying(64) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    is_admin boolean DEFAULT false NOT NULL
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: videos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.videos (
    video_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(64) NOT NULL,
    description text,
    filename text,
    archived boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by bigint,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_by bigint
);


--
-- Name: config config_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.config ALTER COLUMN config_id SET DEFAULT nextval('public.config_config_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: config config_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.config
    ADD CONSTRAINT config_pkey PRIMARY KEY (config_id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (video_id);


--
-- Name: config config_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.config
    ADD CONSTRAINT config_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(user_id);


--
-- Name: videos videos_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_id);


--
-- Name: videos videos_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20220529030910'),
    ('20220601085526'),
    ('20220604070650'),
    ('20220604123753');
