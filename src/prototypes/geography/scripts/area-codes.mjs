const geoCodes = {
  E01: {
    outputArea: "Super Output Area, Lower Layer",
    OA: "LSOA",
    "Statistical Building Block": "Statistical Building Block"
  },
  E02: {
    outputArea: "Super Output Area, Middle Layer",
    OA: "MSOA",
    "Statistical Building Block": "Statistical Building Block"
  },
  E04: {
    outputArea: "Civil Parish",
    OA: "PAR",
    "Statistical Building Block": "Administrative"
  },
  E05: {
    outputArea: "Electoral Wards/Division",
    OA: "WD",
    "Statistical Building Block": "Administrative/Electoral"
  },
  E06: {
    outputArea: "Unitary Authority",
    OA: "UA",
    "Statistical Building Block": "Administrative"
  },
  E07: {
    outputArea: "Non-metropolitan District",
    OA: "NMD",
    "Statistical Building Block": "Administrative"
  },
  E08: {
    outputArea: "Metropolitan District",
    OA: "MD",
    "Statistical Building Block": "Administrative"
  },
  E09: {
    outputArea: "London Borough",
    OA: "LONB",
    "Statistical Building Block": "Administrative"
  },
  E10: {
    outputArea: "County",
    OA: "CTY",
    "Statistical Building Block": "Administrative"
  },
  E11: {
    outputArea: "Metropolitan County",
    OA: "MCTY",
    "Statistical Building Block": "Administrative"
  },
  E12: {
    outputArea: "Region",
    OA: "RGN",
    "Statistical Building Block": "Administrative"
  },
  E13: {
    outputArea: "Inner and Outer London",
    OA: "IOL",
    "Statistical Building Block": "Statistical Building Block"
  },
  E14: {
    outputArea: "Westminster Parliamentary Constituency",
    OA: "WPC",
    "Statistical Building Block": "Electoral"
  },
  E15: {
    outputArea: "European Electoral Region",
    OA: "EER",
    "Statistical Building Block": "Electoral"
  },
  E16: {
    outputArea: "Primary Care Trust",
    OA: "PCT",
    "Statistical Building Block": "Health"
  },
  E17: {
    outputArea: "Care Trust",
    OA: "CT",
    "Statistical Building Block": "Health"
  },
  E18: {
    outputArea: "Strategic Health Authority",
    OA: "SHA",
    "Statistical Building Block": "Health"
  },
  E19: {
    outputArea: "Pan Strategic Health Authority",
    OA: "PSHA",
    "Statistical Building Block": "Health"
  },
  E20: {
    outputArea: "Cancer Registry",
    OA: "CANREG",
    "Statistical Building Block": "Health"
  },
  E21: {
    outputArea: "Cancer Network",
    OA: "CANNET",
    "Statistical Building Block": "Health"
  },
  E22: {
    outputArea: "Community Safety Partnership",
    OA: "CSP",
    "Statistical Building Block": "Other"
  },
  E23: {
    outputArea: "Police Force Area",
    OA: "PFA",
    "Statistical Building Block": "Other"
  },
  E24: {
    outputArea: "Local Learning and Skills Council area",
    OA: "LLSC",
    "Statistical Building Block": "Other"
  },
  E25: {
    outputArea: "Primary Urban Area",
    OA: "PUA",
    "Statistical Building Block": "Other"
  },
  E26: {
    outputArea: "National Park",
    OA: "NPARK",
    "Statistical Building Block": "Other"
  },
  E27: {
    outputArea: "New Deal for Community",
    OA: "NDC",
    "Statistical Building Block": "Other"
  },
  E28: {
    outputArea: "Registration District",
    OA: "REGD",
    "Statistical Building Block": "Other"
  },
  E29: {
    outputArea: "Registration Sub-district",
    OA: "REGSD",
    "Statistical Building Block": "Other"
  },
  E30: {
    outputArea: "Travel to Work Area",
    OA: "TTWA",
    "Statistical Building Block": "Other"
  },
  E31: {
    outputArea: "Fire and Rescue Authority",
    OA: "FRA",
    "Statistical Building Block": "Other"
  },
  E32: {
    outputArea: "London Assembly Constituency",
    OA: "LAC",
    "Statistical Building Block": "Electoral"
  },
  E33: {
    outputArea: "Workplace Zone",
    OA: "WZ",
    "Statistical Building Block": "Census"
  },
  E34: {
    outputArea: "Built-up Area",
    OA: "BUA",
    "Statistical Building Block": "Census"
  },
  E35: {
    outputArea: "Built-up Area sub-division",
    OA: "BUASD",
    "Statistical Building Block": "Census"
  },
  E36: {
    outputArea: "Census Merged Ward",
    OA: "CMWD",
    "Statistical Building Block": "Census"
  },
  E37: {
    outputArea: "Local Enterprise Partnership",
    OA: "LEP",
    "Statistical Building Block": "Other"
  },
  E38: {
    outputArea: "Clinical Commissioning Group",
    OA: "CCG",
    "Statistical Building Block": "Health"
  },
  E39: {
    outputArea: "NHS England (Region, Local Office)",
    OA: "NHSRLO",
    "Statistical Building Block": "Health"
  },
  E40: {
    outputArea: "NHS England Region",
    OA: "NHSER",
    "Statistical Building Block": "Health"
  },
  E41: {
    outputArea: "Census Merged Local Authority District",
    OA: "CMLAD",
    "Statistical Building Block": "Census"
  },
  E42: {
    outputArea: "Census Merged County",
    OA: "CMCTY",
    "Statistical Building Block": "Census"
  },
  E43: {
    outputArea: "Non-Civil Parished Area",
    OA: "NCP",
    "Statistical Building Block": "Census"
  },
  E45: {
    outputArea: "Public Health England Centre",
    OA: "PHEC",
    "Statistical Building Block": "Health"
  },
  E46: {
    outputArea: "Public Health England Region",
    OA: "PHEREG",
    "Statistical Building Block": "Health"
  },
  E47: {
    outputArea: "Combined Authority",
    OA: "CAUTH",
    "Statistical Building Block": "Administrative"
  },
  E48: {
    outputArea: "Local Resilience Forum",
    OA: "LRF",
    "Statistical Building Block": "Other"
  },
  E49: {
    outputArea: "Enterprise Zone",
    OA: "EZ",
    "Statistical Building Block": "Other"
  },
  E50: {
    outputArea: "Waste Authority",
    OA: "WA",
    "Statistical Building Block": "Other"
  },
  E51: {
    outputArea: "Development Corporation",
    OA: "DC",
    "Statistical Building Block": "Other"
  },
  E52: {
    outputArea: "LEP - overlapping part",
    OA: "LEPOP",
    "Statistical Building Block": "Other"
  },
  E53: {
    outputArea: "LEP - non overlapping part",
    OA: "LEPNOP",
    "Statistical Building Block": "Other"
  },
  E54: {
    outputArea: "Sustainability and Transformation Partnership",
    OA: "STP",
    "Statistical Building Block": "Health"
  },
  E55: {
    outputArea: "Strategic Clinical Network",
    OA: "SCN",
    "Statistical Building Block": "Health"
  },
  E56: {
    outputArea: "Cancer Alliance",
    OA: "CAL",
    "Statistical Building Block": "Health"
  },
  E57: {
    outputArea: "National Cancer Vanguard",
    OA: "NCV",
    "Statistical Building Block": "Health"
  },
  E58: {
    outputArea: "County Electoral Division",
    OA: "CED",
    "Statistical Building Block": "Electoral"
  },
  E59: {
    outputArea: "Integrated Care System",
    OA: "ICS",
    "Statistical Building Block": "Health"
  },
  E60: {
    outputArea: "Local Planning Authority",
    OA: "LPA",
    "Statistical Building Block": "Administrative"
  },
  E61: {
    outputArea: "Greater London Authority",
    OA: "GLA",
    "Statistical Building Block": "Administrative"
  },
  E92: {
    outputArea: "Country",
    OA: "CTRY",
    "Statistical Building Block": "Administrative"
  },
  J01: {
    outputArea: "Major Towns and City",
    OA: "TCITY",
    "Statistical Building Block": "Experimental"
  },
  J02: {
    outputArea: "1961 Census Parish",
    OA: "PAR",
    "Statistical Building Block": "Census"
  },
  J03: {
    outputArea: "1961 Census Ward",
    OA: "WD",
    "Statistical Building Block": "Census"
  },
  J04: {
    outputArea: "1961 Census District",
    OA: "LAD",
    "Statistical Building Block": "Census"
  },
  J05: {
    outputArea: "1961 Census County",
    OA: "CTY",
    "Statistical Building Block": "Census"
  },
  K01: {
    outputArea: "Travel to Work Area",
    OA: "TTWA",
    "Statistical Building Block": "Other"
  },
  K02: {
    outputArea: "United Kingdom",
    OA: "UK",
    "Statistical Building Block": "Administrative"
  },
  K03: {
    outputArea: "Great Britain",
    OA: "GB",
    "Statistical Building Block": "Administrative"
  },
  K04: {
    outputArea: "England and Wales",
    OA: "E&W",
    "Statistical Building Block": "Administrative"
  },
  K05: {
    outputArea: "Built Up Area",
    OA: "BUA",
    "Statistical Building Block": "Census"
  },
  K06: {
    outputArea: "Built Up Area sub division",
    OA: "BUASD",
    "Statistical Building Block": "Census"
  },
  L00: {
    outputArea: "Strategic Health Authority",
    OA: "SHA",
    "Statistical Building Block": "Health"
  },
  L93: {
    outputArea: "British Crown Dependency",
    OA: "BCD",
    "Statistical Building Block": "Administrative"
  },
  M00: {
    outputArea: "Strategic Health Authority",
    OA: "SHA",
    "Statistical Building Block": "Health"
  },
  M01: {
    outputArea: "Primary Healthcare Directorate",
    OA: "PHD",
    "Statistical Building Block": "Health"
  },
  M83: {
    outputArea: "British Crown Dependency",
    OA: "BCD",
    "Statistical Building Block": "Administrative"
  },
  W00: {
    outputArea: "Output Area",
    OA: "OA",
    "Statistical Building Block": "Statistical Building Block"
  },
  W01: {
    outputArea: "Super Output Area, Lower Layer",
    OA: "LSOA",
    "Statistical Building Block": "Statistical Building Block"
  },
  W02: {
    outputArea: "Super Output Area, Middle Layer",
    OA: "MSOA",
    "Statistical Building Block": "Statistical Building Block"
  },
  W03: {
    outputArea: "Super Output Area, Upper Layer",
    OA: "USOA",
    "Statistical Building Block": "Statistical Building Block"
  },
  W04: {
    outputArea: "Community",
    OA: "COM",
    "Statistical Building Block": "Administrative"
  },
  W05: {
    outputArea: "Electoral Ward",
    OA: "WD",
    "Statistical Building Block": "Administrative/Electoral"
  },
  W06: {
    outputArea: "Unitary Authority",
    OA: "UA",
    "Statistical Building Block": "Administrative"
  },
  W07: {
    outputArea: "Westminster Parliamentary Constituency",
    OA: "WPC",
    "Statistical Building Block": "Electoral"
  },
  W08: {
    outputArea: "European Electoral Regions",
    OA: "EER",
    "Statistical Building Block": "Electoral"
  },
  W09: {
    outputArea: "National Assembly for Wales Constituency",
    OA: "NAWC",
    "Statistical Building Block": "Electoral"
  },
  W10: {
    outputArea: "National Assembly for Wales Electoral Region",
    OA: "NAWER",
    "Statistical Building Block": "Electoral"
  },
  W11: {
    outputArea: "Local Health Board",
    OA: "LHB",
    "Statistical Building Block": "Health"
  },
  W12: {
    outputArea: "Cancer Registry",
    OA: "CANREG",
    "Statistical Building Block": "Health"
  },
  W13: {
    outputArea: "Cancer Network",
    OA: "CANNET",
    "Statistical Building Block": "Health"
  },
  W14: {
    outputArea: "Community Safety Partnership",
    OA: "CSP",
    "Statistical Building Block": "Other"
  },
  W15: {
    outputArea: "Police Force Area",
    OA: "PFA",
    "Statistical Building Block": "Other"
  },
  W16: {
    outputArea:
      "Department for Children, Education, Lifelong Learning and Skills, WG",
    OA: "DCELLS",
    "Statistical Building Block": "Other"
  },
  W18: {
    outputArea: "National Park",
    OA: "NPARK",
    "Statistical Building Block": "Other"
  },
  W19: {
    outputArea: "National Assembly Economic Region",
    OA: "NAER",
    "Statistical Building Block": "Other"
  },
  W20: {
    outputArea: "Registration District",
    OA: "REGD",
    "Statistical Building Block": "Other"
  },
  W21: {
    outputArea: "Registration Sub-district",
    OA: "REGSD",
    "Statistical Building Block": "Other"
  },
  W22: {
    outputArea: "Travel to Work Area",
    OA: "TTWA",
    "Statistical Building Block": "Other"
  },
  W23: {
    outputArea: "Spatial Plan Area",
    OA: "SPA",
    "Statistical Building Block": "Other"
  },
  W24: {
    outputArea: "Spatial Plan Sub-area",
    OA: "SPSA",
    "Statistical Building Block": "Other"
  },
  W25: {
    outputArea: "Fire and Rescue Authority",
    OA: "FRA",
    "Statistical Building Block": "Other"
  },
  W26: {
    outputArea: "Strategic Regeneration Area",
    OA: "SRA",
    "Statistical Building Block": "Other"
  },
  W27: {
    outputArea: "Strategic Regeneration Sub-area",
    OA: "SRASub",
    "Statistical Building Block": "Other"
  },
  W28: {
    outputArea: "Transport Consortia Area",
    OA: "TCA",
    "Statistical Building Block": "Other"
  },
  W29: {
    outputArea: "Agricultural Region",
    OA: "AgricReg",
    "Statistical Building Block": "Other"
  },
  W30: {
    outputArea: "Agricultural Small Area",
    OA: "AgricSmall",
    "Statistical Building Block": "Other"
  },
  W31: {
    outputArea: "Non-National Park Area",
    OA: "NonNPARK",
    "Statistical Building Block": "Other"
  },
  W32: {
    outputArea: "Non-Strategic Regeneration Area",
    OA: "NonSRA",
    "Statistical Building Block": "Other"
  },
  W33: {
    outputArea: "Communities First Area",
    OA: "CFA",
    "Statistical Building Block": "Other"
  },
  W34: {
    outputArea: "Non-Communities First Area",
    OA: "NonCFA",
    "Statistical Building Block": "Other"
  },
  W35: {
    outputArea: "Workplace Zone",
    OA: "WZ",
    "Statistical Building Block": "Census"
  },
  W36: {
    outputArea: "Footprint Regions for Public Service Collaboration",
    OA: "PSCReg",
    "Statistical Building Block": "Administrative"
  },
  W37: {
    outputArea: "Built-up Area",
    OA: "BUA",
    "Statistical Building Block": "Census"
  },
  W38: {
    outputArea: "Built-up Area sub-division",
    OA: "BUASD",
    "Statistical Building Block": "Census"
  },
  W39: {
    outputArea: "Census Merged Ward",
    OA: "CMWD",
    "Statistical Building Block": "Census"
  },
  W40: {
    outputArea: "Census Merged Local Authority District",
    OA: "CMLAD",
    "Statistical Building Block": "Census"
  },
  W41: {
    outputArea: "Local Resilience Forum",
    OA: "LRF",
    "Statistical Building Block": "Other"
  },
  W42: {
    outputArea: "City Region",
    OA: "CREG",
    "Statistical Building Block": "Other"
  },
  W43: {
    outputArea: "Local Planning Authority",
    OA: "LPA",
    "Statistical Building Block": "Administrative"
  },
  W92: {
    outputArea: "Country",
    OA: "CTRY",
    "Statistical Building Block": "Administrative"
  }
}

export default geoCodes
