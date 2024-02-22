import type { SolutionPages } from "./solutions.ts";

export const solutions = [
  {
    "slug": "recycle",
    "data": {
      "title": "Recycling",
      "description": "Recycling saves energy",
      "category": "recycling"
    }
  },
  {
    "slug": "geothermal",
    "data": {
      "title": "Geothermal Energy Solutions",
      "description": "Geothermal Energy is an undertapped energy resource.",
      "category": "geothermal"
    }
  },
  {
    "slug": "solar",
    "data": {
      "title": "Solar Energy Solutions",
      "description": "Solar Energy is an undertapped energy resource.",
      "category": "solar"
    }
  }
] as const satisfies SolutionPages;
