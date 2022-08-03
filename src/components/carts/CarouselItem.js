import { PureComponent } from "react";

class CarouselItem extends PureComponent {
  render() {
    const { image } = this.props;
    return (
      <div className="carousel-item">
        <img src={image} className="cart-images"/>
      </div>
    )
  }
}

export default CarouselItem;