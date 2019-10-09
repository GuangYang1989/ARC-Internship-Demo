import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const AppContainer = styled.div`
  border: 1px solid lightgrey;
  padding: 50px;
`;

const AppTitle = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

const App = props => {
  return (
    <AppContainer>
      <AppTitle>Poject Introduction</AppTitle>
    </AppContainer>
  );
};

export default withRouter(App);
