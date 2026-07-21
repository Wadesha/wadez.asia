-- Wadez.asia 公共交通地图数据库初始化
-- 在 Supabase SQL Editor 中运行此文件

-- 启用必要的扩展
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- POI 分类枚举（公共交通）
create type poi_category as enum (
  'bus',
  'metro',
  'train',
  'coach',
  'airport',
  'ferry',
  'tram',
  'other'
);

-- POI 表
create table public.pois (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category poi_category not null default 'other',
  description text,
  address text,
  longitude double precision not null,
  latitude double precision not null,
  geom geometry(Point, 4326) generated always as (
    st_setsrid(st_point(longitude, latitude), 4326)
  ) stored,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- POI 图片表
create table public.poi_images (
  id uuid default uuid_generate_v4() primary key,
  poi_id uuid references public.pois(id) on delete cascade not null,
  url text not null,
  caption text,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now() not null
);

-- 用户资料表
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text,
  avatar_url text,
  created_at timestamptz default now() not null
);

-- 索引
create index idx_pois_category on public.pois(category);
create index idx_pois_geom on public.pois using gist(geom);
create index idx_pois_created_by on public.pois(created_by);
create index idx_poi_images_poi_id on public.poi_images(poi_id);

-- RLS 策略
alter table public.pois enable row level security;
alter table public.poi_images enable row level security;
alter table public.profiles enable row level security;

-- POI: 所有人可读，登录用户可创建，创建者可修改/删除
create policy "POI 公开可读" on public.pois
  for select using (true);

create policy "登录用户可创建 POI" on public.pois
  for insert with check (auth.uid() = created_by);

create policy "创建者可更新 POI" on public.pois
  for update using (auth.uid() = created_by);

create policy "创建者可删除 POI" on public.pois
  for delete using (auth.uid() = created_by);

-- 图片: 所有人可读，登录用户可上传，上传者可删除
create policy "图片公开可读" on public.poi_images
  for select using (true);

create policy "登录用户可上传图片" on public.poi_images
  for insert with check (auth.uid() = uploaded_by);

create policy "上传者可删除图片" on public.poi_images
  for delete using (auth.uid() = uploaded_by);

-- 用户资料: 所有人可读，本人可修改
create policy "资料公开可读" on public.profiles
  for select using (true);

create policy "本人可更新资料" on public.profiles
  for update using (auth.uid() = id);

create policy "本人可创建资料" on public.profiles
  for insert with check (auth.uid() = id);

-- 自动创建用户资料的触发器
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 自动更新 updated_at 的触发器
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_poi_updated
  before update on public.pois
  for each row execute procedure public.handle_updated_at();

-- 创建 Storage bucket（用于图片存储）
insert into storage.buckets (id, name, public)
values ('poi-images', 'poi-images', true)
on conflict (id) do nothing;

-- Storage 策略
create policy "图片公开可访问" on storage.objects
  for select using (bucket_id = 'poi-images');

create policy "登录用户可上传图片" on storage.objects
  for insert with check (
    bucket_id = 'poi-images' and auth.uid() is not null
  );

create policy "上传者可删除图片" on storage.objects
  for delete using (
    bucket_id = 'poi-images' and auth.uid()::text = (storage.foldername(name))[1]
  );
