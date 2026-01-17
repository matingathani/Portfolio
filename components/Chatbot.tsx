"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { resume } from "../data/resume";

const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    bottom: 10px;
    right: 10px;
  }
`;

const ChatButton = styled(motion.button)`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradient1};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.large};
  color: white;
  font-size: 1.4rem;
  position: relative;
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 360px;
  height: 480px;
  background: rgba(20, 20, 32, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.shapes.borderRadius};
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: ${props => props.theme.shadows.large};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: calc(100vw - 20px);
    height: 420px;
    right: -10px;
  }
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: ${props => props.theme.colors.gradient1};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled(motion.div)<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => (props.$isUser ? "flex-end" : "flex-start")};

  .message-bubble {
    max-width: 80%;
    padding: 0.7rem 1rem;
    border-radius: ${props => props.theme.shapes.borderRadiusSmall};
    background: ${props => (props.$isUser ? props.theme.colors.gradient2 : "rgba(255, 255, 255, 0.08)")};
    color: white;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre-wrap;
  }
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  outline: none;
`;

const SendButton = styled.button`
  padding: 0.75rem 1.2rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  background: ${props => props.theme.colors.gradient2};
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

const getChatbotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
    return `${resume.name} — ${resume.title}. ${resume.summary} Want details on experience, skills, or projects?`;
  }

  if (lowerMessage.includes("education") || lowerMessage.includes("gpa")) {
    return `${resume.education.degree} at ${resume.education.school} (${resume.education.location}), ${resume.education.dates}. GPA ${resume.education.gpa}.`;
  }

  if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
    return resume.experience
      .map((role) => `${role.role} — ${role.company} (${role.dates}). ${role.impact}`)
      .join("\n\n");
  }

  if (lowerMessage.includes("skill")) {
    return `Core skills:\n${resume.skills.programmingAiData.slice(0, 6).join(", ")}\n${resume.skills.backendApisTesting.slice(0, 5).join(", ")}`;
  }

  if (lowerMessage.includes("project")) {
    return `Projects:\n${resume.projects.map((p) => p.name).join("\n")}`;
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("email")) {
    return `Email: ${resume.contact.email}\nLinkedIn: ${resume.contact.linkedin}`;
  }

  return "Ask about resume, experience, projects, skills, or contact info.";
};

interface MessageType {
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      text: `Hi! I can summarize ${resume.name}’s resume, experience, skills, or projects.`,
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: MessageType = {
      text: inputValue,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const response = getChatbotResponse(inputValue);
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 300);
  };

  return (
    <ChatbotContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ChatHeader>
              <h3>Resume Assistant</h3>
              <button onClick={() => setIsOpen(false)}>×</button>
            </ChatHeader>
            <MessagesContainer>
              {messages.map((msg, idx) => (
                <Message
                  key={idx}
                  $isUser={msg.isUser}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-bubble">{msg.text}</div>
                </Message>
              ))}
              <div ref={messagesEndRef} />
            </MessagesContainer>
            <InputContainer>
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about resume, projects, skills..."
              />
              <SendButton onClick={handleSend} disabled={!inputValue.trim()}>
                Send
              </SendButton>
            </InputContainer>
          </ChatWindow>
        )}
      </AnimatePresence>
      <ChatButton onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}>
        💬
      </ChatButton>
    </ChatbotContainer>
  );
};

export default Chatbot;
