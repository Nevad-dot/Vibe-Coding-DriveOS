-- ==============================================================================
-- DRIVEOS DATABASE SCHEMA & SEED DATA (SUPABASE / POSTGRESQL)
-- Copy and paste this script into Supabase Dashboard -> SQL Editor and click "Run"
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. VEHICLES TABLE (Gallery & Inventory)
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    units INT DEFAULT 1,
    branch VARCHAR(100) DEFAULT 'Jakarta Pusat',
    has_360 BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. CUSTOMERS TABLE (Customer Intelligence & CRM)
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(100),
    segment VARCHAR(100) DEFAULT 'Customer Aktif',
    ltv VARCHAR(100) DEFAULT 'Rp 0',
    csat NUMERIC(3, 1) DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. CAMPAIGNS TABLE (Customer Marketing)
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    segment VARCHAR(100) DEFAULT 'Semua Pelanggan',
    channel VARCHAR(100) DEFAULT 'Email Marketing',
    subject VARCHAR(255) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'Terkirim',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. SALES DEALS TABLE (Sales Pipeline)
CREATE TABLE IF NOT EXISTS public.sales_deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    vehicle_model VARCHAR(255) NOT NULL,
    deal_value VARCHAR(100) NOT NULL,
    stage VARCHAR(100) DEFAULT 'Negosiasi',
    consultant VARCHAR(100) DEFAULT 'Rendra',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 5. RESTOCK ORDERS TABLE (Inventory Orders)
CREATE TABLE IF NOT EXISTS public.restock_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 1,
    branch VARCHAR(100) DEFAULT 'Jakarta Pusat',
    priority VARCHAR(100) DEFAULT 'Prioritas Tinggi (3 Hari)',
    status VARCHAR(100) DEFAULT 'Pending Approval',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 6. SERVICE APPOINTMENTS TABLE (Workshop Management)
CREATE TABLE IF NOT EXISTS public.service_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_plate VARCHAR(100) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) DEFAULT 'Servis Berkala',
    bay VARCHAR(100) DEFAULT 'Bay 01',
    appointment_date DATE,
    appointment_time VARCHAR(50) DEFAULT '09:00',
    status VARCHAR(100) DEFAULT 'Scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 7. EXECUTIVE APPROVALS TABLE (Approvals Center)
CREATE TABLE IF NOT EXISTS public.executive_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    meta VARCHAR(255),
    amount VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Pending',
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & POLICIES (Allow Public Read & Insert)
-- ==============================================================================
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restock_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executive_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public insert vehicles" ON public.vehicles FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read customers" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Allow public insert customers" ON public.customers FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read campaigns" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Allow public insert campaigns" ON public.campaigns FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read sales_deals" ON public.sales_deals FOR SELECT USING (true);
CREATE POLICY "Allow public insert sales_deals" ON public.sales_deals FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read restock_orders" ON public.restock_orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert restock_orders" ON public.restock_orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read service_appointments" ON public.service_appointments FOR SELECT USING (true);
CREATE POLICY "Allow public insert service_appointments" ON public.service_appointments FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read executive_approvals" ON public.executive_approvals FOR SELECT USING (true);
CREATE POLICY "Allow public update executive_approvals" ON public.executive_approvals FOR UPDATE USING (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

INSERT INTO public.campaigns (name, segment, channel, subject, message, status)
VALUES 
('Promo Akhir Tahun 2026', 'Semua Pelanggan', 'Email Marketing', 'Diskon Spesial Porsche 911 GT3 & Bonus Servis 1 Tahun', 'Dapatkan penawaran eksklusif akhir tahun untuk Porsche GT3 dan garansi servis gratis.', 'Terkirim'),
('Exclusive VIP Test Drive', 'Pelanggan VIP', 'WhatsApp Blast', 'Undangan Special Test Drive Ferrari 296 GTB di Showroom', 'Undangan khusus bagi pelanggan VIP DriveOS untuk merasakan performa Ferrari 296 GTB.', 'Terkirim');

INSERT INTO public.vehicles (name, brand, price, units, branch, has_360, image_url)
VALUES
('Porsche 911 GT3', 'Porsche', 'Rp 5,8 M', 3, 'Jakarta Pusat', true, '/images/gallery/porsche_gt3.png'),
('BMW M5 Competition', 'BMW', 'Rp 3,4 M', 5, 'Jakarta Pusat', false, '/images/gallery/bmw_m5.png'),
('Mercedes-AMG GT', 'Mercedes', 'Rp 4,9 M', 2, 'Surabaya', false, '/images/gallery/mercedes_amg_gt.png');
