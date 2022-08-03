import { PureComponent } from "react";

class CarouselItem extends PureComponent {
  render() {
    const { image } = this.props;
    return (
      <div className="carousel-item">
        <img src={image} className="cart-images" alt="carousel"/>
      </div>
    )
  }
}

export default CarouselItem;