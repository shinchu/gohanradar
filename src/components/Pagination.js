import React from "react";
import { Pagination } from "@shopify/polaris";


class Paginator extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        const {currentPage, totalPages} = this.props;

        return (
            <div className="pagination-container">
                <Pagination label={`${currentPage}/${totalPages}`} />
            </div>
        )
    }
}

export default Paginator;
