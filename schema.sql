-- Create users table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- In a real app, integrate with Supabase Auth for this
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(100),
  phone_number VARCHAR(20),
  profile_picture_url TEXT
);

-- Create categories table (e.g., Jobs, Real Estate, Services, Cars)
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name_en VARCHAR(100) UNIQUE NOT NULL,
  name_ar VARCHAR(100) UNIQUE NOT NULL
);

-- Insert initial categories
INSERT INTO categories (name_en, name_ar) VALUES
('Jobs', 'وظائف'),
('Real Estate', 'عقارات'),
('Services', 'خدمات'),
('Cars', 'سيارات'),
('Electronics', 'إلكترونيات'),
('Home & Garden', 'منزل وحديقة'),
('Fashion', 'موضة');

-- Create listings table
CREATE TABLE listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE RESTRICT NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  price NUMERIC(10, 2),
  currency VARCHAR(10) DEFAULT 'SAR',
  location_text TEXT, -- User-friendly location
  latitude NUMERIC(10, 8), -- For map integration
  longitude NUMERIC(11, 8), -- For map integration
  contact_email VARCHAR(255), -- Optional override
  contact_phone VARCHAR(20),  -- Optional override
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create listing images table
CREATE TABLE listing_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Create messages table for internal communication
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE, -- Optional, if message is about a listing
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view their own user data." ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own user data." ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own user data." ON users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for categories (publicly readable)
CREATE POLICY "Categories are viewable by all." ON categories FOR SELECT USING (TRUE);

-- RLS Policies for listings
CREATE POLICY "Listings are viewable by all." ON listings FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert their own listings." ON listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own listings." ON listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own listings." ON listings FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for listing_images
CREATE POLICY "Listing images are viewable by all." ON listing_images FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert listing images for their own listings." ON listing_images FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_id AND listings.user_id = auth.uid()));
CREATE POLICY "Users can delete listing images for their own listings." ON listing_images FOR DELETE USING (EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_id AND listings.user_id = auth.uid()));

-- RLS Policies for messages
CREATE POLICY "Users can view their own messages." ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages." ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update their own messages (e.g., mark as read)." ON messages FOR UPDATE USING (auth.uid() = receiver_id);

-- Add function to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

