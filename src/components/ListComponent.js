import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import ContentCards from "./ContentCards";
import AvatarComponent from "./Avatar";

function ListComponent(props) {
  const { data, fetching, error, blog } = props;
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem'}}>
          {blog && blog.logoUrl && <AvatarComponent src={blog.logoUrl} />}
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            centered={true}
            size={3}
            style={(blog && blog.logoUrl && {marginLeft: '1rem'}) || {}}
          />
        </div>
        <ContentCards {...{ data, fetching, error }}/>
      </div>
    </Section>
  );
}

export default ListComponent;
