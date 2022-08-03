import { PureComponent } from "react";
import CarouselItem from "./CarouselItem";
import CarouselControls from "./CarouselControls";
import { nanoid } from 'nanoid';

class Carousel extends PureComponent {
  constructor() {
    super();
    this.state = {
      currentSlide: 0
    }
  }

  prev = (item) => {
    const index = this.state.currentSlide > 0 ? this.state.currentSlide - 1 : item.gallery.length - 1
    this.setState({
      currentSlide: index
    })
  }

  next = (item) => {
    const index = this.state.currentSlide < item.gallery.length - 1 ? this.state.currentSlide + 1 : 0
    this.setState({
      currentSlide: index
    })
  }

  render() {
    const { item } = this.props
    return (
      <div className="carousel">
        <div className="carousel-inner" style={{ transform: `translateX(${-this.state.currentSlide * 100}%)`}} >
          { item.gallery.map((image) => (
            <div className="carousel-item">
              <CarouselItem image={image} key={nanoid()}/>
            </div>
          )) }
        </div>
        <CarouselControls prev={this.prev} next={this.next} item={item}/>
      </div>
    )
  }
}

export default Carousel;