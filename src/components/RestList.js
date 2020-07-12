import React from "react";
import { Card, Thumbnail, SkeletonThumbnail } from "@shopify/polaris";


class RestList extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        const imageUrl = this.props.rest.image_url.shop_image1;
        let restImage;

        if (imageUrl) {
            restImage = <Thumbnail source={ imageUrl }
                                   size="large"
                                   alt={ this.props.rest.name } />
        } else {
            restImage = <SkeletonThumbnail size="large" />
        }

        return (
            <Card title={ this.props.rest.name }
                  sectioned>
                { restImage }
            </Card>
        )
    }

}


export default RestList;
