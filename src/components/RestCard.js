import React from "react";
import { Layout, DescriptionList, Link } from "@shopify/polaris";
import Image from "./Image";

class RestCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imageUrl1 = this.props.image_url.shop_image1;
    let imageUrl2 = this.props.image_url.shop_image2;
    let qrcode = this.props.image_url.qrcode;

    const descs = [
      { term: "店舗名称", description: this.props.name },
      { term: "住所", description: this.props.address },
      { term: "電話番号", description: this.props.tel },
      { term: "営業時間", description: this.props.opentime },
      { term: "定休日", description: this.props.holiday },
      { term: "その他", description: <Link url={this.props.url} external>ぐるなびで詳しく見る</Link> }
    ];

    return (
      <div>
        <Layout>
          <Layout.Section secondary>
            <div className="rest-image-container">
              <Image source={imageUrl1} />
              <Image source={imageUrl2} />
              <Image source={qrcode} />
            </div>
          </Layout.Section>
          <Layout.Section>
            <DescriptionList items={descs} />
          </Layout.Section>
        </Layout>
      </div>
    );
  }
}

export default RestCard;
