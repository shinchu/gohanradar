import React from "react";
import { Card, Thumbnail, SkeletonThumbnail, Modal, TextContainer, TextField } from "@shopify/polaris";
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
        let restImage, restAccess;

        if (imageUrl1) {
            restImage = <Thumbnail source={ imageUrl1 }
                                   size="large"
                                   alt={ this.props.rest.name } />
        } else if (imageUrl2) {
            restImage = <Thumbnail source={ imageUrl2 }
                                   size="large"
                                   alt={ this.props.rest.name } />

        } else {
            restImage = <SkeletonThumbnail size="large" />
        }



        return (
            <div className="rest-card">
                <div onClick={this.handleRestModal}>
                    <Card title={ this.props.rest.name }
                          sectioned>
                        { restImage }
                        { this.props.rest.access.line }
                        { this.props.rest.access.station }
                        { this.props.rest.access.station_exit }
                        { this.props.rest.access.walk }
                        { this.props.rest.access.note }
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
