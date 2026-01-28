export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  category: string;
};

export const posts: BlogPost[] = [
  {
    slug: "reliable-nlp-pipelines",
    title: "Reliable NLP Pipelines in Production",
    date: "Jan 2026",
    category: "AI/ML",
    summary: "Notes from building tokenization and preprocessing workflows for HRMS datasets, focusing on stable inputs and measurable accuracy.",
    content: `Building production NLP pipelines requires more than just model accuracy. During my internship at Musikaar, I learned that reliability comes from stable preprocessing and clear error handling.

## The Challenge

When processing 10,000+ HRMS records, inconsistent tokenization and preprocessing led to unpredictable model behavior. Small variations in input formatting caused significant accuracy drops.

## Key Learnings

1. **Normalize Early**: Standardize text inputs before tokenization
2. **Validate Outputs**: Check tokenized sequences match expected formats
3. **Handle Edge Cases**: Empty strings, special characters, and encoding issues
4. **Monitor Performance**: Track preprocessing time and memory usage

## Implementation

I built a pipeline with:
- Consistent tokenization using spaCy
- Input validation at each stage
- Error logging for debugging
- Performance metrics tracking

The result? 20% improvement in model stability and 40% reduction in manual processing effort.`,
  },
  {
    slug: "debugging-loops-that-teach",
    title: "Debugging Loops that Teach",
    date: "Dec 2025",
    category: "Teaching",
    summary: "A simple loop for isolating defects while tutoring CS students across Java, C++, and assembly.",
    content: `Tutoring 180+ students taught me that debugging is a teachable skill. Here's a simple framework I use:

## The Debugging Loop

1. **Reproduce**: Can you make it fail consistently?
2. **Isolate**: What's the smallest input that causes the issue?
3. **Hypothesize**: What could cause this behavior?
4. **Test**: Add print statements or breakpoints
5. **Fix**: Make the smallest change that solves it
6. **Verify**: Test with the original input

## Common Patterns

- **Off-by-one errors**: Check loop bounds
- **Null pointer exceptions**: Trace object initialization
- **Logic errors**: Step through with sample data

This systematic approach helped students improve their project quality by 25% and increased test coverage by 20%.`,
  },
  {
    slug: "api-contracts-predictable",
    title: "API Contracts that Stay Predictable",
    date: "Nov 2025",
    category: "Backend",
    summary: "Lessons learned from validating REST endpoints and improving error handling consistency.",
    content: `Working on the data integration system taught me the importance of predictable API contracts.

## The Problem

Multiple clients expected different response formats. Inconsistent error handling made debugging difficult.

## The Solution

1. **Define Schemas**: Use JSON Schema for request/response validation
2. **Standardize Errors**: Consistent error format across all endpoints
3. **Version APIs**: Support multiple versions for backward compatibility
4. **Document Everything**: Clear examples for each endpoint

## Key Principles

- Always return the same structure
- Use HTTP status codes correctly
- Provide helpful error messages
- Include request IDs for tracing

This approach reduced integration time by 30% and improved client satisfaction significantly.`,
  },
];
