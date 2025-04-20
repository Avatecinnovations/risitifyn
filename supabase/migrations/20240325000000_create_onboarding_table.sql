-- Create the onboarding table
create table public.onboarding (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users not null,
    company_name text not null,
    company_size text not null,
    industry text not null,
    logo text,
    full_name text not null,
    role text not null,
    profile_picture text,
    billing_email text not null,
    billing_address text not null,
    currency text not null,
    completed_at timestamp with time zone not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

-- Create indexes
create index onboarding_user_id_idx on public.onboarding(user_id);

-- Set up Row Level Security (RLS)
alter table public.onboarding enable row level security;

-- Create policies
create policy "Users can view their own onboarding data"
    on public.onboarding for select
    using (auth.uid() = user_id);

create policy "Users can insert their own onboarding data"
    on public.onboarding for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own onboarding data"
    on public.onboarding for update
    using (auth.uid() = user_id);

-- Create storage bucket for onboarding images
insert into storage.buckets (id, name, public) values ('onboarding-images', 'onboarding-images', true);

-- Set up storage policies
create policy "Anyone can view onboarding images"
    on storage.objects for select
    using ( bucket_id = 'onboarding-images' );

create policy "Authenticated users can upload onboarding images"
    on storage.objects for insert
    with check (
        bucket_id = 'onboarding-images'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    ); 