import { Col } from "react-bootstrap";
import "../style/project.css"
export const ProjectCard = ({ _id,profileImg,title,desc,githublink }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <li key={_id} style={{ height: "400px", overflow: "hidden" }}>
        <div className="proj-imgbx">
          <img src={profileImg} alt={title} style={{ width: "100%", height: "auto" }} />
          <div className="proj-txtx" style={{ padding: "20px" }}>
            <h3>{title}</h3>
            <p>{desc}</p>
            <a href={githublink} style={{ color: "yellow", textDecoration: "none" }}>Site Link</a>
          </div>
        </div>
      </li>
    </Col>
  )
} 
