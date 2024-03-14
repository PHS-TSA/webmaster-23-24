import type { SolutionPages } from "./solutions.ts";

export const solutions = [
  {
    "slug": "what",
    "data": {
      "title": "What is Solar Power?",
      "description": "Solar power is a fascinating technology that converts energy from the sun into electricity",
      "category": "solar",
      "sectionHeader": "What Is It?"
    }
  },
  {
    "slug": "environment",
    "data": {
      "title": "How Does Solar Power Affect the Environment?",
      "description": "The best thing about solar power is that it has nearly zero negative effects on the environment",
      "category": "solar",
      "sectionHeader": "How Does It Impact the Environment?"
    }
  },
  {
    "slug": "cost",
    "data": {
      "title": "How Much Do Solar Panels Cost?",
      "description": "The cost of solar panels can vary depending on your state and region",
      "category": "solar",
      "sectionHeader": "How Much Does It Cost?"
    }
  },
  {
    "slug": "worth-it",
    "data": {
      "title": "Is Solar Power Worth It?",
      "description": "Overall, solar panels are a worthwhile investment",
      "category": "solar",
      "sectionHeader": "Is It Worth It?"
    }
  },
  {
    "slug": "what",
    "data": {
      "title": "What Are Geothermal Energy Solutions?",
      "description": "Geothermal Energy is an undertapped energy resource",
      "category": "geothermal",
      "sectionHeader": "What is It?"
    }
  },
  {
    "slug": "environment",
    "data": {
      "title": "How Does Geothermal Energy Impact the Environment?",
      "description": "When it comes to carbon emissions, geothermal energy is very efficient",
      "category": "geothermal",
      "sectionHeader": "How Does It Affect the Environment?"
    }
  },
  {
    "slug": "cost",
    "data": {
      "title": "How Much Do a Geothermal Energy Solutions Cost?",
      "description": "The cost to install a geothermal system can range anywhere from $10,000 all the way up to $25,000",
      "category": "geothermal",
      "sectionHeader": "How Much Does It Cost?"
    }
  },
  {
    "slug": "worth-it",
    "data": {
      "title": "Is Geothermal Energy Worth the Investment?",
      "description": "Deciding to invest in a geothermal energy solution can be tricky",
      "category": "geothermal",
      "sectionHeader": "Is It Worth It?"
    }
  },
  {
    "slug": "what",
    "data": {
      "title": "What is Recycling?",
      "description": "Recycling is the process of taking inorganic waste materials and turning them into new products",
      "category": "recycling",
      "sectionHeader": "What Is it?"
    }
  },
  {
    "slug": "environment",
    "data": {
      "title": "How Does Recycling Impact the Environment?",
      "description": "The process of recycling reduces pollution and emissions",
      "category": "recycling",
      "sectionHeader": "How Does It Affect the Environment?"
    }
  },
  {
    "slug": "cost",
    "data": {
      "title": "The Cost of Recycling",
      "description": "The cost of recycling on municipal governments can vary anywhere from $100 to $300 per ton",
      "category": "recycling",
      "sectionHeader": "How Much Does It Cost?"
    }
  },
  {
    "slug": "worth-it",
    "data": {
      "title": "Is Recycling Worth It?",
      "description": "The process of recycling prevents waste materials from ending up in landfills",
      "category": "recycling",
      "sectionHeader": "Is It Worth It?"
    }
  },
  {
    "slug": "appliances",
    "data": {
      "title": "Appliances",
      "description": "Don’t waste natural gas",
      "category": "other",
      "sectionHeader": "Electric Appliances"
    }
  },
  {
    "slug": "billing",
    "data": {
      "title": "Online Billing",
      "description": "Online billing saves paper and time",
      "category": "other",
      "sectionHeader": "Online Billing"
    }
  },
  {
    "slug": "electric-cars",
    "data": {
      "title": "Electric Cars",
      "description": "Transportation is one of the largest sources of carbon emissions in the US",
      "category": "other",
      "sectionHeader": "Electric Cars"
    }
  },
  {
    "slug": "hydroelectric",
    "data": {
      "title": "Hydroelectric Power",
      "description": "The power of water",
      "category": "other",
      "sectionHeader": "Hydroelectric Power"
    }
  },
  {
    "slug": "led-lights",
    "data": {
      "title": "LED Lights",
      "description": "LED lights use 90% less energy than traditional light bulbs",
      "category": "other",
      "sectionHeader": "LED Lights"
    }
  },
  {
    "slug": "nuclear-power",
    "data": {
      "title": "Nuclear Power",
      "description": "Fission, fusion—what’s up with nuclear power",
      "category": "other",
      "sectionHeader": "Nuclear Power"
    }
  },
  {
    "slug": "solar-lawn-lights",
    "data": {
      "title": "Solar Powered Lawn Lights",
      "description": "Saving both money and effort, solar-powered lawn lights are a great investment for your green lawn!",
      "category": "other",
      "sectionHeader": "Solar Powered Lights"
    }
  },
  {
    "slug": "utilities",
    "data": {
      "title": "Utility Companies Green Programs",
      "description": "Many electric companies now offer programs to exclusively buy solar",
      "category": "other",
      "sectionHeader": "Utility Companies’ Green Programs"
    }
  },
  {
    "slug": "wind",
    "data": {
      "title": "Wind Power",
      "description": "Wind is good for more than just cooling you off on a hot summer day",
      "category": "other",
      "sectionHeader": "Wind Power"
    }
  }
] as const satisfies SolutionPages;
