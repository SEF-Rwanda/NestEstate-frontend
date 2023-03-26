import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import PropertiesComponent from "../../component/property/PropertiesComponent";
const Properties = ({
  properties,
  totalProperties,
  propertiesPerPage,
  setCurrentPage,
  loading,
}) => {
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
          pageCount={Math.ceil(totalProperties / propertiesPerPage)}
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
