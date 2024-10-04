import { json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const carListing = pgTable("carListingTable", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle").notNull(),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  driveType: varchar("driveType").notNull(),
  transmission: varchar("transmission").notNull(),
  fuelType: varchar("fuelType").notNull(),
  mileage: varchar("mileage").notNull(),
  engineSize: varchar("engineSize"),
  cylinder: varchar("cylinder"),
  color: varchar("color").notNull(),
  door: varchar("door").notNull(),
  vin: varchar("vin"),
  offerType: varchar("offerType"),
  listingDescription: varchar("listingDescription").notNull(),
  features: json("features"),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName").notNull().default("Ahmad"),
  userImageUrl: varchar("userImageUrl").default(
    "https://firebasestorage.googleapis.com/v0/b/car-marketplace-9ef83.appspot.com/o/car-marketplace%2F1727973583224.jpeg?alt=media&token=9b60841e-b033-44d8-8d23-dc2efb7267b4"
  ),
  createdDate: varchar("createdDate"),
});

export const carImages = pgTable("carImages", {
  id: serial("id").primaryKey(),
  carListingId: serial("listingId")
    .notNull()
    .references(() => carListing.id),
  imageUrl: varchar("imageUrl").notNull(),
});
