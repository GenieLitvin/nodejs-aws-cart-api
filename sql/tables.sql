CREATE TABLE carts (
    id UUID PRIMARY key default uuid_generate_v4(),
    user_id UUID NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(10) NOT NULL CHECK (status IN ('OPEN', 'ORDERED'))
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY default uuid_generate_v4(),
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    count INTEGER NOT NULL CHECK (count >= 0),
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

INSERT INTO carts (user_id,status) VALUES
( 'f8a0a4c8-1234-4b0a-a7b5-1b8d5828e1a2', 'OPEN'),
('c3b0b4d8-5678-4c1a-b9d3-2b4c7a8d9f5b',  'ORDERED'),
('b2d1c4f8-9abc-4e2a-cdef-3c4d7e8f9f6c', 'OPEN');

INSERT INTO cart_items ( cart_id, product_id, count) VALUES
('470ac053-c2cd-458a-ada4-7833ddd30635', 'd4a0a6c8-1234-4c8a-b7c3-1a4b7e8c9d5f', 2),
('c6845251-e4b9-42c4-84e5-c40a1cb1257e', 'd4a0a6c8-1234-4c8a-b7c3-1a4b7e8c9d5f', 1),
('834048b0-f33b-4f5a-8d0e-122804bf18db', 'd4a0a6c8-1234-4c8a-b7c3-1a4b7e8c9d5f', 3),
('834048b0-f33b-4f5a-8d0e-122804bf18db', 'd4a0a6c8-1234-4c8a-b7c3-1a4b7e8c9d5f', 4);
