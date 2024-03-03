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
    "slug": "atomics",
    "data": {
      "title": "Nuclear Power",
      "description": "Fission, fusion—what’s up with nuclear power",
      "category": "other",
      "sectionHeader": "The Splitting of the Atom"
    }
  },
  {
    "slug": "billing",
    "data": {
      "title": "Online Billing",
      "description": "Online billing saves paper",
      "category": "other",
      "sectionHeader": "Save the World Through Online Billing"
    }
  },
  {
    "slug": "electric-cars",
    "data": {
      "title": "Electric Cars",
      "description": "Transportation is one of the largest sources of carbon emissions in the US",
      "category": "other",
      "sectionHeader": "Cars, Trucks, and Things That Go"
    }
  },
  {
    "slug": "hydroelectric",
    "data": {
      "title": "Hydroelectric Power",
      "description": "The power of water",
      "category": "other",
      "sectionHeader": "Hypostatic? Nope, Just Hydroelectric"
    }
  },
  {
    "slug": "led-lights",
    "data": {
      "title": "LED Lights Are Efficient",
      "description": "LED lights use 90% less energy than traditional light bulbs",
      "category": "other",
      "sectionHeader": "LED Lights Use Up Less Energy to Produce More Light"
    }
  },
  {
    "slug": "solar-lawn-lights",
    "data": {
      "title": "Lawn Lights",
      "description": "Saving both money and effort, solar-powered lawn lights are a great investment",
      "category": "other",
      "sectionHeader": "Solar Powered Lights–Stylish and Green"
    }
  },
  {
    "slug": "utilities",
    "data": {
      "title": "Utility Companies",
      "description": "Many electric companies now offer programs to exclusively buy solar",
      "category": "other",
      "sectionHeader": "Minimal-Hassle Green Energy Straight From Your Electric Company"
    }
  },
  {
    "slug": "wind",
    "data": {
      "title": "Wind Power",
      "description": "While America is lagging in wind power, we can opine to our elected officials",
      "category": "other",
      "sectionHeader": "Wind Turbines—Capturing Both Our Imaginations and Energy!"
    }
  }
] as const satisfies SolutionPages;
