import Helmet from "./Helmet/Hemet";
import "../style/home.css";
import { Container, Row, Col } from "reactstrap";

// import Services from "../services/services";
// import ProductList from "../components/UI/ProductList";
// import { Products, BestSales } from "../assert/data/Products";

const Home = () => {
  // const year = new Date().getFullYear();
  // const [data, setData] = useState(Products);
  // const [sales, setSales] = useState(BestSales);

  return (
    <Helmet title={"Home"}>
      <section className="hero-section">
        <Container className="con">
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Welcome to Farm house</p>
                <h2>Embrace the Wholesome Goodness of Dairy</h2>
                <p>
                  we invite you to embark on a journey that celebrates the
                  wholesome goodness of dairy. We believe that dairy products
                  are not just ingredients but treasures that enrich our lives
                  and nourish our bodies. From the lush green pastures where our
                  cows graze to the expert hands that transform their milk into
                  delightful creations, we take pride in offering you the finest
                  dairy products
                </p>
              </div>
            </Col>
            {/* <Col lg="6" md="6">
              <div className="hero__img">
                <img src="" alt="heroImg" />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
      {/* <section className="treading__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Products</h2>
            </Col>
          </Row>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Treanding products</h2>
            </Col>
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
};

export default Home;
