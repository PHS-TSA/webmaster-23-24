import type { SolutionPages } from "./solutions.ts";

export const solutions = [
  {
    "slug": "index",
    "data": {
      "title": "Solar Energy Solutions",
      "description": "Solar Energy is an undertapped energy resource",
      "category": "solar"
    }
  },
  {
    "slug": "recycle",
    "data": {
      "title": "Recycling",
      "description": "Recycling saves energy",
      "category": "recycling"
    }
  },
  {
    "data": {
      "title": "Geothermal Energy Solutions",
      "description": "Geothermal Energy is an undertapped energy resource",
      "category": "geothermal"
    }
  },
  {
    "slug": "environment",
    "data": {
      "title": "How Does Solar Power Impact the Environment?",
      "description": "The best thing about solar power is that it has nearly zero negative effects on the environment",
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
      "title": "Is Solar Power Worth It?",
      "description": "Overall, solar panels are a worthwhile investment",
      "category": "solar"
    }
  }
] as const satisfies SolutionPages;
