import type { SolutionPages } from "./solutions.ts";

export const solutions = [
  {
    "slug": "programs",
    "data": {
      "title": "Programs",
      "description": "Green energy programs",
      "category": "green"
    }
  },
  {
    "slug": "getting-started",
    "data": {
      "title": "Getting Started",
      "description": "Getting Started with green energy!",
      "category": "green"
    }
  },
  {
    "slug": "pricing",
    "data": {
      "title": "Pricing",
      "description": "Pricing for green energy",
      "category": "monies"
    }
  },
  {
    "slug": "guarantees-in-life",
    "data": {
      "title": "Taxes",
      "description": "\"There are only two guarantees in life: death and taxes.\"",
      "category": "monies"
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
