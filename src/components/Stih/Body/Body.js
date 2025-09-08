import "./Body.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Body(props) {

  function markBody(body, hl) {
    let strArr = body.split(new RegExp(`(${hl})`, "ig"));
    return strArr.map((ea, i) => {
      if(ea.toLowerCase() === hl.toLowerCase()){
        return <span className="highlight">{ea}</span>
      } else {
        return ea;
      }
    });
}

  function FinalBody() {
    if (props.highlight) {
      return markBody(props.body, props.highlight);
    } else {
      return props.body;
    }
  }

  return (
    <div className="stihBody">
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <FinalBody/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Body;
