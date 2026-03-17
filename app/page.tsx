import StoryLanding from "../components/story/Landing";
import StoryAbout from "../components/story/About";
import StoryWhatIDo from "../components/story/WhatIDo";
import StoryCareer from "../components/story/Career";
import StoryEducation from "../components/story/Education";
import StoryProjects from "../components/story/Projects";
import StoryTechStack from "../components/story/TechStack";
import StoryTestimonials from "../components/story/Testimonials";
import StoryContact from "../components/story/Contact";

export default function HomePage() {
  return (
    <div style={{ background: "#050810" }}>
      <StoryLanding />
      <StoryAbout />
      <StoryWhatIDo />
      <StoryCareer />
      <StoryEducation />
      <StoryProjects />
      <StoryTechStack />
      <StoryTestimonials />
      <StoryContact />
    </div>
  );
}
