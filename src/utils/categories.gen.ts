import type { SolutionPages } from "./solutions.ts";

export const solutions = [
  {
    "slug": "environment",
    "data": {
      "title": "How Does Solar Power Impact the Environment?",
      "description": "Solar power is a fascinating technology that converts energy from the sun into electricity",
      "category": "solar"
    }
  },
  {
    "slug": "cost",
    "data": {
      "title": "How Much Do Solar Panels Cost?",
      "description": "The cost of solar panels can vary depending on your state and region",
      "category": "solar"
    }
  },
  {
    "slug": "what",
    "data": {
      "title": "What is Solar Power?",
      "description": "Solar power is a fascinating technology that converts energy from the sun into electricity",
      "category": "solar"
    }
  },
  {
    "slug": "worth-it",
    "data": {
      "title": "Is It Worth It?",
      "description": "Overall, solar panels are a worthwhile investment",
      "category": "solar"
    }
  },
  {
    "slug": "solar",
    "data": {
      "title": "Solar Energy Solutions",
      "description": "Solar Energy is an undertapped energy resource",
      "category": "solar"
    }
  },
  {
    "slug": "geothermal",
    "data": {
      "title": "Geothermal Energy Solutions",
      "description": "Geothermal Energy is an undertapped energy resource",
      "category": "geothermal"
    }
  },
  {
    "slug": "recycle",
    "data": {
      "title": "Recycling",
      "description": "Recycling saves energy",
      "category": "recycling"
    }
  }
] as const satisfies SolutionPages;
