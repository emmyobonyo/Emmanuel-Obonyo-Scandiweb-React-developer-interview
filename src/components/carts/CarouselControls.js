import { PureComponent } from "react";

class CarouselControls extends PureComponent {
  render() {
    const { prev, next, item } = this.props;
    const leftArrow = '<';
    const rightArrow = '>'
    return (
      <div>
        <button className="carousel-control left" onClick={() => prev(item)}>{leftArrow}</button>
        <button className="carousel-control right" onClick={() => next(item)}>{rightArrow}</button>
      </div>
    )
  }
}

export default CarouselControls;