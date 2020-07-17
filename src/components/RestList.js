import React from "react";
import { Card, Thumbnail, Modal, Heading, Badge } from "@shopify/polaris";
import RestCard from "./RestCard";


class RestList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restModal: false
        }
    }

    handleRestModal = () => {
        this.setState({restModal: !this.state.restModal});
    }

    render () {

        const imageUrl1 = this.props.rest.image_url.shop_image1;
        const imageUrl2 = this.props.rest.image_url.shop_image2;
        let restImage, restAccess, category;

        if (imageUrl1) {
            restImage = imageUrl1
        } else if (imageUrl2) {
            restImage = imageUrl2
        } else {
            restImage = "https://placehold.jp/d1d1d1/949494/80x80.png?text=no%20image"
        }

        if (this.props.rest.category) {
            category = <span className="rest-list-category"><Badge>{this.props.rest.category}</Badge></span>
        }

        if (this.props.rest.access.line) {
            restAccess = <p className="access">{this.props.rest.access.line} {this.props.rest.access.station} {this.props.rest.access.station_exit} {this.props.rest.access.walk}分</p>
        }


        return (
            <div className="rest-card">
                <div onClick={this.handleRestModal}>
                    <Card title="">
                        <div className="rest-list-wrapper">
                            <div className="rest-list-content">
                                <div className="thumb-container">
                                    <Thumbnail source={ restImage }
                                               size="large"
                                               alt={ this.props.rest.name } />
                                </div>
                                <div className="rest-list-desc">
                                    <Heading>{ this.props.rest.name }{category}</Heading>
                                    { restAccess }
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <Modal large
                       sectioned
                       title={this.props.rest.name}
                       open={this.state.restModal}
                       onClose={this.handleRestModal}>
                    <RestCard { ...this.props.rest } />
                </Modal>
            </div>
        )
    }

}


export default RestList;
