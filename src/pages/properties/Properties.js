import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import PropertiesComponent from "../../component/property/PropertiesComponent";
const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(2);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/properties?perPage=${propertiesPerPage}&page=${currentPage}`
      );
      setProperties(data.data);
      setLoading(false);
    };
    fetchProperties();
  }, [currentPage, propertiesPerPage]);

  console.log("current page", currentPage);
  console.log("properties per page", propertiesPerPage);

  return (
    <Container>
      <h4
        style={{ marginTop: "10px", marginBottom: "10px", textAlign: "center" }}
      >
        Find Recent Properties
      </h4>
      <PropertiesComponent properties={properties} loading={loading} />
      <div className="mt-5 d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={3} /*{Math.ceil(properties.length / propertiesPerPage)}*/
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(data) => setCurrentPage(data.selected + 1)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          breakLinkClassName={"page-link"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
        />
      </div>
    </Container>
  );
};

export default Properties;
