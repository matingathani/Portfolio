import dynamic from "next/dynamic";
import StoryLanding from "../components/story/Landing";

const StoryAbout        = dynamic(() => import("../components/story/About"));
const StoryWhatIDo      = dynamic(() => import("../components/story/WhatIDo"));
const StoryCareer       = dynamic(() => import("../components/story/Career"));
const StoryEducation    = dynamic(() => import("../components/story/Education"));
const StoryProjects     = dynamic(() => import("../components/story/Projects"));
const StoryTechStack    = dynamic(() => import("../components/story/TechStack"));
const StoryTestimonials = dynamic(() => import("../components/story/Testimonials"));
const StoryLatestPosts  = dynamic(() => import("../components/story/LatestPosts"));
const StoryContact      = dynamic(() => import("../components/story/Contact"));

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
      <StoryLatestPosts />
      <StoryContact />
    </div>
  );
}
