import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #1e1e1e;
  color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #333;
  transition: box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;

  &:hover {
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 18px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  flex-grow: 1;
`;

const Link = styled.a`
  color: #00bfff;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
`;

const ProjectCard = ({ project }) => {
  return (
    <Card>
      <Title>{project.title}</Title>
      <Description>{project.description}</Description>
      <Link href={project.link} target="_blank">
        View Project →
      </Link>
    </Card>
  );
};

export default ProjectCard;
