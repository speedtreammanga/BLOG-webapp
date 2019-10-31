import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

function PostDetailsComponent({ color, size, title, date, content }) {
  return (
    <Section
      color={color}
      size={size}
    >
      <div className="container">
        <SectionHeader
          title={title}
          subtitle={date}
          centered={true}
          size={2}
        />
        <p className="is-1">{content}</p>
      </div>
    </Section>
  );
}

export default PostDetailsComponent;
