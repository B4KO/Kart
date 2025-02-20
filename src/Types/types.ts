import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

// TODO: define sets of strings for the different dropdowns
// export type ProjectStatus = "Avsluttet" | "Pågående" | "Planlagt";


export type FilterOptions = "searchTerm" | "selectedFylke" | "selectedSektor" | "selectedStatus";
export type TabOptions = "map" | "analytics" | "table";
// Interface for the data fetched from the API and passed to the DataContext
export interface ProjectInterface {
    owner: string;
    title: string;
    sector: string;
    ownership: string;
    description: string;
    associations: string; // or use string[] if it holds multiple values
    link: string;
    status: string; // or use ProjectStatus if you define it
    model_development: string;
    address: string;
    city: string;
    country: string;
    region: string; // or Fylke
    start: string; // Consider using Date if you convert this value
    end: string;   // Consider using Date if you convert this value
}

export interface FilterInterface {
    selectedSektor: string;
    selectedStatus: string;
    selectedFylke: string;
    searchTerm: string;
}

export interface TabsInterface {
    id: TabOptions;
    label: string;
    icon: IconDefinition;
}

// src/types/geojson.ts

export interface FylkeFeatureCollection {
    type: "FeatureCollection";
    name: string;
    features: FylkeFeature[];
}

export interface FylkeFeature {
    type: "Feature";
    properties: FylkeProperties;
    geometry: GeoJSONGeometry;
}

export interface FylkeProperties {
    "objtype": string;
    "samiskForvaltningsområde": boolean;
    "identifikasjon.Identifikasjon.lokalId": string;
    "identifikasjon.Identifikasjon.navnerom": string;
    "identifikasjon.Identifikasjon.versjonId": string;
    "datafangstdato": string | null;       // could be null
    "oppdateringsdato": string;            // ISO date string
    "datauttaksdato": string;              // ISO date string
    "opphav": string | null;
    "fylkesnummer": string;
    "fylkesnavn": string;
    "gyldigFra": string;                   // ISO date string
}

export interface GeoJSONGeometry {
    type: "Polygon"; // Change this union if you expect other types (e.g. "MultiPolygon")
    // Coordinates for a Polygon are an array of linear rings.
    // Each linear ring is an array of coordinate pairs [longitude, latitude].
    coordinates: number[][][];
}
