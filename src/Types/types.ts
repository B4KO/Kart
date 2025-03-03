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
    selectedSektor: string | string[];
    selectedStatus: string | string[];
    selectedFylke: string | string[];
    searchTerm: string | string[];
}

export interface TabsInterface {
    id: TabOptions;
    label: string;
    icon: IconDefinition;
}
export interface FylkeFeatureCollection {
    type: "FeatureCollection";
    name: string;
    features: FylkeFeature[];
}

export interface FylkeFeature {
    type: "Feature";
    properties: {
        objtype: string;
        samiskForvaltningsområde: boolean;
        "identifikasjon.Identifikasjon.lokalId": string;
        "identifikasjon.Identifikasjon.navnerom": string;
        "identifikasjon.Identifikasjon.versjonId": string;
        datafangstdato: string | null;
        oppdateringsdato: string;
        datauttaksdato: string;
        opphav: string | null;
        fylkesnummer: string;
        fylkesnavn: string;
        gyldigFra: string;
    };
    geometry: {
        type: "Polygon";
        coordinates: number[][][]; // Array of rings, each an array of [lng, lat] coordinates
    };
}
